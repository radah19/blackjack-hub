import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const PlayingCardDropdown = ({item}) => {
    const [title1, setTitle1] = useState(item.value);
    const [title2, setTitle2] = useState(item.face);

    const cardTypes = ['Unknown', 'Spades', 'Clubs', 'Diamonds', 'Hearts'];
    const cardValues = ['Unknown', 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    useEffect(() => {console.log(item)})

    return (
        <div>
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                    <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor:'#970000'}}>
                            {title1}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                cardValues.map( (val,index) => <Dropdown.Item href="#/action-1" onClick={() => {setTitle1(val); item.value=val;}}>{val}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>  
                </Col>
                <Col xs lg="3">
                    <p style={{color:'white'}}> of </p>
                </Col>
                <Col xs lg="3">
                    <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor:'#970000'}}>
                            {title2}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                cardTypes.map( (val,index) => <Dropdown.Item href="#/action-1" onClick={() => {setTitle2(val); item.face=val}}>{val}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>  
                </Col>
            </Row>
        </div>

    )
}

export default PlayingCardDropdown;