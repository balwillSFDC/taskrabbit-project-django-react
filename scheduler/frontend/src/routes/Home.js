import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HomeForm from '../components/HomeForm'
import AvailabilityRecordDisplay from '../components/AvailabilityRecordDisplay'

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            services: [],
            availabilities: [],
            filteredAvailabilities: [],
            selectedService: '',
            selectedDate: null,
            estimated_hours: 0
        }

        this.getAvailabilities = this.getAvailabilities.bind(this)
        this.getServices = this.getServices.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.filterAvailbilityRecords = this.filterAvailbilityRecords.bind(this)
        // this.handleHire = this.handleHire.bind(this)
    }

    async componentDidMount() {
        this.getServices()
        this.getAvailabilities()
    }

    componentDidUpdate(prevProps, prevState) {
        // if the selectedService, selectedDate or estimated_hours changes, update the filtered list of availability records
        if ((this.state.selectedService !== prevState.selectedService) || this.state.selectedDate !== prevState.selectedDate || this.state.estimated_hours !== prevState.estimated_hours) {
            this.filterAvailbilityRecords()
        }
    }
    
    async getServices() {
        // todo: replace hardcoded url
        // returns an Array of service objects
        let response = await fetch('http://127.0.0.1:8000' + '/api/services/')
        let jsonResponse = await response.json()
        
        // returns an array of services from service objects
        let services = jsonResponse.map(obj => obj.service)
        this.setState({
            ...this.state,
            services: services
        })
    }

    // Gets all Active Availability records 
    async getAvailabilities() {
        // todo replace hardcoded url
        let response = await fetch('http://127.0.0.1:8000' + '/api/availabilities')
        let json_response = await response.json()

        this.setState({
            ...this.state,
            availabilities: json_response
        })        
    }

    filterAvailbilityRecords() {
        let availabilityRecords = []

        this.state.availabilities.forEach(availability => {
            let provider_specializations = availability.provider.specializations.map(obj => obj.service)
            let hour_start_time = parseInt(availability.start_time.substring(0,2))
            let hour_end_time = parseInt(availability.end_time.substring(0,2))
            let available_hours = hour_end_time - hour_start_time
            let today = new Date()
            let availability_date = new Date(availability.date)
            // If the Provider specializes in the service selected and the date selected is
            // equal to the availability date, then add that availability record to be displayed

  
            if (
                provider_specializations.includes(this.state.selectedService)
                &&
                (availability.date == this.state.selectedDate || availability_date > today)  
                && 
                (available_hours >= this.state.estimated_hours || this.state.estimated_hours === 0)
            ) {
                // console.log(availability.end_time - availability.start_time)
                availability.available_hours = available_hours
                availabilityRecords.push(availability)
            }
        })
        
        this.setState({
            ...this.state,
            filteredAvailabilities: availabilityRecords
        })
    } 

    // Updates state based on form fields
    handleFormChange(e) {
        if (e.target.id === 'serviceSelect') {
            this.setState({
                ...this.state,
                selectedService: e.target.value 
            })
        }

        if (e.target.id === 'dateSelect') {
            this.setState({
                ...this.state,
                selectedDate: e.target.value
            })

        }
        if (e.target.id === 'hours') {
            this.setState({
                ...this.state,
                estimated_hours: e.target.value
            })
        }
    }

    render() {
        // Only display availability records once a user has selected a 
        let results;
        if (this.state.selectedService !== '') {
            results = (
                <div className='homepageResults'>
                    <h4>Searching For: {this.state.selectedService}</h4>
                    {
                        this.state.selectedDate ?
                        <h5>Date Selected: {this.state.selectedDate} </h5> 
                        :
                        ''
                    }
                    <AvailabilityRecordDisplay 
                        availabilities={this.state.filteredAvailabilities} 
                        loggedIn={this.props.loggedIn} 
                        handleHire={this.props.handleHire}
                        loggedInUserProfile={this.props.loggedInUserProfile}
                        selectedService={this.state.selectedService}
                        selectedDate={this.state.selectedDate}
                        estimated_hours={this.state.estimated_hours}
                    />
                </div>
            )
        } 

        return (
            <Row>
                <Col md={2}></Col>
                <Col md={8} className='home-form'>
                    <HomeForm 
                        services={this.state.services} 
                        handleFormChange={this.handleFormChange} 
                    />
                    {results}
                    
                </Col>
                <Col md={2}></Col>
            </Row>
        )    
    }
    
}


export default Home