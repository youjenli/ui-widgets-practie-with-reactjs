/// <reference types="React" />
/// <reference types="react-dom" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IconBar } from './components/iconBar';
import { Catagory, CatagoryButton } from './widgets/catagory';
import { CaseStudy, SuccessStory } from './widgets/caseStudy';
import { PopupLoginForm, InputFieldWithPhraseRecommendationProps, InputFieldWithPhraseRecommendation, ResponsiveForms } from './components/forms';
import { Story, DevelopmentFootPrint } from './components/developmentFootPrint';

interface CaseStudyProps extends CaseStudy {
    catagories: Catagory[];
}

interface PortfolioProps {
    caseStudies: CaseStudyProps[];
}

interface PortfolioState {
    visibleCatagory: Catagory;
}

class Portfolio extends React.Component<PortfolioProps, PortfolioState> {
    constructor(props) {
        super(props);
        this.state = {
            visibleCatagory: Catagory.ALL
        };
        this.generateCatagorySelectionHandler = this.generateCatagorySelectionHandler.bind(this);
    }
    generateCatagorySelectionHandler(catagory: Catagory) {
        return () => { this.setState({ visibleCatagory: catagory }); };
    }
    render() {
        const availableCatagories = [];
        let catagorySelections = null;
        let normalCase: JSX.Element[] = [];
        let spotlightCase: JSX.Element[] = [];
        let catagoryFilter: (tags?: Catagory[]) => boolean = null;
        if (this.state.visibleCatagory == Catagory.ALL) {
            catagoryFilter = function () {
                return true;
            }
        } else {
            catagoryFilter = (tags: Catagory[]) => {
                if (tags.indexOf(this.state.visibleCatagory) > -1) {
                    return true;
                } else {
                    return false;
                }
            };
        }
        this.props.caseStudies.forEach(function (caseProps) {
            caseProps.catagories.forEach(function (catagory) {
                if (availableCatagories.indexOf(catagory) < 0) {
                    availableCatagories.push(catagory);
                }
            });

            if (catagoryFilter(caseProps.catagories)) {
                const caseStudy =
                    <SuccessStory imgSrc={caseProps.imgSrc} name={caseProps.name} synopsis={caseProps.synopsis} isSpotlight={caseProps.isSpotlight} />;
                if (caseProps.isSpotlight) {
                    spotlightCase.push(caseStudy);
                } else {
                    normalCase.push(caseStudy);
                }
            }
        });

        catagorySelections = availableCatagories.map(catagory =>
            (<CatagoryButton catagory={catagory} onClick={this.generateCatagorySelectionHandler(catagory).bind(this)} />)
        );
        catagorySelections.push(
            (<CatagoryButton catagory={Catagory.ALL} onClick={this.generateCatagorySelectionHandler(Catagory.ALL).bind(this)} />)
        )

        return (
            <div className="widget portfolio">
                <div className="filters">
                    {catagorySelections}
                </div>
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

document.addEventListener('DOMContentLoaded', function () {

    const caseStudies: CaseStudyProps[] = [{
        imgSrc: 'https://www.w3schools.com/w3images/mountains.jpg',
        name: 'My work 1',
        synopsis: 'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight: false,
        catagories: [Catagory.WORK, Catagory.NATURE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/lights.jpg',
        name: 'My work 1',
        synopsis: 'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight: false,
        catagories: [Catagory.WORK, Catagory.NATURE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/nature.jpg',
        name: 'My work 3',
        synopsis: 'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight: false,
        catagories: [Catagory.WORK, Catagory.NATURE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/mountains.jpg',
        name: 'My work 4',
        synopsis: 'Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.',
        isSpotlight: false,
        catagories: [Catagory.WORK, Catagory.NATURE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/p3.jpg',
        name: 'My spotlight',
        synopsis: `Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.

        Lorem ipsum dolor sit amet, tempor prodesset eos no. Temporibus necessitatibus sea ei, at tantas oporteat nam. Lorem ipsum dolor sit amet, tempor prodesset eos no.`,
        isSpotlight: true,
        catagories: [Catagory.WORK, Catagory.PEOPLE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/mountains.jpg',
        name: 'Mountains',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.NATURE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/lights.jpg',
        name: 'Lights',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.NATURE]
    }, , {
        imgSrc: 'https://www.w3schools.com/w3images/forest.jpg',
        name: 'Forest',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.NATURE]
    }, {
        imgSrc: "https://www.w3schools.com/w3images/cars1.jpg",
        name: "Retro",
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.CARS]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/cars2.jpg',
        name: 'Fast',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: true,
        catagories: [Catagory.CARS]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/cars3.jpg',
        name: 'Classic',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.CARS]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/people1.jpg',
        name: 'Girl',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: true,
        catagories: [Catagory.PEOPLE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/people2.jpg',
        name: 'Man',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.PEOPLE]
    }, {
        imgSrc: 'https://www.w3schools.com/w3images/people3.jpg',
        name: 'Woman',
        synopsis: 'Lorem ipsum dolor...',
        isSpotlight: false,
        catagories: [Catagory.PEOPLE]
    }];

    const stories: Story[] = [
        {
            time: "2018/4/13",
            name: "完成工作經歷圖表雛型",
            story: "今天終於獨自完成工作歷程時間表...想創造的東西終於能實現, 實在太開心了",
            catagories: ['大事', '豐功', '偉業'],
            articleURL: '#'
        },
        {
            time: "2018/4/13",
            name: "增加經歷圖表內容",
            story: "地球上有許多文化, 生活習慣大相逕庭的種族, 統一地球不是一件容易的事...但今天我還完成了!",
            catagories: ['豐功', '偉業'],
            articleURL: '#'
        },
        {
            time: "2018/4/13",
            name: "達成生涯階段目標",
            story: "我的夢想是征服宇宙, 成立銀河帝國...很高興能在 2018/4/13 完成!",
            catagories: ['大事', '豐功'],
            articleURL: '#'
        }
    ]

    const candidateItems = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    ReactDOM.render(
        <div>
            <IconBar />
            <PopupLoginForm />
            <InputFieldWithPhraseRecommendation placeHolderOfInputField="Choose a country..." textOfActionButton="Submit" candidateItems={candidateItems} />
            <ResponsiveForms />
            <Portfolio caseStudies={caseStudies} />
            <DevelopmentFootPrint stories={stories} />
        </div>,
        document.getElementById('react-root')
    );
});