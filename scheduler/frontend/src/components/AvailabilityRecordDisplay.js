import React from 'react' 
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FlashMessage from './FlashMessage'


class AvailabilityRecordDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            availabilities: props.availabilities
        }
    }

    render() {
        // todo: enable pagination
        // If there are availabilities to display, render them. Else, display message that there are no records found matching the criteria
    
        let display
        if (this.props.availabilities.length > 0) {

            // loop through availability records and create cards
            display = (
                <>
                {this.props.availabilities.map(availability => {
                    let hireButton
                    if (this.props.loggedIn) {
                        let data = {
                            availability: availability,
                            selectedService: this.props.selectedService,
                            user: this.props.loggedInUserProfile,
                            estimated_hours: this.props.estimated_hours === 0 ? 
                                                availability.available_hours : 
                                                this.props.estimated_hours
                        }
                        
                        hireButton = (
                            <Button 
                                variant='success' 
                                onClick={(e) => {this.props.handleHire(e, data)} }
                            >
                                Hire
                            </Button>
                        )
                    } else {
                        hireButton = ''
                    }
    
                    return (
                        <Card className='availability-record' key={availability.id}>
                            <Card.Body>
                                <Row>
                                    <Col lg={2}>
                                        <img src={availability.provider.profile_pic} className='availability-provider-pic' />
                                    </Col>
                                    <Col lg={8}>
                                        <Card.Title>{availability.provider.user.first_name} {availability.provider.user.last_name}</Card.Title>
                                        <Card.Subtitle className='mb-2 text-muted'>
                                            Available for {availability.available_hours} hours between {availability.start_time} - {availability.end_time} on {new Date(availability.date).toLocaleDateString()}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            Average Reviews: 5
                                        </Card.Text>
                                    </Col>
                                    <Col lg={2}>
                                        {hireButton}  
                                    </Col>
                                    
                                </Row>
                                
                            </Card.Body>
                        </Card>
                    )
                })}
                </>
            )
        } else {
            let message = 'There are no records found matching that criteria'
            display = (
                <FlashMessage type='info' message={message} /> 
            )
        }

        return (
            <>

            <div className='availabilityResults'>
                {display}
            </div>
            </>
            
        )
    }

}

export default AvailabilityRecordDisplay