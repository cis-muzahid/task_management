export const storeTokensInSession = (Authentication) => {
    const accessToken = Authentication.access;
    sessionStorage.setItem("usr_1a2b3c", accessToken);
    return true
}


export const getAccessTokenSession = () => {
    const accessToken = sessionStorage.getItem("usr_1a2b3c");
    // const refreshToken = sessionStorage.getItem("usr_4d5e6f");
    return accessToken;
}


export const removeTokensSession = () => {
    sessionStorage.removeItem('usr_1a2b3c');
}