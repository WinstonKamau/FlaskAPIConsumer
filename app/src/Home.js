import React, { Component } from 'react';
import {Login} from './Login.js';
import bucketListHomePage from './bucketListHomePage.png';
import './Home.css';
export class HomePage extends Component{
    render(){
        return(
            <div id="rowTwoColOne">
                    <div className="col-md-2 col-sm-2 col-xs-2"  >
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <img src={bucketListHomePage} className="img-rounded img-responsive" alt="BucketListImage"/>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <Login/>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                    </div>

            </div>
        );
    }
}