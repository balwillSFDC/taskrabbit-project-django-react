import React from 'react';
import './App.css';
import AppNavbar from './components/Navbar'
import Container from 'react-bootstrap/Container'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Services from './routes/Services'
import Providers from './routes/Providers'
import Profile from './routes/Profile'
import { Routes, Route } from 'react-router';
import { Redirect } from 'react-router';
import ServiceDetail from './routes/ServiceDetails';


class App extends React.Component {
	constructor(props){
		super(props) 
		this.state = {
			username: '',
            loggedInUserProfile: null,
			token: '',
			loggedIn: false,
			registrationType: 'Client',
			services: []
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.getAuthToken = this.getAuthToken.bind(this)
		this.handleRegistrationSelection = this.handleRegistrationSelection.bind(this)
		this.getServices = this.getServices.bind(this)
		this.getLoggedInUserProfile = this.getLoggedInUserProfile.bind(this)
		this.handleHire = this.handleHire.bind(this)
	}

	async componentDidMount() {
		let username = localStorage.getItem('username')
		let token = localStorage.getItem('token') 
		let loggedIn = false

		if (username && token) {
			loggedIn = true
		}

		this.setState({
			...this.state,
			username,
			token,
			loggedIn
		})

		await this.getServices()
		await this.getLoggedInUserProfile()
	}

  	// fetches authtoken from backend and return it along with status, username and 
  	async getAuthToken(username, password) {
		// todo: replace hardcoded url later...
		let response = await fetch('http://127.0.0.1:8000' + '/api-token-auth/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password      
			})
		})

		let json_response = await response.json()
		let status = await response.status
		
		return {
			status: status,
			username: username,
			token: json_response.token,
		}
	}


	async getServices() {
		// todo replace hardcoded url
		let response = await fetch('http://127.0.0.1:8000' + "/api/services")
		let json_response = await response.json()

		this.setState({
			...this.state,
			services: json_response
		})
	}


  	// When user logs in, update state + local storage with login details, and redirect to home
	async handleLogin(username, password) {
		let response = await this.getAuthToken(username, password)
		console.log(response)

		this.setState({
			...this.state,
			token: response.token,
			username: username,
			loggedIn: true
		})

		localStorage.setItem('token', response.token)
		localStorage.setItem('username', username)
		window.location.href = window.location.origin
	}

	handleRegistrationSelection(e) {
		let type = e.target.innerText.split(' ').pop() // get the last word of the button
		this.setState({
			...this.state,
			registrationType: type
		})
	}

	// When user logs out, clear state, localstorage, and redirect to home 
	handleLogout() {
		this.setState({
			...this.state,
			token: null,
			username: null,
			loggedIn: false
		})
		localStorage.clear()
		window.location.href = window.location.origin
	}


	async getLoggedInUserProfile() {
		// todo: remove hardcoded url
		if (this.state.loggedIn) {
			console.log('getting logged in profile...')

			let response_profiles = await fetch('http://127.0.0.1:8000' + `/api/profiles/?user__username=${this.state.username}`)
			let json_response_profiles = await response_profiles.json()
	
			this.setState({
				...this.state,
				loggedInUserProfile: json_response_profiles[0],   // only 1 profile should be returned
			})
		}
    }

	async handleHire(e, data) {
		console.log(JSON.stringify({
			estimated_hours: data.estimated_hours,
			service: data.selectedService,
			user: data.user.id,
			provider: data.availability.provider.id,
			status: 'booked',
			availability: data.availability.id
		}))
		//todo: remove hardcoded url
		let response = await fetch('http://127.0.0.1:8000' + '/api/sessions/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				estimated_hours: data.estimated_hours,
				service: data.selectedService,
				client: data.user.id,
				provider: data.availability.provider.id,
				status: 'booked',
				availability: data.availability.id
			})
		})
		let json_response = await response.json()
		console.log(json_response)

	}

	render() {
		return (
			<div className="App">
				<Container>
				<AppNavbar state={this.state} handleLogout={this.handleLogout} handleRegistrationSelection={this.handleRegistrationSelection} />
				<Routes>
					<Route 
						exact path="/" 
						element={<Home loggedIn={this.state.loggedIn} handleHire={this.handleHire} loggedInUserProfile={this.state.loggedInUserProfile} />} 
						key='link-1' 
					/>
					<Route 
						exact path="/providers" 
						element={<Providers />} 
						key='link-2' 
					/>
					<Route 
						exact path="/services" 
						element={<Services />} 
						key='link-3' 
					/>
					<Route 
						exact path='/services/:service' 
						element={<ServiceDetail loggedIn={this.state.loggedIn} handleHire={this.handleHire} />} 
						key='link-6' 
					/>
					<Route 
						exact path="/login" 
						element={<Login state={this.state} 
						handleLogin={this.handleLogin} 
						key='link-4' />} 
					/>
					<Route 
						exact path="/register" 
						element={<Register  
						handleLogin={this.handleLogin} 
						registrationType={this.state.registrationType} />} 
						key='link-5' 	
					/>
					<Route 
						exact path="/register/:type" 
						element={<Register  
						handleLogin={this.handleLogin} 
						registrationType={this.state.registrationType} 
						services={this.state.services} />} 
						key='link-5' 
					/>
					<Route 
						exact path='/user/:username' 
						element={<Profile loggedInUserProfile={this.state.loggedInUserProfile} handleHire={this.handleHire} />} 
						key='link-6' 
					/>
				</Routes>
				</Container>  
			</div>
		);
	}
}

export default App;
