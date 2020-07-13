import React from 'react';
import './sign-in.styles.scss';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
// import { useHistory } from 'react-router-dom';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }


    render() {
        const { googleSignInStart } = this.props;
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
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
        )
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        const { emailSignInStart } = this.props;
        
        emailSignInStart(email, password);
    }

    handleChange = (event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    })
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);