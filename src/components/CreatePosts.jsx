import React from 'react';
import { supabase } from "../client";
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayingCardDropdown from './PlayingCardDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

const CreatePost = async (post, setShow, showBoard, mPlayerCards, mDealerCards, selectedTag) => {
    await supabase
     .from('posts')
     .insert({
        title: post.title, 
        description: post.description, 
        hasBoard: showBoard,
        boardData: post.boardData,
        tag: selectedTag,
        replies: post.replies,
        imageLink: post.imageLink,
        upvotes: post.upvotes,
        playerCards: mPlayerCards,
        dealerCards: mDealerCards,
    })
     .select();
 
     window.location = "/";             

     setShow(true);
}

const CreatePostForm = () => {
    const [post, setPost] = useState({  title: 'New Title', 
                                        description: '', 
                                        hasBoard: false,
                                        tag:'', 
                                        replies: [], 
                                        imageLink: '', 
                                        upvotes: 0,
                                        playerCards: [],
                                        dealerCards: [],
                                    });

    const [show, setShow] = useState(false);
    const [showBoard, setShowBoard] = useState(false);

    const [mPlayerCards, addPlayerCard] = useState([{face: "Unknown", value: "Unknown"},{face: "Unknown", value: "Unknown"}]);
    const [mDealerCards, addDealerCard] = useState([{face: "Unknown", value: "Unknown"},{face: "Unknown", value: "Unknown"}]);

    const tags = ['Misc', 'Question', 'Tips & Tricks', 'Snapshot'];
    const [selectedTag, selectNewTag] = useState('Misc');

    return (
        <div>
            <Toast style={{position: 'fixed', top: 10, right: 10}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                <strong className="me-auto">Successfully uploaded</strong>
                </Toast.Header>
            </Toast>

            <Container>
                <Row>
                    <Col>
                        <Form.Label style={{color:'white'}}>Title</Form.Label>
                        <Form.Control type="text" placeholder={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
                        <br/>
                    </Col>
                    <Col>
                        <Form.Label style={{color:'white'}}>Image Link</Form.Label>
                        <Form.Control type="text" placeholder={post.imageLink} onChange={(e) => setPost({...post, imageLink: e.target.value})}/>
                        <br/>
                    </Col>
                    <Col>
                        <Form.Label style={{color:'white'}}>Tag</Form.Label>
                        <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor:'#970000'}}>
                            {selectedTag}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                tags.map( (val,index) => <Dropdown.Item href="#/action-1" onClick={() => {selectNewTag(val)}}>{val}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown> 
                        <br/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={() => {setShowBoard(!showBoard)}} style={{backgroundColor:'#970000'}}>Include Custom Blackjack Board</Button>
                    </Col>
                    {
                        showBoard ? 
                        <>
                            <Col>
                                <Form.Label style={{color:'white'}}><b>Player Cards</b></Form.Label>
                                {
                                    mPlayerCards && mPlayerCards.map(
                                        (val) => <PlayingCardDropdown item={val}/>
                                    )
                                }
                                <Button onClick={() => {addPlayerCard([...mPlayerCards, {face: "Unknown", value: "Unknown"}])}} style={{backgroundColor:'#970000', marginRight:'10px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                    </Button>
                                {
                                    mPlayerCards && mPlayerCards.length > 2 ? 
                                    <Button onClick={() => {addPlayerCard(mPlayerCards.slice(0, -1))}} style={{backgroundColor:'#970000'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        </Button>
                                    : <></>
                                }
                            </Col>
                            <Col>
                                <Form.Label style={{color:'white'}}><b>Dealer Cards</b></Form.Label>
                                {
                                    mDealerCards && mDealerCards.map(
                                        (val) => <PlayingCardDropdown item={val}/>
                                    )
                                }
                                <Button onClick={() => {addDealerCard([...mDealerCards, {face: "Unknown", value: "Unknown"}])}}  style={{backgroundColor:'#970000', marginRight:'10px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </Button>
                                {
                                    mDealerCards && mDealerCards.length > 2 ? 
                                    <Button onClick={() => {addDealerCard(mDealerCards.slice(0, -1))}} style={{backgroundColor:'#970000'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        </Button>
                                    : <></>
                                }
                            </Col> 
                        </>
                        : <></>
                    }
                </Row>

                <br/>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{color:'white'}}>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={(e) => setPost({...post, description: e.target.value})}/>
                </Form.Group>

                <Button onClick={() => {CreatePost(post, setShow, showBoard, mPlayerCards, mDealerCards,selectedTag)}} style={{backgroundColor:'#970000'}}>
                    Create Post
                    </Button>
            </Container>
        </div>
    )
}



export default CreatePostForm;