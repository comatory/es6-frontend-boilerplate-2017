/* eslint no-undef: [0], "react/react-in-jsx-scope": [0] */
import { App } from '../src/components/App';

describe('App', () => {
  const props = {
    changeBackground: () => {},
    callAsyncAction: () => {},
    background: '#FFF',
  };
  const wrapper = shallow(<App {...props} />);

  it('should render App component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
