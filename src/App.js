import React from 'react';
import Row from './Row';

const boardSize = 18 // Go board is 18 x 18 cells 
class App extends React.Component {
  render() {
    let rows = [] 


    for ( let rowId = 0 ; rowId < boardSize + 1; rowId++ ) { 
      rows.push(<Row key={rowId} rowId={rowId} size={boardSize} onClick={this.handleChildClick.bind()} />)
    }
    return (
      <div>
        <div className="circle2"></div>
          <div> 
            <table border='0'>
              <tbody>
                {rows}
              </tbody>
              </table>
          </div>
      </div>
    ); 
  }
  handleChildClick(cellId, row, column  ) {
      let cell = document.getElementById(cellId) 
      if ( cell.classList.contains("highlight")) {
        cell.classList.remove("highlight")
      } else {
        cell.classList.add("highlight")
      }
      var newDiv = document.createElement("div"); 
      newDiv.className="blackCircle"
      cell.append(newDiv)
      console.log("YAY! ")
  }
}
export default App;