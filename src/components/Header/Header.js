import React from 'react';
import './Header.css'; 
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

export default function HeaderBar({ toggleMenuBar }) {

    let readURL = "";
    const pageTitle = () => {
        readURL = document.URL;
        if (readURL.includes('/PoetPatron'))
            return "Poet Patron Network";
        
        else
            return "Home";
    }

    return (
        <div className="headerBar">
            <div>
                    <IconButton className="menuIconHeader"
                        color="secondary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleMenuBar}
                    >
                        <MenuIcon />
                    </IconButton>
            </div>
            <div className="headerBreadCrumbs">
                    {pageTitle()}
            </div>
        </div>

    );
}

