import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import '../../vendor/normalize.css';
import '../../fonts/Inter/inter.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies';

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
      </Switch>
      
    </div>
  );
}

export default App;
