import {HttpRequestHub} from "../../HttpRequestHub";

export const addOrder = (obj) => {
    const config = {
        method: 'POST',
        url: `/user/order/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const editOrder = (obj) => {
    const config = {
        method: 'PUT',
        url: `/user/order/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const editStatus = (id, status = "CANCELLED") => {
    const config = {
        method: 'PATCH',
        url: `/user/order/${id}?status=${status}`
    }
    return HttpRequestHub(config);
}

export const deleteOrder = (id) => {
    const config = {
        method: 'DELETE',
        url: `/user/order/` + id
    }
    return HttpRequestHub(config);
}
export const getAllOrdersByUser = (page = 0, size = 8) => {
    const config = {
        method: 'GET',
        url: `/user/order/?page=${page}&size=${size}`
    }
    return HttpRequestHub(config);
}
export const getOrder = (id) => {
    const config = {
        method: 'GET',
        url: `/user/order/${id}`
    }
    return HttpRequestHub(config);
}
export const getOrderPdf = (id) => {
    const config = {
        method: 'GET',
        url: `/user/invoice/${id}`
    }
    return HttpRequestHub(config);
}
