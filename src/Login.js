import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios' ;
import './Login.css';
import {Redirect} from 'react-router-dom';
import {Register} from './Register';
import {LoginForm} from './LoginComponent';
import AlertContainer from 'react-alert';

export class Login extends Component{
    constructor(props) {
        super(props);
        this.showLoginPassword = this.showLoginPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.state = {
          loginPasswordState: "password",
          stateOfEntry: null,
          user_email: "",
          user_password:"",
          loginStatus: false,
          signInButtonState: true,
          signUpButtonState: false,
          loginErrorMessage: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }
      showDescriptiveError = () => {
        this.msg.error(this.state.loginErrorMessage)
      }
      showAlert = () => {
        this.msg.show('You have been logged in!')
      }
      showError = () => {
        this.msg.error('Oops there is something wrong!')
      }
    handleChangePassword(e){
        this.setState({user_password: e.target.value});
    }
    handleChangeEmail(e){
        this.setState({user_email: e.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:5000/auth/login', {
            user_email: this.state.user_email,
            user_password: this.state.user_password 
          })
          .then(response => {
            if(response.status === 200 ){
                localStorage.setItem('bucketListToken', "Bearer " + response.data["access-token"]);
                this.setState({loginStatus: true});
            }
          })
          .catch(error => {
            if (error.response === undefined){
                this.showError()
            }
            else{
                this.setState({loginErrorMessage: error.response.data["message"]});
                this.showDescriptiveError();
            }

          });
        
    }
    showLoginPassword(){
        const typeOfInput = this.state.loginPasswordState === "password" ? "text" : "password";
        this.setState({loginPasswordState: typeOfInput});
    };
    signUp(){
        this.setState({
            signInButtonState: false,
            signUpButtonState: true
        })
    }
    signIn(){
        this.setState({
            signInButtonState: true,
            signUpButtonState: false
        })
    }
    render(){
    if (this.state.loginStatus === true){
        return <Redirect to="/bucketlist"/>
    };
    if (this.state.signUpButtonState === true){
        return (
        <div>
            <Register signIn={this.signIn} signInButtonState={this.state.signInButtonState} signUp={this.signUp}
             signUpButtonState={this.state.signUpButtonState}/>
        </div> 
            );
    };
    return(
        <div>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <Button id="signIn" onClick={this.signIn} className="btn btn-default" disabled={this.state.signInButtonState}>Sign In</Button>
            <Button id="signUp" onClick={this.signUp}disabled={this.state.signUpButtonState} className="btn btn-default">Sign Up</Button>
            <LoginForm handleSubmit={this.handleSubmit} stateOfEntry={this.state.stateOfEntry}
            loginPasswordState={this.state.loginPasswordState} showLoginPassword={this.showLoginPassword}
            signInButtonState={this.state.signInButtonState} signUpButtonState={this.state.signUpButtonState}
            signUp={this.signUp} signIn={this.signIn} handleChangePassword={this.handleChangePassword} handleChangeEmail={this.handleChangeEmail}
            />
        </div>
    );
    }
}
