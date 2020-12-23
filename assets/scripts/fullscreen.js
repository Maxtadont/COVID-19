import { wrapBtn } from "../../main.js";
import {countryBtn} from "../../main.js";
import {mapBtn} from "../../main.js";
import {tableBtn} from "../../main.js";
import {chartBtn} from "../../main.js";

let simulationChangeWindow = new Event("resize", {bubbles: false});

class FullscreenBtn {
    constructor(btnName, windowName) {
        this.btn = document.querySelector(btnName);
        this.window = document.querySelector(windowName);
    }

    showBtn() {
        this.btn.classList.add("visible");
    }

    hideBtn() {
        this.btn.classList.remove("visible");
    }

    showWindow() {
        this.window.classList.remove("hide");
    }

    hideWindow() {
        this.window.classList.add("hide");
    }

    fullscreenWindow() {
        this.window.classList.add("fullscreen");
    }

    removeFullscreenWindow() {
        this.window.classList.remove("fullscreen");
    }

    isFullscreen() {
        return this.window.classList.contains("fullscreen") ? true : false;
    }

    showHideBtn() {
        this.window.addEventListener("mouseenter", () => {
            this.showBtn();
        });
        this.window.addEventListener("mouseleave", () => {
            this.hideBtn();
        });
        return this;
    }
}

export class FullscreenBtnCountry extends FullscreenBtn {
    toggleFullscreen() {
        this.btn.addEventListener("click", () => {
            if (this.isFullscreen()) {
                this.removeFullscreenWindow();
                wrapBtn.showWindow();
                mapBtn.showWindow();
            } else {
                this.fullscreenWindow();
                wrapBtn.hideWindow();
                mapBtn.hideWindow();
            }
            window.dispatchEvent(simulationChangeWindow);
        });
        return this;
    }
}

export class FullscreenBtnMap extends FullscreenBtn {
    toggleFullscreen() {
        this.btn.addEventListener("click", () => {
            if (this.isFullscreen()) {
                this.removeFullscreenWindow();
                wrapBtn.showWindow();
                countryBtn.showWindow();
            } else {
                this.fullscreenWindow();
                wrapBtn.hideWindow();
                countryBtn.hideWindow();
            }
            window.dispatchEvent(simulationChangeWindow);
        });
        return this;
    }
}

export class FullscreenBtnTable extends FullscreenBtn {
    toggleFullscreen() {
        this.btn.addEventListener("click", () => {
            if (this.isFullscreen()) {
                wrapBtn.removeFullscreenWindow();
                this.removeFullscreenWindow();
                mapBtn.showWindow();
                countryBtn.showWindow();
                chartBtn.showWindow();
            } else {
                wrapBtn.fullscreenWindow();
                this.fullscreenWindow();
                mapBtn.hideWindow();
                countryBtn.hideWindow();
                chartBtn.hideWindow();
            }
            window.dispatchEvent(simulationChangeWindow);
        });
        return this;
    }
}

export class FullscreenBtnChart extends FullscreenBtn {
    toggleFullscreen() {
        this.btn.addEventListener("click", () => {
            if (this.isFullscreen()) {
                wrapBtn.removeFullscreenWindow();
                this.removeFullscreenWindow();
                mapBtn.showWindow();
                countryBtn.showWindow();
                tableBtn.showWindow();
            } else {
                wrapBtn.fullscreenWindow();
                this.fullscreenWindow();
                mapBtn.hideWindow();
                countryBtn.hideWindow();
                tableBtn.hideWindow();
            }
            window.dispatchEvent(simulationChangeWindow);
        });
        return this;
    }
}

export class FullscreenBtnWrap extends FullscreenBtn {
    constructor(windowName) {
        super(windowName);
        this.window = document.querySelector(windowName);
    }
}