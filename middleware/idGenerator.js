import {PROFILES_DATA} from './dataIO.js'

const USER_MAX = 10e10

export function generatorId(){
    for(let id = 1; id < USER_MAX ; id++){
        if(!(id in PROFILES_DATA)){
            return id;
        }
    }
}