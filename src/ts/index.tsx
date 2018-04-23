/// <reference types="react-dom" />
/// <reference types="React" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PageInitializer } from './components/pageInitializer';

document.addEventListener('DOMContentLoaded', function(){
    const reactRoot = document.getElementById('react-root');

    ReactDOM.render(
        <PageInitializer activateLoaderScreen={true} />,
        reactRoot
    );
});