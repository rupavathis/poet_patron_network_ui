import React, { useState, useCookies } from 'react';
import './ContentBar.css'; 
import InputContainer from './InputContainer';
import OutputContainer from './OutputContainer';

export default function ContentBar(props) {

    return (
        <div className="LayoutContainer">
            <div className="LayoutContainer-Input">
               <OutputContainer />
            </div>
            <div className="LayoutContainer-Output">
            </div>
        </div>
    );
}

