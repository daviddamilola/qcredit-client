import React from "react";
import { Grid, List, ListItem, Button} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';

const useStyles= makeStyles(theme => ({
    nav: {
        background: '#424242',
        color: '#ffffff',
        height: '100vh',
        paddingLeft: '1rem',
    },
    logo: {
        padding: '0.8rem 2rem',
        background: '#424242',
    },
    links: {

    },
    listItem: {
        textDecoration: 'none',
        color: '#fff',
    },
    listButton: {
        textDecoration: 'none',
        color: '#fff',
        width: '100%',
        justifyContent:'flex-start',
    }
}))

export default function SideBar({mLinks}){

    const classes = useStyles();

    return(
        <>
            <Grid container>
                <Grid item sm={12} md={12} xs={12} className={classes.logo}>
                <img src={'/img/Logo.svg'} alt="quickcredit logo" />
                </Grid>
                
                <Grid item sm={12} md={12} xs={12} className={classes.nav}>
                    <List>
                    {
                        mLinks.map((each, i) => (
                            <ListItem className={classes.listItem} key={`${(each.name, i)}`}>
                                <Link href={`${each.route}`} >
                                    <a className={classes.listButton}>
                                    <Button
                                        variant={"text"}
                                        className={classes.listButton}
                                        startIcon={<img src={each.icon} />}
                                    >
                                        {each.name}
                                    </Button>
                                    </a>
                                </Link>
                            </ListItem>
                        ))
                    }
                    </List>
                </Grid>
            </Grid>
        </>
    )

}