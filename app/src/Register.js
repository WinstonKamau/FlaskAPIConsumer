import React, { Component } from 'react';
import axios from 'axios' ;
import {RegisterForm} from './RegisterComponent';

export class Register extends Component{
    constructor(props) {
        super(props);
        this.showPassword = this.showPassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          passwordState: "password",
          passwordValue: '',
          stateOfEntry: null,
          stateOfConfirmEntry: null,
          user_email: "",
          user_password:"",
          capsLock:"",
          userConflictMessage: '',
          userConflictStatus: null,
          registerStateMessage:'' ,
          registerButtonStatus: true,
        }
      }
    handleChange(e){
        this.setState({user_email:e.target.value,})
        if (this.state.userConflictStatus === "error")
            {
            this.setState({
                userConflictMessage:'',
                userConflictStatus: null
            });
            }
    }

    validatePassword(e){
        let passwordEntered = e.target.value;
        if (passwordEntered.length > 6) {
            this.setState({stateOfEntry: "success"});
            this.setState({user_password: e.target.value});
        }
        else this.setState({stateOfEntry:"error"});
    }


    confirmPassword(e){
        let confirmPassword = e.target.value;
        if (confirmPassword === document.getElementById("registerPasswordInput").value && this.state.stateOfEntry === "success"){
            this.setState({stateOfConfirmEntry: "success"});
            this.setState({registerButtonStatus: false});
        }
        else this.setState({stateOfConfirmEntry:"error"});

    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.user_email);
        console.log(this.state.user_password);
        axios.post('http://localhost:5000/auth/register', {
            user_email: this.state.user_email,
            user_password: this.state.user_password 
          })
          .then( response => {
            console.log(response);
            console.log(response.data);
            this.setState({registerState: true});
            this.setState({registerStateMessage: response.data["message"]});
          })
          .catch( error => {
            console.log(error);
            this.setState({
                userConflictStatus: "error",
                userConflictMessage: error.response.data["message"],
            });
          });

    }
    showPassword(){
        const typeOfInput = this.state.passwordState === "password" ? "text" : "password";
        this.setState({passwordState: typeOfInput});
    };
    render(){
        return(
            <div>
                <RegisterForm handleSubmit={this.handleSubmit} userConflictStatus={this.state.userConflictStatus}
                handleChange={this.handleChange} userConflictMessage={this.state.userConflictMessage}
                stateOfEntry={this.state.stateOfEntry} validatePassword={this.validatePassword}
                passwordState={this.state.passwordState} showPassword={this.showPassword} stateOfConfirmEntry={this.state.stateOfConfirmEntry}
                confirmPassword={this.confirmPassword} signIn={this.props.signIn} signInButtonState={this.props.signInButtonState}
                signUp={this.props.signUp} signUpButtonState={this.props.signUpButtonState} registerStateMessage={this.state.registerStateMessage}
                registerButtonStatus={this.state.registerButtonStatus}
                />
            </div>
        );
    };
}



