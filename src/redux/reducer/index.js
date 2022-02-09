import {combineReducers} from "redux";
import langReducer from  './langReducer'
import userReducer from "./userReducer";


export const rootReducer = combineReducers({
    lang: langReducer,
    user: userReducer
})
