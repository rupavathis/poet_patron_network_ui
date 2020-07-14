import React, { useState } from 'react';
import { MenuList, MenuLink } from 'bloomer';
import './NavBar.css';
import clsx from 'clsx';
import { LinkContainer } from 'react-router-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

export default function NavBar({ toggleMenu, toggleMenuBar}) {

    const currentPath = window.location.pathname;
    const [active, setActive] = useState(currentPath === "/PoetPatron" ? "2" : "1" );

    const onChangeMenu = (e) => {
        toggleMenuBar(e, false);
        setActive(e.currentTarget.id );
    }

    return (
     <div className={clsx("flex-item-menu", { ["expanded"]: toggleMenu })} >
        <MenuList className="menu-container">

            <LinkContainer to={"/" }>
                <li id='1' onClick={onChangeMenu}>
                    <MenuLink isActive={active === '1'} className={clsx("menu", { ["expanded"]: toggleMenu })}>
                        <ListItem button key="Home">
                            <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </MenuLink>     
                </li>        
            </LinkContainer>

            <LinkContainer to={"/PoetPatron" }>
                <li id='2' onClick={onChangeMenu}>
                    <MenuLink isActive={active === '2'} className={clsx("menu", { ["expanded"]: toggleMenu })}>
                    <ListItem button key="Poems">
                            <ListItemIcon>{<TimelineIcon />}</ListItemIcon>
                            <ListItemText primary="Poet-Patron Network" />
                        </ListItem>
                    </MenuLink>   
                </li>   
            </LinkContainer>       
        </MenuList>
        </div>
    );
};
