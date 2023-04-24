import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const getTime = (created_at) => {
    let time = Math.round((Date.now() - new Date(created_at))/3600000);
    if(time < 1) return 'less than an hour ago';
    if(time < 24) return `${time} hour${time == 1 ? '' : 's'} ago`;
    return `${Math.round(time/24)} day${Math.round(time/24) == 1 ? '': 's'} ago`
}

const CardDisplay = ({post}) => {
    return (
        <Link style={{marginLeft: '15px', marginRight: "15px", marginBottom: "15px", width: "60%"}} to={'info/'+ post.id}>
            <Card style={{alignItems: "self-start", textDecoration: 'none', backgroundColor:'#555555'}}>
                 <Card.Subtitle style={{color: "rgb(161, 161, 161)"}}>Posted {getTime(post.created_at)}</Card.Subtitle>

                <Card.Title style={{color: "white"}}>{post.title}</Card.Title>
                <Card.Subtitle style={{color: "rgb(161, 161, 161)"}}>{post.tag}</Card.Subtitle>
                <Card.Text style={{color: "rgb(217, 217, 217)"}}>{post.upvotes} Upvote{post.upvotes == 1? '' : 's'}</Card.Text>
            </Card>
        </Link>
    );
}

export default CardDisplay;