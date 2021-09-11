const { TokenName, RefreshTokenName } = require("../shared/constants");

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem(TokenName);
    return token;
}

const getRefreshTokenFromLocalStorage = () => {
    const token = localStorage.getItem(RefreshTokenName);
    return token;
}


const setTokenToLocalStorage = (token) => {
    localStorage.setItem(TokenName, token)
    return true;
}

const setRefreshTokenToLocalStorage = (token) => {
    localStorage.setItem(RefreshTokenName, token)
    return true;
}

const clearTokenFromLocalStorage = () => {
    localStorage.removeItem(TokenName);
    return true;
}

const clearRefreshTokenFromLocalStorage = () => {
    localStorage.removeItem(RefreshTokenName);
    return true;
}

export {
    getTokenFromLocalStorage,
    setTokenToLocalStorage,
    clearTokenFromLocalStorage,
    setRefreshTokenToLocalStorage,
    getRefreshTokenFromLocalStorage,
    clearRefreshTokenFromLocalStorage
};