import NavBar from "./Navbar";
import Footer from "./Footer"
import Head from 'next/head';
import { makeStyles, CssBaseline } from "@material-ui/core";
import { AppProvider } from "./context/AppConext";

const useStyles = makeStyles({
    appMain: {
        width: '100%'
    }
})

const Layout=({children})=>{
    const classes = useStyles();

    return(
        
        <AppProvider>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="/style.css"/>
            </Head>
            <div className={classes.appMain}>
                <NavBar />
                { children }
                
            </div>
            <CssBaseline/>
            <Footer />
      </AppProvider>
    );
}


export default Layout