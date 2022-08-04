import React from 'react'
import AvailabilityRecordDisplay from '../components/AvailabilityRecordDisplay'
import LoadingSpinner from '../components/LoadingSpinner'

class ServiceDetail extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            slug: window.location.pathname.split('/').pop(),
            serviceDetail: null,
            availabilities: []
        }
    }

    async componentDidMount() {
        // todo: remove hardcoded url
        let response_service = await fetch('http://127.0.0.1:8000' + `/api/services/?slug=${this.state.slug}`)
        let response_json_service = await response_service.json() 
        console.log(response_json_service)

        this.setState({
            ...this.state,
            serviceDetail: response_json_service[0]
        })
        
        // todo: replace hardcoded url
        let response_availabilities = await fetch('http://127.0.0.1:8000' + `/api/availabilities/?provider__specializations__slug=${this.state.slug}`)
        let response_json_availabilities = await response_availabilities.json()
        console.log(response_json_availabilities)
        this.setState({
            ...this.state,
            availabilities: response_json_availabilities
        })

    }

    render() {

        let display; 
        if (this.state.serviceDetail === null) {
            display = <LoadingSpinner /> 
        } else {


            let availabilities = this.state.availabilities.filter(availability => availability.is_closed === false)
            

            display = (
                <>
                <h2>Searching for: {this.state.serviceDetail.service}</h2>
                <AvailabilityRecordDisplay availabilities={availabilities} loggedIn={this.props.loggedIn} />
                </>
                
            )
        }

        return (
            <>
                {display}
            </>           
        )
    }
}

export default ServiceDetail