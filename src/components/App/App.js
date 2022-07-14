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
  const [currentUser, setCurrentUser] = React.useState( {} );
  const history = useHistory();

  
  React.useEffect(() => {
    getUserInfo();
    handleTokenCheck();
    setTimeout( () => {
      console.log(currentUser);
    }, 100);
    
  }, [loggedIn]);
  
 React.useEffect( () => {
    handleTokenCheck();
   
   console.log(currentUser);
 }, [loggedIn]);

  function getUserInfo() {
    mainApi.getUserInfo()
    .then( user => {
        console.log(user);
        setCurrentUser( user.data );
    } )
    .catch( (err) => console.log('Ошибка, загрузка профиля не удалась: '+ err) );
  }
  
  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
    .then( (res) => {
      console.log(res);
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
    console.log(email, password);
    auth.authorize(email, password)
    .then( data => {
      console.log(data.token);
        localStorage.setItem('jwt', data.token);
        return data;
    })
    .then( res => {
        console.log(res);
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
                console.log(data);
                setLoggedIn(true);
                //setCurrentUser(data);
                //setEmail(data.data.email);
                history.push('/movies');
            };
        })
        .catch( err => console.log(err));
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleUpdateUser(name, email) {
    //setSubmitButtonMessage('Сохранение...');
    mainApi.updateUserInfo(name, email)
    .then( (user) => {
        setCurrentUser(user.data);
        //closeAllPopups();
    })
    .catch( err => console.log('Обновление данных пользователя не удалось: ' + err));
    //.finally( () => setSubmitButtonMessage('Сохранить'));
  } 

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    setSuccessSubmitStatus(false);
    setTooltipMessage('');
  }
  console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    
      <div className="app">
        
          <Switch>
              <Route exact path="/">
                  <Main />
              </Route>

              <ProtectedRoute 
                path="/movies" 
                component={Movies}
                loggedIn={loggedIn}
              />
              
              <ProtectedRoute 
                path="/saved-movies" 
                component={SavedMovies}
                loggedIn={loggedIn}
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
