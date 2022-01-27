import {HttpRequestHub} from '../../HttpRequestHub';

export const getUser = () => {
    const config = {
        method: 'GET',
        url: `/user/me`,
    }
    return HttpRequestHub(config);
}

export const getAddressByUser = (id) => {
    const config = {
        method: 'GET',
        url: `/address/user/` + id,
    }
    return HttpRequestHub(config);
}

export const createUser = (obj) => {
    const config = {
        method: 'POST',
        url: `/admin/user/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const updateUser = (obj) => {
    const config = {
        method: 'PUT',
        url: `/admin/user/`,
        data: obj
    }
    return HttpRequestHub(config);
}

export const getMerchants = () => {
    const config = {
        method: 'GET',
        url: `/users/merchants`,
    }
    return HttpRequestHub(config);
}

export const getRoles = () => {
    const config = {
        method: 'GET',
        url: `/role/all`,
    }
    return HttpRequestHub(config);
}

export const changeStatus = (id) => {
    const config = {
        method: 'PATCH',
        url: `/admin/user/` + id
    }
    return HttpRequestHub(config);
}
export const changePassword = (id, newPassword) => {
    const config = {
        method: 'PATCH',
        url: `/admin/user/password/` + id + "?password=" + newPassword
    }
    return HttpRequestHub(config);
}

export const resetPassword = (obj) => {
    const config = {
        method: 'POST',
        url: `/users/set_password`,
        data: {
            meta: {},
            payload: [{...obj}],
        }
    }
    return HttpRequestHub(config);
}