import {DOMObject} from "./DOMObject.js";
import * as MainElements from "../../main.js";
import {globalDataType} from "../../main.js";
import {globalTotalData} from "../../main.js";

export function addFilteredCountries() {
  const curDataType = globalDataType.getDataType(MainElements.totalBlock.titleBlock.domElement.textContent);
  const filter = globalTotalData.filterCountries(MainElements.searchField.searchInput.domElement.value);
  if (filter.length !== 0 ) {
    MainElements.totalTable.removeCountries(); 
    MainElements.totalTable.addCountries(filter, curDataType);
  } else {
    MainElements.totalTable.addCountries(globalTotalData.getCountries(), curDataType);  
  }
}

function nextDataType() {
  const nextType = globalDataType.getNextType(MainElements.totalBlock.titleBlock.domElement.textContent);
  const curDataTotal = globalTotalData.getTotal();
  MainElements.totalBlock.setDataType(nextType, curDataTotal[`${nextType.type}`]);
  addFilteredCountries();
}

function pointChartAndMapData(element) {
  const attribute = element.getAttribute("code2");
  const title = document.getElementById("data-countryTotal-title").textContent;
  const dataType = globalDataType.getDataType(title);
  if (attribute !== null) {
    MainElements.mapArea.chooseCountry(attribute); 
    MainElements.newChart.getChart(attribute, dataType.code); 
  }
}

function toggleVirtualKeyBoard() {
  if (MainElements.keyboard.isHidden()) {
    MainElements.keyboard.show();
  } else {
    MainElements.keyboard.hide();    
  }
}

export class Container extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
    this.childs = [];
  }
}

export class CountryBlock extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
    this.titleBlock = new CountryTotalTitle("data-countryTotal-title", [ "countryTotal__title" ], this.domElement);
    this.valueBlock = new CountryTotalTitle("data-countryTotal-value", [ "countryTotal__value" ], this.domElement);
    this.domElement.addEventListener("click", (event) => {      
      nextDataType(event.target);
    });
  }

  setDataType(dataType, value) {
    this.titleBlock.setTitle(dataType.globalTitle);
    this.titleBlock.setTextColor(dataType.color);
    this.valueBlock.setTitle(value);
    this.valueBlock.setTextColor(dataType.color);
  }
}

export class CountryTotalTitle extends DOMObject {
  constructor(name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);
  }

  setTitle(text) {
    this.domElement.textContent = text;
  }

  setTextColor(color) {
    this.domElement.style.color = color;
  }
}

export class SearchBlock extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "div", classes: classes};
    super(`${name}`, domElement);  
    this.searchInput = new SearchField("data-countrySearch-field", [ "countrySearch__value" ], this.domElement);
    this.searchKbdButon = new SearchKeyBoardButton("data-countrySearch-btn", [ "countrySearch__btn" ], this.domElement);
  }
}

export class SearchField extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "input", classes: classes};
    super(`${name}`, domElement);
    
    this.domElement.addEventListener("input", () => { 
      addFilteredCountries();
    });
  }
}

export class SearchKeyBoardButton extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "button", classes: classes};
    super(`${name}`, domElement);
    this.domElement.innerHTML = "<i class=\"fas fa-keyboard\"></i>";
    this.domElement.addEventListener("click", () => {
      toggleVirtualKeyBoard();
    });
  }  
}

export class CountryTable extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "table", classes: classes};
    super(`${name}`, domElement);
    this.data = [];
    this.rows = [];

    this.domElement.addEventListener("click", (event) => {      
      pointChartAndMapData(event.target);
    });
  }

  removeCountries() {
    var hasChild = this.domElement.firstChild;
    while(hasChild) {
        this.domElement.removeChild(hasChild);
        hasChild = this.domElement.firstChild;
    }
  }

  addCountries(countries, dataType) {
    this.data = countries;
    this.data.sort((a, b) => {
      return b[`${dataType.type}`] - a[`${dataType.type}`];
    });  
    this.data.forEach(element => {
      if (element[`${dataType.type}`] > 0) {
        const dataRow = {"data": element, "type": `${dataType.type}`};
        this.rows.push(new CountryRow(`data-countryTable-${element.Country}`, dataRow, this.domElement));        
        const currentRow = document.getElementById(`data-countryTable-${element.Country}`);
        if (currentRow !== null) {
          currentRow.setAttribute("code2", element.CountryCode);
        }
      }
    });
  }
}

export class CountryRow extends DOMObject {
  constructor (name, datarow, parent) {
    const domElement = {parent: parent, blockType: "tr", classes: [ "countryTable__row" ]};
    super(`${name}`, domElement);
    this.cellCountry = 
      new CountryCell(`${name}-cellCountry`, [ "countryTable__cellName" ], this.domElement).setValue(datarow.data.Country);
    this.setCodeAttribute(`${name}-cellCountry`, datarow.data.CountryCode);
    
    this.cellFlag = 
      new CountryCell(`${name}-cellFlag`, [ "countryTable__cellFlag" ], this.domElement);
    this.setCodeAttribute(`${name}-cellFlag`, datarow.data.CountryCode);
    
    this.cellValue = 
      new CountryCell(`${name}-cellValue`, [ "countryTable__cellValue" ], this.domElement).setValue(datarow.data[`${datarow.type}`]);
    this.setCodeAttribute(`${name}-cellValue`, datarow.data.CountryCode);
    
    const cellFlagIn = document.getElementById(`${name}-cellFlag`);    
    if (cellFlagIn !== undefined) {
      this.imgFlag = 
      new CountryFlagImage(`data-countryTable-${name}-cellImg`, `https://www.countryflags.io/${datarow.data.CountryCode}/flat/64.png`, cellFlagIn);
    }
    this.setCodeAttribute(`data-countryTable-${name}-cellImg`, datarow.data.CountryCode);
  }

  setCodeAttribute(name, atribute) {
    const domElement = document.getElementById(name); 
    domElement.setAttribute("code2", atribute);
  }
}

export class CountryCell extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "td", classes: classes};
    super(`${name}`, domElement);
  }

  setValue(celldata) {
    this.domElement.textContent = celldata;
  }

  setTextColor(color) {
    this.domElement.style.color = color;
  }
}

export class CountryFlagImage extends DOMObject {
  constructor(name, url, parent) {
    const domElement = {parent: parent, blockType: "img", classes: [ "countryTable__cellFlag__img" ]};
    super(`${name}`, domElement);
    this.domElement.src = url;
  }
}

