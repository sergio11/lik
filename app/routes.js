import React from 'react';
import {Route,IndexRoute, NotFoundRoute} from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import AddCharacter from './components/AddCharacter/AddCharacter';
import Character from './components/Character/Character';
import CharacterList from './components/CharacterList/CharacterList';
import Stats from './components/Stats/Stats';
import NotFound from './components/NotFound/NotFound';


const AppRouter = (props, context) => {
  context.i18n.culture = 'en';
  return (<App {...props} />);
}

AppRouter.contextTypes = {
    i18n: React.PropTypes.object
};

export default (
  <Route path='/' component={AppRouter}>
    <IndexRoute  component={Home} />
    <Route path='characters/'>
        <IndexRoute  component={Stats} />
        <Route path='stats' component={Stats} />
        <Route path='add' component={AddCharacter} />
        <Route path='shame' component={CharacterList} />
        <Route path=':id' component={Character} />
        <Route path='clasification/:category' component={CharacterList}>
            <Route path=':race' component={CharacterList}>
                <Route path=':bloodline' component={CharacterList} />
            </Route>
        </Route>
    </Route>
    <Route path='*' component={NotFound}/>
  </Route> 
);
