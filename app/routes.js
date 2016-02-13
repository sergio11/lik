import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/Home';
import Rosetta from '@schibstedspain/rosetta';
import Polyglot from '@schibstedspain/rosetta/lib/adapters/polyglot';
import languages from './languages';

const i18n = new Rosetta({adapter: new Polyglot()});
i18n.languages = languages;
i18n.culture = 'es';
i18n.addToContext(Route,languages);

const AppRouter = (props, context) => {
  context.i18n.culture = props.params.lang;
  return (<App {...props} />);
}

export default (
  <Route path='/(:lang)' component={AppRouter}>
    <IndexRoute  component={Home} />
  </Route>
);
