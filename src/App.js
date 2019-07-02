import React from 'react';
import Board from './components/Board';
import SGF from './components/SGF';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.clickOnCell = this.clickOnCell.bind(this);
		this.setShowInfluenceToggle = this.setShowInfluenceToggle.bind(this)
		this.black = "B"
		this.white = "W"
		this.turn = this.black
		let b = []
		this.turnCount = 0 
		for (let col = 0; col < 19; col++) {
			b[col] = []
			for (let row = 0; row < 19; row++) {
				b[col][row] = {
					black: 0,
					white: 0,
					col: col,
					row: row,
					owner: this.nill,
					turnCount:-1
				}
			}
		}
		this.state = {
			board: b,
			showInfluence:true
		}
	}
	setShowInfluenceToggle() { 
		let x = this.state.showInfluence
		if ( x === false ) {
			x = true 
		} else {
			x = false
		}
		this.setState({showInfluence:x})
	}
	clickOnCell(row, column) {
		let tmp = this.state.board
		if (tmp[row][column].owner !== this.black && tmp[row][column].owner !== this.white) {
			tmp[row][column].owner = this.turn
			this.turnCount++
			tmp[row][column].turnCount = this.turnCount
			if (this.turn === this.black) {
				this.turn = this.white;
				this.blackTurn++;
			} else {
				this.turn = this.black;
				this.whiteTurn++;
			}
		}
		this.setState({
			board: tmp
		})
	}
	render() {
		return ( 

			<table border='1'>
				<tbody>
				<tr> 
					<td rowSpan='2'>
						<Board 
							black = {this.black}
							white = {this.white}
							data = {this.state.board}
							key = {Math.random()}
							board = {this.state.board}
							showInfluence={this.state.showInfluence}
							onClick = {this.clickOnCell.bind()} 
							onChange={this.setShowInfluenceToggle.bind()}
						></Board>
					</td>
				
					<td>
						<SGF key={Math.random()}></SGF>
					</td>
				</tr>
				<tr>
					<td>
						three
					</td>
				</tr>


				</tbody>
			</table>
		)
	}
}
export default App

