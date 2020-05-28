import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { useHistory } from 'react-router-dom';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }


    render() {
        return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your Email and Password</span>

            <form onSubmit={this.handleSubmit}>
                <FormInput 
                name="email" 
                type="email" 
                value={this.state.email}
                label="email"
                required
                handleChange={this.handleChange}
                />

                <FormInput 
                name="password" 
                type="password" 
                label="password"
                value={this.state.password} 
                required 
                handleChange={this.handleChange}
                />

                <div className="buttons">
                    <CustomButton type="Submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: "", password: ""});
        } catch(err) {
            console.err(err);
        }

        
    }

    handleChange = (event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    })
}

export default SignIn;