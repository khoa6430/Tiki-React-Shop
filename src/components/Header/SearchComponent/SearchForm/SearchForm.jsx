import React from 'react';
import PropTypes from 'prop-types';
import InputSearch from '../../../../components/form-control/InputSearch';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import LockOutline from '@material-ui/icons/LockOutlined';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'; 
import logosearch from '../../../../img/searchicon.png';
SearchForm.protoType={
    onSubmit:PropTypes.func,
}
const useStyles = makeStyles(theme=> ({
    root:{

        paddingTop: theme.spacing(1),
    },
   
    frameform:{
        display:'flex',
        marginRight:'0%',
        marginBottom:'-20px'
    },
    searchform:{
        
    },
    submit:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop : '5px',
        cursor: 'pointer',
        width:'10%',
        background: "rgb(13, 92, 182)",
        height: '47px',
        fontSize:'13px',
        borderRadius: '0px 2px 2px 0px',
        color: 'white',
        fontSize: '13px',
        fontWeight: 500,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "&:hover, &:focus": {
            background: "rgb(13, 92, 182)",
        },
        color: "white",
        [theme.breakpoints.down("xs")]: {
            display:'none',
        },
        [theme.breakpoints.between("sm", "md")]: {
            display:'none',
        },
        "@media (min-width: 1280px)": {
            width:'18%',
        }
    },
    logosearch:{
        width:'20px',
        height:'20px',
        marginLeft:'-5px'
    }

}));

function SearchForm(props) {
    const classes = useStyles();
    const schema = yup.object({
        searchinput: yup.string()
        // .required('Please enter your email')
        // .email('Please enter a valid email address'),
        // password: yup.string().required('Please enter your password')
        // .min(6,'Please enter at least 6 character'),
    });
    const form = useForm({
        defaultValues:{
            searchinput:'',
        },
        resolver:yupResolver(schema),
    });
    const handleSubmit = async (values)=>{
        const {onSubmit}=props;
        if(onSubmit){
            //have wait onSubmit(get api) to done
            await onSubmit(values);
        }
         form.reset();
    }

    const {isSubmitting} = form.formState;
    return (
        <div className={classes.root}>
           <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined" className={classes.frameform}>
                <InputSearch name="searchinput" label="Tìm Kiếm" form={form} className={classes.searchform} />
                <Button disabled={isSubmitting} type ="submit" className={classes.submit} variant="contained" 
                   >
                    <img src={logosearch} alt="logosearch" className={classes.logosearch}/>
                    <Typography style={{fontSize:'13px',marginLeft:'10px',}}> Tìm kiếm</Typography>
                </Button>
            </form>
        </div>
    );
}
export default SearchForm;























