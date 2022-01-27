
export default function (state={}, action) {
    switch (action.type){
        case "CHANGE_LANG":
            return {...state, lang: action.payload}
        default: return state
    }
}