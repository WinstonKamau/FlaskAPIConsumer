import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { shallow, } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Account } from '../MyAccount';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  it('save button', () => {
    const pop = { bucketListToken: 'this is awesome' };
    global.localStorage = {
      bucketListToken: '',
      removeItem: function() {
        return ""
      }, getItem: function() {
        return pop["bucketListToken"]
      }
    };
    const wrapper = shallow(<Account />);
    wrapper.instance().handleClick({ target: { name: 'logout' } });
    expect(wrapper.state().logoutPage).to.equal(true);
    });
});