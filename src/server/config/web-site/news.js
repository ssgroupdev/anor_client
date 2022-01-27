import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getNews = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/news/?page=` + page + `&size=` + size*2,
    }
    return HttpRequestHub(config);
}

export const createNews = (obj) => {
    const config = {
        method: 'POST',
        url: `/news/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const updateNews = (obj) => {
    const config = {
        method: 'PUT',
        url: `/news/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const deleteNews = (id) => {
    const config = {
        method: 'DELETE',
        url: `/news/` + id
    }
    return HttpRequestHub(config);
}