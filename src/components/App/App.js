import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <div className="app">
      <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Account 
              name='Виталий'
              email='vitalik@ya.ru'            
            />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
      </Switch>
      
    </div>
  );
}

export default App;
