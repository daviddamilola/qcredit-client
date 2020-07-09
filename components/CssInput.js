import {TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';



const CssTextField = withStyles({
    root: {
        background: '#FDFDFD',
        borderRadius: '5px',
        fontWeight: 'bold !important',
      "& .MuiInputBase-input":{
        fontWeight: 'bold',
      },
      "& label.Mui-focused": {
        color: "grey",
        fontSize: 10,
        
      },
      "& ::placeholder": { fontSize: "12px" },
  
      "&:hover": {
        borderColor: "#F2C744"
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none !important"
      },
      "& .MuiInput-underline:before": {
        borderColor: "#F2C744"
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderColor: "#F2C744",
        fontWeight: 'bold !important',
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1px solid #eaeaea",
          opacity: "60%"
        },
        "&:hover fieldset": {
          borderColor: "#F2C744"
        },
        "&.Mui-focused fieldset": {
          border: "1px solid #F2C744"
        }
      }
    }
  })(TextField);

  export default CssTextField;