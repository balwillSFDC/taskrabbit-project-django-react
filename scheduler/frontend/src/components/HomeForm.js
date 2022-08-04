import React from 'react'
import Form from 'react-bootstrap/Form'

class HomeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <h1>How can we help you?</h1>
                    <Form.Select 
                        size='lg' 
                        id='serviceSelect' 
                        onChange={this.props.handleFormChange}
                    >
                        {
                            this.props.services.map(service => {
                                return <option key={service}>{service}</option>   
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <br></br>                
                <Form.Group>
                    <h3 className='subQuestion'>How many hours do you think it will take?</h3> 
                    <Form.Control 
                        type="Integer" 
                        name="hours" 
                        id='hours' 
                        placeholder="Hours between 0 and 24" 
                        onChange={this.props.handleFormChange}
                        maxLength={2}
                        min={0}
                        max={24}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <h3 className='subQuestion'>What day works best?</h3> 
                    <Form.Control 
                        type="date" 
                        name="date" 
                        id='dateSelect' 
                        placeholder="Date for Service" 
                        onChange={this.props.handleFormChange}
                    />
                    <Form.Text className="text-muted">
                        Leave blank to show all future availabilities
                    </Form.Text>
                </Form.Group>
                
            </Form>
        )
    }
}

export default HomeForm