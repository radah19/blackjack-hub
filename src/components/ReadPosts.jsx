import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CardDisplay from './CardDisplay';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const filterList = ['Newest', 'Most Popular', 'Question', 'Tips & Tricks', 'Snapshot'];
    const [searchFilter, setSearchFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('None');

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase
            .from('posts')
            .select()
            .order('created_at', { ascending: false })

            setPosts(data);
        }
        fetchData();
    }, []);

    function searchItems(inputVal, tagVal){ 
        let tempData = posts;

        //Filter By Tag
        if(tagVal === 'Newest' || tagVal === 'None'){
            tempData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            console.log(tempData);
        } else if (tagVal === 'Most Popular'){
            tempData.sort((a, b) => b.upvotes - a.upvotes)
            console.log(tempData);
        } else { //Sort by Tags
            tempData = tempData.filter((item) => {
                return item.tag === tagVal
            });
        }

        console.log(tagVal, ' ', tempData);

        //Filter by Search
        if(inputVal !== ''){
            tempData = tempData.filter((item) => {
                return (
                    item.title.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase()) || 
                    item.description.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())
                )
            })
        }

        //console.log(tempData);
        setFilteredResults(tempData); 
    }
    
    return (
        <div className="ReadPosts" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center', marginLeft:'-100px', marginRight:'-100px'}}>
            <InputGroup style={{justifyContent:'center'}}>
                <div class="form-outline w-25">
                    <input type="text" id="input1" class="form-control"                     
                    onChange={(e) => {setSearchFilter(e.target.value); searchItems(e.target.value, tagFilter)}}
                    defaultValue={searchFilter}
                    style={{marginBlock:'10px'}}
                    placeholder='Input search here...'
                    />
                </div>


                <Form.Label style={{marginTop: '25px', marginLeft:'25px', marginRight:'10px', color:'white'}}>Search By</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle style={{marginTop:'20px', marginBottom:'20px', backgroundColor:'#970000'}}>
                        {tagFilter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            filterList.map( (val,index) => <Dropdown.Item href="#/action-1" onClick={() => 
                                {setTagFilter(val); searchItems(searchFilter, val);}}
                            >{val}</Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown> 
            </InputGroup>
            {   
                (searchFilter == '' && tagFilter == 'None') ?

                posts ?
                posts.map((post) => 
                    <CardDisplay post={post} />
                ) : <img src='../src/assets/spinner2.gif'/>

                : 

                filteredResults.map((post) => 
                    <CardDisplay post={post} />
                )
            }
        </div>  
    )
}

export default ReadPosts;