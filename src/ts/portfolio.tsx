/// <reference types="React" />
/// <reference types="react-dom" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface CaseStudyProps {
    imgSrc:string;
    name:string;
    synopsis:string;
    isSpotlight:boolean;
}

class CaseStudy extends React.Component<CaseStudyProps> {
    isSpotlight:boolean;
    constructor(props){
        super(props);
        this.isSpotlight = props.isSpotlight;
    }
    render () {
        const additionalClassNames = this.props.isSpotlight ? " spotlight":"";
        return (
            <div className={"case-study" + additionalClassNames}>
                <img src={this.props.imgSrc} alt={this.props.name} />
                <h3>{this.props.name}</h3>
                <p>{this.props.synopsis}</p>
            </div>
        );
    }
}

interface PortfolioProps {
    caseStudies:CaseStudyProps[];
}

class Portfolio extends React.Component<PortfolioProps> {
    constructor(props) {
        super(props);
    }
    render () {
        let normalCase: JSX.Element[] = [];
        let spotlightCase: JSX.Element[] = [];
        this.props.caseStudies.forEach(function(caseProps){
            const caseStudy = (<CaseStudy imgSrc={caseProps.imgSrc} name={caseProps.name} synopsis={caseProps.synopsis} isSpotlight={caseProps.isSpotlight} />);
            if (caseProps.isSpotlight) {
                spotlightCase.push(caseStudy);
            } else {
                normalCase.push(caseStudy);
            }
        });

        return (
            <div className="widget portfolio">
                <div className="normal-case">
                    {normalCase}
                </div>
                <div className="spotlight-case">
                    {spotlightCase}
                </div>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', function(){

    const caseStudies: CaseStudyProps[] = [{
        imgSrc:'https://www.w3schools.com/w3images/mountains.jpg',
        name:'My work 1',
        synopsis:'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight:false
    },{
        imgSrc:'https://www.w3schools.com/w3images/lights.jpg',
        name:'My work 1',
        synopsis:'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight:false
    },{
        imgSrc:'https://www.w3schools.com/w3images/nature.jpg',
        name:'My work 3',
        synopsis:'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight:false
    },{
        imgSrc:'https://www.w3schools.com/w3images/mountains.jpg',
        name:'My work 4',
        synopsis:'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight:false
    },{
        imgSrc:'https://www.w3schools.com/w3images/p3.jpg',
        name:'My spotlight',
        synopsis:`Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.

        Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.`,
        isSpotlight:true
    }];

    ReactDOM.render(
        <Portfolio caseStudies={caseStudies} />,
        document.getElementById('react-root')
    );
});