/// <reference types="react" />
import * as React from 'react';
import { SearchBox } from '../widgets/searchBox';

interface TopNavigationState {
    foldedMenu:boolean;
}

export class TopNavigation extends React.Component<TopNavigationState, TopNavigationState> {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = props;
    }
    componentDidMount() {
        const topNav:HTMLElement = document.querySelector('.topNav');
        const domRect = topNav.getBoundingClientRect();
        const onScrollHandler = function(){
            if ( window.scrollY > topNav.offsetTop ) {
                topNav.classList.add('sticky');
            }
            if ( window.scrollY < domRect.bottom ) {
                topNav.classList.remove('sticky');
            }
        };
        window.addEventListener('scroll', onScrollHandler);
        onScrollHandler();/* 要先執行一次, 這樣畫面重載時才能先套用 js 設定 */
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
                <SearchBox className={classOfMenu} />
                <a href="javascript:void(0);" className="icon" onClick={this.onClick}>&#9776;</a>
            </div>
        );
    }
}