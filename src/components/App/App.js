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
import { errorMessage, shortMovieDuration } from '../../utils/constants';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState( false );
  const [successSubmitStatus, setSuccessSubmitStatus] = React.useState( false );
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(() => {
    if (localStorage.getItem('isShortFilm') === 'true') {
      return true;
    } else {
      return false
    }
  });
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = React.useState(() => {
    if (localStorage.getItem('isShortFilmSavedMovie') === 'true') {
      return true;
    } else {
      return false
    }
  });
  const history = useHistory();

  React.useEffect(() => {
    handleTokenCheck();
    getUserInfo();
  }, []);  
  
  React.useEffect(() => {
    handleTokenCheck();
    getUserInfo();
  }, [loggedIn]);

  const updateIsChecked = () => {
    if (localStorage.getItem('isShortFilm')) {
      setIsChecked(localStorage.getItem('isShortFilm'));
    } else {
      setIsChecked(false)
    }
  }

  const getUserInfo = () => {
    mainApi.getUserInfo()
    .then( user => {
      setCurrentUser( user.data );
    } )
    .catch( (err) => console.log('Ошибка, загрузка профиля не удалась: '+ err) );
  }
  
  const handleRegister = ({ name, email, password }) => {
    auth.register(name, email, password)
    .then( (res) => {
      if (res) {
        setSuccessSubmitStatus(true);
        setTooltipMessage(errorMessage.successRegister);
        setIsInfoTooltipOpen(true);
        auth.authorize(email, password)
          .then( data => {
            localStorage.setItem('jwt', data.token);
            return data;
          })
          .then(() => {
            setLoggedIn(true);
            history.push('/movies');
          })
          .catch( err => console.log(err));        
      } else if (res === undefined) {
        setTooltipMessage(errorMessage.wentWrong);
        setSuccessSubmitStatus(false);
        setIsInfoTooltipOpen(true);
      }
    })
    .catch( err => {
      return err;
    });
  }

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === null) {
      localStorage.setItem('loggedIn', false);
    } else {
      localStorage.setItem('loggedIn', loggedIn);
    }
  }, [loggedIn]);

  const handleLogin = ({ email, password }) => {
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
            setTooltipMessage(errorMessage.wentWrong);
            setSuccessSubmitStatus(false);
            setIsInfoTooltipOpen(true);
        }
    })
    .catch(err => {
      console.log(err);
      setTooltipMessage(errorMessage.wentWrong);
      setSuccessSubmitStatus(false);
      setIsInfoTooltipOpen(true);
      return err;
    });
  }

  const handleTokenCheck = () => {
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

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('searchRequest');
    localStorage.removeItem('isShortFilm');
    localStorage.removeItem('movies');
    localStorage.removeItem('filterRequest');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isShortFilmSavedMovie');
    localStorage.removeItem('moviesSearch');
    localStorage.removeItem('request');
  }

  const handleUpdateUser = (name, email) => {
    mainApi.updateUserInfo(name, email)
    .then( (user) => {
        setCurrentUser(user.data);
        return user.data;
    })
    .then(() => {
        setTooltipMessage(errorMessage.successUserDataChange);
        setSuccessSubmitStatus(true);
        setIsInfoTooltipOpen(true);
    })
    .catch( err => {
        console.log('Обновление данных пользователя не удалось: ' + err);
        setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setSuccessSubmitStatus(false);
        setIsInfoTooltipOpen(true);
    });
  } 

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
    setSuccessSubmitStatus(false);
    setTooltipMessage('');
  }

  const handleLikeMovie = ({
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
  }) => {
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

  const handleDeleteMovie = (movieId) => {
    mainApi.deleteMovie(movieId)
    .then( () => {
      setSavedMovies( state => state.filter( movie => movie._id !== movieId));
    })
    .catch( err => console.log(err));
  }

  const getSavedMovies = () => {
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

  React.useEffect(() => {
    getSavedMovies();
  }, [currentUser]);

  const handleFilterMovies = (filterRequest) => {
    let filterMovies;
    if (filterRequest) {
      filterMovies = savedMovies.filter( movie => movie.nameRU.toLowerCase().includes(filterRequest.toLowerCase()) );
      if (isCheckedSavedMovies) {
        setFilteredMovies(filterMovies.filter( movieItem => movieItem.duration < shortMovieDuration ));
      } else {
        setFilteredMovies(filterMovies);
      }
    } else {
      if (isCheckedSavedMovies) {
        setFilteredMovies(savedMovies.filter( movieItem => movieItem.duration < shortMovieDuration ));
      } else {
        setFilteredMovies(savedMovies);
      }
    }
  }

  const handleShortFilmCheckbox = () => {
    if (isChecked) {
        setIsChecked(false);
    } else {
        setIsChecked(true);
    }
  }

  const handleShortFilmCheckboxSavedMovies = () => {
    if (isCheckedSavedMovies) {
        setIsCheckedSavedMovies(false);
    } else {
        setIsCheckedSavedMovies(true);
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
                updateIsChecked={updateIsChecked}
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
                onCheckbox={handleShortFilmCheckboxSavedMovies}
                isShortFilm={isCheckedSavedMovies}
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
                <Register onRegister={handleRegister} loggedIn={loggedIn}/>
              </Route>
              
              <Route path="/sign-in">
                <Login onLogin={handleLogin} loggedIn={loggedIn}/>
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
