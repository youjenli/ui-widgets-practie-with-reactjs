/// <reference types="react" />
import * as React from 'react';

interface ContentOfAccordion {
    sectionName:string;
    section:string;
    isActive?:boolean;
}

export class Accordion extends React.Component<ContentOfAccordion, ContentOfAccordion> {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        if (!props.hasOwnProperty('isActive')) {
            props.isActive = false;
        }
        this.state = props;
    }
    onClick() {
        this.setState({
            isActive:!this.state.isActive
        });
    }
    render () {
        return (
            <div className="accordion" onClick={this.onClick}>
                <button className={this.state.isActive ? 'sectionName active' : 'sectionName'}>{this.state.sectionName}</button>
                <div className={this.state.isActive ? 'section active' : 'section'}>{this.state.section}</div>
            </div>
        )
    }
}