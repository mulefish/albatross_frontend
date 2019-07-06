import React from 'react';
import History from './History';



class SGF extends React.Component {

    render() { 
        return (
            <History gameInfo={this.props.gameInfo}></History>
        )
    }
}
export default SGF