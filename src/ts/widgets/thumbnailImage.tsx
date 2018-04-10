/// <reference types="react" />
import * as React from 'react';

export class ThumbnailImage extends React.Component {
    render () {
        return (
            <a target="_blank" href="https://www.w3schools.com/howto/img_forest.jpg">
                <img className="thumbnailImage" src="https://www.w3schools.com/howto/img_forest.jpg" alt="forest" />
            </a>
        );
    }
}