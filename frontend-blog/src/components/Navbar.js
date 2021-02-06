import React,{Fragment} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

const Navbar = ({isAuthenticated,logout}) =>{

    const loginLinks = (
        <Fragment>
            <NavLink className="nav-link" exact to="/login" >Login</NavLink>
            <NavLink className="nav-link"  to="/register" >Register</NavLink>
        </Fragment>
    )

    const bloglinks = (
        <Fragment>
            <NavLink className="nav-link" exact to="/blogs/list">All BLogs</NavLink>
            <NavLink className="nav-link" exact to="/blogs/create">Create BLog</NavLink>
            <NavLink className="nav-link" onClick={logout} to="/" >Logout</NavLink>
        </Fragment>
    )

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        { isAuthenticated ? bloglinks: loginLinks}
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(Navbar);