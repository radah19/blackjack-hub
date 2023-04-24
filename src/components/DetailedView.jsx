import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

import { Link, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDisplay from './CardDisplay';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 

import '../src/assets/back.png';

const DetailedView = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [upvotes, setUpvotes] = useState(0);

    const [replies, addReply] = useState([]);
    const [reply, setReply] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            const {data} = await supabase
            .from('posts')
            .select()    
            .eq('id', id); 

            setPost(data[0]);
            setUpvotes(data[0].upvotes);
            addReply(data[0].replies);
        }
        fetchData();
    }, []);

    const updateUpvotes = async () => {
        await supabase
        .from('posts')
        .update({ upvotes: upvotes + 1})
        .eq('id', id);

        setUpvotes(upvotes + 1);
    }

    const postReply = async () => {
        if(reply === '') return;

        addReply([reply, ...replies]);

        await supabase
        .from('posts')
        .update({ replies: [reply, ...replies]})
        .eq('id', id);
    }
    
    return (
        post ? 
        <div style={{justifyContent:'center'}}>
          <h2 style={{color:'white'}}>{post.title}</h2>

          {
            post.hasBoard ? 
                <div style={{backgroundColor:'green', marginRight:'300px', marginLeft:'380px', width:'900px', height: '550px', borderRadius:'10px'}}>
                    <Row md={6} style={{justifyContent:'center', paddingBlock:'25px'}}>
                        {
                            post.dealerCards.map((val) => 
                                <Col>
                                    {
                                        (val.face != 'Unknown' && val.value != 'Unknown') ? 
                                            <img src={`../src/assets/${val.value}_of_${val.face}.png`} style={{backgroundColor:'white', width:"130px", borderRadius:'10px'}}/> : 
                                            <img src={`../src/assets/back.png`} style={{width:"130px", borderRadius:'10px'}}/>
                                    }
                                </Col>
                            )
                        }
                    </Row>
                    <br/><br/>
                    <Row md={6} style={{justifyContent:'center', paddingBlock:'25px'}}>
                        {
                            post.playerCards.map((val) => 
                                <Col>
                                    {
                                        (val.face != 'Unknown' && val.value != 'Unknown') ? 
                                            <img src={`../src/assets/${val.value}_of_${val.face}.png`} style={{backgroundColor:'white', width:"130px", borderRadius:'10px'}}/> : 
                                            <img src={`../src/assets/back.png`} style={{width:"130px", borderRadius:'10px'}}/>
                                    }
                                </Col>
                            )
                        }
                    </Row>
                </div>
            :<></>
          }
          <br/>

          {
            post.imageLink != null && post.imageLink != '' ?
            <img src={post.imageLink} style={{maxWidth:'400px', maxHeight:'400px'}} alt='No image found from link'/> :<></>
          }
        
          <h5 style={{color:'white'}}>{post.description}</h5>

          <Row md={6} style={{justifyContent:'center', paddingBlock:'25px'}}>
                <Col>
                    <Link to={'edit/'+ post.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </Link>
                </Col>
                <Col>
                    <Button onClick={() => updateUpvotes()} style={{backgroundColor:'#970000'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                    </Button>
                    <p style={{color:'white'}}>{upvotes} upvote{upvotes == 1? '' : 's'}</p>
                </Col>
        </Row>

        <div className='replies-ui-container' style={{display:'flex', justifyContent:'center',}}>
                <div class="form-outline w-25">
                    <input type="text" id="input1" class="form-control"                     
                    onChange={(e) => setReply(e.target.value)}
                    style={{marginBlock:'10px'}}
                    placeholder='Comment here...'
                    />
                </div>
                <Button onClick={() => postReply()} style={{marginBlock:'10px', marginLeft:'10px',backgroundColor:'rgb(109, 109, 109)'}}>Reply</Button>
        </div>
        <div className='replies-container'>
            {
                replies.map((val) => 
                    <div style={{marginBlock:'10px', marginRight:'500px', marginLeft:'500px',backgroundColor:'rgb(109, 109, 109)', borderRadius:'20px', color:'white'}}>
                        {val}
                    </div>
                )
            }    
        </div> 

        </div> : <></>
    )
}

export default DetailedView;