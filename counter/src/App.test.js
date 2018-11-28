import React from 'react';
import Enszyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enszyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory to create shallow wrapperfor App component
 * @param  {object} props={}
 * @param  {object} state=null
 * @param {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);

  if (state) wrapper.setState(state);

  return wrapper;
};
/**
 * @param  {ShallowWrapper} wrapper
 * @param  {string} val
 * @param  {ShallowWrapper}
 */
const findByAttr = (wrapper, val) => {
  return wrapper.find(val)
};

test('renders without crashing', () => {
  const wrapper = setup();

  // console.log(wrapper.debug());
  const appComponent = findByAttr(wrapper, "[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});

test('renders increment & decrement buttons', () => {
  const wrapper = setup();
  const appComponent = findByAttr(wrapper, 'button');
  expect(appComponent.length).toBe(2);
});

test('renders counter display', () => {
  const wrapper = setup();
  const appComponent = findByAttr(wrapper, '#display');
  expect(appComponent.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increment button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter: 7 });

  const button = findByAttr(wrapper, '#increment');

  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByAttr(wrapper, '#display');

  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking decrement button decrements counter display', () => {
  const counter = 4;

  const wrapper = setup(null, { counter: 4});

  const button = findByAttr(wrapper, '#decrement');
  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByAttr(wrapper, '#display');

  expect(counterDisplay.text()).toContain(counter - 1);
});

test('renders error message', () => {
  const wrapper = setup();
  const appComponent = findByAttr(wrapper, '#error');
  expect(appComponent.length).toBe(1);
});

describe('displays error mesaage when user wants to decrement counter bellow 0', () => {
  const counter = 0;

  const wrapper = setup(null, { counter: 0});

  const decrementButton = findByAttr(wrapper, '#decrement');
  const incrementButton = findByAttr(wrapper, '#increment');


  test('error is not display', () => {
    const errorDisplay = findByAttr(wrapper, '#error');
    expect(errorDisplay.text()).toContain('');
  });
  test('error displays', () => {
    decrementButton.simulate('click');
    wrapper.update();

    const errorDisplay = findByAttr(wrapper, '#error');
    expect(errorDisplay.text()).toContain('error counter cannot be less than 0');
  });

  test('error clears when user increment counter', () => {
    incrementButton.simulate('click');
    wrapper.update();

    const errorDisplay = findByAttr(wrapper, '#error');
    expect(errorDisplay.text()).toContain('');
  });

  test('error text color is red', () => {
    const errorDisplay = findByAttr(wrapper, '#error');
    expect(errorDisplay.props().style).toHaveProperty('color', 'red');
  });
});
