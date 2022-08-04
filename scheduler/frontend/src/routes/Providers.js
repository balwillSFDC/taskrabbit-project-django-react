import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import DisplayCard from '../components/DisplayCard';

class Providers extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            providers: []
        }
    }

    async componentDidMount() {
        // todo replace hardcoded url
        let response = await fetch('http://127.0.0.1:8000' + "/api/profiles?type=provider")
        let json_response = await response.json()
        this.setState({
            ...this.state,
            providers: json_response
        })
    }

    render() {
        return (
            <>
                <h1>Providers</h1>
                <Row md={3} xs={1}>
                    {
                        // for each provider, return display card for provider 
                        // todo: enable pagination
                        this.state.providers.map(provider => {
                            return (
                                <Col>
                                    <DisplayCard 
                                        title={`${provider.user.first_name} ${provider.user.last_name}`} 
                                        description={provider.bio} 
                                        picture={provider.profile_pic} 
                                        buttonText='View Profile' 
                                        buttonLink={`${window.location.origin}/user/${provider.user.username}`}
                                        imgClass='provider-img'
                                    /> 
                                </Col>
                            )
                        })       
                    }
                    
                </Row>
            </>
            
        )
    }
    
}

export default Providers