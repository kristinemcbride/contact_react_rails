import React from 'react';
import App from '../App';
import { create } from 'react-test-renderer'

describe('snapshot test', () => {
  const jsdomAlert = window.alert;
  window.alert = () => { };
  test('testing app loading as expected', () => {
    let tree = create(<App />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})



