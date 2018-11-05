import axios from 'axios';
// import { push } from 'react-router-redux';

const initialState = {
    user: [],
    profile: [],

    chosenState:'',
    chosenCity: '',
    chosenTrail:[],
    oneTrail:[],
    trailId: '',
    statesList: [],
    citiesList: [],
    trailsList: [],
    trailReviews: [],

    visited: [],
    visitCount: 0,

    latitude: '',
    longitude: '',

    profilePic: '',
    bio: '',
    city: '',
    profileState: '',
    firstName: '',
    lastName: '',
    experience: '',    
}

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

const CHOSEN_STATE = 'CHOSEN_STATE';
const CHOSEN_CITY = 'CHOSEN_CITY';
const CHOSEN_TRAIL = 'CHOSEN_TRAIL';

const GET_STATES = 'GET_STATES';
const GET_CITIES = 'GET_CITIES';
const GET_TRAILS = 'GET_TRAILS';
const GET_TRAIL = 'GET_TRAIL';

const GET_VISITED_TRAIL = 'GET_VISITED_TRAIL';
const POST_VISITED_TRAIL = 'POST_VISITED_TRAIL';
const INCREMENT_VISITED = 'INCREMENT_VISITED';

const GET_TRAIL_REVIEWS = 'GET_TRAIL_REVIEWS';
const POST_TRAIL_REVIEWS = 'POST_TRAIL_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';

const GET_PROFILE = 'GET_PROFILE';
const POST_PROFILE = 'POST_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';


export default function reducer (state = initialState, action){
    console.log(action.payload)
    switch(action.type){
        case LOGGED_IN /* + `_FULFILLED` */:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}
        case CHOSEN_STATE:
            return {...state, chosenState: action.payload}
        case CHOSEN_CITY:
            return {...state, chosenCity: action.payload}
        case GET_STATES + `_FULFILLED`:
            return {...state, statesList: action.payload}
        case GET_CITIES + `_FULFILLED`:
            return {...state, citiesList: action.payload}
        case GET_TRAILS:
            return {...state, trailsList: action.payload}


        case GET_TRAIL:
            return {...state, chosenTrail: action.payload}
        case CHOSEN_TRAIL:
            return {...state, trailId: action.payload}
        case GET_TRAIL_REVIEWS:
            return {...state, trailReviews: action.payload}
        case POST_TRAIL_REVIEWS:
            return {...state, trailReviews: action.payload}
        case DELETE_REVIEW:
            return {...state, trailReviews: action.payload}

        case GET_VISITED_TRAIL:
            return {...state, visited: action.payload}
        case POST_VISITED_TRAIL:
            return {...state, visited: action.payload}
        case INCREMENT_VISITED:
            return {...state, visitCount: action.payload}




        case GET_PROFILE + `_FULFILLED`:
            return {...state, profile: action.payload}
        case POST_PROFILE + `_FULFILLED`:
            return {...state, profile: action.payload}
        case EDIT_PROFILE + `_FULFILLED`:
            return {...state, profile: action.payload}

            // return {...state, experience: action.payload}
            
            
    //  case LOGGED_IN:
    //         return {...state, user: action.payload}
    default:
    return state
    }
}

//----------------------------------------------------------------------GET INFO--------------------------------------------------------------\\

export function getStates(){
    return {
        
        type: GET_STATES,
        payload:  axios.get('https://raw.githubusercontent.com/JacobTBralish/list-of-states/master/states.json').then(res => {
        // console.log(res.data)
        return res.data 
     })
    }
}

export function getCities(){
    // console.log(citiesList)
return {
        type: GET_CITIES,
        payload: axios.get('https://raw.githubusercontent.com/JacobTBralish/list-of-states/master/majorcities.json').then(res => {
            return res.data
        })
    }
}

export function getTrails(trailsList){
    // console.log(trailsList)
return {
        type: GET_TRAILS,
        payload: trailsList
    }
}

export function getTrail(chosenTrail){
    // console.log(chosenTrail)
return {
        type: GET_TRAIL,
        payload: chosenTrail
    }
}

export function chooseTrail(trailId) {
    // console.log(trailId);
    return {
        type: CHOSEN_TRAIL,
        payload: trailId
    }
}

export function chooseState(item) {
    // console.log(item);
    return {
        type: CHOSEN_STATE,
        payload: item
    }
}

export function chooseCity(item) {
    // console.log(item);
    return {
        type: CHOSEN_CITY,
        payload: item
    }
}

export function getTrailReviews(trailReviews){
    // console.log(chosenTrail)
return {
        type: GET_TRAIL_REVIEWS,
        payload: trailReviews
    }
}

export function postTrailReview(trailReviews){
    // console.log(trailReviews)
return {
        type: POST_TRAIL_REVIEWS,
        payload: trailReviews
    }
}

export function deleteReview(trailReviews){
    console.log(trailReviews)
return {
        type: DELETE_REVIEW,
        payload: trailReviews
    }
}



//----------------------------------------------------------------------VISITED--------------------------------------------------------------\\



export function postVisitedTrail(visited){
return {
    type: POST_VISITED_TRAIL,
    payload: visited
    }
}

export function getVisitedTrails(visited){
return {
    type: GET_VISITED_TRAIL,
    payload: visited
    }
}

export function incrementVisited(visited){
return {
    type: INCREMENT_VISITED,
    payload: visited
    }
}


// export function visitedTrail(visited){
// return {
//     type: VISITED_TRAIL,
//     payload: visited
//     }
// }


//----------------------------------------------------------------------LOGIN--------------------------------------------------------------\\


export function logIn(user){
    console.log(user)
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logOut(){
    return {
        type: LOGGED_OUT,
        payload: null
    }
}



//----------------------------------------------------------------------PROFILE INFO--------------------------------------------------------------\\

export function getProfile(id){
    console.log( id );
    return {
        type: GET_PROFILE,
        payload: axios.get(`/api/profile/${ id }`).then(response => { console.log(response.data)
            console.log('profile.id: ', response.data);
            console.log('response: ', response);
            return response.data
        })
    }
}

export function postProfile(id, profileId, profilePic, bio, city, profileState, firstName, lastName, experience ){
    // console.log(id, profilePic, bio, city, profileState, firstName, lastName, experience)
    return {
        type: POST_PROFILE,
        payload: axios.post(`/api/profile/${ id }`, { profileId, profilePic, bio, city, profileState, firstName, lastName, experience }).then(response => {
            // console.log(response.data, 'Here is the profiles response.data')
            return response.data;
        }).catch(error => {
            console.log(error, 'error in reducer post profile')
        })
    }
}

export function editProfile(id, profilePic, bio, city, profileState, lastName, experience){
    // console.log(id, profilePic, bio, city, profileState, lastName, experience)
    return {
        type: POST_PROFILE,
        payload: axios.put(`/api/profile/${ id }`, {profilePic, bio, city, profileState, lastName, experience}).then(response => {
            console.log(response.data, "EDIT REDUCER METHOD")
            return response.data;
        })
    }
}







