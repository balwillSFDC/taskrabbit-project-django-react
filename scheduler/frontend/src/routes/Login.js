import React from 'react';
import LoginForm from '../components/LoginForm'
import FlashMessage from '../components/FlashMessage';
import { Redirect } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        if (e.target.id === 'formBasicUsername') {
            this.setState({
                ...this.state,
                username: e.target.value
            })
        } 

        if (e.target.id === 'formBasicPassword') {
            this.setState({
                ...this.state,
                password: e.target.value
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault()
        let response = await this.props.handleLogin(this.state.username, this.state.password)

    }

    render() {
        let message = this.state.errorMessage ? <FlashMessage type={'danger'} message={this.state.errorMessage} /> : '' 

        return (
            <>
                <h1>Login</h1>
                {message}
                <LoginForm state={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            </>       
        )
    }
}

export default Login