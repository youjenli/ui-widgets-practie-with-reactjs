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
        let classOfSectionName;
        const styleOfSectionName:React.CSSProperties = {};
        
        if (this.state.isActive) {
            classOfSectionName = 'sectionName active';
            const section = document.querySelector('.accordion .section');
            if (section) {
                styleOfSectionName.maxHeight = section.scrollHeight + 'px';
            }
        } else {
            classOfSectionName = 'sectionName';
            styleOfSectionName.maxHeight = 0;
        }
            
        return (
            <div className="widget accordion" onClick={this.onClick}>
                <button className={classOfSectionName}>{this.state.sectionName}</button>
                <div className='section' style={styleOfSectionName}>{this.state.section}</div>
            </div>
        )
    }
}