// index.test.js
import Index from '../index.js';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' })
    )).toMatchSnapshot();
  });