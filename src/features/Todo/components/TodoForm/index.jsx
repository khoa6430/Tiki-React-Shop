import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-control/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

TodoForm.protoType={
    onSubmit:PropTypes.func,
}
function TodoForm(props) {
    const schema = yup.object({
        title:yup.string().required('Please enter title'),
    });
    const form = useForm({
        defaultValues:{
            title:'',
        },
        resolver:yupResolver(schema),
    });
    const handleSubmit = (values)=>{
        console.log('Todo Form:',values);
        const {onSubmit}=props;
        if(onSubmit){
            onSubmit(values);
        }
        form.reset();
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form}/>
        </form>
    );
}
export default TodoForm;