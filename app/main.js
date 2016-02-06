import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
/*
React Router bootstraps the routes from routes.js file,
matches them against a URL, and then executes the appropriate callback handler
*/
import routes from './routes';
/*
We use history to enable HTML5 History API and to programmatically transition between routes.
Routes are now passed in to the <Router> component as children instead of prop
*/
let history = createBrowserHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));

/*
  This file is the entry point for our React application.
  We use it in gulpfile.babel.js where Browserify will traverse the entire tree of dependencies
  and generate the final bundle.js file.
  You will rarely have to touch this file after its initial setup.
*/
