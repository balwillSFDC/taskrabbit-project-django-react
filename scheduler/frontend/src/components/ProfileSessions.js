import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav' 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

class ProfileSessions extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let display

        // Dynamic rendering of Session history 
        // if filteredSessions props has no session details, display message
        // else, display the sessions and their details
        if (this.props.filteredSessions.length === 0) {
            display = "You have no previous sessions" 
        } else {            
            display = (
                <Table size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Provider</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Estimated Hours</th>
                            <th>Availability Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.filteredSessions.map((session, i) => {
                                let startTime = new Date(session.availability.start_datetime).toLocaleTimeString()
                                let endTime = new Date(session.availability.end_datetime).toLocaleTimeString()
                                let date = new Date(session.availability.date).toLocaleDateString()
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{session.client.first_name} {session.client.last_name}</td>
                                        <td>{session.provider.first_name} {session.provider.last_name}</td>
                                        <td>{session.service.service}</td>
                                        <td>{date}</td>
                                        <td>{session.estimated_hours}</td>
                                        <td>{session.availability.start_time} - {session.availability.end_time}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            )
        }

        // Conditional rendering of 'Past Sessions' + 'Upcoming Sessions' tabs
        // If the Profile is for the signed in user, display tabs, else only display
        // availability tab
        let tabs;
        if (this.props.isSignedInUser) {
            tabs = (
                <>
                <Nav.Item onClick={this.props.handleTabSelection}>
                    <Nav.Link active={this.props.tabSelected == 'Past Sessions'}>Past Sessions</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={this.props.handleTabSelection}>
                    <Nav.Link active={this.props.tabSelected == 'Upcoming Sessions'}>Upcoming Sessions</Nav.Link>
                </Nav.Item>
            
                </>    
            )
        } else {
            tabs = (
                <>
                <Nav.Item onClick={this.props.handleTabSelection}>
                    <Nav.Link active={this.props.tabSelected == 'Availability'}>Availability</Nav.Link>
                </Nav.Item>
                </>
            )
        }

        return (
            <Row>
                <Col md={12}>
                    <Card id='profile-sessions'>
                        <Card.Header>
                            <Nav variant='tabs' defaultActiveKey='pastSessions'>
                                {tabs}               
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {this.props.tabSelected}
                            </Card.Title>
                            <Card.Text>
                                {display}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ProfileSessions