import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link, responsiveFontSizes } from '@material-ui/core'

import axios from 'axios';
import { useHistory } from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
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
        height:'70vh',
        width:500, 
        margin:"20px auto",
  
     },
     signupSection:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3)
     }
    
    
}))

 

const Posts =()=>{
     const [check,setCheck] =useState(false);
     const [date,setdate] = useState("");    
     const [mechanic, setmechanic] = useState("");
     const [rows,Setrows]= useState([]);
     const [open,setOpen] =useState({
        status:false,
        message: " ",

     })



        const history = useHistory();

        const handleRoute = (result) =>{
      
              history.push('/'+result)

        }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
      };

      function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
       }
   
    useEffect(async() => {

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
        const data = await axios.get(host+ "/api/posts",config);
        
        console.log("All Posts" +data)
        if(data.data){
            Setrows(data.data);
        }
 
    }   catch (error) {
     
        history.push('/adminpost')
    }
  
   },[check])

    const deleteid = async(deleteid)=>{
        console.log(deleteid);

             try {

             let config = {
              headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
                 let data = await axios.delete(host+"/api/posts/"+[deleteid],config);
                 console.log("check "+ data)
                 setCheck(!check);
             } catch (error) {
                     console.log(error.message);
             }
               

    }
    const classes = useStyles();



        const loginHandler = async(value,valueDate)=>{
          
        
         let setupDate = date
         if(!date){
             setupDate = valueDate;
         }
        
        try {

            let data = await axios.post(host+"/api/posts",{                
                "mechanic":mechanic,
                "date":setupDate,
                "id":value
                
              });
              if(data){
              setOpen({
               
                status:true,
                message: "Changed Updated",
                severity: "success",
                
              })
              
            }
           
            

            } catch(error) {

            console.log(error.message);
            
            setOpen({
               
                status:true,
                message: "Mechanic is not available at this date",
                severity: "error",
                
            })
            
      }
   }

    return(
      <>
        <Grid className={classes.grid}>
            
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Post User ID</TableCell>
                          <TableCell align="center">Posted text</TableCell>
                          <TableCell align="center">Post Title</TableCell>                          
                          <TableCell align="center">Post Media</TableCell>
                          <TableCell align="center">Total Likes</TableCell>
                          <TableCell align="center">Total Comments</TableCell>
                          <TableCell align="center">Remove</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(0).reverse().map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                             {row.name}
                            </TableCell>
                            <TableCell align="center">{row.user}</TableCell>
                            <TableCell align="center">{row.text}</TableCell>
                             <TableCell align="center">{row.shows}</TableCell> 
                             <TableCell align="center"><img src={"https://image.tmdb.org/t/p/original"+row.image} style={{width:400}} alt={row.shows} /></TableCell>
                             <TableCell align="center">{row.likes.length}</TableCell>
                             <TableCell align="center">{row.comments.length}</TableCell>      
                             <TableCell align="center"><Button variant="contained" color="secondary"onClick={()=> deleteid(row._id)}>Delete</Button></TableCell>                       
                            
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
             </TableContainer>   
            
        </Grid>

     <div className={classes.snackbar}>

            <Snackbar  open={open.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert  severity={open.severity} onClose={handleClose}>
                    {open.message}
                </Alert>
            </Snackbar>  
                
     </div>
        </>
    )
}

export default Posts;