const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("en_sec_toc"); //en_sec_toc stands for encrypted secret token
    return token;
}

const setTokenToLocalStorage = (token) => {
    localStorage.setItem("en_sec_toc", token)
    return true;
}

export { getTokenFromLocalStorage, setTokenToLocalStorage };