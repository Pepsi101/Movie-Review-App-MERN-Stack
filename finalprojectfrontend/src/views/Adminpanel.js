import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Tmdb_post } from "../components/tmdb_post";
import AdminLeftbar from "../components/admin/AdminLeftbar";
import Users from "../components/admin/Users";
import React,{useState,useEffect} from 'react'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory,useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {host} from '../host';

const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      },
      texting:{
         marginTop:theme.spacing(50),
      }

}))






const Adminpanel = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const classes = useStyles();
      const history = useHistory();

       const loginHandler = async(e)=>{
          
        

        try {

            let config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }

            let data = await axios.get(host+"/api/auth",config);
            if(data.data.email != "admin@gmail.com"){

               localStorage.removeItem("authToken");
               history.push('/login');
               setAnchorEl(null);
               window.location.reload(false);

            }

            
           
        } catch (error) {
             console.log(error)
      }
   }

      useEffect(async(e) => {
          loginHandler();
      })

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
              <AdminLeftbar/>
           </Grid>
           <Grid item sm={10} xs={10}>
              <Users/>
           </Grid>
        </Grid>
        <Add/>
        
      </div>
      
   )
};

export default Adminpanel;