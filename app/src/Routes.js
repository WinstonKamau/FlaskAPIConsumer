import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import {HomePage} from './Home.js';
import {BucketList} from './BucketList.js';
import './Routes.css';

const Routes = () => (
  <Router>
    <div >
      <Link to="/"></Link>
      <Route exact path="/" component={HomePage}/>
      <Route path="/bucketlist/" component={BucketList}/>
    </div>
  </Router>
)


export default Routes;