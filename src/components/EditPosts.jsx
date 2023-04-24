import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../client";
import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayingCardDropdown from './PlayingCardDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

const EditPost = async (id, post, setShow, showBoard, mPlayerCards, mDealerCards, selectedTag) => {
    await supabase
     .from('posts')
     .update({
        title: post.title, 
        description: post.description, 
        hasBoard: showBoard,
        tag: selectedTag,
        replies: post.replies,
        imageLink: post.imageLink,
        upvotes: post.upvotes,
        playerCards: mPlayerCards,
        dealerCards: mDealerCards,
    })
     .eq('id', id);         

     setShow(true);

     window.location = `/info/${id}`;
}

const DeletePost = async (id, setShow) => {
    await supabase
     .from('posts')
     .delete()
     .eq('id', id);         

     setShow(true);

     window.location = "/";
}

const EditPostForm = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});

    const [mPlayerCards, addPlayerCard] = useState([]);
    const [mDealerCards, addDealerCard] = useState([]);

    const [showBoard, setShowBoard] = useState(true);

    const tags = ['Misc', 'Question', 'Tips & Tricks', 'Snapshot'];
    const [selectedTag, selectNewTag] = useState('Misc');

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase
            .from('posts')
            .select()    
            .eq('id', id); 

            setPost(data[0]);
            addPlayerCard(data[0].playerCards);
            addDealerCard(data[0].dealerCards);
            setShowBoard(data[0].hasBoard);
            selectNewTag(data[0].tag)
        }
        fetchData();
    }, []);

    const [show, setShow] = useState(false);

    return (
        <div>
            <Toast style={{position: 'fixed', top: 10, right: 10}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                <strong className="me-auto">Actions Saved</strong>
                </Toast.Header>
            </Toast>

            <Container>
                <Row>
                    <Col>
                        <Form.Label style={{color:'white'}}>Title</Form.Label>
                        <Form.Control type="text" defaultValue={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
                        <br/>
                    </Col>
                    <Col>
                        <Form.Label style={{color:'white'}}>Image Link</Form.Label>
                        <Form.Control type="text" defaultValue={post.imageLink} onChange={(e) => setPost({...post, imageLink: e.target.value})}/>
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
                                <Button onClick={() => {addDealerCard([...mDealerCards, {face: "Unknown", value: "Unknown"}])}} style={{backgroundColor:'#970000', marginRight:'10px'}}>
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
                    <Form.Control as="textarea" defaultValue={post.description}  rows={2} onChange={(e) => setPost({...post, description: e.target.value})}/>
                </Form.Group>

                <Button onClick={() => {EditPost(id, post, setShow, showBoard, mPlayerCards, mDealerCards,selectedTag)}} style={{backgroundColor:'#970000', marginRight:'32px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </Button>
                
                <Button onClick={() => {DeletePost(id, setShow)}} style={{backgroundColor:'#970000'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </Button>
            </Container>
        </div>
    )
}



export default EditPostForm;