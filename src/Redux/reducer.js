import axios from 'axios';

const initialState = {
    user: {},

    chosenState:'',
    chosenCity: '',
    chosenTrail:[],
    oneTrail:[],
    trailId: '',
    statesList: [],
    citiesList: [],
    trailsList: [],

    latitude: '',
    longitude: '',

    profile: [],
    profilePic: '',
    bio: '',
    city: '',
    profileState: '',
    firstName: '',
    lastName: '',
    experience: ''

    
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
const GET_PROFILE = 'GET_PROFILE';
const POST_PROFILE = 'POST_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';
const POST_PROFILE_PIC = 'POST_PROFILE_PIC';
const POST_BIO = 'POST_BIO';
const POST_CITY = 'POST_CITY';
const POST_PROFILE_STATE = 'POST_PROFILE_STATE';
const POST_FIRST_NAME = 'POST_FIRST_NAME';
const POST_LAST_NAME = 'POST_LAST_NAME';
const POST_EXPERIENCE = 'POST_EXPERIENCE';

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


        case GET_PROFILE + `_FULFILLED`:
                return {...state, profile: action.payload}
        case POST_PROFILE + `_FULFILLED`:
                return {...state, profile: action.payload}
        case EDIT_PROFILE + `_FULFILLED`:
                return {...state, profile: action.payload}
        case POST_PROFILE_PIC:
            return {...state, profilePic: action.payload}
        case POST_BIO:
            return {...state, bio: action.payload}
        case POST_CITY:
            return {...state, city: action.payload}
        case POST_PROFILE_STATE:
            return {...state, profileState: action.payload}
        case POST_FIRST_NAME:
            return {...state, firstName: action.payload}
        case POST_LAST_NAME:
            return {...state, lastName: action.payload}
        case POST_EXPERIENCE:
            return {...state, experience: action.payload}
            
            
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
        console.log(res.data)
        return res.data 
     })
    }
}

export function getCities(citiesList){
    // console.log(citiesList)
return {
        type: GET_CITIES,
        payload: axios.get('https://raw.githubusercontent.com/JacobTBralish/list-of-states/master/majorcities.json').then(res => {
            return res.data
        })
    }
}

export function getTrails(trailsList){
    console.log(trailsList)
return {
        type: GET_TRAILS,
        payload: trailsList
    }
}

export function getTrail(chosenTrail){
    console.log(chosenTrail)
return {
        type: GET_TRAIL,
        payload: chosenTrail
    }
}

export function chooseTrail(trailId) {
    console.log(trailId);
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


//----------------------------------------------------------------------LOGIN--------------------------------------------------------------\\

// export function logIn(){
//     return {
//         type: LOGGED_IN,
//         payload: axios.get('/api/user-data')
//         .then(response => {
//             console.log(response.data)
//             return response.data
//         }).catch(err => console.log('error in login', err))
//     }
// }

export function logIn(user){
    console.log(user)
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logOut(){
    return {
        type: LOGGED_OUT
    }
}



//----------------------------------------------------------------------PROFILE INFO--------------------------------------------------------------\\

export function getProfile( id ){
    return {
        type: POST_PROFILE,
        payload: axios.get(`/api/profile?id=${ id }`).then(response => {
            return response.data}).catch(error => {
                console.log(error, 'There was an error accessing your profile.')
            }).catch(error => {
                console.log(error, 'Error getting your profile.')
            })
    }
}

export function postProfile(profilePic, bio, firstName, lastName, experience ){
    return {
        type: POST_PROFILE,
        payload: axios.post('/api/profile', [profilePic, bio, firstName, lastName, experience ]).then(response => {
            return response.data;
        })
    }
}

export function editProfile(id, profilePic, bio, experience){
    return {
        type: POST_PROFILE,
        payload: axios.put(`/api/profile/${ id }`, [profilePic, bio, experience]).then(response => {
            return response.data;
        })
    }
}

export function postProfilePic(profilePic) {
    // console.log(item);
    return {
        type: POST_PROFILE_PIC,
        payload: profilePic
    }
}

export function postBio(bio) {
    // console.log(item);
    return {
        type: POST_BIO,
        payload: bio
    }
}
export function postCity(city) {
    // console.log(item);
    return {
        type: POST_CITY,
        payload: city
    }
}
export function postState(profileState) {
    // console.log(item);
    return {
        type: POST_PROFILE_STATE,
        payload: profileState
    }
}

export function postFirstName(firstName) {
    // console.log(item);
    return {
        type: POST_FIRST_NAME,
        payload: firstName
    }
}

export function postLastName(lastName) {
    // console.log(item);
    return {
        type: POST_LAST_NAME,
        payload: lastName
    }
}

export function postExperience(experience) {
    // console.log(item);
    return {
        type: POST_EXPERIENCE,
        payload: experience
    }
}



// export function chooseState(item) {
//     console.log(item);
    
//     return {
//         type: CHOSEN_STATE,
//         payload: item
//     }
// }





