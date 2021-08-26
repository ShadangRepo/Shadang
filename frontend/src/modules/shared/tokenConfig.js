import { getTokenFromLocalStorage } from "../preferences/userPreferences"

const getToken = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
        return "Bearer " + token;
    }
    else {
        //get token from api and store it to local storage
        return null;
    }
}

export { getToken }