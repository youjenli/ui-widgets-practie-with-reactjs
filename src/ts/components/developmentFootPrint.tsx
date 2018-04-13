/// <reference types="react" />
import * as React from 'react';

interface ArrowProps {
    position:'left'|'right';
}

export class Arrow extends React.Component<ArrowProps> {
    render() {
        const classes = 'arrow ' + this.props.position;
        return (
            <div className={classes}></div>
        );
    }
}

export interface Story {
    time:string;
    name:string;
    story:string;
    catagories:string[];
    articleURL:string;
}

const catagoryCSSClassMap:Map<string, string> = new Map<string, string>();
catagoryCSSClassMap.set('大事','red').set('豐功','orange').set('偉業','green');

interface StoryBoardProps extends ArrowProps, Story {}

export class StoryBoard extends React.Component<StoryBoardProps> {
    constructor(props) {
        super(props);
    }
    render() {
        const classNameOfStoryBoard = "dialog " + this.props.position;
        const catagoriesJSX = this.props.catagories.map(function(catagory){
            const catagoryCSSClass = catagoryCSSClassMap.get(catagory) || 'none';
            
            return (<div className={"catagory " + catagoryCSSClass}>{catagory}</div>)
        });

        return (
            <div className={classNameOfStoryBoard}>
                <h5 className="storyName">{this.props.time} - {this.props.name}</h5>
                <p className="story">
                    {this.props.story}
                </p>
                <div className="story-foot">
                    <div className="storyCatagory">
                        <div className="description">分類:</div>
                        {catagoriesJSX}
                    </div>
                    <a className="learnMore" href={this.props.articleURL}><span>了解更多...</span></a>
                </div>
            </div>
        )
    }
}

interface DevelopmentFootPrintProps {
    stories:Story[];
}

export class DevelopmentFootPrint extends React.Component<DevelopmentFootPrintProps> {
    render() {
        const storyBoardsOfAllStory = this.props.stories.map(function(story, idx){
            const arrowAndDialogPosition = ( idx % 2 == 0 ? 'left':'right' );
            const distanceFromTheOrigin = (idx+1) * 125;
            const style = {
                top:`${distanceFromTheOrigin}px`
            };
            return (
                <div className="timestamp" style={style}>
                    <Arrow position={arrowAndDialogPosition} />
                    <StoryBoard position={arrowAndDialogPosition} time={story.time} name={story.name} story={story.story} catagories={story.catagories} articleURL={story.articleURL} />
                </div>
            );
        });

        return (
            <div className="devFootPrint">
                <div className="timeline">
                    {storyBoardsOfAllStory}
                </div>
            </div>
        );
    }
}
