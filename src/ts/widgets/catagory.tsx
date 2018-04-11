/// <reference types="React" />
import * as React from 'react';

export enum Catagory {
    ALL = "all",
    WORK = "work",
    NATURE = "nature",
    CARS = "cars",
    PEOPLE = "people"
}

interface CatagoryProps {
    catagory: Catagory;
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export class CatagoryButton extends React.Component<CatagoryProps> {
    render() {
        return (
            <button className="catagorySelection" onClick={this.props.onClick}>
                {this.props.catagory}
            </button>
        );
    }
}