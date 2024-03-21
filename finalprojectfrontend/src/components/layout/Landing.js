import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Card, makeStyles,CardActions, CardActionArea, CardMedia, CardContent,Button,Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { buyCake } from '../redux/cake/cakeAction';

const useStyles = makeStyles((theme) =>({

    Container:{
        marginTop:theme.spacing(10),
        height: "100%",
        display:'flex',
        flexDirection: 'column',
        textAlign:'center'        
     },
     root: {
        maxWidth: "100vh",
        height:"68vh",
        marginTop: theme.spacing(5)
      },
      media: {
        height: "50vh",
      },
      cardActions:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
      }
    
}))

const Landing = () => {

    const check = useSelector(state=> state);
    const dispatch = useDispatch();
    console.log(check.cake);
    
    const classes = useStyles();
    
    const history = useHistory();
    const handleRoute = (result) =>{
      
        history.push('/'+result)
   }

    return (
       <>
      
      <Container maxWidth="md"   className={classes.Container}>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://lh5.googleusercontent.com/oDUgUwudwBlIQ3WSyBE3gZ58_tqhKTDBkic65snFp2x5ZKamuzmyfG-WqYI8AC5vl1iu4RAZhW7JdwnCdyW0lA5RNyCbA5XjW6dBVcHw1hPbYZ1yGX82YIH2pWi4JdgFY38VPPd4"
          title="Social Platform"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            RBook
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          RBook is a social platform where people find their happiness through connecting amazing souls around themselves. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button onClick={()=> 
          handleRoute("login")} size="large" variant="contained" color="primary">
          Login
        </Button>
        <Button size="large" color="primary" onClick={()=> handleRoute("register")}>
          Sign Up
        </Button>
      </CardActions>
    </Card>
      </Container>
      </>
    )
}

export default Landing;