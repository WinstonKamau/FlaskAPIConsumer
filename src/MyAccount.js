import React, { Component } from 'react';
import axios from 'axios' ;
import AlertContainer from 'react-alert';
import { AccountPage } from './MyAccountComponent.jsx';

export class Account extends Component {
    constructor(props){
        super(props);
        this.showAccountPassword=this.showAccountPassword.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.close=this.close.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            changePasswordForm: true,
            showAccountModal: false,
            passwordAccountState: "password",
            oldPassword:'',
            accountEmail:'',
            bucketListPage: false,
            logoutPage: false,
            errorMessage: '',
            showSave: "hidden",
            changePasswordButton: false,
            newPassword:'',
            confirmPassword:'',
            successMessage:'',
            showClose:"hidden",
            inputValue:""
        }
    }
    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }
    showDescriptiveError = () => {
        this.msg.error(this.state.errorMessage)
    }
    showSuccess = () =>{
        this.msg.success(this.state.successMessage);
    }
    handleClick(event) {
        if ( event.target.id === "passwordButton") {
        this.setState({showAccountModal: true});
        }
        if ( event.target.name === "myBucketLists") {
            this.setState({bucketListPage: true});
        }
        if ( event.target.name === "logout") {
            this.setState({logoutPage: true});
            localStorage.removeItem("bucketListToken");
            axios.post('http://35.185.33.149:8000/auth/logout')
            .then( response => {
            })
            .catch( error => {
                if (error.response === undefined){
                }
                else{
                    this.setState({errorMessage: error.response.data["message"]});
                    this.showDescriptiveError();
                }
            });
        }
        if (event.target.name === "closeButton" ){
            this.setState({
                showSave: "hidden",
                changePasswordButton: false,
                changePasswordForm: true,
                showClose: "hidden",
                newPassword:"",
                confirmPassword: "",
            })
        }
        if (event.target.name === "saveButton" ) {
            axios.post('http://35.185.33.149:8000/auth/login', {
            user_email: this.state.accountEmail,
            user_password: this.state.oldPassword
          })
          .then(response => {
            if(response.status === 200 ){
                this.setState({changePasswordForm: false});
                this.setState({showAccountModal:false});
                this.setState({
                    showSave: "btn btn-primary",
                    showClose: "btn btn-default",
            })
                localStorage.setItem('bucketListToken', "Bearer " + response.data["access-token"]);
                this.setState({changePasswordButton:true})
            }
            else{
                this.showWarningError();
            }
          })
          .catch(error => {
            if (error.response === undefined){
                alert('There is something wrong');
            }
            else{
                this.setState({showAccountModal:true})
                this.setState({errorMessage: error.response.data["message"]});
                this.showDescriptiveError();
            }

          });
            }
    }
    close(event){
        this.setState({ showAccountModal: false,})
    }
    handleChange(event){
        if (event.target.name==="previousPassword")
        {
        this.setState({oldPassword: event.target.value})
        }
        if (event.target.name==="myEmail")
        {
        this.setState({accountEmail: event.target.value})
        }
        if (event.target.id==="newPassword"){
            let newPasswordEntered = event.target.value;
            if (newPasswordEntered.length > 6 ){
            this.setState({newPassword: event.target.value})
            }
        }
        if (event.target.id ==="confirmPassword"){
            this.setState({confirmPassword: event.target.value})
        }
    }
    handleSubmit(event){
        event.preventDefault();
        var token = localStorage.getItem('bucketListToken');
        var authorizationValue = {headers: {'Authorization': token}};
        axios.post('http://35.185.33.149:8000/auth/reset-password', {
            user_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            verify_new_password: this.state.confirmPassword
          }, authorizationValue)
          .then(response => {
              if(response.status === 201){
                  this.setState({
                      showSave: "hidden",
                      changePasswordButton: false,
                      changePasswordForm: true,
                      successMessage: response.data["message"],
                      showClose: "hidden",
                    })
                this.showSuccess();
              }
              else{
                this.setState({errorMessage: response.data["message"]})
                this.showDescriptiveError()
              }
          })
          .catch(error => {
              
              if (error.response === undefined) {
                alert('Oops there is something wrong')
                }
              else{
                this.setState({errorMessage: error.response.data["message"]})
                this.showDescriptiveError()
              }
              
          });

    }
    showAccountPassword(){
        const typeOfInput = this.state.passwordAccountState === "password" ? "text" : "password";
        this.setState({passwordAccountState: typeOfInput});
    }
    render() {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <AccountPage changePasswordForm={this.state.changePasswordForm} handleClick={this.handleClick}
        showAccountModal={this.state.showAccountModal} close={this.close} passwordAccountState={this.state.passwordAccountState}
        showAccountPassword={this.showAccountPassword} handleChange={this.handleChange}
        bucketListPage={this.state.bucketListPage} logoutPage={this.state.logoutPage} showSave={this.state.showSave}
        changePasswordButton={this.state.changePasswordButton} handleSubmit={this.handleSubmit} showClose={this.state.showClose}
        />
      </div>
    )
  }
}
