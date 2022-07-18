import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import '../../vendor/normalize.css';
import '../../fonts/Inter/inter.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies';
import Account from '../Account/Account';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as auth from '../../utils/auth';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState( false );
  const [successSubmitStatus, setSuccessSubmitStatus] = React.useState( false );
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(localStorage.getItem('isShortFilm') || false);
  const history = useHistory();

  React.useEffect(() => {
    handleTokenCheck();
    getUserInfo();
    handleShortFilmCheckbox();
  }, []);
  
  
  React.useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);
  

  function getUserInfo() {
    mainApi.getUserInfo()
    .then( user => {
        setCurrentUser( user.data );
    } )
    .catch( (err) => console.log('Ошибка, загрузка профиля не удалась: '+ err) );
  }
  
  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
    .then( (res) => {
      if (res) {
        setSuccessSubmitStatus(true);
        setTooltipMessage('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen(true);
        auth.authorize(email, password);
        setLoggedIn(true);
        history.push('/movies');
      } else if (res === undefined) {
        setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setSuccessSubmitStatus(false);
        setIsInfoTooltipOpen(true);
      }
    })
    .catch( err => {
      return err;
    });
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
    .then( data => {
        localStorage.setItem('jwt', data.token);
        return data;
    })
    .then( res => {
        if (res.token) {
            handleTokenCheck();
            setLoggedIn(true);
            history.push('/movies');
        } else {
            setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
            setSuccessSubmitStatus(false);
            setIsInfoTooltipOpen(true);
        }
    })
    .catch(err => {
      console.log(err);
      setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
      setSuccessSubmitStatus(false);
      setIsInfoTooltipOpen(true);
      return err;
    });
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth.checkToken(jwt)
        .then( data => {
            if (data) {
                setLoggedIn(true);
            };
        })
        .catch( err => console.log(err));
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('searchRequest');
    localStorage.removeItem('isShortFilm');
    localStorage.removeItem('movies');
  }

  function handleUpdateUser(name, email) {
    mainApi.updateUserInfo(name, email)
    .then( (user) => {
        setCurrentUser(user.data);
    })
    .catch( err => console.log('Обновление данных пользователя не удалось: ' + err));
  } 

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    setSuccessSubmitStatus(false);
    setTooltipMessage('');
  }

  function handleLikeMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    nameRU,
    nameEN,
    trailerLink,
    thumbnail,
    movieId,
  }) {
    const isSaved = savedMovies.some(i => i.nameRU === nameRU);
    if (!isSaved) {
      mainApi.saveMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        nameRU,
        nameEN,
        trailerLink,
        thumbnail,
        movieId,
      )
      .then( (movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch( err => console.log(err));
    } else {
      const movieToDelete = savedMovies.find((i) => i.nameRU === nameRU);
      handleDeleteMovie(movieToDelete._id);
    }
  }

  async function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
    .then( () => {
      setSavedMovies( state => state.filter( movie => movie._id !== movieId));
    })
    .catch( err => console.log(err));
  }

  async function getSavedMovies() {
    return mainApi.getMovies()
    .then( (movies) => {
        const userMovies = movies.data.filter( movie => movie.owner === currentUser._id );
        setSavedMovies(userMovies);
    })
    .catch( (err) => {
        console.log(err);
        return err;
    } );
  }

  function handleFilterMovies(filterRequest) {
    if (filterRequest) {
      console.log(savedMovies.filter( movie => movie.nameRU.toLowerCase().includes(filterRequest.toLowerCase()) ));
      setFilteredMovies(savedMovies.filter( movie => movie.nameRU.toLowerCase().includes(filterRequest.toLowerCase()) ));
    } else {
      setFilteredMovies(savedMovies);
    }
  }

  const handleShortFilmCheckbox = () => {
    if (isChecked) {
        setIsChecked(false);
    } else {
        setIsChecked(true);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    
      <div className="app">
        
          <Switch>
              <Route exact path="/">
                  <Main 
                    loggedIn={loggedIn}
                  />
              </Route>

              <ProtectedRoute 
                path="/movies" 
                component={Movies}
                loggedIn={loggedIn}
                onLike={handleLikeMovie}
                savedMovies={savedMovies}
                getSavedMovies={getSavedMovies}
                tokenCheck={handleTokenCheck}
                isShortFilm={isChecked}
                onCheckbox={handleShortFilmCheckbox}
              />
              
              <ProtectedRoute 
                path="/saved-movies" 
                component={SavedMovies}
                loggedIn={loggedIn}
                onDelete={handleDeleteMovie}
                savedMovies={savedMovies}
                movies={filteredMovies}
                getMovies={getSavedMovies}
                onFilter={handleFilterMovies}
              />

              <ProtectedRoute 
                path="/profile" 
                name={currentUser.name}
                email={currentUser.email}
                onSignOut={handleSignOut}
                onUserUpdate={handleUpdateUser}
                component={Account}
                loggedIn={loggedIn}
              />

              <Route path="/signup">
                <Register onRegister={handleRegister}/>
              </Route>
              
              <Route path="/sign-in">
                <Login onLogin={handleLogin}/>
              </Route>
              
              <Route path="*">
                <PageNotFound />
              </Route>
          </Switch>
          <InfoTooltip 
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoTooltip}
              submitStatus={successSubmitStatus}
              tooltipMessage={tooltipMessage}
          />
      </div>
      
    </CurrentUserContext.Provider>
  );
}

export default App;
