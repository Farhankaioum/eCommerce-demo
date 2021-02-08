import Link from 'next/link';
import CartIcon from './cart/CartIcon'

import React from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        minWidth: '400px',
        border: '1px solid #999',
        padding: '5px 12px',
        '&:hover': {
            backgroundColor: '#f2f2f2',
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },
    menuColor:{
        color: '#999',
        marginLeft: '170px',
        display: 'inline-block',
        fontSize: '16px'
    },
    logo:{
        height: '80px',
        width: '80px',
        textAlign: 'right',
        marginTop: '2px'
    }
}))

const NavBar = () => {

    const classes = useStyles();

    return (
       <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item className={classes.menuColor}>
                        <Link href="/">
                            <a><img src="/navLogo.PNG" alt="Home" className={classes.logo}/></a>
                        </Link>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <InputBase
                            placeholder="Search products"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>

                        {/* shopping cart */}
                        
                            <CartIcon/>

                        <IconButton>
                            <Link href="/orders">
                                <a title="Your Shopping History"><HistoryIcon fontSize="large" /></a>
                            </Link>
                        </IconButton>

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;