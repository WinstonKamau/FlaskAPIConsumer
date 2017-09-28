import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { HomePage } from './Home';
import { BucketList } from './BucketList';
import './Routes.css';

const Routes = () => (
  <Router>
    <div >
      <Link to="/" />
      <Route exact path="/" component={HomePage} />
      <Route path="/bucketlist/" component={BucketList} />
    </div>
  </Router>
);

export default Routes;
