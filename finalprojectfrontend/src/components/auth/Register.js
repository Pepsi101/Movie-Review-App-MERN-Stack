import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link, responsiveFontSizes } from '@material-ui/core'

import axios from 'axios';
import { useHistory } from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation } from "react-router-dom";
import {host} from '../../host';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) =>({

    grid:{
        marginTop:theme.spacing(10),
        height:'100%',
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',
         backgroundImage:`url(${"https://lh5.googleusercontent.com/oDUgUwudwBlIQ3WSyBE3gZ58_tqhKTDBkic65snFp2x5ZKamuzmyfG-WqYI8AC5vl1iu4RAZhW7JdwnCdyW0lA5RNyCbA5XjW6dBVcHw1hPbYZ1yGX82YIH2pWi4JdgFY38VPPd4"})`,        
     },
     snackbar:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
     },
     password:{
        marginTop: theme.spacing(2)
      },
      signup:{
        marginTop: theme.spacing(2)
      },
      paperStyle:{
        padding :20,
        height:'85vh',
        width:500, 
        margin:"20px auto",
  
     },
     signupSection:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3)
     }
    
    
}))

 

const Register =()=>{
     const [username, setUsername] = useState("");
     const [email, setEmail] = useState("");
     const [password,setPassword] = useState("");
     const [confirmPassword,setConfirmPassword] =useState("");
     const [error,setError] =useState("");
     const [open,setOpen] =useState({
        status:false,
        message: " ",

     })
       const {state} = useLocation();

     const history = useHistory();

     
    
     
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

   
     const registerHandler = async(e)=>{
          
          console.log("working");
          let config = {
              header:{
                  "content-Type":"application/json"
              }
          }
          if(password !== confirmPassword){
                setPassword("");
                setConfirmPassword("");
                setTimeout(()=>{
                    setError("")
                },5000);
                return setOpen({
                    status:true,
                    message: "Password do not match",
                    severity: "warning"
                })
          }
          try {
              const data = await axios.post(host+"/api/users",{
                  "name":username,
                  "email":email,
                  "password":password
                },config);
              console.log("register data "+data.data);
              localStorage.setItem("authToken", data.data.token);

              setOpen({
                status:true,
                message: "Registration Complete",
                severity: "success"
            })

                 history.push(state?.from || '/')
                window.location.reload(false);
              
          } catch (error) {
             console.log(error.response.data.errors);
             if(error.response.data.errors){
             setOpen({
                 status:true,
                 message: error.response.data.errors,
                 severity: "warning"
             })
          }
        }
     }

   

    const classes = useStyles();

    const paperStyle={padding :20,height:'70vh',width:600, margin:"20px auto",}
    const avatarStyle={backgroundColor: "#3F51B5"}
    const btnstyle={margin:'8px 0'}
    const margin= {marginBottom: 10}
    return(
        <Grid className={classes.grid}>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center' className={classes.signupSection}>
                     <Avatar style={avatarStyle}><ExitToAppRoundedIcon/></Avatar>
                     <Typography variant="h4" component="h1">
                      Sign Up
                     </Typography>
                </Grid>
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Username"
                   type="username"
                   autoComplete="current-username"
                   variant="outlined"
                   onChange={(e)=>setUsername(e.target.value)}
                   fullWidth
                  />
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Email"
                   type="email"
                   autoComplete="current-email"
                   variant="outlined"
                   onChange={(e)=>setEmail(e.target.value)}
                   fullWidth
                  />
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Password"
                   type="password"
                   autoComplete="current-email"
                   variant="outlined"
                   onChange={(e)=>setPassword(e.target.value)}
                   fullWidth
                  />
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Confirm Password"
                   type="password"
                   autoComplete="current-email"
                   variant="outlined"
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   fullWidth
                  />
                
                <Button className={classes.signup} type='submit' color='primary' variant="contained"  onClick={(e)=> registerHandler(e)} fullWidth>Sign Up</Button>
                
                
            </Paper>
            <div className={classes.snackbar}>
            
               <Snackbar open={open.status} autoHideDuration={6000} onClose={handleClose}>
                   <Alert  severity={open.severity} onClose={handleClose}>
                       {open.message}
                   </Alert>
               </Snackbar>
            </div>
        </Grid>
    )
}

export default Register;