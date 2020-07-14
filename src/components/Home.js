import React, {useRef, useEffect, useState} from 'react';
import Particles from 'react-particles-js';
import {Button} from 'bloomer';
import clsx from 'clsx';
import './Home.css'; 



const particlesParams = {
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
};

export default function Topic({toggleMenu, expanded}) {

  return (
      <div className="Home">  
        <Particles params={particlesParams} style={{width: '100%', height: '100%', position: 'absolute'}}  />
        <div className={clsx("HomeHeadings", "skew", {"expanded": expanded})}>
          <div className="unskew">
            <div className="HomeTitle">MACMORRIS</div>
            <div className="HomeSubTitle"> Connection Explorer</div>
            <Button isOutlined isColor='white' className="ExplorerButton" onClick={toggleMenu}>Explore</Button>
          </div>
        </div>
      </div> 
           
    );
}

