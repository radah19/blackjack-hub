import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { Link, useRoutes, BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

// import HomePage from './components/HomePage';
import ReadPosts from './components/ReadPosts';
import Layout from './components/Layout';
import CreatePostForm from './components/CreatePosts';
import EditPostForm from './components/EditPosts';
import DetailedView from './components/DetailedView';

function App() {
    return (
        <div className='app-container'>
            <BrowserRouter style={{backgroundColor: "black"}}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route index={true} element={<ReadPosts />} />
                    <Route path="/new" element={<CreatePostForm />} />
                    <Route path="/info/:id/edit/:id" element={<EditPostForm />} />
                    <Route path="/info/:id" element={<DetailedView />} />
                    <Route path="*" element={<div><p>No Page Found</p></div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
