const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("sec_toc"); //sec_toc stands for secret token
    return token;
}

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("sec_toc", token)
    return true;
}

const clearTokenFromLocalStorage = () => {
    localStorage.removeItem("sec_toc");
    return true;
}

export {
    getTokenFromLocalStorage,
    setTokenToLocalStorage,
    clearTokenFromLocalStorage
};