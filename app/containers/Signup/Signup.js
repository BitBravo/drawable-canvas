import React from 'react';
import { Helmet } from 'react-helmet';
import { Input } from 'components/Elements';
import { Link } from 'react-router-dom'


import './style.scss';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    }
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    event.preventDefault();
    const formData = {};
      for (const data in this.refs) {
        formData[data] = this.refs[data].value;
      }
    console.log(formData);
  }

  render() {
    return (
      <div className="login-page">
        <Helmet>
          <title>Login Page</title>
          <meta
            name="description"
            content="Login page of Car recognization System"
          />
        </Helmet>

        <div className="grid align__item">
          <div className="register">
            <h2>Sign Up</h2>
            <form className="form">
              <div className="form__field">
                <input type="email" ref="email" placeholder="info@mailaddress.com" />
              </div>

              <div className="form__field">
                <input type="password" ref="password" placeholder="••••••••••••" />
              </div>

              <div className="form__field">
                <input type="password" ref="confirmpassword" placeholder="••••••••••••" />
              </div>

              <div className="form__field">
                <input type="submit" value="Sign up" />
              </div>
            </form>
            <p>Already have an accout? <Link to='login'>Login</Link></p>
          </div>
        </div>
      </div>
    );
  }
}