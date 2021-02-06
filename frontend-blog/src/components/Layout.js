import React,{Fragment,useEffect} from 'react'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {checkAuth} from '../actions/auth'

const Layout = ({children,checkAuth}) =>{

    useEffect(()=>{
        checkAuth()
        // eslint-disable-next-line
    },[])

    return(
        <Fragment>
            <Navbar/>
            {children}
        </Fragment>
    )
}

export default connect(null,{checkAuth})(Layout);