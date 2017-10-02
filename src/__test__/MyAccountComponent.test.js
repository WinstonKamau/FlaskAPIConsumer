import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Redirect } from 'react-router-dom';
import { AccountPage } from '../MyAccountComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  it('contains two menu items', () => {
    const wrapper = shallow(<AccountPage/>);
    expect(wrapper.find('MenuItem')).to.have.length(2);
  });
  it('contains two five buttons', () => {
    const wrapper = shallow(<AccountPage/ >);
    expect(wrapper.find('Button')).to.have.length(5);
  });
  it('Possible to disable the change password button', () => {
    const wrapper = shallow(<AccountPage changePasswordButton={true}/>);
    expect(wrapper.find('Button').get(2)["props"]["disabled"]).to.equal(true);
    const wrapper2 = shallow(<AccountPage changePasswordButton={false} />);
    expect(wrapper2.find('Button').get(2)["props"]["disabled"]).to.equal(false);
  });
  it('assert it redirect if button page is clicked', () => {
    const wrapper = shallow(<AccountPage bucketListPage={true} />);
    expect(wrapper.contains(<Redirect to="/bucketlist" />)).to.equal(true);
  });
  it('assert it redirect if logout is clicked', () => {
    const wrapper = shallow(<AccountPage logoutPage={true} />);
    expect(wrapper.contains(<Redirect to="/" />)).to.equal(true);
  });
  it('assert input disabled is changeable', () => {
    const wrapper = shallow(<AccountPage changePasswordForm={true} />);
    expect(wrapper.find('input').get(0)["props"]["disabled"]).to.equal(true);
    expect(wrapper.find('input').get(1)["props"]["disabled"]).to.equal(true);
    const wrapper2 = shallow(<AccountPage changePasswordForm={false} />);
    expect(wrapper2.find('input').get(0)["props"]["disabled"]).to.equal(false);
    expect(wrapper2.find('input').get(1)["props"]["disabled"]).to.equal(false);
  });
});
