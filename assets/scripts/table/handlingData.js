import { codes } from "../maps/countryCodes.js";
import { population } from "./population.js";

export function setNewName(objGlobal) {
    let newObj = {}
    for(let indicator in objGlobal){
        switch(indicator) {
            case "NewConfirmed":
                newObj['Cases per day'] = objGlobal[indicator]
                break;
            case "TotalConfirmed":
                newObj['Cases'] = objGlobal[indicator]
                break
            case "NewDeaths":
                newObj['Deaths per day'] = objGlobal[indicator]
                break;
            case "TotalDeaths":
                newObj['Deaths'] = objGlobal[indicator]
                break
             case "NewRecovered":
                newObj['Recovered per day'] = objGlobal[indicator]
                break;
            case "TotalRecovered":
                newObj['Recovered'] = objGlobal[indicator]
                newObj['Population'] = population.find(item => item['entity'] === 'World')['population ']
                break;
            default:
                return null;
        }
    }
    return newObj
}
export function getMainProperties(objArr) {
    let newObj = objArr.map(item => item = {
        'country': item['Country'],
        'code': item['CountryCode'],
        'Cases per day': item["NewConfirmed"],
        'Cases': item['TotalConfirmed'],
        'Deaths per day': item["NewDeaths"],
        'Deaths': item['TotalDeaths'],
        'Recovered per day': item["NewRecovered"],
        'Recovered': item['TotalRecovered'],
        'Population': parseFloat(findPopulationValue(convertCodeToCode3(item['CountryCode'])))
    })
    return newObj
}

function convertCodeToCode3 (code,arr = codes) {
   const result = arr.find(item => item.code === code)
   if (result !== undefined) {
        return(result.code3)
   } 
}
function findPopulationValue (code3) {
    const result = population.find(item => item.code3 === code3)
    if (result !== undefined) {
        return result['population ']
   } 
}



