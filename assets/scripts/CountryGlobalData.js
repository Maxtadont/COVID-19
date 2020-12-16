import {DOMObject} from "./DOMObject.js";

export class CountryBlock extends DOMObject {
  constructor (name, parent) {
    const domElement = {parent: parent, blockType: "div", classes: ["country__globaldata"]};
    super(`${name}`, domElement);
  }
}

export class CountryBlockTitle extends DOMObject {
  constructor(name, text, parent) {
    const domElement = {parent: parent, blockType: "div", classes: ["country__globaldata__title"]};
    super(`${name}`, domElement);
    this.setTitle(text);
  }

  setTitle(text) {
    this.domElement.textContent = text;
  }
}