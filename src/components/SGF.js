import React from 'react';
import History from './History';

class SGF extends React.Component {
    render() { 
        return (
            <History cursor={this.props.cursor} gameInfo={this.props.gameInfo}></History>
        )
    }
}
export default SGF