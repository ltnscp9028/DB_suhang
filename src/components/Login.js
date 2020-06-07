import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import '../style/login.css';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`


class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: '',
    }


    render() {
        const handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        const { login, email, password, name } = this.state;
        return (
            <div>
                {/* <div className='link_font'>{login ? 'Login' : 'Sign Up'}</div> */}
                <div className="input_wrapper">
                    {!login && (
                        <input
                            value={name}
                            onChange={handleChange}
                            type="text"
                            placeholder="    Your name"
                            name="name"
                        />
                    )}
                    <input
                        value={email}
                        onChange={handleChange}
                        type="text"
                        placeholder="    Your email address"
                        name="email"
                    />
                    <input
                        value={password}
                        onChange={handleChange}
                        type="password"
                        placeholder="    Choose a safe password"
                        name="password"
                    />
                </div>
                <div className="button_wrapper">
                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ email, password, name }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                            <div className="login_wrapper" onClick={mutation}>
                                {login ? 'login' : 'create account'}
                            </div>
                        )}
                    </Mutation>
                    <div
                        className="login_wrapper"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login
                            ? 'need to create an account?'
                            : 'already have an account?'}
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }

}

export default Login;