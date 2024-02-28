import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>({
   container:{
      paddingTop:theme.spacing(10)
   }
}))
const About = () => {
   const classes = useStyles();

   return (
      <Container className={classes.container}>About page</Container>
   )
};

export default About;