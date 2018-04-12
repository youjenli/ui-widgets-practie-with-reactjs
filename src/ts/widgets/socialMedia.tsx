/// <reference types="react" />
import * as React from 'react';

export class ShareOnFacebook extends React.Component {
    render () {
        return (
            <a href="#" className="fa fa-facebook"></a>
        );
    }
}

export class SearchWithGoogle extends React.Component {
    render () {
        return (
            <a href="#" className="fa fa-google"></a>
        )
    }
}

export class SeeMeOnLinkedIn extends React.Component {
    render () {
        return (
            <a href="#" className="fa fa-linkedin"></a>
        )
    }
}

export class WatchOnYoutube extends React.Component {
    render() {
        return (
            <a href="#" className="fa fa-youtube"></a>
        )
    }
}

export class SocialMediaButtons extends React.Component {
    render () {
        return (
            <div className="widget socialMedia">
                <ShareOnFacebook />
                <SeeMeOnLinkedIn />
                <SearchWithGoogle />
                <WatchOnYoutube />
            </div>
        )
    }
}