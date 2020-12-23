export class DOMObject {
  constructor(name, element) {
    this.name = this.isNamed(name);
    this.domElement = this.isСorrectElement(element) ? this.createNewElement(element) : null;
  }
  
  isNamed(name){
    if (name === undefined || typeof name !== "string") {
      console.log(`[${name}] I a am a spirit of ${this.constructor.name}`);
      console.log(`[${name}] Give me a name, please`);
      return undefined;
    }
    else {
      return name;
    }
  }

  isСorrectElement(element = null) {
    if (element === null || element === undefined) {
      console.log(`[${this.name}] I need something else, not ${element}`);
      return false;
    }
    else if ("parent" in element && "blockType" in element && "classes" in element) {
      return true;
    }
    else {
      console.log(`[${this.name}] Hmmmm, ${element} has not right properties`);
      return false;
    }
  }

  createNewElement(element) {
    let newElement = document.getElementById(this.name);
    if (newElement !== null) {
      newElement.remove();
    }

    newElement = document.createElement(element.blockType);
    newElement.id = this.name;
    for (let newClass of element.classes) {
    if (newClass !== "")
      newElement.classList.add(newClass);
    }
    element.parent.appendChild(newElement);
    return newElement;
  }

  removeElement() {
    this.domElement.remove();
  }

  hide() {
    this.domElement.style.visibility = "hidden";
  }

  show() {
    this.domElement.style.visibility = "visible";
  }

  isVisible() {
    return this.document.style.visibility === "visible";
  }
}