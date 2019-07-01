import React from 'react';
import Row from './Row';

const NILL = 'nill'
const WHITE = 'white'
const BLACK = 'black'
const WHITE_PIECE = "whiteCircle"
const BLACK_PIECE = "blackCircle"

class App extends React.Component {
  constructor(props){ 
    super(props);
    this.clickOnCell = this.clickOnCell.bind(this);
    this.board = [] 
    const boardSize = 20  
    let lookup = {} 
    for( let i = 1; i < boardSize; i++ ) {
      lookup[i] = [] 
      for ( let j = 1; j < boardSize; j++ ) {
        lookup[i][j] = {
          white:0,
          black:0,
          owner:NILL
        }
      }
    }
    this.state = {
        boardSize:boardSize,
        lookup:lookup,
        nextTurn:BLACK
    }
  }
  showWhiteInfluence() { 
    alert("white! ")
  }
  showBlackInfluence() { 
    alert("black! ")
  }
  
  getCellState(row, col) {
    let x = this.state.lookup[row][col]
    let rv = "row:" + row + " col:" + col + " current:" + this.state.nextTurn + " "
    rv += WHITE + ":" + x.white + " " + BLACK + ":" + x.black + " owner:" + x.owner
    return rv
  }
  updateOwnerOfCell(row,col, owner) {
    let lookup = this.state.lookup
    lookup[row][col].owner = owner
    this.setState({lookup:lookup})
  }
  clickOnCell(row, col) {
    /// The cell 
    let cell = document.getElementById(row + "_" + col )

    /// The header
    let msg = this.getCellState(row, col) 
    document.getElementById("output").innerHTML = msg
    if ( this.state.lookup[row][col].owner === NILL) {
      let x = document.getElementById("showTurn")
      if ( this.state.nextTurn === BLACK ) {
        this.setState({nextTurn:WHITE})
        x.classList.remove(BLACK_PIECE)
        x.classList.add(WHITE_PIECE)
        cell.classList.add(BLACK_PIECE)
        this.updateOwnerOfCell(row, col, BLACK)
       } else {
        this.setState({nextTurn:BLACK})
        x.classList.remove(WHITE_PIECE)
        x.classList.add(BLACK_PIECE)
        cell.classList.add(WHITE_PIECE)
        this.updateOwnerOfCell(row, col, WHITE)
      }
    }
  }
  render() {
    let rows = [] 
    for ( let rowId = 0 ; rowId < this.state.boardSize; rowId++ ) { 
      rows.push( <Row rowId={rowId} key={rowId} boardSize={this.state.boardSize} onClick={this.clickOnCell.bind()}></Row>
      )
    }
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td className="cell">
              <div id='showTurn' className={BLACK_PIECE}></div>
            </td>
            <td className='button' onClick={this.showBlackInfluence}>Black Influence</td>
            <td className='button' onClick={this.showWhiteInfluence}>White Influence</td>
            <td>
              <div id='output'></div>
            </td>
          </tr>
          </tbody>
        </table>
        <hr></hr>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
export default App;