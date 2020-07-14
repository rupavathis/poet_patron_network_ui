import React, { useState, useCookies } from 'react';
import Header from './Header/Header.js';
import NavBar from './SideBar/NavBar.js';
import Home from './Home.js';
import ContentBar from './ContentBar/ContentBar.js';
import { Route } from 'react-router';
import OutputContainer from './ContentBar/OutputContainer';
import './Layout.css'; 


export default function Layout(props) {
    const [toggleMenu, setToggleMenuBar] = useState(false);
    function toggleMenuBar(e, bool) {
        if (typeof(bool) === "boolean") {
            setToggleMenuBar(bool);
            return;
        }
        setToggleMenuBar(!toggleMenu);    
    }

    return (
        <div className="LayoutContainer">
            <Header toggleMenuBar={toggleMenuBar} />
                <div className="flex-out-container">
                     <NavBar toggleMenu={toggleMenu} toggleMenuBar={toggleMenuBar} />              
                <div className="ContentContainer">
                    <Route exact path='/' component={(props) => <Home {...props} toggleMenu={toggleMenuBar} expanded={toggleMenu} />} />
                    <Route exact path='/PoetPatron' component={OutputContainer} />
                </div>
            </div>
        </div>
    );
}

