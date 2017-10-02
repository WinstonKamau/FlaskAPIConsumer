import React, { Component } from 'react';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import { shallow, mount, simulate } from 'enzyme'
import { expect } from 'chai';
import { Account } from '../MyAccount';

Enzyme.configure({ adapter: new Adapter() });

describe('<Account />', () => {
  it('changes show account modal to true when clicked', () => {
    const wrapper = mount(<Account />)
    expect(wrapper.state().showAccountModal).to.equal(false);
    wrapper.instance().handleClick({ target: { id: 'passwordButton' } });
    expect(wrapper.state().showAccountModal).to.equal(true);
  });
  it('changes bucketlisT page to true', () => {
    const wrapper = mount(<Account />);
    wrapper.setState({
      showSave: 'btn btn-primary',
      changePasswordButton: true,
      changePasswordForm: false,
      successMessage: 'success',
      showClose: 'btn btn-default',
      newPassword: 'example',
      confirmPassword: 'example1'
    });
    expect(wrapper.state().showSave).to.equal('btn btn-primary');
    expect(wrapper.state().changePasswordButton).to.equal(true);
    expect(wrapper.state().changePasswordForm).to.equal(false);
    expect(wrapper.state().showClose).to.equal('btn btn-default');
    expect(wrapper.state().newPassword).to.equal('example');
    expect(wrapper.state().confirmPassword).to.equal('example1');
    wrapper.instance().handleClick({ target: { name: 'closeButton' } });
    expect(wrapper.state().showSave).to.equal('hidden');
    expect(wrapper.state().changePasswordButton).to.equal(false);
    expect(wrapper.state().changePasswordForm).to.equal(true);
    expect(wrapper.state().showClose).to.equal('hidden');
    expect(wrapper.state().newPassword).to.equal('');
    expect(wrapper.state().confirmPassword).to.equal('');
  });
  it('closes account modal', () => {
    const wrapper = mount(<Account />);
    wrapper.instance().handleClick({ target: { id: 'passwordButton' } });
    expect(wrapper.state().showAccountModal).to.equal(true);
    wrapper.instance().close();
    expect(wrapper.state().showAccountModal).to.equal(false);
  });
  it('handle Change sets old password', () => {
    const wrapper = mount(<Account />);
    wrapper.instance().handleChange({ target: { name: 'previousPassword', value: 'example' } });
    expect(wrapper.state().oldPassword).to.equal('example');
  });
  it('handleChange sets Email', () => {
    const wrapper = mount(<Account />);
    wrapper.instance().handleChange({ target: { name: 'myEmail', value: 'example@email.com' } });
    expect(wrapper.state().accountEmail).to.equal('example@email.com');
  });
  it('handleChange sets newPassword', () => {
    const wrapper = mount(<Account />);
    expect(wrapper.state().newPassword).to.equal('');
    wrapper.instance().handleChange({ target: { id: 'newPassword', value: 'password' } });
    expect(wrapper.state().newPassword).to.equal('password');
  });
  it('handleChange does not set newPassword if it is lower than 6', () => {
    const wrapper = mount(<Account />);
    wrapper.instance().handleChange({ target: { id: 'newPassword', value: 'pas' } });
    expect(wrapper.state().newPassword).to.equal('');
  });
  it('handleChange sets confirm Passowrd', () => {
    const wrapper = mount(<Account />);
    wrapper.instance().handleChange({ target: { id: 'confirmPassword', value: 'password' } });
    expect(wrapper.state().confirmPassword).to.equal('password');
  });
  it('showAccountPassword sets password state', () => {
    const wrapper = mount(<Account />);
    expect(wrapper.state().passwordAccountState).to.equal('password');
    wrapper.instance().showAccountPassword();
    expect(wrapper.state().passwordAccountState).to.equal('text');
  });
//   it('showAccountPassword sets password state', () => {
//     const wrapper = mount(<Account />);
//     wrapper.instance().handleClick({ target: { name: 'saveButton' } });
//   });


});