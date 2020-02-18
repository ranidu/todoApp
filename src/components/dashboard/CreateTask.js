import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';

class CreateTask extends Component{
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createTask(this.state.taskName);
        this.setState({taskName: ""});
    }

    render(){
        return(
            <div className="white card blue-grey grey lighten-3">
                <form onSubmit={this.handleSubmit} className="create-form">
                    <div className="row">
                        <div className="col m9">
                            <div className="input-field">
                                <label htmlFor="taskName">Task Name</label>
                                <input type="text" id="taskName" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="col m3">
                            <div className="input-field">
                                <button className="btn btn-pink lighten-1 z-depth-0">Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task_name) => {dispatch(createTask(task_name))}
    }
}

const mapStateToProps = (state) => ({
    // task_name: state.task_name
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);