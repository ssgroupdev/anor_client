export default function (state = {}, action) {
    switch (action.type) {
        case "SET_PRODUCT_FOR_ORDER":
            return {...state, products: action.payload}
        default:
            return state
    }
}