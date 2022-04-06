import { yupResolver } from '@hookform/resolvers';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {Button} from '@material-ui/core'; 
import QuantityField from '../../../components/form-control/QuantityField';


AddToCartForm.propTypes = {
    onSubmit:PropTypes.func
};

function AddToCartForm({onSubmit=null}) {

    const schema = yup.object().shape({
        quantity: yup.number().min(1,'Minium value is 1')
        .required('Please enter quantity')
        .typeError('Please enter a number')

    });
    const form = useForm({
        defaultValues:{
            quantity:1,
        },
        resolver:yupResolver(schema),
    });
    const handleSubmit = async (values)=>{
        if(onSubmit){
            //have wait onSubmit(get api) to done
            await onSubmit(values);
        }
        // form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} variant="outlined">
        <QuantityField name="quantity" label="Quantity" form={form}/>
        <Button  type ="submit"  variant="contained" color="primary" fullWidth style={{width:'250px'}}>
           Buy
        </Button>
    </form>
    );
}

export default AddToCartForm;