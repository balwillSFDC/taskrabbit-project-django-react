import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import DisplayCard from '../components/DisplayCard';

class Services extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            services: []
        }
    }

    async componentDidMount() {
        // todo replace hardcoded url
        let response = await fetch('http://127.0.0.1:8000' + "/api/services")
        let json_response = await response.json()

        this.setState({
            ...this.state,
            services: json_response
        })
    }

    render() {



        return (
            <>
                <h1>Services</h1>
                <Row md={3} xs={1}>
                    {
                        this.state.services.map(service => {
                            return (
                                <Col>
                                    <DisplayCard title={service.service} description={service.description} picture={service.picture} buttonText='Find Availabilities' buttonLink={`services/${service.service.replace(/\W+|\s/g, '-')}`} class='service' imgClass='service-img' /> 
                                </Col>
                            )
                        })       
                    }
                    
                </Row>
            </>
            
        )
    }
    
}

export default Services