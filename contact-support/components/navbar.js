import React from "react";
import Head from "next/head";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";

const navbar = () => {
    return (
        <>
        <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossorigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Contact Support
                        </Typography>
                        
                        <Link href="/add"><span style={{textDecoration:'none',marginRight:'20px',cursor:'pointer'}}> Add Support </span></Link>
                        <Link href="/supportList"><span style={{textDecoration:'none',marginRight:'20px',cursor:'pointer'}}> Support List</span></Link>
                        <Link href="/userList"><span style={{textDecoration:'none',cursor:'pointer'}}> User List</span></Link>
                        
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default navbar;

