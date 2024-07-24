export const storeTokensInSession = (Authentication) => {
    const accessToken = Authentication.access;
    const refreshToken = Authentication.refresh;

    sessionStorage.setItem("usr_1a2b3c", accessToken);
    sessionStorage.setItem("usr_1a2b3r", refreshToken);
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


export const CreateQueryString = (data) => {
    const params = new URLSearchParams();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach(value => params.append(key, value));
      } else {
        if (data[key]) {
          params.append(key, data[key]);
        }
      }
    }
    return params.toString();
  };