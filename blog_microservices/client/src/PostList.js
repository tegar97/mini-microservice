import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'


export default() => {
    const [posts,setPosts] = useState({})

    const fetchPost = async() => {
        const res = await axios.get('http://localhost:4003/posts')
        setPosts(res.data)
        
    }
    useEffect(() =>{
        fetchPost()
    },[])

    const renderedPost = Object.values(posts).map(posts => {
        return (
            <div className="card" style={{width: '30%',marginBottom: '20px'}}>
                <div className="card-body">
                    <h3>{posts.title}</h3>
                    <CommentList comments={posts.comments}/>
                    <CommentCreate postId={posts.id}/>
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPost}
        </div>
    )
}