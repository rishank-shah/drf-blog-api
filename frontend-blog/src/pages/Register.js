import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import {register} from '../actions/auth'
import CSRFToken from '../components/CSRFToken'

const Register = ({isAuthenticated,register}) => {
    const [values,setValues] = useState({
        username:'',
        password:'',
        password2:''
    })
    const [formDone,setFormDone] = useState(false)

    const {username,password2,password} = values

    const onChange = e => setValues({
        ...values,
        [e.target.name]:e.target.value
    })

    const onSumbmit = e =>{
        e.preventDefault()
        if(password === password2){
            register(username,password2,password)
            setFormDone(true)
        }
    }
    if(isAuthenticated)return <Redirect to='/blogs/list'/>
    if(formDone)return <Redirect to='/login'/>
    return(
        <div className="container mt-5 col col-md-5">
            <h1 className="text-center">Register for account</h1>
            <form className="mt-5" onSubmit={e=>onSumbmit(e)} >
                <div className="form-group">
                    <label className="form-label" ><span className="text-danger">*</span>Username:</label>
                    <input type='text' className="form-control" placeholder="username" name = "username" value = {username} onChange={e=>onChange(e)} autoFocus required />
                </div>
                <div className="mt-3 form-group">
                    <label className="form-label" ><span className="text-danger">*</span>Password:</label>
                    <input type='password' className="form-control" placeholder="password" name = "password" minLength='8' value = {password} onChange={e=>onChange(e)} required />
                </div>
                <div className="mt-3 form-group">
                    <label className="form-label" ><span className="text-danger">*</span>ReEnter Password:{password!==password2?'(passwords are not equal)':''}</label>
                    <input type='password' className="form-control" placeholder="password" name = "password2" value = {password2} onChange={e=>onChange(e)} minLength='8' required />
                </div>
                <div className="text-center">
                    <button type="submit" className="mt-5 btn btn-success">Register</button>
                </div>
            </form>
            <p className="mt-3 text-center">Already registered? <Link to="/login" >Login</Link></p>
            <CSRFToken/>
        </div>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register})(Register);