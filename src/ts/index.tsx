/// <reference types="react-dom" />
/// <reference types="React" />
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MenuIcon, AnimatedMenuIcon } from './components/menuIcon';
import { IconBar } from './components/iconBar';
import { Accordion } from './components/accordion';
import { TopNavigationWithDropdownMenu } from './components/topNavigation';
import { Header } from './components/header';
import { HoverableDropdown, ClickableDropdown } from './components/dropdowns';
import { Pagination } from './components/pagination';
import { SlideImages, Slideshow } from './components/slideshow';
import { ModalImage, ImageOverlayFadeInBox } from './widgets/imageDisplayStand';

document.addEventListener('DOMContentLoaded', function(){
    const reactRoot = document.getElementById('react-root');

    const slideImages: SlideImages = {
        slides:[
            {
                imageTitle:"Caption Text",
                imageSrc:"https://www.w3schools.com/howto/img_nature_wide.jpg"
            },
            {
                imageTitle:"Caption Two",
                imageSrc:"https://www.w3schools.com/howto/img_fjords_wide.jpg"
            },
            {
                imageTitle:"Caption Three",
                imageSrc:"https://www.w3schools.com/howto/img_lights_wide.jpg"
            }
        ],
        indexOfActiveImage:0
    }

    ReactDOM.render(
        <div>
            <IconBar />
            <AnimatedMenuIcon />
            <Slideshow slides={slideImages.slides} indexOfActiveImage={slideImages.indexOfActiveImage} />
            <Accordion sectionName="section 1" section="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." isActive={true} />
            <ImageOverlayFadeInBox />
            <HoverableDropdown isHovered={false} />
            <ClickableDropdown isClicked={false} />
            <Header />
            <TopNavigationWithDropdownMenu foldedMenu={false} />
            <ModalImage src="https://www.w3schools.com/howto/img_fjords.jpg" alt="Trolltunga, Norway" />
            <Pagination pageCount={6} />
        </div>,
        reactRoot
    );
});