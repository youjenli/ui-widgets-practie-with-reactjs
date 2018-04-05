/// <reference types="react" />
import * as React from 'react';

interface HoverableDropdownState {
    isHovered:boolean;
}

export class HoverableDropdown extends React.Component<HoverableDropdownState,HoverableDropdownState> {
    constructor(props) {
        super(props);
        this.onMouseActionTriggered = this.onMouseActionTriggered.bind(this);
        this.state = props;
    }
    onMouseActionTriggered() {
        this.setState({
            isHovered:!this.state.isHovered
        });
    }
    render() {
        const dropdownClasses = this.state.isHovered ? "dropdown active" : "dropdown";
        return (
            <div className="widget hoverableDropdown" onMouseEnter={this.onMouseActionTriggered} onMouseLeave={this.onMouseActionTriggered}>
                <button className="hoverable">Hover Me!
                </button>
                <div className={dropdownClasses}>
                    <a href="#">Item 1</a>
                    <a href="#">Item 2</a>
                    <a href="#">Item 3</a>
                </div>
            </div>
        );
    }
}