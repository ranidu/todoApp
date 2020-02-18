import axios from "axios";

export const createTask = task => {
  return dispatch => {
    dispatch({ type: "CREATING_TASK" });
    axios
      .post("http://localhost:8080/api/todo", { task })
      .then(todo => {
        dispatch({ type: "CREATING_TASK_SUCCESSFULLY", task: todo });
      })
      .catch(e => {
        dispatch({ type: "CREATING_TASK_FAILED", error: e });
      });
  };
};

export const retrieveTasks = () => {
  return dispatch => {
    dispatch({ type: "RETRIEVE_STARTED" });
    axios
      .get("http://localhost:8080/api/todo")
      .then(todos => {
        dispatch({ type: "RETRIEVE_COMPLETED", tasks: todos });
      })
      .catch(e => {
        dispatch({ type: "RETRIEVE_FAILED", error: e });
      });
  };
};

export const changeStatus = (id, status) => {
  return dispatch => {
    dispatch({ type: "CHANGE_STATUS" });
    axios
      .patch("http://localhost:8080/api/todo/update/status/" + id, { status })
      .then(todo => {
        dispatch({ type: "CHANGE_STATUS_COMPLETED", tasks: todo });
      })
      .catch(e => {
        dispatch({ type: "CHANGE_STATUS_FAILED", error: e });
      });
  };
};

export const changeStatusSelected = (ids, status) => {
  return dispatch => {
    dispatch({ type: "CHANGE_STATUS_SELECTED" });
    axios
      .patch("http://localhost:8080/api/todo/update/status/selected", {
        ids,
        status
      })
      .then(todo => {
        dispatch({ type: "CHANGE_STATUS_SELECTED_COMPLETED", tasks: todo });
      })
      .catch(e => {
        dispatch({ type: "CHANGE_STATUS_SELECTED_FAILED", error: e });
      });
  };
};
