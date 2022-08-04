import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

    }

    render(){
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='jsmith' onChange={this.props.handleChange}/> 
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={this.props.handleChange}/> 
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default LoginForm