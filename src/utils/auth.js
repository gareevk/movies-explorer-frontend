//const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://moviester.nomoreparties.sbs';

export const register = (name, email, password) => {
    console.log(`${BASE_URL}/signup/`);
    return fetch(`${BASE_URL}/signup/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                'name': name,
                'password': password, 
                'email': email} )
        }
    )
    .then( res => {
        if (res.status === 201) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); 
    })
}

export const authorize = (email, password) => {
    console.log(`${BASE_URL}/signin`);
    return fetch(`${BASE_URL}/signin`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {'password': password, 'email': email} )
    })
    .then( res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); 
    })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then( res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); 
    })
} 