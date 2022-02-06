import {HttpRequestHub} from "../../../HttpRequestHub";

export const getBrandProducts = (id,sort="LATEST",page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/product/brand/${id}/?sort=`+ sort +"&page="+ page + `&size=` + size,
    }
    return HttpRequestHub(config);
}