import React,{useState,useEffect} from 'react'
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home,Person,List,PhotoCamera,PlayCircleOutline} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import {host} from '../../host';

const useStyles = makeStyles((theme) =>({
          container:{
             position:"sticky",
             top:0,
             height:"100vh",
             color:"white",
             paddingTop:theme.spacing(10),
             backgroundColor: theme.palette.primary.main,
             [theme.breakpoints.up("sm")]:{
                backgroundColor:"white",
                color:"#555",
                border:"1px solid #ece7e7"
            }
          },
          item:{
             display:"flex",
             alignItems:"center",
             marginBottom:theme.spacing(3),
             [theme.breakpoints.up("sm")]:{
                marginBottom:theme.spacing(3),
                cursor:"pointer"
             }
          },
          text:{
            fontWeight:500,
             [theme.breakpoints.down("sm")]:{
                display:"none",
             }
          },
          icon:{
             fontWeight:500,
             marginRight:theme.spacing(1),
             [theme.breakpoints.up("sm")]:{
                fontSize:"18px"
             }
          }
}))
const AdminLeftbar = () => {
   const classes = useStyles();
   const history = useHistory();
   const [id, setId] = useState(false);

   const handleRoute = (result) =>{
        
        history.push('/'+result)
   }

  useEffect(async(e) => {
     
    let config = {
        headers:{
            "content-Type":"application/json"
        }
    }
    try {
        config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
       
        const auth = await axios.get(host+"/api/auth",config);
        console.log(auth)

            if(auth.data.email == "admin@gmail.com"){
               
                setId(true);

            }
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[])


   return (
       <Container className={classes.container}>
          <div className={classes.item}>
             
             <Home className={classes.icon}  onClick={()=> handleRoute("/")}/>
             <Typography className={classes.text} onClick={()=> history.push('/')}>Home Page</Typography>
                       
          </div>
           <div className={classes.item}>
             <PeopleAltIcon className={classes.icon} onClick={()=> handleRoute("adminpanel")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("adminpanel")}>All Users</Typography>            
          </div>
          <div className={classes.item}>
             <AllInboxIcon className={classes.icon} onClick={()=> handleRoute("adminpost")} />
             <Typography className={classes.text} onClick={()=> handleRoute("adminpost")}>All Posts</Typography>            
          </div>         
       </Container>
   )
};

export default AdminLeftbar;