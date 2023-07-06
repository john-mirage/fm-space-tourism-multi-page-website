import componentTemplate from "./app.template";
import componentStyles from "./app.style";
import themeStyles from "../../styles/theme.style"
import globalStyles from "../../styles/global.style";
import Page from "@components/page/page";

class App extends HTMLElement {
  private hasBeenMountedOnce = false;
  private pageElement;
  [key: string]: unknown;

  protected static get observedAttributes() {
    return ["href"];
  }

  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [
      themeStyles,
      globalStyles,
      componentStyles,
    ];
    this.pageElement = <Page>shadowRoot.getElementById("page");
    this.handleHrefFromPopStateEvent =
      this.handleHrefFromPopStateEvent.bind(this);
    this.handleHrefFromCustomEvent = this.handleHrefFromCustomEvent.bind(this);
  }

  public get href() {
    return this.getAttribute("href");
  }

  public set href(newHref) {
    if (typeof newHref === "string") {
      this.setAttribute("href", newHref);
    } else {
      this.removeAttribute("href");
    }
  }

  private handleHref(newHref: string | undefined) {
    if (typeof newHref === "string") {
      const url = new URL(newHref);
      switch (url.pathname) {
        case "/": {
          this.pageElement.currentPage = "home";
          break;
        }
        case "/destination": {
          this.pageElement.currentPage = "destination";
          break;
        }
        case "/crew": {
          this.pageElement.currentPage = "crew";
          break;
        }
        case "/technology": {
          this.pageElement.currentPage = "technology";
          break;
        }
        default: {
          this.pageElement.currentPage = "not-found";
        }
      }
    } else {
      this.pageElement.currentPage = null;
    }
  }

  private handleHrefFromPopStateEvent() {
    if (this.pageElement.animation.playState === "running")
      this.pageElement.animation.cancel();
    this.pageElement.hasAnimation = false;
    this.href = window.location.href;
  }

  private handleHrefFromCustomEvent(customEvent: Event) {
    if (customEvent instanceof CustomEvent) {
      const { href } = customEvent.detail;
      if (typeof href === "string") {
        if (this.pageElement.animation.playState !== "running") {
          window.history.pushState({}, "", href);
          this.pageElement.hasAnimation = true;
          this.href = href;
        }
      } else {
        throw new Error("The custom event href is not valid");
      }
    } else {
      throw new Error("The custom event is not valid");
    }
  }

  private upgradeProperty(propertyName: string) {
    if (typeof propertyName === "string") {
      if (this.hasOwnProperty(propertyName)) {
        const value = this[propertyName];
        delete this[propertyName];
        this[propertyName] = value;
      }
    } else {
      throw TypeError("The property name is not a string");
    }
  }

  protected connectedCallback() {
    if (!this.hasBeenMountedOnce) {
      this.upgradeProperty("href");
      this.hasBeenMountedOnce = true;
    }
    window.addEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.addEventListener("st-app-href", this.handleHrefFromCustomEvent);
  }

  protected disconnectedCallback() {
    window.removeEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.removeEventListener("st-app-href", this.handleHrefFromCustomEvent);
  }

  protected attributeChangedCallback(
    name: string | undefined,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    if (oldValue !== newValue) {
      switch (name) {
        case "href": {
          this.handleHref(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("st-app", App);

export default App;
