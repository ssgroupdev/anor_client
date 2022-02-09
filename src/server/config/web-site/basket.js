import {HttpRequestHub} from "../../HttpRequestHub";

export const addProductToBaskets = (obj) => {
    const config = {
        method: 'POST',
        url: `/user/basket/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const editBasket = (obj) => {
    const config = {
        method: 'PUT',
        url: `/user/basket/`,
        data: obj
    }
    return HttpRequestHub(config);
}
export const deleteBasket = (id) => {
    const config = {
        method: 'DELETE',
        url: `/user/basket/`+id
    }
    return HttpRequestHub(config);
}
export const getAllBaskets = () => {
    const config = {
        method: 'GET',
        url: `/user/basket/`
    }
    return HttpRequestHub(config);
}
