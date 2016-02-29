import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/Home';
import AddCharacter from './components/AddCharacter';
import Character from './components/Character';


const AppRouter = (props, context) => {
  context.i18n.culture = 'es';
  return (<App {...props} />);
}

AppRouter.contextTypes = {
    i18n: React.PropTypes.object
};

export default (
  <Route path='/' component={AppRouter}>
    <IndexRoute  component={Home} />
    <Route path='/add' component={AddCharacter} />
    <Route path='/characters/:id' component={Character} />
  </Route>
);
