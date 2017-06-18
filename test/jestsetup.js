// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.sinon = sinon;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};