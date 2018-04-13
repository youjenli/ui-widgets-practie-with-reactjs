/// <reference types="react" />
import * as React from 'react';

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