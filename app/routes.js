import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/Home';
import AddCharacter from './components/AddCharacter';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import Stats from './components/Stats';


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
    <Route path='/shame' component={CharacterList} />
    <Route path='/stats' component={Stats} />
    <Route path=':category' component={CharacterList}>
        <Route path=':race' component={CharacterList}>
            <Route path=':bloodline' component={CharacterList} />
        </Route>
    </Route>
  </Route>
);
