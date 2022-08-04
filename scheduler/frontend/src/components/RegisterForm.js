import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        
        let serviceOptions = this.props.services.map(service => {
            return {
                value: service.service, 
                label: service.service
            }
        });

        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' onChange={this.props.handleChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' placeholder='John' onChange={this.props.handleChange} /> 
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' placeholder='Smith' onChange={this.props.handleChange} /> 
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='jsmith' onChange={this.props.handleChange} /> 
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={this.props.handleChange} /> 
                </Form.Group>
                
                {
                    // render specialization field if registraiton type = 'Provider'
                    this.props.registrationType === 'Provider' ?
                        <>
                            <Form.Group className='mb-3' controlId='multiSelect'>                
                                <Form.Label>Specializations</Form.Label>
                                <Select options={serviceOptions} isMulti />
                            </Form.Group>
                        </> :
                        ''
                }


                <Button variant='primary' type='submit'>
                    Submit
                </Button>
                
            </Form>
        )
    }
    
}

export default RegisterForm