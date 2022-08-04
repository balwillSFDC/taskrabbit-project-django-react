import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileForm from '../components/ProfileForm'
import ProfileSessions from "../components/ProfileSessions";
import LoadingSpinner from "../components/LoadingSpinner";
import {useLocation} from 'react-router-dom'


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: [],
            filteredSessions: [],
            tabSelected: 'Upcoming Sessions',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            bio: '',
            profile_pic: '',
            isSignedInUser: false
            
        }
        this.pullUsernameFromUrl = this.pullUsernameFromUrl.bind(this)
        this.handleTabSelection = this.handleTabSelection.bind(this)
        this.getUserProfile = this.getUserProfile.bind(this)
        this.getSessions = this.getSessions.bind(this)
        this.isProfileSignedInUser = this.isProfileSignedInUser.bind(this)
    }


    async componentDidMount() {
        // wait for username to get pulled from URL and set to state before retrieving profile
        await this.pullUsernameFromUrl()
        await this.getUserProfile()
        await this.getSessions()
        this.isProfileSignedInUser()
    }


    async componentDidUpdate(prevProps, prevState) {
        // if the selected user profile has changed, get the new user profile + sessions 
        if (this.props.location.pathname !== prevProps.location.pathname) {
            await this.pullUsernameFromUrl()
            await this.getUserProfile()
            await this.getSessions()
            this.isProfileSignedInUser()
        }

        // Update the Sessions displayed if sessions have changed (i.e. they have been retrieve)
        // Or, if the tab selected has changed
        if (this.state.sessions !== prevState.sessions || this.state.tabSelected !== prevState.tabSelected) {
            this.filterSessions()
        }
        
    }

    pullUsernameFromUrl() {
        let username = this.props.location.pathname.split('/').pop()
        
        this.setState({
            ...this.state,
            username: username
        })
    }

    // todo: enable profile editing (only for signed in users)
    onFormChange(e) {
        
    }

    async getUserProfile(getSessions) {
        let response_profiles = await fetch('http://127.0.0.1:8000' + `/api/profiles/?user__username=${this.state.username}`)
        let json_response_profiles = await response_profiles.json()


        this.setState({
            ...this.state,
            userProfile: json_response_profiles[0],   // only 1 profile should be returned
            first_name: json_response_profiles[0].user.first_name,
            last_name: json_response_profiles[0].user.last_name,
            email: json_response_profiles[0].user.email,
            bio: json_response_profiles[0].bio
        })

        this.getSessions()
    }

    filterSessions() {

        let filteredSessions = []
        if (this.state.sessions.length > 0) {
            this.state.sessions.forEach(session => {
                let date = new Date(session.availability.date)
                let today = new Date()

                switch(this.state.tabSelected) {
                    // if 'Past Sessions' then only add sessions where date < today
                    case 'Past Sessions':
                        if (date < today) {
                            console.log('pushing past session.')
                            filteredSessions.push(session)
                        }
                        break;

                    // if 'Upcoming Sessions' then only add sessions where date > today
                    case 'Upcoming Sessions':
                        if (date > today) {
                            console.log('pushing upcoming session')
                            filteredSessions.push(session)
                        }
                        break;
                }
            })
        }

        this.setState({
            ...this.state,
            filteredSessions: filteredSessions
        })

    }

    // Retrieve sessions for the Profile currently displayed
    async getSessions() {
        // double check userProfile + username is defined, then make call to retrieve session data
        if (this.state.userProfile !== undefined && this.state.username !== '') {
            let response_sessions = await fetch('http://127.0.0.1:8000' + `/api/sessions/?${this.state.userProfile.type}__username=${this.state.username}`)

            let json_response_sessions = await response_sessions.json()
    
            this.setState({
                ...this.state,
                sessions: json_response_sessions
            })
        } 
        
    }

    handleTabSelection(e) {
        this.setState({
            ...this.state,
            tabSelected: e.target.innerText
        })
    }

    isProfileSignedInUser() {
        if (this.props.loggedInUserProfile !== null) {
            if (this.props.loggedInUserProfile.user.username === this.state.username) {
                this.setState({
                    ...this.state,
                    isSignedInUser: true
                })
            }
        }
    }

    render() {

        // Conditional rendering - don't render user profile until retrieved from backend
        // If userProfile is null, display 'LoadingSpinner' component, else display profile
        let display; 
        if (this.state.userProfile === undefined || this.state.userProfile === null ) {
            display = <LoadingSpinner />
        } else {
            display = (<div className='profile-page'>
                <Row>
                    <h2>{this.props.location.pathname}</h2>
                    <Col md={4}>
                        <img id='profile-pic' src={this.state.userProfile.profile_pic} />
                    </Col>  
                    <Col md={8}>
                        {/* Need to set key as user profile so react knows to update the form */}
                        <ProfileForm 
                            key={JSON.stringify(this.state.userProfile)} 
                            userProfile={this.state.userProfile} 
                            isSignedInUser={this.state.isSignedInUser} 
                        /> 
                    </Col>  
                </Row>
                <ProfileSessions 
                    tabSelected={this.state.tabSelected}  
                    handleTabSelection={this.handleTabSelection} 
                    filteredSessions={this.state.filteredSessions}  
                    isSignedInUser={this.state.isSignedInUser}    
                /> 
            </div>)
        }

        return (
            <>
                {display}
            </>
        )
    }    
}

// In order to use the 'useLocation' hook, wrapping the Profile class in a 
// functional component and passing it into Profile class as a prop
const WrappedComponent_Profile = props => {
    const location = useLocation()

    return <Profile location={location} {...props} /> 
}

export default WrappedComponent_Profile

