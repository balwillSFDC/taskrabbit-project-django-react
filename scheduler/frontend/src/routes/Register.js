import React from 'react';
import RegisterForm from '../components/RegisterForm';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            password: '',
            email: '',
            username: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    async handleSubmit(e) {
        e.preventDefault() 

        let response = await fetch('http://127.0.0.1:8000/' + 'api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
                email: this.state.email,
                username: this.state.username,
                type: '',
                is_active: true,
                registrationType: this.props.registrationType
            })
        })

        let status = await response.status
        let json_response = await response.json()
        
        console.log(status)
        // If user creation is successful, get authToken and store in localstorage
        if (status === 201) {
            this.props.handleLogin(this.state.username, this.state.password)
            // await fetch('http://127.0.0.1:8000' + `/profiles/${}`, {

            // })
        }

        console.log(json_response)
    }

    handleChange(e) {
        if (e.target.id === 'formBasicEmail') {
            this.setState({
                ...this.state,
                email: e.target.value
            })
        } 

        if (e.target.id === 'formBasicFirstName') {
            this.setState({
                ...this.state,
                first_name: e.target.value
            })
        }

        if (e.target.id === 'formBasicLastName') {
            this.setState({
                ...this.state,
                last_name: e.target.value
            })
        }

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

    render() {
        return (
            <div>
                <h1>Register as a {this.props.registrationType}</h1>
                <RegisterForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} registrationType={this.props.registrationType} services={this.props.services}/>
            </div>
            
        )
    }
    
}

export default Register