/// <reference types="React" />
import * as React from 'react';
import { Catagory } from './catagory';

export interface CaseStudy {
    imgSrc: string;
    name: string;
    synopsis: string;
    isSpotlight: boolean;
}


export class SuccessStory extends React.Component<CaseStudy> {
    isSpotlight: boolean;
    constructor(props) {
        super(props);
        this.isSpotlight = props.isSpotlight;
    }
    render() {
        const spotlightClassNames = this.props.isSpotlight ? " spotlight" : "";
        /*let catagoryClassNames = "";
        this.props.tags.forEach(function (tag, idx) {
            const className = Catagory[tag];
            if (className != undefined) {
                catagoryClassNames += ` ${className}`;
            }
        });*/

        return (
            <div className={"case-study" + spotlightClassNames/* + catagoryClassNames*/}>
                <img src={this.props.imgSrc} alt={this.props.name} />
                <h3>{this.props.name}</h3>
                <p>{this.props.synopsis}</p>
            </div>
        );
    }
}