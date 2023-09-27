import { Box,Typography,useTheme,useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = ()=>{
    const theme  = useTheme();
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
    const dark = theme.palette.secondary.dark;

    return(
        <Box>
            <Box width="100%" backgroundColor = {theme.palette.background.alt} p="1rem 6%" textAlign="center" >
            <Typography
          fontWeight="bold"
          fontSize="36px" //it is predefined function in css to determine minimum value for a font and maximum value for a font and a preferred value
          color="primary"
          sx={
            //at sx we can pss css properties which are psuedo properties
            {
              "&:hover": {
                color: dark, //can use primaryLight
                cursor: "pointer",
              },
            }
          }
        >
          SociOut
        </Typography>
        </Box>
        <Box width= {isNonMobileScreens? "50%" : "95%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor = {theme.palette.background.alt}>
        <Typography fontWeight="500" variant="h5" sx = {{mb : "1.5rem"}} >
        Welcome to SociOut,See Other's Feed 

        </Typography>
        <Form/>
        </Box>
       
            
        </Box>
    )
}
export default LoginPage;