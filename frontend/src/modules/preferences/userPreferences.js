const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("sec_toc"); //sec_toc stands for encrypted secret token
    return token;
}

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("sec_toc", token)
    return true;
}

export { getTokenFromLocalStorage, setTokenToLocalStorage };