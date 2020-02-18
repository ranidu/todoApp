import React, {Component } from 'react';
import TaskList from '../tasks/TaskList';
import { Link } from 'react-router-dom';
import CreateTask from './CreateTask';

class Dashboard extends Component{
    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.status !== this.props.match.params.status ){
            //this.props.urlChanged();
        }
    }
    render(){
        let { status } = this.props.match.params;
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col m8 offset-m2">
                        <CreateTask />
                    </div>
                </div>
                <div className="row">    
                    <div className="col m8 offset-m2">
                        <TaskList status={status} />
                        <div className="container todo-category-selector">
                            <Link to="/" className="waves-effect waves-light btn">All</Link>
                            <Link to="/category/active" className="waves-effect waves-light btn">active</Link>
                            <Link  to="/category/completed" className="waves-effect waves-light btn">completed</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default Dashboard;