/// <reference types="react-dom" />
/// <reference types="React" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuIcon, AnimatedMenuIcon } from './widgets/menuIcon';
import { IconBar } from './widgets/iconBar';

document.addEventListener('DOMContentLoaded', function(){
    const reactRoot = document.getElementById('react-root');
    ReactDOM.render(
        <div>
            <IconBar />
            <AnimatedMenuIcon />
        </div>,
        reactRoot
    );
});