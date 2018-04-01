/// <reference types="react" />
import * as React from 'react';

export class TopNavigation extends React.Component {
    render() {
        return (
            <div className="widget topNav">
                <a className="active" href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        );
    }
}