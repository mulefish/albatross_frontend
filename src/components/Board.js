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
            let turnCount = ""
            if ( owner === this.props.black ) {
                css = "blackCircle"
                turnCount = this.props.data[column].turnCount
                if ( this.props.showText === false ) { 
                    turnCount = ""
                } 
            } else if ( owner === this.props.white) {
                css = "whiteCircle"
                turnCount = this.props.data[column].turnCount
                if ( this.props.showText === false ) { 
                    turnCount = ""
                } 
            } else {
                // Do not set the css which would show a visible stone.
            }
            cells.push(
                <td 
                    className="cell2" 
                    key={Math.random()}  
                    onClick={(e)=>this.props.onClick(this.props.row, column)}
                >
                <center><div 
                        key={Math.random()} 
                        className={css}>{turnCount}</div></center>
                </td>
            )
        }
        return (<tr key={Math.random()}>{cells}</tr>)
    }
}

class Board extends React.Component {

    render() {  

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
            fgRows.push(
                <ForegroundTableRow 
                    showText={this.props.showText} 
                    data={this.props.data[rowIndex]} 
                    row={rowIndex} 
                    key={Math.random()} 
                    onClick={this.props.onClick.bind()} 
                    black={this.props.black} 
                    white={this.props.white} 
                />
            )
        }

        return (
            <div>
                <div id='parent' >
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

                <table border='1'><tbody><tr><td className='neutralBG'>
                        <div className={this.props.turnCount % 2 === 0 ? 'blackCircle' : 'whiteCircle'}></div>
                    </td><td>
                        <input 
                            type='checkbox' 
                            id='showText_widget' 
                            checked={this.props.showText} 
                            onChange={(e)=>this.props.onChange()}
                        ></input>
                        <label htmlFor="showText_widget">Show Text</label>
                    </td>
                    <td>    
                        Turn {this.props.turnCount}
                    </td>
                    </tr></tbody>
                </table>
            </div>
        )
    }
}
export default Board