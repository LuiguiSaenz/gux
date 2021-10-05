import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/home" />;
          }}
        />
        <Route exact path="/" to="/home" />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
