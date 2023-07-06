import componentTemplate from "./page.template";
import componentStyles from "./page.style";
import globalStyles from "../../styles/theme.style";
import { userAllowAnimation } from "../../../utils/user-preferences";
import CartAPI from "../../../utils/cart";
import View from "../view";
import { fadeAndSlideXKeyframes, fadeKeyframes } from "../../../utils/animation";

const TO_LEFT = true;
const TO_RIGHT = false;

const animationTiming = {
  duration: 300,
  easing: "ease-in-out",
};

class Page extends HTMLElement {
  private hasBeenMountedOnce = false;
  private keyframeEffect = new KeyframeEffect(this, null, animationTiming);
  private _animation = new Animation(this.keyframeEffect, document.timeline);
  private _hasAnimation = false;
  private pageLevelDifference = 0;
  private viewElement;
  [key: string]: unknown;

  protected static get observedAttributes() {
    return ["current-page"];
  }

  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [globalStyles, componentStyles];
    this.viewElement = <View>shadowRoot.getElementById("view");
    this.handleViewFromCustomEvent = this.handleViewFromCustomEvent.bind(this);
  }

  public get animation() {
    return this._animation;
  }

  private get keyframes() {
    if (this.pageLevelDifference < 0) {
      return fadeAndSlideXKeyframes(TO_LEFT);
    } else if (this.pageLevelDifference > 0) {
      return fadeAndSlideXKeyframes(TO_RIGHT);
    } else {
      return fadeKeyframes();
    }
  }

  public get hasAnimation() {
    return this._hasAnimation && this.isConnected && userAllowAnimation();
  }

  public set hasAnimation(hasAnimation) {
    const hasAnimationBoolean = !!hasAnimation;
    if (this.hasAnimation !== hasAnimationBoolean) {
      this._hasAnimation = hasAnimationBoolean;
    }
  }

  public get currentPage() {
    return this.getAttribute("current-page");
  }

  public set currentPage(newCurrentPage) {
    if (typeof newCurrentPage === "string") {
      this.setAttribute("current-page", newCurrentPage);
    } else {
      this.removeAttribute("current-page");
    }
  }

  private async playAnimation(keyframes: Keyframe[]) {
    this.keyframeEffect.setKeyframes(keyframes);
    this._animation.play();
    try {
      await this._animation.finished;
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        throw error;
      }
    }
  }

  private async changeView(viewName: string | undefined) {
    console.log("current page has changed", viewName);
    if (typeof viewName === "string") {
      if (this.hasAnimation) {
        const keyframesGenerator = this.keyframes;
        await this.playAnimation(keyframesGenerator.next().value);
        this.viewElement.currentView = viewName;
        await this.playAnimation(keyframesGenerator.next().value);
      } else {
        this.viewElement.currentView = viewName;
      }
    } else {
      this.viewElement.currentView = null;
    }
  }

  private getPageLevel(pageName: string | undefined) {
    switch (pageName) {
      case "home":
        return 1;
      case "product":
        return 2;
      case "cart":
        return 3;
      case "not-found":
        return 4;
      default:
        return 0;
    }
  }

  private handleCartPage() {
    const numberOfCartItems = CartAPI.cart.length;
    if (numberOfCartItems > 0) {
      this.changeView("cart");
    } else {
      this.changeView("error");
    }
  }

  private handleNotFoundPage() {
    const errorView = this.viewElement.errorView;
    errorView.title = "Cette page n'existe pas";
    errorView.description =
      "Il semble que la page que vous recherchez n'existe pas, veuillez réessayer.";
    errorView.navigationLinkButton.label = "Revenir à l'acceuil";
    errorView.navigationLinkButton.href = "/orinoco/";
    errorView.button = errorView.navigationLinkButton;
    this.changeView("error");
  }

  private handleCurrentPage(
    oldCurrentPage: string | undefined,
    newCurrentPage: string | undefined
  ) {
    const oldPageLevel = this.getPageLevel(oldCurrentPage);
    const newPageLevel = this.getPageLevel(newCurrentPage);
    this.pageLevelDifference = oldPageLevel - newPageLevel;
    if (newCurrentPage === "cart") {
      this.handleCartPage();
    } else if (newCurrentPage === "not-found") {
      this.handleNotFoundPage();
    } else {
      this.changeView(newCurrentPage);
    }
  }

  private handleOrderViewFromCustomEvent(orderId: string | undefined) {
    if (typeof orderId === "string") {
      // todo
    } else {
      throw new TypeError("The order id is not a string");
    }
  }

  private handleErrorViewFromCustomEvent(title: string, description: string) {
    if (typeof title === "string" && typeof description === "string") {
      const errorView = this.viewElement.errorView;
      errorView.title = title;
      errorView.description = description;
      errorView.navigationButton.label = "Recharger la page";
      errorView.navigationButton.page = this.currentPage;
      errorView.button = errorView.navigationButton;
    } else {
      throw new TypeError("The title and/or the description are not valid");
    }
  }

  private handleViewFromCustomEvent(customEvent: Event) {
    if (customEvent instanceof CustomEvent) {
      const view = customEvent.detail.view;
      if (typeof view === "string") {
        if (view === "order") {
          this.handleOrderViewFromCustomEvent(customEvent.detail.orderId);
        } else if (view === "error") {
          this.handleErrorViewFromCustomEvent(
            customEvent.detail.title,
            customEvent.detail.description
          );
        }
        this.hasAnimation = true;
        this.pageLevelDifference = 0;
        this.changeView(view);
      } else {
        throw new TypeError("The custom event view is not a string");
      }
    } else {
      throw new TypeError("The custom event is not valid");
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
      this.upgradeProperty("hasAnimation");
      this.upgradeProperty("currentPage");
      this.hasBeenMountedOnce = true;
    }
    this.addEventListener("web-page-view", this.handleViewFromCustomEvent);
  }

  protected disconnectedCallback() {
    this.removeEventListener("web-page-view", this.handleViewFromCustomEvent);
  }

  protected attributeChangedCallback(
    name: string | undefined,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    if (oldValue !== newValue) {
      switch (name) {
        case "current-page": {
          this.handleCurrentPage(oldValue, newValue);
          break;
        }
      }
    }
  }
}

customElements.define("audio-page", Page);

export default Page;
