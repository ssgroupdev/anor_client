import uz from "./../uz.json"
import ru from "./../ru.json"

export const changeLang = (lang="uz") => {

    const change = lang==="uz"?uz:ru;

    localStorage.setItem("lang",lang)

    return {
        type: "CHANGE_LANG",
        payload: change
    }
}