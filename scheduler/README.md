#Service Scheduler

## Summary
The Service Scheduler is an app that allows internal users (Providers) to input dates and times they are available to provide a service (i.e. landscaping, carpentry, etc.) and external users (Clients) to schedule time with them when they're available.

## Build & Packages 
- Django rest_framework Backend  
- React Front end (Class based)
- 


## Features
* #### Providers
    * Providers can log into the app and have heightened privleges
    * Providers have a profile page where they can do the following: 
        * Define personal details (i.e. Name, image etc.)
        * Define 
    * Providers can select from a list of services they want to provide 
        * List of Services and Service rates are controlled by admin 
    * Providers can opt to offer one or many services. For example, a Provider can offer both plumbing and carpentry services 
    * For each service, a Provider can provide multiple dates they're available
    * For each date a Provider can provider a window of time they're available. The least amount of time is 1 hour
    * When a Provider's time is booked, it is removed from their list of availability and they are notified via email
* #### Clients 
    * Clients can sign up for the app and have "Client" privleges
    * Clients can sign up with one or many services with various Providers using a form
    * Clients have a Profile page where they can do the following: 
        * Define personal details (i.e. Name, image, etc.)
        * Define payment details (i.e. billing address, home address)
            * For this project we will only be mimicking payments via console log and not ask for credit card info
        * View history of past sessions with details of the Provider's name, date and time scheduled 
        * View list of upcoming sessions with details of the Provider's name, date and time scheduled
    * Clients can see a list of Providers 
        * Clients can click a Provider's name and be taken to their Profile page with a list of services they have available and a summary of availability
        * Clients can click a button on Provider Profile page and be taken to a form which is prefilled with Provider's name
    
