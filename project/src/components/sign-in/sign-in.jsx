import React, {useRef} from 'react';
import SvgInjector from '../svg-injector/svg-injector';
import SiteLogo from '../site-logo/site-logo';
import Footer from '../footer/footer';
import {signIn} from '../../store/api-actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function SignIn({onSubmit}) {

  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      email: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

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
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit(credentials) {
    dispatch(signIn(credentials));
  },
});

const ConnectedSignIn = connect(null, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  onSubmit: PropTypes.func,
};

export default ConnectedSignIn;
