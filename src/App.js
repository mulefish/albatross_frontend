import React from 'react';
import Board from './components/Board';

class App extends React.Component {
	  constructor(props){ 
		      super(props);
		      this.clickOnCell = this.clickOnCell.bind(this);
		      this.black = "B"
		      this.white = "W"
		      this.turn = this.black
		      let b = []
		      let count = 1
		      for ( let col = 0; col < 19; col++ ) { 
			            b[col] = [] 
			            for ( let row = 0; row < 19; row++ ) { 
					            b[col][row] = {
							              black:0,
							              white:0,
							              col:col,
							              row:row,
							              owner:this.nill
							            }
					          }
			          }
		      this.state = {
			            board:b 
			          }
		    }
	  clickOnCell(row, column ) {
		      let tmp = this.state.board
		      if ( tmp[row][column].owner !== this.black || tmp[row][column].owner  !== this.white) {
			            tmp[row][column].owner = this.turn
			            if ( this.turn === this.black ) {
					            this.turn = this.white
					          } else {
							          this.turn = this.black
							        }
			          }
		      this.setState({board:tmp})
		    }

	  render() {
		     return (
			           <Board black={this.black} white={this.white} data={this.state.board} key={Math.random()} board={this.state.board} onClick={this.clickOnCell.bind()}></Board>
			         )

		    }
}
export default App

