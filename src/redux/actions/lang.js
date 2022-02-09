import uz from "./../uz.json"
import ru from "./../ru.json"
import {setHeaders} from "../../server/host";
import {getUser} from "../../server/config/web-site/user";

export const changeLang = (lang="uz") => {

    localStorage.setItem("lang",lang)

    const change = lang==="uz"?uz:ru;
    setHeaders();

    // window.location.reload();

    return {
        type: "CHANGE_LANG",
        payload: change
    }
}

export const setCurrentUser = () => {

    let payload = null

    getUser().then(res=>{
        payload = res.data
    }).catch(err=>{

    })

    return {
        type: "SET_USER",
        payload: payload
    }
}