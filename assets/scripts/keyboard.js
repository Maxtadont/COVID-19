import {key_symbols} from "./global/keys.js";
import {DOMObject} from "./DOMObject.js";

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
    this.properties = {
      value: "",
      value2: "",
      capsLock: false,
      shift: false,
      russian: false,
      soundOn: false,
      micOn: false,
      pos: 0
    }
  }
  
  init() {
    this.keysContainer = new KeysContainer("keyboard-keysContainer", [ "keyboard__keys" ], this.domElement);
    this.createKeys(this, this.input);
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
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            input.value = this.properties.value;            
          });
          break;
        
        case "Tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            this.properties.value += '\t';
            input.value = this.properties.value;
          });
          break;

        case "Space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            input.value = this.properties.value;
          });
          break;

        case "EngRus":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this.toggleEngRus();
            keyElement.classList.toggle("keyboard__key--active", this.properties.russian);  
          });
          break;
        
        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this.toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });
          break;

        case "ShiftLeft":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this.toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
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
            this.properties.value += this.getKeyValue(key);          
            input.value = this.properties.value;
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
    if (!this.properties.russian && this.properties.capsLock && this.properties.shift) {
      if (key.val.toUpperCase() === key.shift_val)
        return key.val;
      else
        return key.shift_val;
    }
    else if (!this.properties.russian && this.properties.capsLock && !this.properties.shift) {
      return key.val.toUpperCase();
    }
    else if (!this.properties.russian && !this.properties.capsLock && this.properties.shift) {
      return key.shift_val;
    }
    else if (!this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
      return key.val;
    }
    else if (this.properties.russian && this.properties.capsLock && this.properties.shift) {
      if (key.ru_val.toUpperCase() === key.ru_shift_val)
        return key.ru_val;
      else
        return key.ru_shift_val;
    }
    else if (this.properties.russian && this.properties.capsLock && !this.properties.shift) {
      return key.ru_val.toUpperCase();
    }
    else if (this.properties.russian && !this.properties.capsLock && this.properties.shift) {
      return key.ru_shift_val;
    }
    else if (this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
      return key.ru_val;
    }  
  }

  toggleKeys() {
    for (let i = 0; i < this.elements.keys.length; i++) {
      let key = this.elements.keys[i];
      if (!this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (en_keys[i].val.toUpperCase() === en_keys[i].shift_val)
          key.textContent = en_keys[i].val;
        else
        key.textContent = en_keys[i].shift_val;
      }
      else if (!this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = en_keys[i].val.toUpperCase();
        } catch(e) {
          key.textContent = en_keys[i].val;
        }
      }
      else if (!this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = en_keys[i].shift_val;
      }
      else if (!this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = en_keys[i].val;
      }
      else if (this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (en_keys[i].ru_val.toUpperCase() === en_keys[i].ru_shift_val)
          key.textContent = en_keys[i].ru_val;
        else
        key.textContent = en_keys[i].ru_shift_val;
      }
      else if (this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = en_keys[i].ru_val.toUpperCase();
        } catch(e) {
          key.textContent = en_keys[i].ru_val;
        }
      }
      else if (this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = en_keys[i].ru_shift_val;
      }
      else if (this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = en_keys[i].ru_val;
      }
    }
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
  }

  toggleShift() {
    this.properties.shift = !this.properties.shift;
  }

  toggleEngRus() {
    this.properties.russian = !this.properties.russian;
  }

  hide() {
    this.domElement.classList.add("keyboard--hidden");
  }

  show() {
    this.domElement.classList.remove("keyboard--hidden");
  }

  isVisible() {
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
