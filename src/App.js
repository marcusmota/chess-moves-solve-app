import Image from './components/Image';
import ColumnChess from './components/ColumnChess';
import React, { Component } from 'react';
import logo from './logo.svg';
import './css/style.css';
import * as chessRepository from './repository/chessRepository';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {

  constructor(){
    super();
    this.state = {
      rows : [1,2,3,4,5,6,7,8],
      turns : 2,
      columns : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      cells : {
      },
      position : "",
      moves : []
    }

    this.tryToMove = this.tryToMove.bind(this);
  };

  componentDidMount(){

    this.startChessBoard();

  }

  startChessBoard(){

    let cpy = {};

    this.state.rows.forEach(f => {
      this.state.columns.forEach(c => {
        cpy[c+f] = { available : true, highlight : false};
      })
    });
    
    this.setState({cells : cpy});
  }

  incrementTurns(){
    this.setState({
      turns : this.state.turns + 1,
      cells : {[this.state.position] : { available : true, highlight : true}}
    }, this.checkPosition);
  }

  decrementTurns(){
    this.setState({
      turns : this.state.turns - 1,
      cells : {[this.state.position] : { available : true, highlight : true}}
    }, this.checkPosition);
  }

  getPiece(p) {
    if(p === 'KNIGHT'){
      return <Image src={require("./pieces/knight.png")} height="25px" className="chess-table__piece" />;
    }
  }

  getStatusOfCell(st) {
    if(this.state.cells[st] && this.state.cells[st].highlight){
      return true;
    }else{
      return false;
    }
  }

  tryToMove(pos) {
    if(!this.state.position){
      this.setState({position : pos, moves: [], cells : { [pos] : { available : true, highlight : true} }});
    }else{
      chessRepository.getCouldMove('KNIGHT', this.state.position, pos).then((res) => {
        if(res.data === true){
          this.setState({position : pos,  moves: [],cells : { [pos] : { available : true, highlight : true} }});
        }else{
          toast.error("Invalid move, if you want a tip click on Tip me!")
        }
      }).catch(err => {
        console.log(`Err: ${err}`);
      })
    }
  }

  checkPosition(){
    let pos = this.state.position
    
    this.startChessBoard();

    chessRepository.getAvailableMovesByPosition('KNIGHT', pos, this.state.turns).then((res) => {

      let cpy = this.state.cells;
      
      res.data.forEach((v) => {
        cpy[v[v.length-1]] = { available : true, highlight : true}
      });

      cpy[this.state.position]  = { available : true, highlight : true}
      this.setState({cells: cpy, moves : res.data, position : pos})

    }).catch(err => {
      console.log(`Err: ${err}`);
    })
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <header className="header u-padding-top-small">
              <h1 className="heading-primary heading-primary--main">Chess Moves Solver</h1>
              <h1 className="heading-primary heading-primary--sub">Feel free to join us on <a  className="heading-primary__link" href="https://github.com/marcusmota/chess-moves-solver-app">Github</a></h1>
        </header>
        <section className="chess-table">
          <div className="u-center-text u-margin-bottom-big">
            <h1 className="heading-secondary">The Chess Board</h1>
          </div>
          <div className="row-chess">
            <div className="col-1-of-10">
              &nbsp;
            </div>
            {this.state.columns.map((f2,i) => {
                return <ColumnChess key={i+1} letter={f2} className={"col-1-of-10 chess-table__bg-color--transparent"} />
             })}
            <div className="col-1-of-10">
              &nbsp;
            </div>
          </div>
          {this.state.rows.map((f,i) => {
            return <div className="row-chess" key={i+1}>
              <div className="col-1-of-10 col-1-of-10__text">
                <span>{this.state.rows.length+1 - f}</span>
              </div>
             {this.state.columns.map((f2,i) => {
                return <ColumnChess 
                  piece={f2+(this.state.rows.length-f+1) === this.state.position ? this.getPiece('KNIGHT') : ""} 
                  className={this.getStatusOfCell(f2+(this.state.rows.length-f+1)) ? "col-1-of-10 col-1-of-10__highlight chess-table--animated" :  "col-1-of-10"} 
                  position={f2+(this.state.rows.length-f+1)}
                  tryToMove={this.tryToMove}
                  key={i+1} />
             })}
             <div className={"col-1-of-10 col-1-of-10__text"}>
                <span> {this.state.rows.length+1 - f}</span>
              </div>
           </div>
          })}
          <div className="row-chess">
          <div className="col-1-of-10">
              &nbsp;
            </div>
            {this.state.columns.map((f2,i) => {
                return <ColumnChess key={i+1} className={"col-1-of-10"} letter={f2}/>
             })}
            <div className="col-1-of-10">
              &nbsp;
            </div>
          </div>
        </section>
        <section className="section-chess-footer">
          <div className="row">
            <div className="col-1-of-1">
                <button className="btn btn-primary btn--bigger" id="btn-check-position" disabled={!this.state.position} onClick={this.checkPosition.bind(this)}>Tip me!</button> &nbsp;
                <button className="btn btn-success btn--bigger" id="btn-check-increment-turns" disabled={!this.state.position || this.state.turns > 2} onClick={this.incrementTurns.bind(this)}>More turns</button>&nbsp;
                <button className="btn btn-info btn--bigger" id="btn-check-decrement-turns" disabled={!this.state.position || this.state.turns === 1} onClick={this.decrementTurns.bind(this)}>Less turns</button>
            </div>
          </div>
          <div className="paragraph-tip u-center-text">
            {this.state.moves.length > 0 ? <p>Available Moves from {this.state.position} with {this.state.turns} turns are {this.state.moves.length}</p> : <p>Select a cell by clicking / tapping then click on "Tip me!" to see the available moves into the next {this.state.turns} turns</p>} 
             
             <div className="row">
                {this.state.moves.map((ff,i) => {
                  let str = "";
                  ff.forEach(arr => {
                    str += arr+" > ";
                  })
                  return <div key={i+1} className="col-1-of-4">{str}</div>;
                })}
             </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
