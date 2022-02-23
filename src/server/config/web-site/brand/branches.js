import {HttpRequestHub} from "../../../HttpRequestHub";

export const getBranches = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/client/branch/language/?page=`+page + `&size=` + size,
    }
    return HttpRequestHub(config);
}
export const getBranchId = (id) => {
    const config = {
        method: 'GET',
        url: `/client/branch/language/`+ id,
    }
    return HttpRequestHub(config);
}
export const getBranchProductByProductId = (id) => {
    const config = {
        method: 'GET',
        url: `/client/branch-product/language/`+ id,
    }
    return HttpRequestHub(config);
}
export const getBranchProductByBranchId = (id, page=0,size=10, sort="LATEST",minPrice=0,maxPrice=0) => {
    const config = {
        method: 'GET',
        url: `/client/branch-products/language/`+ id+"?page="+page+"&size="+size+"&sort="+sort+"&minPrice="+minPrice+"&maxPrice="+maxPrice,
    }
    return HttpRequestHub(config);
}