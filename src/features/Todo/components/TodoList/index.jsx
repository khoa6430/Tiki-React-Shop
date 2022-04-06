import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

TodoList.propTypes = {
  todoList : PropTypes.array,
  onTodoClick:PropTypes.func
};
TodoList.defaultProps = {
    todoList : [],
    onTodoClick : null
  };
  

function TodoList({todoList,onTodoClick}){          //truy vao props la todoList va func onTodoClick
    const handleTodoClick = (todo,idx)=>{         //1.Dau tiem kiem tra xem cha co truyen vao function
      if(!onTodoClick) return;
      onTodoClick(todo,idx);                      //3.Gọi lại hàm bên cha truyền vào object ,index 
    }
  
    const classes = useStyles();
    return (
      <ul className='todo-list'>
        <Button className={classes.root}>Hook</Button>
          {todoList.map((todo,idx) =>(  //  map( currentValue[, index[, array]])
              <li key={todo.id} className={classNames({
                'todo-item':true,         //luon luon co ten   class todo-item
                completed:todo.status === 'completed'     //nhung item nao co trang thai completed se co them class completed
              })}
                onClick={()=> handleTodoClick(todo,idx)}    //2.Khi click sẽ gọi lại hàm B1 truyền vào object,index 
              >{todo.title}</li>   //khi render 1 list phai co key
          ))}
      </ul>
    );
}

export default TodoList;