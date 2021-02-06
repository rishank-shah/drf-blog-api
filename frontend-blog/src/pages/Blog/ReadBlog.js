import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const ListBlog = ({match}) =>{
    
    const [blog,setBlog] = useState({})
    const [count,setCount] = useState(0)
    const [comments,setComments] = useState([])
    const [loading,setLoading] = useState(false)
    const [comm,setComm] = useState('')
    const [deleteBTN,setDeleteBTN] = useState(false)
    const [error,setError] = useState(false)
    const [redirect,setRedirect] = useState(false)

    const {slug} = match.params

    useEffect(()=>{
        setLoading(true)
        getBlogs()
        setLoading(false)
        // eslint-disable-next-line
    },[])

    const comment_blog = async(e) =>{
        if(comm.length > 0){
            const body = JSON.stringify({
                slug,content:comm
            }) 
            const config = {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            };
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/comment/`,body,config)
            console.log('CREATING COMMENT',res.data)
        }
    }

    const getBlogs = async()=>{
        const config = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/blog/read/${slug}`,config)
        setBlog(res.data.blog)
        setCount(res.data.comments_count)
        setComments(res.data.comments)
        const res_delete = await axios.get(`${process.env.REACT_APP_API_URL}/auth/isauthenticated`,config)
        if(res_delete.data.isAuthenticated === 'success' && res_delete.data.username === res.data.blog.uploaded_by ) setDeleteBTN(true)
    }

    const delete_blog  = async() =>{
        let ans = window.confirm("Do you want to delete this blog?")
        if(ans){
            const config = {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            };
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/blog/delete/${blog.slug}`,config)
            if(res.data.error){
                setError(true)
            }else if(res.data.success){
                setRedirect(true)
            }
        }
    }

    if(redirect)return <Redirect to="/blogs/list" />

    return(
        <div>
            <div className="container">
                {loading && <h2 className="mt-5 mb-5">
                    Loading...
                </h2>}
                {error && <h2 className="text-danger mt-5 mb-5">
                    ERROR DELETING THE BLOG
                </h2>}
                <h2 className="mt-5 mb-5 text-center">
                    {blog.title}
                </h2>
                <p className="mt-2 mb-2 text-center" >
                    {blog.small_description}
                </p>
                <p className="mt-2 mb-2 text-center" >
                    {blog.content}
                </p>
                <p className="mark font-italic mt-2 mb-2 text-center">Posted By {blog.uploaded_by}</p>
                {deleteBTN ? (<div className="text-center">
                    <button onClick={e=>delete_blog(e)} className="btn btn-danger">Delete Blog</button>
                </div>):''}
                <div className="container mt-2">
                    <p> Comments: </p>
                    <form onSubmit={e=>comment_blog(e)} >
                        <h6>Add a comment:</h6>
                        <input onChange={e=>setComm(e.target.value)} type="text" className="form-control"></input>
                        <button type="submit" className="btn btn-sm btn-success">comment</button>
                    </form>
                    {count <= 0 && (
                        <p className="mt-2 mb-2 text-center">No comments</p>
                    )}
                    {count > 0 && comments.map((comment,i)=>{
                        return(<div key={i}>
                            <table class="table">
                                <tbody>
                                        <tr>
                                        <td>{comment.content}</td>
                                        <td>---</td>
                                        <td>Posted By: {comment.author}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListBlog;