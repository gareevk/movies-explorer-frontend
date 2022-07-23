const moviesApiConfig = {
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
}

const mainApiConfig = {
    baseUrl: "moviester.nomoreparties.sbs",
    //baseUrl: "http://localhost:3000"
}

const errorMessage = {
    successRegister: 'Вы успешно зарегистрировались!',
    wentWrong: 'Что-то пошло не так! Попробуйте ещё раз.',
    successUserDataChange: 'Данные пользователя успешно изменены!',
    emailExists: 'Пользователь с таким email уже существует',
    wrongEmailOrPassword: 'Неверный email или пароль',
    incorrectData: 'Переданы некорректные данные'
}

const shortMovieDuration = 53;

const cardsToRender = {
    desktop: 12,
    tablet: 8,
    mobile: 5,
}

const moreCardsToRender = {
    desktop: 3,
    mobile: 2,
}

export { moviesApiConfig, mainApiConfig, errorMessage, shortMovieDuration, cardsToRender, moreCardsToRender };