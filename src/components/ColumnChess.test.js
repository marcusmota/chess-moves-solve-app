import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render, configure } from 'enzyme';
import ColumnChess from './ColumnChess';
import React from 'react';
import ReactDOM from 'react-dom';

enzyme.configure({ adapter: new Adapter() });

describe('ColumnChess Component', () => {
    
    const tryToMoveMock = jest.fn();

    const props = {
        className : "test",
        tryToMove : tryToMoveMock,
        position : "A1"
    };

    it('it should match the snapshot', () => {
        const app = shallow(<ColumnChess {...props} />);
        expect(app).toMatchSnapshot();
    });

    it('it should do not move when click on A1 and A4', async () => {
        const wrapped = shallow(<ColumnChess {...props} />);
        wrapped.find("div").first().simulate('click');
        await expect(tryToMoveMock).toHaveBeenCalledWith(props.position);

    })

});
