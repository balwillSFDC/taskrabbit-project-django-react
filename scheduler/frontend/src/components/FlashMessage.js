import React from 'react'
import Alert from 'react-bootstrap/Alert'

class FlashMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
            message: props.message
        }
    }

    render() {
        return (
            <Alert variant={this.state.type}>
                {this.state.message}
            </Alert> 
        )
    }
}

export default FlashMessage