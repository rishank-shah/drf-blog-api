import React from "react";
import {BrowserRouter,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import {Provider} from 'react-redux'
import store from './store'
import ListBlog from './pages/Blog/ListBlog'
import ReadBlog from './pages/Blog/ReadBlog'
import CreateBlog from './pages/Blog/CreateBlog'

const App = () =>(
    <Provider store = {store} >
        <BrowserRouter>
            <Layout>
                <Route exact path='/' component={Home} ></Route>
                <Route exact path='/register' component={Register} ></Route>
                <Route exact path='/login' component={Login} ></Route>
                <Route exact path='/dashboard' component={Dashboard} ></Route>
                <Route exact path='/blogs/list' component={ListBlog} ></Route>
                <Route exact path='/blogs/create' component={CreateBlog} ></Route>
                <Route exact path='/blog/read/:slug' component={ReadBlog} ></Route>
            </Layout>
        </BrowserRouter>
    </Provider>
)


export default App;