import axios from 'axios'
import React,{useState} from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

const CreateBlog = () =>{
    const [content,setContent] = useState('')
    const [smallDes,setSmallDes] = useState('')
    const [title,setTitle] = useState('')
    const [result,setResult] = useState(false)
    const [error,setError] = useState('')

    const create_blog_api = async(e) => {
        e.preventDefault()
        const config = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
        const body = JSON.stringify({
            content,small_description:smallDes,title
        })
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/create`,body,config)
            if(res.data.success){
                setResult(true)
                console.log(res.data)
            }else {
                setError('BLOG NOT CREATED ERROR')
                console.log("CREATEBLOG ERROR")
            }
        }catch(err){
            setError('BLOG NOT CREATED ERROR')
            console.log("CREATEBLOG",err)
        }
    }

    if(result)return <Redirect to="/blogs/list" />

    return(
        <div>
            {error.length>0 ? <h1 className="text-danger"> {error} </h1> : ''}
            <div className="container mt-5 col col-md-8">
                <h1 className="text-center">Create Blog</h1>
                <form className="mt-5" onSubmit={(e)=>create_blog_api(e)} >
                    <div className="form-group">
                        <label className="form-label" ><span className="text-danger">*</span>Title:</label>
                        <input type='text' className="form-control" placeholder="title" name = "title" value = {title} onChange={e=>setTitle(e.target.value)} autoFocus required />
                    </div>
                    <div className="mt-3 form-group">
                        <label className="form-label" ><span className="text-danger">*</span>Small Description:</label>
                        <input type='text' className="form-control" placeholder="small description" name = "title" value = {smallDes} onChange={e=>setSmallDes(e.target.value)} required />
                    </div>
                    <div className="mt-3 form-group">
                        <label className="form-label" ><span className="text-danger">*</span>Content:</label>
                        <textarea type='text' className="form-control" placeholder="content" name = "content" value = {content} onChange={e=>setContent(e.target.value)} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="mt-5 btn btn-success">Create Blog</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog;
