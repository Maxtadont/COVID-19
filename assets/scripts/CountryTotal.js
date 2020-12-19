//import * as Colors from "./global/colors.js";
import {DOMObject} from "./DOMObject.js";

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
    this.titleBlock = new CountryTotalTitle("[data-countryTotal-title]", [ "countryTotal__title" ], this.domElement);
    this.titleBlock.setTitle("Global cases");
    this.valueBlock = new CountryTotalTitle("[data-countryTotal-value]", [ "countryTotal__value" ], this.domElement);
    this.valueBlock.setTitle("000000000");
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
    this.search = new SearchField([ "data-countrySearch-field" ], [ "countrySearch__value" ], this.domElement);
  }
}

export class SearchField extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "input", classes: classes};
    super(`${name}`, domElement);  
  }

  findCountry() {
    //
  }
}

export class CountryTable extends DOMObject {
  constructor (name, classes, parent) {
    const domElement = {parent: parent, blockType: "table", classes: classes};
    super(`${name}`, domElement);

    this.data = [];
    this.rows = [];
  }

  addCoutries(countries) {
    this.data = countries;  
    this.data.forEach(element => {
      if (element.TotalConfirmed > 0) {
        this.rows.push(new CountryRow(`data-countryTable-${element.Country}`, element, this.domElement));        
      }
    });
  }
}

export class CountryRow extends DOMObject {
  constructor (name, datarow, parent) {
    const domElement = {parent: parent, blockType: "tr", classes: [ "countryTable__row" ]};
    super(`${name}`, domElement);
    this.cellCountry = 
      new CountryCell(`data-countryTable-${name}-cellCountry`, [ "countryTable__cellName" ], this.domElement).setValue(datarow.Country);  
    this.cellFlag = 
      new CountryCell(`data-countryTable-${name}-cellFlag`, [ "countryTable__cellFlag" ], this.domElement).setValue(datarow.CountryCode);
    this.cellValue = 
      new CountryCell(`data-countryTable-${name}-cellVlue`, [ "countryTable__cellValue" ], this.domElement);
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

