import React from 'react';
import {Link} from 'react-router-dom';

function NoSuchPage() {

  return (
    <p>
      <p>
        404 Page Not Found
      </p>
      <Link to='/'>
        Go to main page!
      </Link>
    </p>
  );
}

export default NoSuchPage;
