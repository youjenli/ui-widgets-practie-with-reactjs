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
                <div className={dropdownClasses}>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                </button>
            </div>
        );
    }
}