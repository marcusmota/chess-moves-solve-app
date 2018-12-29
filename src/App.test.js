import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16.3';
import enzyme, { shallow, mount, render, configure } from 'enzyme';

enzyme.configure({ adapter: new Adapter() });

describe('App Component', () => {

  const defaultState = {
    rows : [1,2,3,4,5,6,7,8],
    turns : 2,
    columns : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    cells : { A1: { available: true, highlight: false },
    B1: { available: true, highlight: false },
    C1: { available: true, highlight: false },
    D1: { available: true, highlight: false },
    E1: { available: true, highlight: false },
    F1: { available: true, highlight: false },
    G1: { available: true, highlight: false },
    H1: { available: true, highlight: false },
    A2: { available: true, highlight: false },
    B2: { available: true, highlight: false },
    C2: { available: true, highlight: false },
    D2: { available: true, highlight: false },
    E2: { available: true, highlight: false },
    F2: { available: true, highlight: false },
    G2: { available: true, highlight: false },
    H2: { available: true, highlight: false },
    A3: { available: true, highlight: false },
    B3: { available: true, highlight: false },
    C3: { available: true, highlight: false },
    D3: { available: true, highlight: false },
    E3: { available: true, highlight: false },
    F3: { available: true, highlight: false },
    G3: { available: true, highlight: false },
    H3: { available: true, highlight: false },
    A4: { available: true, highlight: false },
    B4: { available: true, highlight: false },
    C4: { available: true, highlight: false },
    D4: { available: true, highlight: false },
    E4: { available: true, highlight: false },
    F4: { available: true, highlight: false },
    G4: { available: true, highlight: false },
    H4: { available: true, highlight: false },
    A5: { available: true, highlight: false },
    B5: { available: true, highlight: false },
    C5: { available: true, highlight: false },
    D5: { available: true, highlight: false },
    E5: { available: true, highlight: false },
    F5: { available: true, highlight: false },
    G5: { available: true, highlight: false },
    H5: { available: true, highlight: false },
    A6: { available: true, highlight: false },
    B6: { available: true, highlight: false },
    C6: { available: true, highlight: false },
    D6: { available: true, highlight: false },
    E6: { available: true, highlight: false },
    F6: { available: true, highlight: false },
    G6: { available: true, highlight: false },
    H6: { available: true, highlight: false },
    A7: { available: true, highlight: false },
    B7: { available: true, highlight: false },
    C7: { available: true, highlight: false },
    D7: { available: true, highlight: false },
    E7: { available: true, highlight: false },
    F7: { available: true, highlight: false },
    G7: { available: true, highlight: false },
    H7: { available: true, highlight: false },
    A8: { available: true, highlight: false },
    B8: { available: true, highlight: false },
    C8: { available: true, highlight: false },
    D8: { available: true, highlight: false },
    E8: { available: true, highlight: false },
    F8: { available: true, highlight: false },
    H8: { available: true, highlight: false },
    G8: { available: true, highlight: false },
    },
    position : "",
    moves : []
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const app = shallow(<App />);

  const startChessBoard = jest.spyOn(App.prototype, 'startChessBoard');
  const incrementTurns = jest.spyOn(App.prototype, 'incrementTurns');
  const getPiece = jest.spyOn(App.prototype, 'getPiece');
  const decrementTurns = jest.spyOn(App.prototype, 'decrementTurns');
  const getStatusOfCell = jest.spyOn(App.prototype, 'getStatusOfCell');
  const tryToMove = jest.spyOn(App.prototype, 'tryToMove');
  const checkPosition = jest.spyOn(App.prototype, 'checkPosition');

  beforeEach(() => {
    startChessBoard.mockClear();
    incrementTurns.mockClear();
    getPiece.mockClear();
    decrementTurns.mockClear();
    getStatusOfCell.mockClear();
    tryToMove.mockClear();
    checkPosition.mockClear();
  });

  it('it should initialize the `state` with the defaultState', () => {
    expect(app.state()).toEqual(defaultState);
  });

});
