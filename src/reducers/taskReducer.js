const initState = {
    task:'',
    tasks: [],
    task_name: '',
    error: false
};

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATING_TASK':
            break;
        case 'CREATING_TASK_SUCCESSFULLY':
            return { ...state , error: false, tasks: action.task.data, task_name: '' }
        case 'CREATING_TASK_FAILED':
            return { ...state , error: true, task: action.error }
        case 'RETRIEVE_COMPLETED':
            return { ...state , error: false, tasks: action.tasks.data }  
        case 'CHANGE_STATUS_COMPLETED':
            return { ...state , error: false, tasks: action.tasks.data } 
        case 'CHANGE_STATUS_SELECTED_COMPLETED':
            return { ...state , error: false, tasks: action.tasks.data }   
        case 'URL_CHANGED':
            console.log(state.tasks);
            return { ...state , error: false, tasks: state.tasks }      
        default:
            return state;    
    }

    return state
}

export default taskReducer;