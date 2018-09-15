import axios from 'axios';

const initialState = {
    user: {
        username: '',
        password:'',
        firstName:'',
        lastName:'',
        profilePic:'',
        email:'',
        DOB:'',
    },
    chosenState:'',
    statesList: []
    
}

const LOGGED_IN = 'LOGGED_IN';
const REGISTER = 'REGISTER';
const LOGGED_OUT = 'LOGGED_OUT';
const CHOSEN_STATE = 'CHOSEN_STATE';
const GET_STATES = 'GET_STATES';

export default function reducer (state = initialState, action){
    // console.log(action.payload)
    switch(action.type){
        case LOGGED_IN:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}
        case CHOSEN_STATE:
            return {...state, chosenState: action.payload}
        case GET_STATES:
            return {...state, statesList: action.payload}

    
    //  case LOGGED_IN:
    //         return {...state, user: action.payload}
    default:
    return state
    }
}

export function getStates(stateList){console.log(stateList)
    return {
        type: GET_STATES,
        payload: stateList
    }
}

export function logIn(obj, history){
    return {
        type: LOGGED_IN,
        payload: axios.post('/login', obj).then(response => {
            history.push('/');
            return response.data
        })
    }
}

export function logOut(){
    return {
        type: LOGGED_OUT
    }
}
export function register(obj, history){
    return {
        type: REGISTER,
        payload: axios.post('/register', obj).then(response => {
            history.push('/');
            return response.data;
        })
    }
}

export function chooseState(item) {
    console.log(item);
    
    return {
        type: CHOSEN_STATE,
        payload: item
    }
}