import React, { useEffect } from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import { createStructuredSelector } from 'reselect';

import {connect} from 'react-redux';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import SignInAndSignUpPage  from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import CheckoutPage from './pages/checkout/checkout.component';

import { Switch, Route, Redirect } from 'react-router-dom';



const App = ({ currentUser, checkUserSession }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route 
            exact 
            path="/signin" 
            render={() => 
              (currentUser ? 
                (<Redirect to="/" />) : 
                (<SignInAndSignUpPage />))} />
        </Switch>
        </div>
    );

}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession : () => dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
