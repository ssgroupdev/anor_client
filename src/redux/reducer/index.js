import {combineReducers} from "redux";
import langReducer from './langReducer'
import userReducer from "./userReducer";
import basketReducer from "./basketReducer";

// basket - {productId, count}

export const rootReducer = combineReducers({
    lang: langReducer,
    user: userReducer,
    basket: basketReducer
})
