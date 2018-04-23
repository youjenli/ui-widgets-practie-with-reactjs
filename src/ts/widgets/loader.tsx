/// <reference types="React" />
import * as React from 'react';

export class LoaderIcon extends React.Component {
    render() {
        return (
            <div className="loader"></div>
        );
    }
}

export class LoaderScreen extends React.Component {
    render() {
        return (
            <div className="loaderScreen">
                <LoaderIcon />
            </div>
        );
    }
}