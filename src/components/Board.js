import React from 'react';

class BackgroundTableRow extends React.Component { 
    render() { 
        let cells = [] 
        for ( let i  = 0; i < 18; i++ ) {
            cells.push(<td className="cell" key={Math.random()}></td>)
        }
        return (<tr key={Math.random()}>{cells}</tr>)
    }
}
class ForegroundTableRow extends React.Component { 
    render() { 
        let cells = [] 
        for ( let column  = 0; column < 19; column++ ) {
            let owner = this.props.data[column].owner
            let css = ""
            if ( owner === this.props.black ) {
                css = "blackCircle"
            } else if ( owner === this.props.white) {
                css = "whiteCircle"
            }
            cells.push(<td className="cell2" key={Math.random()}  onClick={(e)=>this.props.onClick(this.props.row, column)}><div key={Math.random()} className={css}>{owner}</div></td>)
        }
        return (<tr key={Math.random()}>{cells}</tr>)
    }
}

class Board extends React.Component {
    getClickPosition(e) {
        var xPosition = e.clientX;
        var yPosition = e.clientY;
        console.log("X: " + xPosition + " y: " + yPosition )
    }

    render() {  

        for ( let rowIndex = 0 ; rowIndex < this.props.data.length; rowIndex++ ) {
            for ( let colIndex = 0 ; colIndex < this.props.data[rowIndex].length; colIndex++ ) {
                let x = this.props.data[rowIndex][colIndex]
            //    console.log(x.owner)
            }
        }


        // Q: Foreground? Background? What is this? 
        // A: Both are tables. Foreground has a higher z-index
        // that Background. Foreground to offset left and up .5 the width of a cell
        // and Foreground has 1 more cell per row and 1 more row than Background. 

        // just for looks
        let bgRows = [] 
        for ( let rowIndex = 0 ; rowIndex < 18; rowIndex++ ) { 
            bgRows.push(<BackgroundTableRow key={Math.random()}/>)
        }
        // stone placement and logic
        let fgRows = [] 
        for ( let rowIndex = 0 ; rowIndex < 19; rowIndex++ ) { 
            fgRows.push(<ForegroundTableRow data={this.props.data[rowIndex]} row={rowIndex} key={Math.random()}  onClick={this.props.onClick.bind()} black={this.props.black} white={this.props.white} />)
        }



        return (
            <div>
                <table id='background'>
                    <tbody>
                        {bgRows}
                    </tbody>
                </table>
                <table id='foreground'>
                    <tbody>
                        {fgRows}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Board
