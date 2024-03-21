import { Container, makeStyles,Grid } from "@material-ui/core";
import Post from "./post";
import { Tmdb_post } from "./tmdb_post";

const useStyles = makeStyles((theme) =>({
    container:{
        paddingTop:theme.spacing(10)
     }
}))
const AdminMain = () => {
   const classes = useStyles();

   return (
       
       <Container className={classes.container} cols={3}>
         
           <h1>Working</h1>
         
        </Container>
           
           
   )
};

export default AdminMain;