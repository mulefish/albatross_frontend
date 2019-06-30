import React from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './';

const size = 10  

class Cell2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols:this.props.cols
    }
  }

  render() {
    let row = [] 
    let i  = this.props.cols
    for ( let j = 0 ; j < 18; j++ ) {
      let id = i + "_" + j  
      let bid = "b" + id
      row.push(<td key={bid} ><button id='one' key={id} onClick={(e)=>this.props.onClick(i,j)}>{id}</button></td>)
    } 
    return (
      <tr>{row}</tr>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let x = [] 
    for ( let i = 0 ; i < size; i++ ) { 
      let id = "r" + i 
      x.push(<Cell2 key={id} cols={i} onClick={this.handleChildClick.bind()} />)
    }
    return (
      <div>
          <div> 
            <table border='1'>
              <tbody>
                {x}
              </tbody>
              </table>
          </div>
      </div>
      ); 
  }
  handleChildClick(param1, param2  ) {
    console.log("clicked on " + param1 + " and " + param2 )
 }
}
export default App;

