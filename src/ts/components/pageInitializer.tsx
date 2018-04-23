/// <reference types="React" />
import * as React from 'react';
import { LoaderScreen } from '../widgets/loader';


interface PageInitializerProps {
    activateLoaderScreen:boolean;
}

interface PageInitializerState {
    isPageReady: boolean;
}

export class PageInitializer extends React.Component<PageInitializerProps, PageInitializerState> {
    constructor(props) {
        super(props);
        this.dismissLoader = this.dismissLoader.bind(this);
        this.state = {
            isPageReady: false
        };
    }
    dismissLoader() {
        this.setState({
            isPageReady: true
        });
    }
    render() {
        const mainFrameClasses = this.state.isPageReady ? "" : "behindTheScenes";
        const dismissLoader = this.props.activateLoaderScreen ? this.dismissLoader : () => {};

        return (
            <React.Fragment>
                {this.state.isPageReady ? null : <LoaderScreen />}
                <div id="pageContainer" className={mainFrameClasses} onLoad={dismissLoader}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}