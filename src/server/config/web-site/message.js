import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getMessage = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/message/?page=` + page + `&size=` + size,
    }
    return HttpRequestHub(config);
}

export const createMessage = (obj) => {
    const config = {
        method: 'POST',
        url: `/message/`,
        data: obj
    }
    return HttpRequestHub(config);
}


export const deleteMessage = (id) => {
    const config = {
        method: 'DELETE',
        url: `/message/` + id
    }
    return HttpRequestHub(config);
}