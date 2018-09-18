import axios from 'axios';

const initialState = {
    // user: {
    //     username: '',
    //     password:'',
    //     firstName:'',
    //     lastName:'',
    //     profilePic:'',
    //     email:'',
    //     DOB:'',
    // },
    chosenState:'',
    chosenCity: '',
    statesList: [],
    citiesList: [],
    trailsList: []
    
}

const LOGGED_IN = 'LOGGED_IN';
const REGISTER = 'REGISTER';
const LOGGED_OUT = 'LOGGED_OUT';
const CHOSEN_STATE = 'CHOSEN_STATE';
const CHOSEN_CITY = 'CHOSEN_CITY';
const GET_STATES = 'GET_STATES';
const GET_CITIES = 'GET_CITIES';
const GET_TRAILS = 'GET_TRAILS';

export default function reducer (state = initialState, action){
    // console.log(action.payload)
    switch(action.type){
        case LOGGED_IN:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}
        case CHOSEN_STATE:
            return {...state, chosenState: action.payload}
        case CHOSEN_CITY:
            return {...state, chosenCity: action.payload}
        case GET_STATES:
            return {...state, statesList: action.payload}
        case GET_CITIES:
            return {...state, citiesList: action.payload}
        case GET_TRAILS:
            return {...state, trailsList: action.payload}

    
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
export function getCities(citiesList){
    // console.log(citiesList)
return {
        type: GET_CITIES,
        payload: citiesList
    }
}

export function getTrails(trailsList){
    console.log(trailsList)
return {
        type: GET_TRAILS,
        payload: trailsList
    }
}


export function chooseState(item) {
    console.log(item);
    
    return {
        type: CHOSEN_STATE,
        payload: item
    }
}

export function chooseCity(item) {
    console.log(item);
    
    return {
        type: CHOSEN_CITY,
        payload: item
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
// export function chooseState(item) {
//     console.log(item);
    
//     return {
//         type: CHOSEN_STATE,
//         payload: item
//     }
// }