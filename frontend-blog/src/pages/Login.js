import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import {login} from '../actions/auth'
import CSRFToken from '../components/CSRFToken'

const Login = ({isAuthenticated,login}) => {
    const [values,setValues] = useState({
        username:'',
        password:''
    })

    const {username,password} = values

    const onChange = e => setValues({
        ...values,
        [e.target.name]:e.target.value
    })

    const onSumbmit = e =>{
        e.preventDefault()
        login(username,password)
    }
    if(isAuthenticated)return <Redirect to='/blogs/list'/>

    return(
        <div className="container mt-5 col col-md-5">
            <h1 className="text-center">Login</h1>
            <form className="mt-5" onSubmit={e=>onSumbmit(e)} >
                <div className="form-group">
                    <label className="form-label" ><span className="text-danger">*</span>Username:</label>
                    <input type='text' className="form-control" placeholder="username" name = "username" value = {username} onChange={e=>onChange(e)} autoFocus required />
                </div>
                <div className="mt-3 form-group">
                    <label className="form-label" ><span className="text-danger">*</span>Password:</label>
                    <input type='password' className="form-control" placeholder="password" name = "password" minLength='6' value = {password} onChange={e=>onChange(e)} required />
                </div>
                <div className="text-center">
                    <button type="submit" className="mt-5 btn btn-success">Login</button>
                </div>
            </form>
            <p className="mt-3 text-center">Not registered? <Link to="/register" >Register</Link></p>
            <CSRFToken/>
        </div>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);