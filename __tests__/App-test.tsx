/**
 * @format
 */

import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: object) => ({
  ...props
});

it('renders correctly', () => {
  var app = renderer.create(<App />);
  expect(app).toBeDefined()
});

describe("adding a new todo", () => {
  const props = createTestProps({});
  const wrapper = shallow(<App {...props} />);

  describe("setting the todo value", () => {
      var input = wrapper.findWhere(n => n.prop('testID') === 'newTodoInput');
      input.props().onChangeText('Test Todos!');

      wrapper.update();

      input = wrapper.findWhere(n => n.prop('testID') === 'newTodoInput');
      expect(input.props().value).toEqual('Test Todos!');
  });

  it ('should add the new todo value to the list', () => {
    const todoCount = wrapper.findWhere(n => n.prop('testID') == 'todoTitle').length;

    var input = wrapper.findWhere(n => n.prop('testID') === 'newTodoInput');
    input.props().onSubmitEditing();

    wrapper.update();

    const updatedTodoCount = wrapper.findWhere(n => n.prop('testID') == 'todoTitle').length;
    expect(updatedTodoCount).toEqual(todoCount + 1);
  });
});