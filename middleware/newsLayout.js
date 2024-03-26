import {PROFILES_DATA} from "./dataIO.js";
import {sortArrayOfEntriesByDate} from "./newsSotr.js";


export function newsLayout(id) {
    let newsList = [];
    for (let key of PROFILES_DATA[id].friends) {
        for (let news of PROFILES_DATA[key].news) {
            newsList.push([news, PROFILES_DATA[key].name])
        }
    }
    for (let news of PROFILES_DATA[id].news) {
        newsList.push([news, PROFILES_DATA[id].name])
    }
    return sortArrayOfEntriesByDate(newsList)
}