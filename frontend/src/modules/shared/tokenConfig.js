import { getTokenFromLocalStorage } from "../preferences/userPreferences"

const getToken = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
        return token;
    }
    else {
        return null;
    }
}

export { getToken }