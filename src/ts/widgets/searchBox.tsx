/// <reference types="react" />
import * as React from 'react';

interface SearchBoxState {
    className:string;
}

export class SearchBox extends React.Component<SearchBoxState, SearchBoxState> {
    constructor(props) {
        super(props);
    }
    render () {
        return(
            <div className={"search-container " + this.props.className}>
                <input type="text" placeholder="Search..." />
                <button className="fa fa-search" />
            </div>
        );
    }
}