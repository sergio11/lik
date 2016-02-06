import React from 'react';
import {Route} from 'react-router';
import App from './components/app';
import Home from './components/Home';
import Rosetta from '@schibstedspain/rosetta';
import Polyglot from '@schibstedspain/rosetta/lib/adapters/polyglot';
import languages from './languages';

const i18n = new Rosetta({adapter: new Polyglot()});
i18n.setTranslationsSilent(languages['en']);
i18n.addToContext(Route, languages);

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
  </Route>
);
