import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import NotFound from '../../components/NotFound';
TodoFeature.propTypes = {
};

function TodoFeature() {
    const match = useRouteMatch();
    return (                            
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact/>
                <Route path={`${match.path}/:todoId`}  component={DetailPage} exact/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    )  ;
}
export default TodoFeature;