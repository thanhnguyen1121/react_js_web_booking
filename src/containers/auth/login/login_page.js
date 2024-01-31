import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import './login_style.scss';
import { AuthService } from '../../../services';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            showPassword: false,
            errorMessage: "",
        };
    }

    handleEmailChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleClickLogin = async () => {
        this.setState({
            errorMessage: ''
        });
        try {
            let result = await AuthService.handleLogin(
                {
                    "email": this.state.userName,
                    "password": this.state.password
                }
            );

            if (result.data) {
                this.setState({
                    errorMessage: "Login success",
                });
                this.props.userLoginSuccess(result.data);
            } else {
                this.setState({
                    errorMessage: result.message,
                });
            }
        } catch (error) {
            this.setState({
                errorMessage: error.message
            });
        }

    }

    onHandleShowOrHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        return (
            <div className='login-page-container'>
                <div className='login-form-container'>

                    <div className='login-title'>Login</div>

                    <div className='form-group mt-3'>
                        <label className='lable-text'>User name</label>
                        <input type='email'
                            className='form-control'
                            placeholder='Enter your email'
                            id='email'
                            onChange={(event) => this.handleEmailChange(event)}
                        />
                    </div>

                    <div className='form-group mt-3'>
                        <lable className='lable-text'>Password</lable>
                        <div className='custom-input-password'>
                            <input type={this.state.showPassword ? 'text' : 'password'}
                                className='form-control'
                                placeholder='Enter your password'
                                id='password'
                                onChange={(event) => this.handlePasswordChange(event)}
                            />
                            <i class={this.state.showPassword ? "fas fa-eye showOrHideIcon" : "fas fa-eye-slash showOrHideIcon"}
                                onClick={() => this.onHandleShowOrHidePassword()}></i>
                        </div>
                    </div>

                    <div className='col-12 mt-2' style={{ color: "red" }}>
                        {this.state.errorMessage ?? ''}
                    </div>

                    <div type='button' className='login-button mt-4 btn' onClick={() => this.handleClickLogin()}>
                        Login
                    </div>

                    <div className='forgot-password mt-2'>
                        <lable type='button'>Forgot password?</lable>
                    </div>

                    <div className='login-options-name mt-2'>
                        Or login with:
                    </div>

                    <div className='login-container mt-4'>
                        <i type="button" className='fab fa-google login-with-google'></i>

                        <i type="button" className='fab fa-facebook-f login-with-facebook'></i>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFaild: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
