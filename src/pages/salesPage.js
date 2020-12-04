import React, { Component } from 'react';
import Navbar from "./navbar";
import Sales from "./sales";

class salesPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Sales />
            </div>
        );
    }
}

export default salesPage;