import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import { mount, simulate } from 'enzyme'
import { expect } from 'chai';
import { Register } from '../Register';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });
 

describe('<Register />', () => {
  it('changes email on change', () => {
    const wrapper = mount(<Register />);
    wrapper.instance().handleChange({ target: { value: 'example@email.com' } });
    expect(wrapper.state().user_email).to.equal('example@email.com');
    expect(wrapper.state().userConflictMessage).to.equal('');
  });
  it('resets error mesages on entry', () => {
    const wrapper = mount(<Register />);
    wrapper.instance().setState({ userConflictStatus: 'error' });
    wrapper.instance().setState({ userConflictMessage: 'error found' });
    expect(wrapper.state().userConflictMessage).to.equal('error found');
    expect(wrapper.state().userConflictStatus).to.equal('error');
    wrapper.instance().setState({ userConflictStatus: 'error' });
    wrapper.instance().handleChange({ target: { value: 'example@email.com' } });
    expect(wrapper.state().user_email).to.equal('example@email.com');
    expect(wrapper.state().userConflictMessage).to.equal('');
    expect(wrapper.state().userConflictStatus).to.equal(null);
  });
  it('Change state of password entry to succes if length is greater than six', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfEntry).to.equal(null);
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().stateOfEntry).to.equal('success');
  });
  it('State of entry is on error if length is not more than six', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfEntry).to.equal(null);
    wrapper.instance().validatePassword({ target: { value: 'exampl' } });
    expect(wrapper.state().stateOfEntry).to.equal('error');
  });
  it('User password is set if length is greater than six', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().user_password).to.equal('');
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().user_password).to.equal('example1');
  });
  it('User password is not set if length is lower than six', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().user_password).to.equal('');
    wrapper.instance().validatePassword({ target: { value: 'exampl' } });
    expect(wrapper.state().user_password).to.equal('');
  });
  it('Confirm entry is set if password is correct and equal to confirm password', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfEntry).to.equal(null);
    wrapper.instance().setState({ theConfirmPassword: 'example1' });
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().stateOfEntry).to.equal('success');
  });
  it('Register button is set to visible after successful entry', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    wrapper.instance().setState({ theConfirmPassword: 'example1' });
    expect(wrapper.state().theConfirmPassword).to.equal('example1');
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().registerButtonStatus).to.equal(false);
    expect(wrapper.state().stateOfConfirmEntry).to.equal('success');
  });
  it('State of entry is set to success after successful entry', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    wrapper.instance().setState({ theConfirmPassword: 'example1' });
    expect(wrapper.state().theConfirmPassword).to.equal('example1');
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().stateOfConfirmEntry).to.equal('success');
  });
  it('Register button and stateOf entry do not change if confirm password is not set', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    expect(wrapper.state().stateOfConfirmEntry).to.equal('error');
  });
  it('State of entry set to error id password is not longer than six', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfEntry).to.equal(null);
    wrapper.instance().validatePassword({ target: { value: 'exampl' } });
    expect(wrapper.state().stateOfEntry).to.equal('error');
  });
  it('State of confirm entry set to error and register button back to disabled if they do not match', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    wrapper.instance().setState({ theConfirmPassword: 'example1' });
    expect(wrapper.state().theConfirmPassword).to.equal('example1');
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    expect(wrapper.state().registerButtonStatus).to.equal(false);
    expect(wrapper.state().stateOfConfirmEntry).to.equal('success');
    wrapper.instance().validatePassword({ target: { value: 'exam' } });
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    expect(wrapper.state().stateOfConfirmEntry).to.equal('error');
  });
  it('State of confirm entry is error if confirm password does not match password or entry state is not success', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().stateOfEntry).to.equal(null);
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    wrapper.instance().confirmPassword({ target: { value: 'exampl' } });
    expect(wrapper.state().stateOfConfirmEntry).to.equal('error');
  });
  it('State of confirm entry and button changes on successful entries', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().user_password).to.equal('');
    expect(wrapper.state().stateOfConfirmEntry).to.equal(null);
    expect(wrapper.state().registerButtonStatus).to.equal(true);
    wrapper.instance().validatePassword({ target: { value: 'example1' } });
    wrapper.instance().confirmPassword({ target: { value: 'example1' } });
    expect(wrapper.state().stateOfConfirmEntry).to.equal('success');
    expect(wrapper.state().registerButtonStatus).to.equal(false);
  });
  it('Show password changes the passwordState', () => {
    const wrapper = mount(<Register />);
    expect(wrapper.state().passwordState).to.equal('password');
    wrapper.instance().showPassword();
    expect(wrapper.state().passwordState).to.equal('text');
    wrapper.instance().showPassword();
    expect(wrapper.state().passwordState).to.equal('password');
  });
  it('handleSubmit is called', () => {
    global.localStorage = {
      bucketListToken: '',
      removeItem: function() {
        return ""
      }, getItem: function() {
        return pop["bucketListToken"]
      }
    };
    sinon.spy(Register.prototype, 'handleSubmit');
    const wrapper = mount(<Register />);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(Register.prototype.handleSubmit.calledOnce).to.equal(true);
  });
});