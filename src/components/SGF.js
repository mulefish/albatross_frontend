import React from 'react';

class SGF extends React.Component {
    constructor(props) {
        super(props) 
        this.showUrls = this.showUrls.bind(this);
        this.restfulCall = this.restfulCall.bind(this);
        this.state={
        }
    }
    restfulCall() {
        alert("zoom!!! ")
        fetch('http://localhost:4001/')
        .then(response => response.json())
        .then(data => 
            alert( data )
            );
    
    }
    showUrls() { 
        alert("Dosaku: https://homepages.cwi.nl/~aeb/go/games/games/Dosaku/")
    }
    thing() {
        this.props.feelbetter("a")
    }
    render() {  
        return (
            <div>
            <button onClick={this.showUrls}>URL</button>
            <button onClick={this.restfulCall}>Call</button>
   
            <select id='chooseDataset' onChange={(e)=>this.thing()}>
            <option>select</option>
            <option>022.sgf</option>
            <option>035.sgf</option>
            <option>051.sgf</option>
            <option>059.sgf</option>
            <option>062.sgf</option>
            <option>069.sgf</option>
            <option>079.sgf</option>
            <option>082.sgf</option>
            <option>086.sgf</option>
            <option>093.sgf</option>
            <option>104.sgf</option>
            <option>111.sgf</option>
            <option>120.sgf</option>
            <option>122.sgf</option>
            <option>128.sgf</option>                
            </select>
            </div>
        )
    }
}
export default SGF