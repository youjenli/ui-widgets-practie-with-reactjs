/// <reference types="react" />
import * as React from 'react';
import { SearchBox } from '../widgets/searchBox';
import { Dropdown } from './dropdowns';

interface TopNavigationProps {
    foldedMenu:boolean;
}

enum DropdownMenu {
    NewsMenu = "News"
}

interface TopNavigationState extends TopNavigationProps {
    isNewsMenuVisible:boolean;
}

export class TopNavigationWithDropdownMenu extends React.Component<TopNavigationProps, TopNavigationState> {
    constructor(props) {
        super(props);
        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.toggleNewsMenuVisibility = this.toggleNewsMenuVisibility.bind(this);
        //初始化 Component 狀態
        let stateObj = Object.assign({}, props);
        stateObj.isNewsMenuVisibile = false;
        this.state = stateObj;
    }
    componentDidMount() {
        const topNav:HTMLElement = document.querySelector('.topNav');
        const pageContainer:HTMLDivElement = document.querySelector('#pageContainer');
        const indicator:HTMLDivElement = document.querySelector('.topNav .scrollIndicator .indicator');

        
        const domRect = topNav.getBoundingClientRect();
        const onScrollHandler = function(){
            if ( window.scrollY > topNav.offsetTop ) {
                topNav.classList.add('sticky');
            }
            if ( window.scrollY < domRect.bottom ) {
                topNav.classList.remove('sticky');
            }
            const ratio = Math.round((window.scrollY + window.innerHeight - domRect.bottom) / (pageContainer.scrollHeight - domRect.bottom ) * 100);
            indicator.style.width = `${ratio}%`;
        };
        window.addEventListener('scroll', onScrollHandler);
        onScrollHandler();/* 要先執行一次, 這樣畫面重載時才能先套用 js 設定 */
    }
    onMenuIconClick() {
        this.setState({
            foldedMenu:!this.state.foldedMenu
        });
    }
    toggleNewsMenuVisibility() : void {
        this.setState({
            isNewsMenuVisible:!this.state.isNewsMenuVisible
        });
    }
    render() {
        let additionalClassesOfTopNav, classesOfHome, classesOfMenu;
        if (this.state.foldedMenu) {
            additionalClassesOfTopNav = ' responsive';
            classesOfHome = ' active responsive';
            classesOfMenu = ' responsive';
        } else {
            additionalClassesOfTopNav = '';/*考慮刪除, 應該無用 */
            classesOfHome = ' active';
            classesOfMenu = '';
        }

        return (
            <div className={"widget topNav" + additionalClassesOfTopNav}>
                <div className="menuBar">
                <a className={"topNavMenu" + classesOfHome} href="#home">Home</a>
                <button className={"topNavMenu dropdownMenu" + classesOfMenu} onClick={this.toggleNewsMenuVisibility}>
                    News&nbsp;<i className="fa fa-caret-down"></i>
                               <Dropdown isVisible={this.state.isNewsMenuVisible} />
                </button>
                <a className={"topNavMenu " + classesOfMenu} href="#contact">Contact</a>
                <a className={"topNavMenu " + classesOfMenu} href="#about">About</a>
                <div className="topNavPlaceholder">&nbsp;</div>
                <SearchBox className={"topNavMenu " + classesOfMenu} />
                <a href="javascript:void(0);" className="icon" onClick={this.onMenuIconClick}>&#9776;</a>
                </div>
                <div className="scrollIndicator">
                    <div className="indicator"></div>
                </div>
            </div>
        );
    }
}