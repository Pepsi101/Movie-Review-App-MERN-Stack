import { Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Feed from "../components/feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import { Link } from "react-router-dom";
import Details from "../components/Details";
import MediaRight from "../components/mediaRight";

const useStyles = makeStyles((theme) =>({
      right:{
          [theme.breakpoints.down("sm")]:{
             display: "none",
          }
      },
      up:{
         marginTop :theme.spacing(7),
         [theme.breakpoints.down("sm")]:{
            marginLeft: theme.spacing(1),
         }
     }

}))

const Detailpage = () => {
   const classes = useStyles();

   return (
      <div>
       
        <Grid container>
           <Grid item sm={2} >
           <Leftbar/>
           </Grid>
           <Grid item sm={7} xs={10} className={classes.up}>
              <Details/>
           </Grid>
           <Grid item sm={3} className={classes.right}>
            <MediaRight/>  
           </Grid>
        </Grid>
       
      </div>
   )
};

export default Detailpage;