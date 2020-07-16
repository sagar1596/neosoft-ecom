import React from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo"></Logo>
        </Link>
        <div className="options">
            <Link to="/shop" className="option">SHOP</Link>
            <Link to="/shop" className="option">CONTACT</Link>

            {
                currentUser ? 
                (<div className="option" onClick={signOutStart}>SIGN OUT</div>) :
                (<Link className="option" to="/signin">SIGN IN</Link>)
            }
            <CartIcon />
        </div>
        {
            hidden ?
            null : 
            <CartDropdown />
        }
        
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);