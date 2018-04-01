/// <reference types="react" />
import * as React from 'react';

interface TopNavigationState {
    foldedMenu:boolean;
}

export class TopNavigation extends React.Component<TopNavigationState, TopNavigationState> {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = props;
    }
    onClick() {
        this.setState({
            foldedMenu:!this.state.foldedMenu
        });
    }
    render() {
        let classOfTopNav, classOfHome, classOfMenu;
        if (this.state.foldedMenu) {
            classOfTopNav = 'widget topNav responsive';
            classOfHome = 'active responsive';
            classOfMenu = 'responsive';
        } else {
            classOfTopNav = 'widget topNav';
            classOfHome = 'active';
            classOfMenu = '';
        }

        return (
            <div className={classOfTopNav}>
                <a className={classOfHome} href="#home">Home</a>
                <a className={classOfMenu} href="#news">News</a>
                <a className={classOfMenu} href="#contact">Contact</a>
                <a className={classOfMenu} href="#about">About</a>
                <a href="javascript:void(0);" className="icon" onClick={this.onClick}>&#9776;</a>
            </div>
        );
    }
}