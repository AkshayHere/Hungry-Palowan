import React from 'react';
import { mount, shallow } from 'enzyme'; 
import SearchBar from 'pages/home/components/SearchBar';

describe('SearchBar', () => {
    it('Check "SearchBar" render', () => {
        const component = shallow(<SearchBar />);
        expect(component).toMatchSnapshot();
    });
});


// it('should be possible to activate button with Spacebar', () => {
//     const component = mount(<SearchBar />);  component
//       .find('select#searchOptions').at(0).instance.selected = false;
//       expect(component).toMatchSnapshot();
//     component.unmount();
//   });