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

interface ButtonWithArrowOnHoverProps {
    buttonText:string;
}

interface ButtonWithArrowOnHoverState {
    isActive:boolean;
}

export class ButtonWithArrowOnHover extends React.Component<ButtonWithArrowOnHoverProps, ButtonWithArrowOnHoverState> {
    constructor(props) {
        super(props);
        this.state = {
            isActive:false
        };
        this.toggleState = this.toggleState.bind(this);
    }
    toggleState() {
        this.setState({
            isActive:!this.state.isActive
        });
    }
    render() {
        const buttonText = this.props.buttonText + (this.state.isActive ? ' »':"");
        return (
            <div className={"button arrowOnHover"} onMouseEnter={this.toggleState} onMouseLeave={this.toggleState}>
                {buttonText}</div>
        )
    }
}