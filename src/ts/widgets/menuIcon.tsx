/// <reference types="react" />
import * as React from 'react';

export class MenuIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="menuIcon">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        );
    }
}