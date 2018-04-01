/// <reference types="react-dom" />
/// <reference types="React" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuIcon, AnimatedMenuIcon } from './widgets/menuIcon';
import { IconBar } from './widgets/iconBar';
import { Accordion } from './widgets/accordion';

document.addEventListener('DOMContentLoaded', function(){
    const reactRoot = document.getElementById('react-root');
    ReactDOM.render(
        <div>
            <IconBar />
            <AnimatedMenuIcon />
            <Accordion sectionName="section 1" section="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." isActive={true} />
        </div>,
        reactRoot
    );
});