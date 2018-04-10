/// <reference types="react" />
import * as React from 'react';

interface ModelImageProps {
    src:string;
    alt:string;
}

interface ModelImageState {
    isActive:boolean;
}

export class ModalImage extends React.Component<ModelImageProps, ModelImageState> {
    constructor(props) {
        super(props);
        this.state = {
            isActive:false
        };
        this.toggleModalBox = this.toggleModalBox.bind(this);
    }
    toggleModalBox () {
        this.setState({
            isActive:!this.state.isActive
        });
    }
    render() {
        const additionalClassNamesOfModal = this.state.isActive ? " active" : "";

        return (
            <div className="widget modalImage">
                <div id="myModal" className={"modal" + additionalClassNamesOfModal}>
                    <span className="close" onClick={this.toggleModalBox}>&times;</span>
                    <img src={this.props.src} alt={this.props.alt}/>
                    <div className="caption">{this.props.alt}</div>
                </div>
                <img src={this.props.src} alt={this.props.alt} id="img01" onClick={this.toggleModalBox}/>
            </div>
        )
    }
}