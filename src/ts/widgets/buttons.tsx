/// <reference types="React" />
import * as React from 'react';

interface ButtonState {
    isActive:boolean;
}

export class ButtonWithPressedEffect extends React.Component<{}, ButtonState> {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isActive:false
        };
    }
    onClick(){
        this.setState({
            isActive:true
        });
    }
    render() {
        return (
            <div className="button pressedEffect">Click Me</div>
        );
    }
}