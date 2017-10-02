import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Register } from '../Register';

Enzyme.configure({ adapter: new Adapter() });

describe('<Register />', () => {
  it('renders register form once registered', () => {
    const wrapper = shallow(<Register/>)
    expect(wrapper.find('RegisterForm')).to.have.length(1);
  });
  it('renders alert container once registered', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('AlertContainer')).to.have.length(1);
  });
  it('renders bucketlist once registered', () => {
    const wrapper = shallow(<Register />);
    wrapper.setState({ registerState: true });
    expect(wrapper.contains(<Redirect to="/bucketlist" />)).to.equal(true);
  });
});
