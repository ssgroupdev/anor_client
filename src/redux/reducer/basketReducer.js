let initialState = {
    basket: localStorage.getItem("basket") !== null&&localStorage.getItem("basket") !== "" ? JSON.parse(localStorage.getItem("basket")) : []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_PRODUCT":
            return {...state, basket: action.payload}
        case "DEL_PRODUCT":
            return {...state, basket: action.payload}
        default:
            return state
    }
}