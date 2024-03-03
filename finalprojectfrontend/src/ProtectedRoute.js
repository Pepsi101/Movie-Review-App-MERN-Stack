
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import { PanoramaSharp } from '@material-ui/icons';

function ProtectedRoute({auth,component:Component, ...rest}) {

     
    return  ( <Route 
    {...rest}
     render={(props)=>{
         
        
         
         if(localStorage.getItem("authToken")){
          return <Component {...props}/>;
         }
         else{
           console.log("ran so fast")
         return <Redirect to={{ pathname: "/login", state: { from: props.location} }} />
         }
         
        }
      }
    />
   );
 }   

export default ProtectedRoute

