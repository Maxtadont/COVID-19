import {DOMObject} from "./DOMObject.js";

export class CountryBlock extends DOMObject {
  constructor (name, parent) {
    const domElement = {parent: parent, blockType: "div", classes: ["country__globaldata"]};
    super(`${name}`, domElement);
  }
}

export class CountryBlockTitle extends DOMObject {
  constructor(name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
  }

  setTitle(text) {
    this.domElement.textContent = text;
  }
}