import React, { useState } from 'react';
import './sign-in.styles.scss';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';


const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    
    const [userCredentials, setCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = (event => {
        const {name, value} = event.target;
        setCredentials({...userCredentials, [name]: value});
    })

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your Email and Password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                name="email" 
                type="email" 
                value={email}
                label="email"
                required
                handleChange={handleChange}
                />

                <FormInput 
                name="password" 
                type="password" 
                label="password"
                value={password} 
                required 
                handleChange={handleChange}
                />

                <div className="buttons">
                    <CustomButton type="Submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
        );
    


    
}



const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);