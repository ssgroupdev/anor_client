import uz from "./../uz.json"
import ru from "./../ru.json"
import {setHeaders} from "../../server/host";

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