import React from 'react';

class Row extends React.Component {
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
  export default Row;