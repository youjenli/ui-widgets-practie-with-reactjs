/// <reference types="react" />
import * as React from 'react';

export class MenuIcon extends React.Component {
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

interface AnimatedMenuIconState {
    isActive: boolean;
}

export class AnimatedMenuIcon extends React.Component<{}, AnimatedMenuIconState> {
    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            isActive:false
        };
    }
    onMouseEnter() {
        this.setState({
            isActive:true
        });
    }
    onMouseLeave() {
        this.setState({
            isActive:false
        });
    }
    render () {
        return (
            <div className="animatedMenuIcon widget" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className={this.state.isActive ? 'bar above' : 'bar'}></div>
                <div className={this.state.isActive ? 'bar middle' : 'bar'}></div>
                <div className={this.state.isActive ? 'bar below' : 'bar'}></div>
            </div>
        );
    }
}