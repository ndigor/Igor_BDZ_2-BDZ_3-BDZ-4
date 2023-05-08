const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2YjE1ZThmYmM0NzNmYTg5Y2U1NzYiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMzU4NjE5LCJleHAiOjE3MTM4OTQ2MTl9.79zquAglgG_3kM45B1yt1aDx_WOc1Tm1oIzzQeNmg6o',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : Promise.reject('Что-то пошло не так');
};

class Api {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    /*Получение списка всех позиций*/
    getAllProducts() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    /*Получение информации о пользователе*/
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }
    
    /*Реализация поиска*/
    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            headers: this.headers,
        }).then(onResponse);
    }
    
    
    /*Добавление установки  лайка на позицию*/
    // addLike(id) {
    //   return fetch(`${this.baseUrl}/products/likes/${id}`, {
    //       method: 'PUT',
    //       headers: this.headers,
    //  }).then(onResponse);
    //}
    
    /*Удаление лайка по ID*/
   //  removeLike(id) {
   //     return fetch(`${this.baseUrl}/products/likes/${id}`, {
   //        method: 'DELETE',
   //        headers: this.headers,
   //    }).then(onResponse);
   //  }
}

/*Реализация метода добавления лайка, если позиция не лайкнута, и снятия лайка, если на ней стоит лайк*/
export const api = new Api(config);
export const editLikeCard = (id, cardLiked) => {
    return fetch(`${config.baseUrl}/products/likes/${id}`, {
        method: cardLiked ? 'DELETE' : 'PUT',
        headers: config.headers,
    }).then(onResponse);
};

// export const getAllProducts = (id, cardLiked) => {
//     return fetch(`${config.baseUrl}/products`, {
//         method: 'GET',
//         headers: config.headers,
//     }).then(onResponse);
// };
// export const getOneProduct = (id) => {
//     return fetch(`${config.baseUrl}/products/${id}`, {
//         method: 'GET',
//         headers: config.headers,
//     }).then(onResponse);
// };

// export const addReview = (id, reviewId) => {
//     return fetch(`${config.baseUrl}/products/review/${id}/${reviewId}`, {
//         method: 'POST',
//         headers: config.headers,
//     }).then(onResponse);
// }

// export const removeReview = (id) => {return fetch(`${config.baseUrl}/products/${id}`, {
//     method: 'DELETE',
//     headers: config.headers,
// }).then(onResponse);}

// export const getAllReview = () => {
//     return fetch(`${config.baseUrl}/products/review/`, {
//         method: 'GET',
//         headers: config.headers,
//     }).then(onResponse);
// };

// + GET https://api.react-learning.ru/products/review/:productId
