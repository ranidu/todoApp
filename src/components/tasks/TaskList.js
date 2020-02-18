import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveTasks,
  changeStatus,
  changeStatusSelected
} from "../../actions/taskActions";
import {
  AllCheckerCheckbox,
  Checkbox,
  CheckboxGroup
} from "@createnl/grouped-checkboxes";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class TaskList extends Component {
  componentDidMount = () => {
    this.setState({
      taskStatus: this.props.status ? this.props.status : null
    });
    this.props.retrieveTasks();
  };
  componentDidUpdate = (prevProps, nextProps) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        taskStatus: this.props.status ? this.props.status : null
      });
      this.props.retrieveTasks();
    }
  };
  handleStatusChange = e => {
    if (e.target.checked) {
      this.props.changeStatus(e.target.id, "completed");
    } else {
      this.props.changeStatus(e.target.id, "active");
    }
  };

  selectAll = e => {
    this.setState({
      selectedTasks: e
    });
  };

  handleAllStatusChange = status => {
    this.props.changeStatusSelected(this.state.selectedTasks, status);
  };

  render() {
    let { tasks } = this.props;
    return (
      <div className="task-list section">
        <CheckboxGroup onChange={this.selectAll}>
          <div className="row">
            <div className="col m5">
              <label className="left selectall-panel">
                <AllCheckerCheckbox className="filled-in" />
                <span className="selectall-label">
                  Select All / Deselect all
                </span>
              </label>
            </div>
            <div className="col m7 right select-all-panel">
              <Link to=""
                className="waves-effect waves-light btn active-btn pink"
                onClick={() => this.handleAllStatusChange("active")}
              >
                Active
              </Link>
              <Link to =""
                className="waves-effect waves-light btn complete-btn"
                onClick={() => this.handleAllStatusChange("completed")}
              >
                Complete
              </Link>
            </div>
          </div>
          <ul>
            {tasks.length > 0
              ? tasks &&
                tasks
                  .filter(task =>
                    this.state.taskStatus
                      ? task.status === this.state.taskStatus
                      : true
                  )
                  .map(task => {
                    return (
                      <li key={task._id} className="task-list">
                        <div className="row">
                          <div className="col m1">
                            <label>
                              <Checkbox
                                value={task._id}
                                className="filled-in"
                              />
                              <span></span>
                            </label>
                          </div>
                          <div className="col m6 task-details">
                            <p>{task.task}</p>
                            <span>
                              <Moment format="LLL">{task.createdAt}</Moment>
                            </span>
                          </div>
                          <div className="col m5 task-action">
                            <div className="switch">
                              <label>
                                Active
                                <input
                                  id={task._id}
                                  type="checkbox"
                                  onChange={this.handleStatusChange}
                                  checked={
                                    task.status === "completed" ? true : false
                                  }
                                />
                                <span className="lever"></span> Complete
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
              : `Add a new task to display here :-)`}
          </ul>
        </CheckboxGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  reload: state.error
});

const mapDispatchToProps = dispatch => {
  return {
    retrieveTasks: () => {
      dispatch(retrieveTasks());
    },
    changeStatus: (id, status) => {
      dispatch(changeStatus(id, status));
    },
    changeStatusSelected: (ids, status) => {
      dispatch(changeStatusSelected(ids, status));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
