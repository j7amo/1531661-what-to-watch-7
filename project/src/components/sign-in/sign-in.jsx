import React, { useRef, useState } from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import Footer from '../footer/footer';
import { signIn } from '../../store/api-actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToastMessage from '../toast-message/toast-message';
import {AppRoute, AuthorizationStatus, ToastErrorMessage} from '../../const';
import {getAuthorizationStatus} from '../../store/selectors';
import {Redirect} from 'react-router-dom';

function SignIn({onSubmit, authorizationStatus}) {

  const [passwordError, setPasswordError] = useState(false);
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (passwordRef.current.value.replaceAll(' ', '').length > 0) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setPasswordError(true);
    }
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.MAIN} />;
  }

  return (
    <React.Fragment>
      <SvgInjector />
      <div className="user-page">
        <header className="page-header user-page__head">
          <SiteLogo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" data-testid="email-input"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" data-testid="password-input"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
          {passwordError && <ToastMessage message={ToastErrorMessage.SIGN_IN_PASSWORD_ERROR}/>}
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(credentials) {
    dispatch(signIn(credentials));
  },
});

const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  onSubmit: PropTypes.func,
  authorizationStatus: PropTypes.string,
};

export default ConnectedSignIn;
