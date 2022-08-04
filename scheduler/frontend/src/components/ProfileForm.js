import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class ProfileForm extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            readOnly: true
        }

        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit() {
        this.setState({
            ...this.state,
            readOnly: !this.state.readOnly
        })
    }

    render() {

        // conditional render of edit button
        // if user is signed in, then display edit button
        let editButton = ''
        if (this.props.isSignedInUser) {
            editButton = <Button onClick={this.handleEdit}>{this.state.readOnly ? 'Edit' : 'Save'}</Button>
        }


        return (
            <Form id='profile-form'>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>
                        First Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            readOnly={this.state.readOnly} 
                            plaintext={this.state.readOnly}
                            defaultValue={this.props.userProfile.user.first_name} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>
                        Last Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            plaintext={this.state.readOnly}
                            readOnly={this.state.readOnly}
                            defaultValue={this.props.userProfile.user.last_name} 

                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            plaintext={this.state.readOnly} 
                            readOnly={this.state.readOnly} 
                            defaultValue={this.props.userProfile.user.email} 

                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>
                        Profile Picture
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            plaintext={this.state.readOnly} 
                            readOnly={this.state.readOnly} 
                            defaultValue={this.props.userProfile.profile_pic}     
                            as='textarea'
                            id='user-picture'
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>
                        Bio
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            plaintext={this.state.readOnly} 
                            readOnly={this.state.readOnly} 
                            defaultValue={this.props.userProfile.bio}     
                            as='textarea'
                            id='user-bio'
                        />
                    </Col>
                </Form.Group>                
                {editButton}

            </Form>
        )  
    }
}

export default ProfileForm