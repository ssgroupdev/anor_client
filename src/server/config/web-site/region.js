import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getRegion = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/region/?page=` + page + `&size=` + size*2,
    }
    return HttpRequestHub(config);
}

export const getRegionsByProvince = (id) => {
    const config = {
        method: 'GET',
        url: `/region/province/`+id,
    }
    return HttpRequestHub(config);
}

export const createRegion = (obj) => {
    const config = {
        method: 'POST',
        url: `/region/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const updateRegion = (obj) => {
    const config = {
        method: 'PUT',
        url: `/region/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const deleteRegion = (id) => {
    const config = {
        method: 'DELETE',
        url: `/region/` + id
    }
    return HttpRequestHub(config);
}