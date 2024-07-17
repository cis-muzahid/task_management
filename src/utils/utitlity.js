export const storeTokensInSession = (Authentication) => {
    const accessToken = Authentication.access;
    const refreshToken = Authentication.refresh;
    const id = Authentication.user_id;

    sessionStorage.setItem("usr_1a2b3c", accessToken);
    sessionStorage.setItem("usr_1a2b3r", refreshToken);
    sessionStorage.setItem("user_id", id);

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