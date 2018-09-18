import React, {Component} from 'react';

export default class City extends Component{

    render(){
        console.log(this.props.location.state.latitude)
        return(
            <div>
                {/* <img></img> */}
                <div>{this.props.location.state.latitude}</div>
                <div>{this.props.location.state.longitude}</div>
            </div>
        )
    }
}