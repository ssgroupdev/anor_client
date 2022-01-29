import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getNews = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/news/language/?page=` + page + `&size=` + size,
    }
    return HttpRequestHub(config);
}

export const getNewsById = (id) => {
    const config = {
        method: 'GET',
        url: `/client/news/language/`+id,
    }
    return HttpRequestHub(config);
}

export const getQuestionGlobal = () => {
    const config = {
        method: 'GET',
        url: `/question-global/language/`,
    }
    return HttpRequestHub(config);
}

export const createMessage = (obj) => {
    const config = {
        method: 'POST',
        url: `/client/message/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const register = (obj) => {
    const config = {
        method: 'POST',
        url: `/client/register/`,
        data: obj
    }
    return HttpRequestHub(config);
}


export const getProvince = () => {
    const config = {
        method: 'GET',
        url: `/client/province/all`,
    }
    return HttpRequestHub(config);
}

export const getAllProvinces = () => {
    const config = {
        method: 'GET',
        url: `/client/province/all`,
    }
    return HttpRequestHub(config);
}


// export const getQuestionGlobal = () => {
//     const config = {
//         method: 'GET',
//         url: `/client/question-global/?page=` + page + `&size=` + size*2,
//     }
//     return HttpRequestHub(config);
// }

export const getRegion = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/region/?page=` + page + `&size=` + size*2,
    }
    return HttpRequestHub(config);
}

export const getRegionsByProvince = (id) => {
    const config = {
        method: 'GET',
        url: `/client/region/province/`+id,
    }
    return HttpRequestHub(config);
}