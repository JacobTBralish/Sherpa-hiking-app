import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseState, getStates } from '../../Redux/reducer'
import { Link } from 'react-router-dom'
import './SelectState.css';

class SelectState extends Component {


    componentDidMount() {
        this.props.getStates();
    }



    render() { 

        let { statesList, chooseState } = this.props;
        // console.log(statesList);
        let mappedStates = statesList ? statesList.map((state, index) => {
        return <div key={index} >{<img className='stateImage' alt={state.name} src={state.url}></img>}<Link to={`/selectcity`}><button 
            className='stateButton'
            onClick={(e) => chooseState(e.target.value)}
              
             value={state.name}>{state.name}
             
             </button></Link></div>
        })  : 'loading'


        return ( 
            <div className='main'>
            <h2>Select the state you are hiking in!</h2>
                <div className='container'>
                    <div className='stateContainer'>
                        {mappedStates}
                </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
      statesList: state.statesList 
    }
    
}

const mapDispatchToProps = {
    chooseState,
    getStates
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SelectState);