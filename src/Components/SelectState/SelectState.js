import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { chooseState, getStates } from '../../Redux/reducer'
import State from '../SelectState/State'
import { Link } from 'react-router-dom'

class SelectState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statesList: []

        }
    }
    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/JacobTBralish/list-of-states/master/states.json').then(res => {
            // console.log(res.data)
            this.props.getStates(res.data)
        })
    }



    render() { 

        let { statesList, chooseState } = this.props;
        // console.log(statesList);
        let mappedStates = statesList ? statesList.map((state, index) => {
            return <Link key={index} to={`/selectcity`}><button  
            onClick={(e) => chooseState(e.target.value)}
              
             value={state.name}>{state.name}
             
             <State {...statesList}/>
             
             </button></Link>
        })  : 'loading'

        return ( 
            <div>
                <div>
                {mappedStates}
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