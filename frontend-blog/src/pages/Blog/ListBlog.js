import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ListBlog = () =>{
    
    const [blogs,setBlogs] = useState([])

    const getBlogs = async()=>{
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/blog/`)
        setBlogs(res.data)
    }

    useEffect(()=>{
        getBlogs()
        // eslint-disable-next-line
    },[])

    const renderPost = blogs =>{
        return (
            <div className="row">
                {blogs.map((blog,i)=>{
                    return (
                        <div className="card col-md-5 mt-3 ml-4 " style={{width: "18rem"}} key={i}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.small_description}</p>
                                <br/>
                                <p className="mark font-italic">Posted By {blog.uploaded_by}</p>
                                <Link to={`/blog/read/${blog.slug}`} className="btn btn-raised btn-sm btn-primary">View Blog</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <div>
            <div className="container">
                <h2 className="mt-5 mb-5">
                    BLOGS
                </h2>
                {renderPost(blogs)}
            </div>
        </div>
    )
}

export default ListBlog;