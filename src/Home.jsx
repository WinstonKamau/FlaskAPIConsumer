import React, { Component } from 'react';
import { Login } from './Login';
import bucketListHomePage from './bucketListHomePage.png';
import './Home.css';

export class HomePage extends Component {
  render() {
    return (
      <div>

        <div className="page-header " >
          <center><h2 id="homeTitle">The BucketList !</h2></center>
        </div>
        <div id="rowTwoColOne">
          <div className="col-md-2 col-sm-2 col-xs-2" />
          <div className="col-md-4 col-sm-4 col-xs-4">
            <img
              src={bucketListHomePage}
              className="img-rounded img-responsive"
              alt="BucketListImage"
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <Login />
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2" />
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <center>
            <footer id="footerMessage">
              The bucketlist lets you create a category of bucket lists from
               which you can create a list of activities.
            </footer>
          </center>
        </div>
      </div>
    );
  }
}


export default HomePage;

