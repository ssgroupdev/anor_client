import {combineReducers} from "redux";
import langReducer from  './langReducer'


export const rootReducer = combineReducers({
    lang: langReducer
})
