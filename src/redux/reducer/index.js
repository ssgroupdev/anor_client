import {combineReducers} from "redux";
import langReducer from './langReducer'
import userReducer from "./userReducer";
import basketReducer from "./basketReducer";
import basketOrderReducer from "./basketOrderReducer";

// basket - {productId, count}

export const rootReducer = combineReducers({
    lang: langReducer,
    user: userReducer,
    basket: basketReducer,
    basketOrder: basketOrderReducer
})
