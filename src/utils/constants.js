const moviesApiConfig = {
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
}

const mainApiConfig = {
    //baseUrl: "moviester.nomoreparties.sbs",
    baseUrl: "http://localhost:3000"
}

const errorMessage = {
    successRegister: 'Вы успешно зарегистрировались!',
    wentWrong: 'Что-то пошло не так! Попробуйте ещё раз.',
    successUserDataChange: 'Данные пользователя успешно изменены!',
}

const shortMovieDuration = 53;

const cardsToRender = {
    desktop: 12,
    tablet: 8,
    mobile: 5,
}

export { moviesApiConfig, mainApiConfig, errorMessage, shortMovieDuration, cardsToRender };