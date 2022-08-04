import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

class AppNavbar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
    
        let dynamicButtons
        if (this.props.state.loggedIn ) {
            dynamicButtons = (
            <>
                <LinkContainer to={`/user/${this.props.state.username}`}>
                    <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <Button onClick={this.props.handleLogout} variant='danger' className='dynamicButton'>Logout</Button>
            </>
            )
        } else {
            dynamicButtons = (
            <>
                <LinkContainer to="/login" >
                    <Nav.Link className='dynamicButton'>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register/client">
                    <Button className='dynamicButton' onClick={this.props.handleRegistrationSelection}>Register as a Client</Button>
                </LinkContainer>
                <LinkContainer to="/register/provider" onClick={this.props.handleRegistrationSelection}>
                    <Button className='dynamicButton' >Register as a Provider</Button>
                </LinkContainer>
            </>
            )
        }
    
        return (
            <>
            <Navbar>
                
                    <LinkContainer to='/'>
                        <Navbar.Brand href="#">Service Scheduler</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="justify-content-end">
                            <LinkContainer to='/'>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/providers">
                                <Nav.Link>Providers</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/services'>
                                <Nav.Link >Services</Nav.Link>
                            </LinkContainer>

                        </Nav>
                        <Navbar.Collapse className='justify-content-end'>
                                {dynamicButtons}
                        </Navbar.Collapse>
                    </Navbar.Collapse>
            </Navbar>

            </>
        )
    }
    
}

export default AppNavbar