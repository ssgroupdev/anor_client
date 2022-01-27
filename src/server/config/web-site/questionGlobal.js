import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getQuestionGlobal = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/question-global/?page=` + page + `&size=` + size*2,
    }
    return HttpRequestHub(config);
}

export const createQuestionGlobal = (obj) => {
    const config = {
        method: 'POST',
        url: `/question-global/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const updateQuestionGlobal = (obj) => {
    const config = {
        method: 'PUT',
        url: `/question-global/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const deleteQuestionGlobal = (id) => {
    const config = {
        method: 'DELETE',
        url: `/question-global/` + id
    }
    return HttpRequestHub(config);
}