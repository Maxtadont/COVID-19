import {key_symbols} from "./global/keys.js";
import {DOMObject} from "./DOMObject.js";
import  * as CountyTotal from "./CountryTotal.js";

export class Keyboard extends DOMObject{
  #key_symbols = key_symbols;
  constructor(name, input, parent) {
    const domElement = {parent: parent, blockType: "div", classes: [ "keyboard" ]};
    super(`${name}`, domElement);
    this.input = input;
    this.keysContainer = null;
    this.keys = []
    this.init();
    this.hide();
    this.capsLock = false;
  }
  
  init() {
    this.keysContainer = new KeysContainer("keyboard-keysContainer", [ "keyboard__keys" ], this.domElement);
    this.createKeys(this.keysContainer, this.input);
    this.keys = document.querySelectorAll(".keyboard__key");
  }

  createKeys(parent, input) {
    const fragment = document.createDocumentFragment();
    for (let key of this.#key_symbols) {
      const keyElementObj = new Key(`${key.keyCode}`, [ "keyboard__key" ], fragment);
      const keyElement = keyElementObj.domElement;
      keyElement.setAttribute("type", "button");            
      keyElement.textContent = key.val;

      switch (key.keyCode) {
        case "Backspace":          
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {            
            input.value = input.value.substring(0, input.value.length - 1); 
            CountyTotal.addFilteredCountries();                                   
          });
          break;
        
        case "Space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.addEventListener("click", () => {          
            input.value += " ";      
            CountyTotal.addFilteredCountries();
          });
          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this.toggleCapsLock();
            this.toggleKeys();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });
          break;
        
        case "Hide":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.addEventListener("click", () => {
            this.hide();
          });
          break;

        default:
          keyElement.addEventListener("click", () => {                        
            input.value += this.getKeyValue(key);
            CountyTotal.addFilteredCountries();
          });
          break;
      }      
      if (key.end_row) {      
        fragment.appendChild(document.createElement("br"));
      }
    }
    parent.domElement.appendChild(fragment);
  }

  getKeyValue(key) {
    if (this.capsLock) {
      return key.val.toUpperCase();      
    } else {
      return key.val;
    }
  }

  toggleKeys() {
    console.log(this.keys.length);
    for (let i = 0; i < this.keys.length; i++) {      
      let key = this.keys[i];
      if (!this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (this.#key_symbols[i].val.toUpperCase() === this.#key_symbols[i].shift_val)
          key.textContent = this.#key_symbols[i].val;
        else
        key.textContent = this.#key_symbols[i].shift_val;
      }
      else if (!this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = this.#key_symbols[i].val.toUpperCase();
        } catch(e) {
          key.textContent = this.#key_symbols[i].val;
        }
      }
      else if (!this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = this.#key_symbols[i].shift_val;
      }
      else if (!this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = this.#key_symbols[i].val;
      }
      else if (this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (this.#key_symbols[i].ru_val.toUpperCase() === this.#key_symbols[i].ru_shift_val)
          key.textContent = this.#key_symbols[i].ru_val;
        else
        key.textContent = this.#key_symbols[i].ru_shift_val;
      }
      else if (this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = this.#key_symbols[i].ru_val.toUpperCase();
        } catch(e) {
          key.textContent = this.#key_symbols[i].ru_val;
        }
      }
      else if (this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = this.#key_symbols[i].ru_shift_val;
      }
      else if (this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = this.#key_symbols[i].ru_val;
      }
    }
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
  }

  hide() {
    this.domElement.classList.add("keyboard--hidden");
  }

  show() {
    this.domElement.classList.remove("keyboard--hidden");
  }

  isHidden() {
    return this.domElement.classList.contains("keyboard--hidden");
  }
}

class KeysContainer extends DOMObject{
  constructor(name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
  }
}

class Key extends DOMObject {
  constructor(name, classes, parent) {
    const domElement = {parent: parent, blockType: "button", classes: classes};
    super(`${name}`, domElement);
  }

  setTitle(text) {
    this.domElement.textContent = text;
  }
}
