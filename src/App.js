import React from 'react';
import Board from './components/Board';

class App extends React.Component {
  constructor(props){ 
    super(props);
    this.clickOnCell = this.clickOnCell.bind(this);
    this.black = "black"
    this.white = "white"

    this.turn = this.black
    let b = []
    for ( let col = 0; col < 19; col++ ) { 
      b[col] = [] 
      for ( let row = 0; row < 19; row++ ) { 
        b[col][row] = {
          black:0,
          white:0,
          col:col,
          row:row,
          owner:"X"
        }
      }
    }
    this.state = {
      board:b 
    }
  }
  clickOnCell(row, column ) {
    let tmp = this.state.board
    if ( tmp[row][column].owner === "X") {
      tmp[row][column].owner = this.turn

    }
    this.setState({board:tmp})

  } 
  render() {
   return (
      <Board data={this.state.board} key={Math.random()} board={this.state.board} onClick={this.clickOnCell.bind()}></Board>
    )

  }
}
export default App
