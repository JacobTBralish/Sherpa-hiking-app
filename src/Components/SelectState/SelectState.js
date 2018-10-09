import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseState, getStates } from '../../Redux/reducer'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './SelectState.css';

// const getStates = withData('')

class SelectState extends Component {


    componentDidMount() {
        this.props.getStates();
    }



    render() { 

        let { statesList, chooseState } = this.props;
        // console.log(statesList);
        let mappedStates = statesList ? statesList.map((state, index) => {
        return <div className='stateContainer' key={index} ><Link to={`/selectcity`}>
                    <img className='stateImage' alt={state.name} src={state.url}/>
                    <button 
                        className='stateButton'
                        onClick={(e) => chooseState(e.target.value)}
                        value={state.name}>
                        {state.name}
                    </button>
                    </Link>
                </div>
        })  : 'loading'


        return ( 
            <div className='main'>
            {/* <h2 className='statesTitle'>Select the state you are hiking in!</h2> */}
                <div className='container'>
                    {/* <div className='stateContainer'> */}
                        {mappedStates}
                {/* </div> */}
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

function withData(url){
    return function (WrappedComponent) {
        return class extends Component{
            state = {
                isLoading:false,
                data: null,
                error: null
            }
            componentDidMount() {
                this.setState({isLoading: true});
                axios.get(url).then(response => {
                    this.setState({data:response.data, isLoading:false});
                }).catch(error => {
                    console.log(error);
                    this.setState({error})
                });
            }
            
            render(){
                const { isLoading, data, error } = this.state;

                return <div>
                    {error
                    ?
                <div>There was an error. Please refresh or try again later.</div>
                :
                (isLoading || !data)
                ?
                <div>Loading...</div>
                :
                <WrappedComponent visited={data} />}
                </div>

                
            }

        }
    }
}