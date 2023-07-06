import componentTemplate from "./view.template";
import componentStyles from "./view.style";
import globalStyles from "../../styles/theme.style";

class View extends HTMLElement {
  private hasBeenMountedOnce = false;
  private viewMap = new Map();
  private mainElement;
  [key: string]: unknown;

  protected static get observedAttributes() {
    return ["current-view"];
  }

  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [globalStyles, componentStyles];
    this.mainElement = <HTMLElement>shadowRoot.getElementById("main");
  }

  public get homeView() {
    return this.getView("home");
  }

  public get productView() {
    return this.getView("product");
  }

  public get cartView() {
    return this.getView("cart");
  }

  public get orderView() {
    return this.getView("order");
  }

  public get errorView() {
    return this.getView("error");
  }

  public get currentView() {
    return this.getAttribute("current-view");
  }

  public set currentView(newCurrentView) {
    if (typeof newCurrentView === "string") {
      this.setAttribute("current-view", newCurrentView);
    } else {
      this.removeAttribute("current-view");
    }
  }

  private getView(viewName: string | undefined) {
    if (typeof viewName === "string") {
      if (!this.viewMap.has(viewName)) {
        const view = document.createElement(`audio-${viewName}-view`);
        this.viewMap.set(viewName, view);
      }
      return this.viewMap.get(viewName);
    } else {
      throw new TypeError(
        `Invalid view name type, expected string but got: ${typeof viewName}`
      );
    }
  }

  private handleCurrentView(newCurrentView: string | undefined) {
    if (typeof newCurrentView === "string") {
      const view = this.getView(newCurrentView);
      this.mainElement.replaceChildren(view);
    } else {
      this.mainElement.replaceChildren();
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
      this.upgradeProperty("currentView");
      this.hasBeenMountedOnce = true;
    }
  }

  protected attributeChangedCallback(
    name: string | undefined,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    if (oldValue !== newValue) {
      switch (name) {
        case "current-view": {
          this.handleCurrentView(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("audio-view", View);

export default View;
