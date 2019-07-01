import React from 'react';
import { thisExpression } from '@babel/types';
//import Row from './Row';


class Child extends React.Component {
  render() {
    let x = [] 
    if ( this.props.rowId === 0 ) { 
      x.push(<td key={0}></td>)
      for ( let  i = 1 ; i < this.props.boardSize; i++ ) {
        x.push(<td className='metaCell' key={i} >{i}</td>)
      }
    } else {
      x.push(<td className='metaCell' key={0}>{this.props.rowId}</td>)
      for ( let  i = 1 ; i < this.props.boardSize; i++ ) {
        let pId = this.props.rowId + "_" + i 
        x.push(<td className='cell' key={i} onClick={(e)=>this.props.onClick(this.props.rowId, i)}><div key={pId} id={pId}></div></td>)
      }
    } 
    return (
      <tr>{x}</tr>
    )
  }
}
const NILL = 'nill'
const WHITE = 'white'
const BLACK = 'black'
class App extends React.Component {
  constructor(props){ 
    super(props);
    this.clickOnCell = this.clickOnCell.bind(this);
    this.board = [] 
    const boardSize = 19
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
        finch:"wren", 
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
        x.classList.remove("blackCircle")
        x.classList.add("whiteCircle")
        cell.classList.add("blackCircle")
        this.updateOwnerOfCell(row, col, BLACK)
       } else {
        this.setState({nextTurn:BLACK})
        x.classList.remove("whiteCircle")
        x.classList.add("blackCircle")
        cell.classList.add("whiteCircle")
        this.updateOwnerOfCell(row, col, WHITE)
      }
    }
  }
  render() {
    let rows = [] 
    for ( let rowId = 0 ; rowId < this.state.boardSize; rowId++ ) { 
      rows.push( <Child rowId={rowId} key={rowId} boardSize={this.state.boardSize} onClick={this.clickOnCell.bind()}></Child>
      )
    }
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td className="cell">
              <div id='showTurn' className="blackCircle"></div>
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