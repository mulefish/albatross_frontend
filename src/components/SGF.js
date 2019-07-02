import React from 'react';

class SGF extends React.Component {
    constructor(props) {
        super(props) 
        this.showUrls = this.showUrls.bind(this);
							
        this.state={
        }
    }
    showUrls() { 
        alert("Dosaku: https://homepages.cwi.nl/~aeb/go/games/games/Dosaku/")
    }
    render() {  
        return (
            <button onClick={this.showUrls}>URL</button>

        )
    }
}
export default SGF