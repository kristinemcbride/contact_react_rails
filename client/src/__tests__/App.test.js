import React from 'react';
import App from '../App';
import { create } from 'react-test-renderer'

describe('My first snapshot test', () => {
  const jsdomAlert = window.alert;
  window.alert = () => { };
  test('testing app button', () => {
    let tree = create(<App />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})



