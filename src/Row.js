import React from 'react';

function getKey() { 
    return Math.random()
}
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols:this.props.cols
        }
    }
    render() {
        let row = [] 
        


        if ( this.props.rowId === 0 ) { 
            // The top header
            row.push(<td valign='center' key={getKey()} className='metaCell'></td>)
            for ( let colId = 0 ; colId < this.props.size; colId++ ) {
                row.push(<td key={getKey()} className='metaCell' >{colId + 1}</td>)
            } 
        } else { 
            // The main board
            row.push(<td valign='center' key={getKey()} className='metaCell'>{this.props.rowId} </td>)
            for ( let j = 0 ; j < this.props.size; j++ ) {
                let colId = j + 1
                const id = this.props.rowId + "_" + colId  
//                row.push(<td key={id} className='cell' onClick={(e)=>this.props.onClick(this.props.rowId,colId)}><div className='blackCircle'>{id}</div></td>)
                row.push(<td key={id} className='cell' onClick={(e)=>this.props.onClick(this.props.rowId,colId)}>{id}</td>)
            } 
        } 
        return (
            <tr>{row}</tr>
        );
    }
}
export default Row;