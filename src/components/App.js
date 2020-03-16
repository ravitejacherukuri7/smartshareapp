import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "./common/Footer";

const App = () => {
    return (
        <div className="ui center aligned landingContent">
            <img src={process.env.PUBLIC_URL + '/img/back.jpg'} alt="background"/>
            <div className="overlay"/>

            <div className="ui container logo">
                <h1 className="ui inverted header">SmartShare</h1>
            </div>

            <div className="ui text center aligned container landingInfo">
                <h1 className="ui inverted header">Welcome To The SmartShare Shopping List App..</h1>
                <h3>Share Your Shopping List Anywhere.</h3>
          <Link to="/login" className="ui purple large icon left labeled inverted button landingBtn">
                    <i aria-hidden="true" className="sign in icon"/>
                    Sign In
                </Link>
                <Link to="/register" className="ui purple large icon left labeled inverted button landingBtn">
                    <i aria-hidden="true" className="user circle icon"/>
                    Sign Up
                </Link>
               
            </div>

            <Footer/>
        </div>
    );
};

export default App;
