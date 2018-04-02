/// <reference types="react" />
import * as React from 'react';

interface SearchBoxState {
    className:string;
}

export class SearchBox extends React.Component<SearchBoxState, SearchBoxState> {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render () {
        const className = "search-container " + this.state.className;

        return(
            <div className={className}>
                <input type="text" placeholder="Search..." />
                <button className="fa fa-search" />
            </div>
        );
    }
}