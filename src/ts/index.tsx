/// <reference types="react-dom" />
/// <reference types="React" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuIcon } from './widgets/menuIcon'

document.addEventListener('DOMContentLoaded', function(){
    const reactRoot = document.getElementById('react-root');
    ReactDOM.render(
        <MenuIcon />,
        reactRoot
    );
});