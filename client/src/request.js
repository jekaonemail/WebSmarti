import axios from 'axios';

const BASE_URL = "https://websmarti.herokuapp.com/api/";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const protectedRequest = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${token}` }
    })
}

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token;

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: { token: `Bearer ${TOKEN}`}
// })
