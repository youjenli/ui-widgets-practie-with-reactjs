/// <reference types="React" />
import * as React from 'react';
import { LoaderScreen } from '../widgets/loader';
import { MenuIcon, AnimatedMenuIcon } from '../components/menuIcon';
import { Accordion } from '../components/accordion';
import { TopNavigationWithDropdownMenu } from '../components/topNavigation';
import { Header } from '../components/header';
import { HoverableDropdown, ClickableDropdown } from '../components/dropdowns';
import { Pagination } from '../components/pagination';
import { SlideImages, Slideshow } from '../components/slideshow';
import { ModalImage, ImageOverlayFadeInBox, ImageOverlayTitle } from '../widgets/imageDisplayStand';
import { ThumbnailImage } from '../widgets/thumbnailImage';
import { ResponsiveImageGrid } from '../components/responsiveImageGrid';
import { ButtonWithPressedEffect, ButtonWithArrowOnHover, ScrollToTopButton } from '../widgets/buttons';
import { SocialMediaButtons } from '../widgets/socialMedia';
import { ToggleSwitch } from '../widgets/switch';

interface PageInitializerProps {
    activateLoaderScreen:boolean;
}

interface PageInitializerState {
    isPageReady: boolean;
}

export class PageInitializer extends React.Component<PageInitializerProps, PageInitializerState> {
    constructor(props) {
        super(props);
        this.dismissLoader = this.dismissLoader.bind(this);
        this.state = {
            isPageReady: false
        };
    }
    dismissLoader() {
        this.setState({
            isPageReady: true
        });
    }
    render() {
        const slideImages: SlideImages = {
            slides: [
                {
                    imageTitle: "Caption Text",
                    imageSrc: "https://www.w3schools.com/howto/img_nature_wide.jpg"
                },
                {
                    imageTitle: "Caption Two",
                    imageSrc: "https://www.w3schools.com/howto/img_fjords_wide.jpg"
                },
                {
                    imageTitle: "Caption Three",
                    imageSrc: "https://www.w3schools.com/howto/img_lights_wide.jpg"
                }
            ],
            indexOfActiveImage: 0
        }

        const buttonText = 'Hover';

        const mainFrameClasses = this.state.isPageReady ? "" : "behindTheScenes";
        const dismissLoader = this.props.activateLoaderScreen ? this.dismissLoader : () => {};

        return (
            <React.Fragment>
                {this.state.isPageReady ? null : <LoaderScreen />}
                <div id="pageContainer" className={mainFrameClasses} onLoad={dismissLoader}>
                    <Header />
                    <TopNavigationWithDropdownMenu foldedMenu={false} />
                    <AnimatedMenuIcon />
                    <Slideshow slides={slideImages.slides} indexOfActiveImage={slideImages.indexOfActiveImage} />
                    <Accordion sectionName="section 1" section="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." isActive={true} />
                    <ImageOverlayFadeInBox />
                    <ImageOverlayTitle />
                    <HoverableDropdown isHovered={false} />
                    <ClickableDropdown isClicked={false} />
                    <ToggleSwitch isActive={false} />
                    <ResponsiveImageGrid />
                    <ModalImage src="https://www.w3schools.com/howto/img_fjords.jpg" alt="Trolltunga, Norway" />
                    <ThumbnailImage />
                    <ButtonWithPressedEffect />
                    <ButtonWithArrowOnHover buttonText={buttonText} />
                    <ScrollToTopButton threshold={300} />
                    <SocialMediaButtons />
                    <Pagination pageCount={6} />
                </div>
            </React.Fragment>
        )
    }
}