import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {host} from '../../host';
const useStyles = makeStyles((theme) =>({
      
     Menu:{
          marignTop:theme.spacing(10)
     }
     
                   

}))

const Logout = () => {

    const [id, setId] = useState();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const logout = Boolean(anchorEl);
    const history = useHistory();
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      
      localStorage.removeItem("authToken");
      history.push('/login');
      setAnchorEl(null);
      window.location.reload(false);

    };

      const handleProfile = () => {
    
      let name = "profile"
      
      history.push('/'+name+"/"+id);
      

    };

    const closeMenu = ()=>{
        setAnchorEl(null);
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
        if(auth.data){
            setId(auth.data._id);
            
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[])

    return (
        <div>
        <SettingsIcon style={{ fontSize: 30 }} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} />
           <div className={classes.Menu}>
           <Menu
           id="fade-menu"
           anchorEl={anchorEl}
           keepMounted
           open={logout}
           onClose={closeMenu}
           TransitionComponent={Fade}
           >
           <MenuItem onClick={handleProfile}>Profile</MenuItem>
           <MenuItem onClick={handleClose}>Logout</MenuItem>
           
       
           </Menu>
           </div>
        </div>
    )
}

export default Logout;