import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import TodoForm from '../../components/TodoForm';
ListPage.propTypes = {
    
};

function ListPage(props) {
    const initTodoList=[
        {
            id:1,
            title : 'Learn React',
            status:'new',
        },
        {
            id:2,
            title : 'Learn Responsive',
            status:'completed',
        },
        {
            id:3,
            title : 'Learn Toeic',
            status:'new',
        }
    ]
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList,setTodoList] = useState(initTodoList);  //ban dau todoList có GT là initTodoList
    const [filterStatus,setFilteredStatus] = useState(()=>{
        const params = queryString.parse(location.search);
        console.log(params);
        return params.status||'all';
    });
    useEffect(()=>{
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status||'all');
    },[location.search]);
    const handleTodoClick = (todo,idx) => {   
        //clone current array to the new one (làm việc với object array thì phải clone ra mảng mới)     
        const newTodoList = [...todoList];
        console.log(todo,idx);                  //5.Sẽ in ra tt click
        //toggle state
        newTodoList[idx] = {
            ...newTodoList[idx],    //voi nhung gia tri hien tai 
            status : newTodoList[idx].status === 'new'?'completed':'new',
        };
        //update todo list lai
        setTodoList(newTodoList);//sẽ render lại vì state mình đã thay đổi
    }
    const handleShowAllClick =() =>{
        // setFilteredStatus('all');
        const queryParams = {status :'all'};    
        history.push({  //tao url tuong ung voi button
            pathname : match.path,
            search : queryString.stringify(queryParams)
        });
    }
    const handleShowCompletedClick =() =>{
        // setFilteredStatus('completed');
        const queryParams = {status :'completed'};    
        history.push({  //tao url tuong ung voi button
            pathname : match.path,
            search : queryString.stringify(queryParams)
        });
    } 
    const handleShowNewClick =() =>{
        setFilteredStatus('new');
        const queryParams = {status :'new'};    
        history.push({  //tao url tuong ung voi button
            pathname : match.path,
            search : queryString.stringify(queryParams)
        });
    }

    const renderedTodoList = useMemo(()=>{
        return todoList.filter(todo=>filterStatus==='all'||filterStatus===todo.status);
    },[todoList,filterStatus]) 
    console.log(renderedTodoList);

    const handleTodoFormSubmit = (values)=>{
        console.log('Form submit : ',values);
        const newTodo={
            id:todoList.length+1,
            title:values.title,
            status:'new',
        };
        const newTodoList =[...todoList,newTodo];
        setTodoList(newTodoList);
    }

    return (                            
        <div>
            <h3>TODO FORM</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
            <h3>TODO LIST</h3>             
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}/>   {/*4.Bên con gọi lại hàm này  */}
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    )  ;
}

export default ListPage;