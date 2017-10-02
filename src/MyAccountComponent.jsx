
import React, { Component } from 'react';
import { Button, Modal, FormGroup, HelpBlock, ControlLabel, Checkbox, DropdownButton, MenuItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './MyAccountComponent.css';

export class AccountPage extends Component {
  render() {
    if (this.props.bucketListPage === true) {
      return <Redirect to="/bucketlist" />;
    }
    if (this.props.logoutPage === true) {
      return <Redirect to="/" />;
    }
    return (
      <div >
        <div className="page-header col-md-12 col-sm-12 col-xs-12" >
          <div className="col-md-5 col-sm-5 col-xs-5" />
          <div className="col-md-5 col-sm-5 col-xs-5">
            <span id="accountTitle">The Bucket List !</span>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2">
            <DropdownButton title="Menu" id="bg-vertical-dropdown-1">
              <MenuItem
                onClick={this.props.handleClick}
                name="myBucketLists"
                eventKey="1"
              >My BucketLists</MenuItem>
              <MenuItem
                onClick={this.props.handleClick}
                eventKey="2"
                name="logout"
              >Logout</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2" >
          <p>My Account</p>
        </div>
        <div className="col-xs-10 col-sm-10 col-md-10" >
          <p>My Account Tasks</p>
          <table className="table" >
            <form className="form-group"method="post" onSubmit={this.props.handleSubmit}>
              <tr >
                <td className="first-column"><strong>New Password</strong></td>
                <td id="tableAccounts">
                  <input
                    required
                    onChange={this.props.handleChange}
                    disabled={this.props.changePasswordForm}
                    type="password"
                    id="newPassword"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td className="first-column"><strong>Confirm Password</strong></td>
                <td>
                  <input
                    required
                    onChange={this.props.handleChange}
                    disabled={this.props.changePasswordForm}
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <Button type="submit" className={this.props.showSave} >Save Changes</Button>
                <Button
                  type="button"
                  onClick={this.props.handleClick}
                  name="closeButton"
                  className={this.props.showClose}
                >Close</Button>
              </tr>
            </form>
            <Button
              disabled={this.props.changePasswordButton}
              id="passwordButton"
              onClick={this.props.handleClick}
            >Change Password</Button>
          </table>
          <Modal show={this.props.showAccountModal} onHide={this.props.close}>
            <Modal.Header>
              <Modal.Title>Login Again to change your password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup validationState={this.props.createStatusForm}>
                <HelpBlock>{this.props.createBucketError}</HelpBlock>
                <ControlLabel >Email </ControlLabel>
                <input name="myEmail" type="email" onChange={this.props.handleChange} required/>
              </FormGroup>
              <FormGroup validationState={this.props.createStatusForm}>
                <HelpBlock>{this.props.createBucketError}</HelpBlock>
                <ControlLabel >Previous Password </ControlLabel>
                <input
                  name="previousPassword"
                  type={this.props.passwordAccountState}
                  onChange={this.props.handleChange}
                  required
                />
              </FormGroup>
              <Checkbox onChange={this.props.showAccountPassword}>Show Password</Checkbox>
            </Modal.Body>
            <Modal.Footer>
              <Button name="closeBucketButton" onClick={this.props.close}>Close</Button>
              <Button
                name="saveButton"
                onClick={this.props.handleClick}
                type="submit"
                bsStyle="primary"
              >Save changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AccountPage;