import React from 'react'
import Spinner from 'react-bootstrap/Spinner'


class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Spinner animation='border' role='status'>
                
            </Spinner>
        )
    }
}

export default LoadingSpinner