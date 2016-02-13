import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/Home';


const AppRouter = (props, context) => {
  context.i18n.culture = props.params.lang;
  return (<App {...props} />);
}

AppRouter.contextTypes = {
    i18n: React.PropTypes.object
};

export default (
  <Route path='/(:lang)' component={AppRouter}>
    <IndexRoute  component={Home} />
  </Route>
);
