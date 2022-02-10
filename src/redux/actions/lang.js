import uz from "./../uz.json"
import ru from "./../ru.json"
import {setHeaders} from "../../server/host";
import {getUser} from "../../server/config/web-site/user";

export const changeLang = (lang = "uz") => {

    localStorage.setItem("lang", lang)

    const change = lang === "uz" ? uz : ru;
    setHeaders();

    // window.location.reload();

    return {
        type: "CHANGE_LANG",
        payload: change
    }
}

export const setCurrentUser = () => {

    let payload = null

    getUser().then(res => {
        payload = res.data
    }).catch(err => {

    })

    return {
        type: "SET_USER",
        payload: payload
    }
}


export const setProduct = (list, productId, count) => {


    let items = null;

    let isFind = false;
    list.map(item => {
        if (productId === item.productId) {
            if (count === -1) {
                item.count = (item.count - 1) > 0 ? (item.count - 1) : 1;
            } else {
                item.count = item.count + 1;
            }
            isFind = true;
        }
    });

    if (!isFind) {

        items = {
            productId: productId,
            count: 1
        };
        list = [...list, items]
    }

    localStorage.setItem("basket", JSON.stringify(list))

    return {
        type: "SET_PRODUCT",
        payload: list
    }
}

export const deleteProduct = (list, productId) => {

    let items = [];

    list.map(item => {

        if (productId !== item.productId) {

            items.push(item);

        }

    });

    localStorage.setItem("basket", JSON.stringify(items))

    return {
        type: "DEL_PRODUCT",
        payload: items
    }
}
