import { Link, Router } from '@reach/router';
import React from 'react';
import ReactDOM from 'react-dom';

import Details from './Details';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
