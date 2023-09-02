export const BASE_URL = "https://api.zhukoffdmi.nomoreparties.co";

const getJson = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const signIn = (userData) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password
        })
    })
        .then(res => getJson(res))
        .then((data) => {
            if (data.token) {
                return data;
            } else {
                return;
            }
        })
}

export const signUp = (userData) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
    })
        .then(res => getJson(res))
}
// name, email, password
// 'name': name, 'email': email, 'password': password,


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => getJson(res))
}
