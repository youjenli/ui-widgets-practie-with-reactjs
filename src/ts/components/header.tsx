/// <reference types="react" />
import * as React from 'react';

export class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <p>Scroll Down</p>
                <p>Scroll down to see the sticky effect</p>
            </div>
        );
    }
}