import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class DisplayCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card className={'displayCard ' + this.props.class} style={{width: '20em'}}>
                <Card.Img variant='top' src={this.props.picture} className={this.props.imgClass} />
                <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                    </Card.Text>
                    <Button variant='primary' href={this.props.buttonLink}>{this.props.buttonText}</Button>
                </Card.Body>
            </Card>
        )
    }
    
}

export default DisplayCard