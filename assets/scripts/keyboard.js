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
  }

  assignElement(element) {
    this.input = element;
  }

  init() {
    this.keysContainer = new KeysContainer("keyboard-keysContainer", [ "keyboard__keys" ], this.domElement);
  }
}

class KeysContainer extends DOMObject{
  constructor(name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
  }  
}

class Keys extends DOMObject {

}

/*const textArea = document.querySelector(".use-keyboard-input");
const header = document.querySelector(".header");
const cursorElement = "|";

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
    keypress: null
  },

  properties: {
    value: "",
    value2: "",
    capsLock: false,
    shift: false,
    russian: false,
    soundOn: false,
    micOn: false,
    pos: 0,
  },


  initKeyboard() {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    this.elements.main.appendChild(this.elements.keysContainer);

    document.body.appendChild(this.elements.main);
  },

  
  _createKeys() {
    const fragment = document.createDocumentFragment();

    for (let key of key_symbols) 
    {
      const keyElement = document.createElement("button");
  
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      
      switch (key.keyCode) {
        case "Backspace":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            textArea.innerHTML = this.properties.value;            
          });
          break;

        case "Enter":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.properties.value += '\n';
            textArea.innerHTML = this.properties.value;            
          });
          break;

        case "Tab":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.properties.value += '\t';
            textArea.innerHTML = this.properties.value;
          });
          break;

        case "Space":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.properties.value += " ";
            textArea.innerHTML = this.properties.value;
          });
          break;

        case "EngRus":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this._toggleEngRus();
            this._toggleKeys();
            keyElement.classList.toggle("keyboard__key--active", this.properties.russian);  
          });
          break;
        
        case "CapsLock":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this._toggleCapsLock();
            this._toggleKeys();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });
          break;

        case "ShiftLeft":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this._toggleShift();
            this._toggleKeys();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          });
          break;

        case "Sound":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this._toggleSound();
            keyElement.classList.toggle("keyboard__key--active", this.properties.soundOn);
          });
          break;

        case "Mic":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this._toggleMic();
            keyElement.classList.toggle("keyboard__key--active", this.properties.micOn);            
          });
          break;

        case "Hide":
          keyElement.textContent = key.val;
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.close();
          });
          break;

        case "ArrowLeft":
          keyElement.textContent = key.val;
          keyElement.addEventListener("click", () => {
            this._playSound(key);
          });
          break;

        case "ArrowRight":
          keyElement.textContent = key.val;
          keyElement.addEventListener("click", () => {
            this._playSound(key);
          });
          break;

        default:
          keyElement.textContent = key.val;
          keyElement.addEventListener("click", () => {
            this._playSound(key);
            this.properties.value += this._getKeyValue(key);          
            textArea.innerHTML = this.properties.value;
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (key.end_row) {
        fragment.appendChild(document.createElement("br"));
      }
    };

    return fragment;
  },


  _playSound(key) {
    if (this.properties.soundOn) {
      switch (key.keyCode) {
        case "Backspace":
          sndBS.currentTime = 0;
          sndBS.play();
          break;

        case "Enter":
          sndEnter.currentTime = 0;
          sndEnter.play();
          break;

        case "Shift":
          sndShift.currentTime = 0;
          sndShift.play();
          break;
        
        case "CapsLock":
          sndCaps.currentTime = 0;
          sndCaps.play();
          break;

        default:
          if (this.properties.russian) {
            sndRusKey.currentTime = 0;
            sndRusKey.play();
          }
          else {
            sndEngKey.currentTime = 0;
            sndEngKey.play();
          }
          break;
      }
    }
  },
  
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
  },

  _toggleEngRus() {
    this.properties.russian = !this.properties.russian;
  },

  _toggleSound() {
    this.properties.soundOn = !this.properties.soundOn;
  },

  _toggleMic() {
    this.properties.micOn = !this.properties.micOn;
    if (this.properties.micOn) {
      if (!this.properties.russian)
        SR.lang = 'en-US';
      else
        SR.lang = 'ru-RU';
      SR.start();
      console.log('LISTEN START...');
    }
    else {
      SR.stop();
      console.log('LISTEN END...');
    }
  },

  _getKeyValue(key) {
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
  },

  _toggleKeys() {
    for (let i = 0; i < this.elements.keys.length; i++) {
      let key = this.elements.keys[i];
      if (!this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (key_symbols[i].val.toUpperCase() === key_symbols[i].shift_val)
          key.textContent = key_symbols[i].val;
        else
        key.textContent = key_symbols[i].shift_val;
      }
      else if (!this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = key_symbols[i].val.toUpperCase();
        } catch(e) {
          key.textContent = key_symbols[i].val;
        }
      }
      else if (!this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = key_symbols[i].shift_val;
      }
      else if (!this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = key_symbols[i].val;
      }
      else if (this.properties.russian && this.properties.capsLock && this.properties.shift) {
        if (key_symbols[i].ru_val.toUpperCase() === key_symbols[i].ru_shift_val)
          key.textContent = key_symbols[i].ru_val;
        else
        key.textContent = key_symbols[i].ru_shift_val;
      }
      else if (this.properties.russian && this.properties.capsLock && !this.properties.shift) {
        try {
          key.textContent = key_symbols[i].ru_val.toUpperCase();
        } catch(e) {
          key.textContent = key_symbols[i].ru_val;
        }
      }
      else if (this.properties.russian && !this.properties.capsLock && this.properties.shift) {
        key.textContent = key_symbols[i].ru_shift_val;
      }
      else if (this.properties.russian && !this.properties.capsLock && !this.properties.shift) {
        key.textContent = key_symbols[i].ru_val;
      }
    }
  },

  open() {
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.elements.main.classList.add("keyboard--hidden");
  }
};

function keyDown(e) {
  console.log(e.code);
  textArea.focus();
  for (let key of key_symbols) {
    if (e.code === key.keyCode) {
      let idx = key_symbols.indexOf(key);
      console.log(Keyboard.elements.keys[idx]);
      Keyboard.elements.keys[idx].classList.toggle("keyboard__key--pressed");
      Keyboard.elements.keys[idx].click();
    }  
  }
}

function keyUp(e) {
  for (let key of key_symbols) {
    if (e.code === key.keyCode) {
      let idx = key_symbols.indexOf(key);
      Keyboard.elements.keys[idx].classList.toggle("keyboard__key--pressed");
    }  
  }
}

async function animateCursor() {
  const tm = 1000;
  textArea.innerHTML += cursorElement;
  setTimeout(function() {
    if (textArea.innerHTML[textArea.innerHTML.length-1] === cursorElement)
      textArea.innerHTML = textArea.innerHTML.slice(0, textArea.innerHTML.length-1);
  }, Math.round(tm/2));
  setTimeout(animateCursor, tm); 
}

textArea.addEventListener("click", function () {
  Keyboard.open();
});


SR.addEventListener("result", function(e) {
  let text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ');
  console.log(text);
  if (e.results[0].isFinal) {
    textArea.innerHTML += text;
	textArea.innerHTML += "\n";
  }
});

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

animateCursor();*/

