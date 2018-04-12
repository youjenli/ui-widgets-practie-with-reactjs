/// <reference types="React" />
/// <reference types="debounce" />
import * as React from 'react';
import debounce = require('debounce');

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

interface ScrollToTopButtonProps {
    threshold:number;
}

interface ScrollToTopButtonState {
    isActive:boolean;
}

export class ScrollToTopButton extends React.Component<ScrollToTopButtonProps,ScrollToTopButtonState> {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.evaluateVisibility = this.evaluateVisibility.bind(this);
        this.state = {
            isActive:false
        };
    }
    componentDidMount() {
        window.addEventListener('scroll', debounce(this.evaluateVisibility));
    }
    evaluateVisibility() {
        const value = window.scrollY;
        if (value >= this.props.threshold) {
            this.setState({
                isActive:true
            })
        } else {
            this.setState({
                isActive:false
            })
        }
    }
    scrollToTop() {
        document.documentElement.scrollTop = 0;
    }
    render () {
        const additionalClasses = this.state.isActive ? " active":"";
        return (
            <div className={"scrollToTop" + additionalClasses} onClick={this.scrollToTop}>Go to Top</div>
        )
    }
}