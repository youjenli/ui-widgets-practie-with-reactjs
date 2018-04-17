/// <reference types="react" />
import * as React from 'react';

export interface InputFieldWithPhraseRecommendationProps {
    placeHolderOfInputField: string;
    textOfActionButton: string;
    candidateItems: string[];
}

interface InputFieldWithPhraseRecommendationState {
    recommendationList: string[]
    inputPhrase: string
    indexOfHighlightedRecommendation: number
}

export class InputFieldWithPhraseRecommendation extends React.Component<InputFieldWithPhraseRecommendationProps, InputFieldWithPhraseRecommendationState> {
    defaultSettingsOfRecommendationList: InputFieldWithPhraseRecommendationState
    inputField: HTMLInputElement
    constructor(props) {
        super(props);
        this.generateRecommendations = this.generateRecommendations.bind(this);
        this.pickRecommendation = this.pickRecommendation.bind(this);
        this.defaultSettingsOfRecommendationList = {
            recommendationList: [],
            inputPhrase: "",
            indexOfHighlightedRecommendation: -1
        };
        this.state = this.defaultSettingsOfRecommendationList;
    }
    pickRecommendation(e) {
        if (this.state.recommendationList.length <= 0) {
            return;
        }

        if (e.keyCode == 40) {
            this.setState({
                indexOfHighlightedRecommendation: (this.state.indexOfHighlightedRecommendation + 1) % this.state.recommendationList.length
            });
        } else if (this.state.indexOfHighlightedRecommendation >= 0 && e.keyCode == 13) {
            this.inputField.value = this.state.recommendationList[this.state.indexOfHighlightedRecommendation];
            console.log(`update input field with ${this.state.recommendationList[this.state.indexOfHighlightedRecommendation]}`);
            this.setState(this.defaultSettingsOfRecommendationList);
        } else if (e.keyCode == 27) {
            this.setState(this.defaultSettingsOfRecommendationList);
        }
    }
    generateRecommendations(e) {
        const inputPhrase = e.target.value;
        let recommendationState = null;
        if (inputPhrase == "") {
            recommendationState = this.defaultSettingsOfRecommendationList;
        } else {
            const lengthOfInputPhrase = inputPhrase.length;
            const recommendationList: string[] = [];
            const upperCasedInputPhrase = inputPhrase.toUpperCase();
            for (let i = 0; i < this.props.candidateItems.length; i += 1) {
                if (this.props.candidateItems[i].substring(0, lengthOfInputPhrase).toUpperCase() == upperCasedInputPhrase) {
                    recommendationList.push(this.props.candidateItems[i]);
                }
            }
            recommendationState = {
                recommendationList: recommendationList,
                inputPhrase: inputPhrase,
                indexOfHighlightedRecommendation: -1
            }
        }
        this.setState(recommendationState);
    }
    render() {
        const lengthOfInputPhrase = this.state.inputPhrase.length;
        const recommendations = this.state.recommendationList.map((item, idx) => {
            const boldCharacters = item.substring(0, lengthOfInputPhrase);
            const additionalClasses = idx == this.state.indexOfHighlightedRecommendation ? " active" : "";
            return (
                <div className={"recommendedItem" + additionalClasses}>
                    <strong dangerouslySetInnerHTML={{ __html: boldCharacters }}></strong>
                    <span dangerouslySetInnerHTML={{ __html: item.substring(lengthOfInputPhrase) }}></span>
                </div>
            )
        });

        return (
            <div className="phraseRecommendation">
                <div className="inputField">
                    <input type="text" placeholder={this.props.placeHolderOfInputField} onInput={this.generateRecommendations} onKeyDown={this.pickRecommendation} ref={input => this.inputField = input} />
                    <div className="recommendations">{recommendations}</div>
                </div>
                <button className="actionBtn">{this.props.textOfActionButton}</button>
            </div>
        );
    }
}

interface LoginFormState {
    isActive: boolean;
}

export class PopupLoginForm extends React.Component<{}, LoginFormState> {
    constructor(props) {
        super(props);
        this.toggleLoginFormState = this.toggleLoginFormState.bind(this);
        this.state = {
            isActive: false
        };
    }
    toggleLoginFormState() {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    render() {
        const additionalClasses = this.state.isActive ? " active" : "";

        return (
            <div>
                <button className="login" onClick={this.toggleLoginFormState}>Login</button>
                <div className={"loginFormBackground" + additionalClasses} onClick={this.toggleLoginFormState}>
                </div>
                <div className={"loginForm" + additionalClasses}>
                    <div className="controlPanel">
                        <div className="closeBtn" onClick={this.toggleLoginFormState}>✖</div>
                    </div>
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="avatar" />
                    <fieldset>
                        <legend>Account Information</legend>
                        <label htmlFor="username">User name</label>
                        <input type="text" placeholder="Enter Username" name="username" required />
                        <label htmlFor="psw">Password</label>
                        <input type="password" placeholder="Enter Password" name="psw" required />
                        <button className="submitBtn">Login</button>
                        <input type="checkbox" name="remember" checked /><label htmlFor="remember">Remember Me</label>
                    </fieldset>
                    <div className="optionsPanel">
                        <button className="cancelBtn">Cancel</button>
                        <div className="pwRecovery">Forgot&nbsp;<a href="#">password?</a></div>
                    </div>
                </div>

            </div>
        )
    }
}

export class ResponsiveForms extends React.Component {
    render() {
        return (
            <form className="responsive">
                <div className="field">
                    <label htmlFor="firstName"><span>First Name</span></label><input name="firstName" type="text" placeholder="Your name..." />
                </div>
                <div className="field"><label htmlFor="lastName"><span>Last Name</span></label><input name="lastName" type="text" placeholder="Your name..." /></div>
                <div  className="field"><label htmlFor="country"><span>Country</span></label><select name="country"><option>Taiwan</option></select></div>
                <div className="field"><label htmlFor="subject"><span>Subject</span></label><textarea name="subject" placeholder="Write something..."></textarea></div>
                <div className="field submit"><button className="submitBtn">Submit</button></div>
            </form>
        )
    }
}

