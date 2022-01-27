import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getProvince = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/province/?page=` + page + `&size=` + size*2,
    }
    return HttpRequestHub(config);
}

export const getAllProvinces = () => {
    const config = {
        method: 'GET',
        url: `/province/all`,
    }
    return HttpRequestHub(config);
}

export const createProvince = (obj) => {
    const config = {
        method: 'POST',
        url: `/province/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const updateProvince = (obj) => {
    const config = {
        method: 'PUT',
        url: `/province/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const deleteProvince = (id) => {
    const config = {
        method: 'DELETE',
        url: `/province/` + id
    }
    return HttpRequestHub(config);
}