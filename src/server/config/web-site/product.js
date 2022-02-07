import {HttpRequestHub} from '../../HttpRequestHub';

const url = ""

export const getProducts = (sort="LATEST",page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/product/language/?sort=`+ sort +"&page="+ page + `&size=` + size,
    }
    return HttpRequestHub(config);
}
export const getProductById = (id) => {
    const config = {
        method: 'GET',
        url: `/client/product/language/${id}`,
    }
    return HttpRequestHub(config);
}
export const getMenus = () => {
    const config = {
        method: 'GET',
        url: `/client/menu/`,
    }
    return HttpRequestHub(config);
}

export const getCategoriesByMenu = (id) => {
    const config = {
        method: 'GET',
        url: `/client/menu/categories/`+id,
    }
    return HttpRequestHub(config);
}

export const getFAQs = () => {
    const config = {
        method: 'GET',
        url: `/client/category-question/`,
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

export const getBrand = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/brand/language/?page=` + page + `&size=` + size,
    }
    return HttpRequestHub(config);
}

export const getBrandById = (id) => {
    const config = {
        method: 'GET',
        url: `/client/brand/language/`+id,
    }
    return HttpRequestHub(config);
}

export const getQuestionGlobal = () => {
    const config = {
        method: 'GET',
        url: `/client/question-global/language/`,
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