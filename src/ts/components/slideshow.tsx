/// <reference types="react" />
import * as React from 'react';

interface Slide {
    imageTitle?: string;
    imageSrc: string;
}

export interface SlideImages {
    slides:Slide[];
    indexOfActiveImage?:number;
}

export class Slideshow extends React.Component<SlideImages, SlideImages> {
    constructor(props) {
        super(props);
        this.state = this.props;
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
    }
    previousImage() {
        let indexOfPreviousImage = this.state.indexOfActiveImage - 1;
        if (indexOfPreviousImage < 0) {
            indexOfPreviousImage = this.state.slides.length - 1;
        }
        this.setState({
            indexOfActiveImage:indexOfPreviousImage
        });
    }
    nextImage() {
        let indexOfNextActiveImage = this.state.indexOfActiveImage + 1;
        if (indexOfNextActiveImage == this.state.slides.length) {
            indexOfNextActiveImage = 0;
        }
        this.setState({
            indexOfActiveImage:indexOfNextActiveImage
        });
    }
    render() {
        const self = this;
        const images = this.state.slides.map(function(slide, idx){
            const className = idx == self.state.indexOfActiveImage ? " active" : "";
            const title = slide.imageTitle || "";
            return (<img src={slide.imageSrc} alt={title} className={className} />)
        });
        const directivePoints = Array(this.state.slides.length).map(function(directive, idx){
            const additionalClassName = idx == self.state.indexOfActiveImage ? " active" : "";
            return (<div className={"point" + additionalClassName}></div>);
        });

        return (
            <div className="widget slideshow">
                <div className="imageFrame">
                    {images}
                    <div className="pageIdx">{this.state.indexOfActiveImage + 1}&nbsp;/&nbsp;{this.props.slides.length}</div>
                    <button className="slider prev" onClick={this.previousImage}>&#10094;</button>
                    <button className="slider next" onClick={this.nextImage}>&#10095;</button>
                    <div className="title">{this.state.slides[this.state.indexOfActiveImage].imageTitle}</div>
                </div>
                <div className="directive">
                    {directivePoints}
                </div>
            </div>
        );
    }
}