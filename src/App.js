import { Link, Router } from '@reach/router';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Details from './Details';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

const App = () => {
  const themeHook = useState('peru');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
