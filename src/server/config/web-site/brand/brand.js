import {HttpRequestHub} from "../../../HttpRequestHub";

export const getBrandProducts = (id,sort="LATEST",page = 0, size = 10, minPrice=0, maxPrice=0) => {
    const config = {
        method: 'GET',
        url: `/client/product/brand/${id}/?sort=`+ sort +"&page="+ page + `&size=` + size+"&minPrice="+minPrice+"&maxPrice="+maxPrice,
    }
    return HttpRequestHub(config);
}