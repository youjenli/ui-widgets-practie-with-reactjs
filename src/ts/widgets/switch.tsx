/// <reference types="react" />
import * as React from 'react';

interface ToggleSwitchProps {
    isActive:boolean;
}

export class ToggleSwitch extends React.Component<ToggleSwitchProps, ToggleSwitchProps> {
    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            isActive:false
        };
    }
    toggleSwitch(){
        this.setState({
            isActive:!this.state.isActive
        });
    }
    render() {
        const additionalClasses = this.state.isActive ? " active":"";

        return (
            <div className="toggleSwitch">
                <div className={"switch off" + additionalClasses} onClick={this.toggleSwitch}></div>
                <div className={"back" + additionalClasses}></div>
                <div className={"switch on" + additionalClasses} onClick={this.toggleSwitch}></div>
                <div className={"indicator" + additionalClasses}></div>
            </div>
        );
    }
}