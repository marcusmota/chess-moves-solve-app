import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Adapter from 'enzyme-adapter-react-16.3';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render, configure } from 'enzyme';
import * as chessRepository from './repository/chessRepository';
import ColumnChess from './components/ColumnChess';
import { wrap } from 'module';

enzyme.configure({ adapter: new Adapter() });

describe('App Component', () => {

  const defaultState = {
    rows : [1,2,3,4,5,6,7,8],
    turns : 2,
    columns : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    cells : { 
      A1: { available: true, highlight: false },
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
  const componentDidMount = jest.spyOn(App.prototype, 'componentDidMount');

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

  it('it should match the snapshot', () => {
        
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });


  describe('lifeCycle Methods', () => {

    it('it should initialize starting the chess board', async () => {
        const mounted = mount(<App />);
        await expect(componentDidMount).toHaveBeenCalled();
        await expect(startChessBoard).toHaveBeenCalled();
        expect(app.state()).toEqual(defaultState);
    }); 

  })

  it('it should get available moves when the position is set to A1 and click on decrement turns (1 turns)', async() => {
    
    const tmp = shallow(<App />)

    const moves = [["A2","A3","B3"],["B1","C1","C2"]];

    chessRepository.getAvailableMovesByPosition = jest.fn(() => Promise.resolve({data : moves}));

    await tmp.setState({position : 'A1'})
    tmp.find('#btn-check-decrement-turns').simulate('click');
    expect(decrementTurns).toHaveBeenCalled();
    await expect(tmp.state().turns).toEqual(1)
    await expect(checkPosition).toHaveBeenCalled();
    await expect(startChessBoard).toHaveBeenCalled();
    await expect(chessRepository.getAvailableMovesByPosition).toHaveBeenCalledTimes(1);
    await expect(tmp.state().moves.length).toEqual(moves.length);

    moves.forEach((v) => {
      expect(tmp.state().cells[v[v.length-1]]).toEqual({available:true, highlight: true});
    })

  })

  it('it should get available moves when the position is set to A1 and click Tip me! button with 2 turns set', async() => {
    
    const tmp = shallow(<App />)

    const moves = [["B4","B5","C5"],["B4","B5","A5"],["B2","B1","C1"],["B2","B1","A1"],["C3","D3","D4"],["C3","D3","D2"],["C3","C4","D4"],["C3","C4","B4"],["B2","A2","A3"],["B2","A2","A1"],["D2","E2","E3"],["D2","E2","E1"]];

    chessRepository.getAvailableMovesByPosition = jest.fn(() => Promise.resolve({data : moves}));

    await tmp.setState({position : 'A1'})
    tmp.find('#btn-check-position').simulate('click');
    await expect(checkPosition).toHaveBeenCalled();
    expect(startChessBoard).toHaveBeenCalled();
    await expect(chessRepository.getAvailableMovesByPosition).toHaveBeenCalledTimes(1);
    expect(tmp.state().moves.length).toEqual(moves.length);

    moves.forEach((v) => {
      expect(tmp.state().cells[v[v.length-1]]).toEqual({available:true, highlight: true});
    })

  })

  it('it should get available moves when the position is set to A1 and click on increment turns (3 turns)', async() => {
    
    const tmp = shallow(<App />)

    const moves = [["C6","C7","D7"],["C6","C7","B7"],["C4","C3","D3"],["C4","C3","B3"],["B5","A5","A6"],["B5","A5","A4"],["D5","E5","E6"],["D5","E5","E4"],["A6","A7","B7"],["A4","A3","B3"],["B5","C5","C6"],["B5","C5","C4"],["C2","C3","D3"],["C2","C3","B3"],["B1","A1","A2"],["D1","E1","E2"],["A2","A3","B3"],["B1","C1","C2"],["D5","D6","E6"],["D5","D6","C6"],["D3","D2","E2"],["D3","D2","C2"],["C4","B4","B5"],["C4","B4","B3"],["E4","F4","F5"],["E4","F4","F3"],["D3","D4","E4"],["D3","D4","C4"],["C2","B2","B3"],["C2","B2","B1"],["E2","F2","F3"],["E2","F2","F1"],["D5","D6","E6"],["D5","D6","C6"],["D3","D2","E2"],["D3","D2","C2"],["C4","B4","B5"],["C4","B4","B3"],["E4","F4","F5"],["E4","F4","F3"],["B5","B6","C6"],["B5","B6","A6"],["B3","B2","C2"],["B3","B2","A2"],["C4","D4","D5"],["C4","D4","D3"],["A4","A5","B5"],["A2","A1","B1"],["B3","C3","C4"],["B3","C3","C2"],["A2","A3","B3"],["B1","C1","C2"],["E4","E5","F5"],["E4","E5","D5"],["E2","E1","F1"],["E2","E1","D1"],["D3","C3","C4"],["D3","C3","C2"],["F3","G3","G4"],["F3","G3","G2"],["E2","E3","F3"],["E2","E3","D3"],["D1","C1","C2"],["F1","G1","G2"]];

    chessRepository.getAvailableMovesByPosition = jest.fn(() => Promise.resolve({data : moves}));

    await tmp.setState({position : 'A1'})
    tmp.find('#btn-check-increment-turns').simulate('click');
    expect(incrementTurns).toHaveBeenCalled();
    await expect(tmp.state().turns).toEqual(3)
    await expect(checkPosition).toHaveBeenCalled();
    expect(startChessBoard).toHaveBeenCalled();
    await expect(chessRepository.getAvailableMovesByPosition).toHaveBeenCalledTimes(1);
    expect(tmp.state().moves.length).toEqual(moves.length);

    moves.forEach((v) => {
      expect(tmp.state().cells[v[v.length-1]]).toEqual({available:true, highlight: true});
    })

  })

  it('it should check the length of the ColumnChess Component', async () => {
    const wrapped = mount(<App />);
    await expect(wrapped.find(ColumnChess).children().length).toEqual(app.state().columns.length * app.state().rows.length + app.state().columns.length*2);
  }); 

  it('it should set the position to A1 and put it to highlighted', async () => {
    const wrapped = mount(<App />);
    wrapped.find("#cell-A1").simulate('click');
    await expect(tryToMove).toHaveBeenCalledWith('A1');
    //this.setState({position : pos, moves: [], cells : { [pos] : { available : true, highlight : true} }});
    expect(wrapped.state().moves.length).toEqual(0);
    expect(wrapped.state().position).toEqual('A1');
    expect(wrapped.state().cells[wrapped.state().position]).toEqual({ available : true, highlight : true});
    
  });

  it('it should move from A1 to B3', async () => {
    
    chessRepository.getCouldMove = jest.fn(() => Promise.resolve({data : true}));

    const wrapped = mount(<App />);
    await wrapped.setState({position : 'A1'});
    wrapped.find("#cell-B3").simulate('click');
    await expect(tryToMove).toHaveBeenCalledWith('B3');
    await expect(chessRepository.getCouldMove).toHaveBeenCalled();
    expect(wrapped.state().position).toEqual('B3');
    expect(wrapped.state().moves.length).toEqual(0);
    expect(wrapped.state().cells['B3']).toEqual({ available : true, highlight : true});
    
    
  })

  it('it should NOT move from A1 to B2', async () => {
    
    chessRepository.getCouldMove = jest.fn(() => Promise.resolve({data : false}));

    const wrapped = mount(<App />);
    await wrapped.setState({position : 'A1'});
    wrapped.find("#cell-B2").simulate('click');
    await expect(tryToMove).toHaveBeenCalledWith('B2');
    await expect(chessRepository.getCouldMove).toHaveBeenCalled();
    expect(wrapped.state().position).toEqual('A1');
    expect(wrapped.state().cells['B2']).toEqual({ available : true, highlight : false});
    
    
  })

});
