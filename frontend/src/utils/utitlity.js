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


export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    // Extract date components
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Extract time components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Format components with leading zeros if necessary
    const monthFormatted = month < 10 ? `0${month}` : month;
    const dayFormatted = day < 10 ? `0${day}` : day;
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
  
    // Return formatted date-time string
    return `${monthFormatted}-${dayFormatted}-${year} ${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  }