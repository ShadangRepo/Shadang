import { getRefreshTokenFromLocalStorage, getTokenFromLocalStorage } from "../preferences/userPreferences"

const getToken = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
        return token;
    }
    else {
        return null;
    }
}

const getRefreshToken = () => {
    const token = getRefreshTokenFromLocalStorage();
    if (token) {
        return token;
    }
    else {
        return null;
    }
}


export { getToken, getRefreshToken }