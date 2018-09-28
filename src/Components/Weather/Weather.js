import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { log } from 'core-js';


class Weather extends Component {
    constructor(props){
    super(props);
    this.state = {
        weather: []
    }
}
componentDidMount() {
    console.log(this.props.chosenTrail)
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.chosenTrail[0].latitude}&lon=${this.props.chosenTrail[0].longitude}&APPID=59b00ca946aa0fbe99a7218a649b7168&units=imperial`).then(res => {
        console.log(res.data)
        this.setState({ weather: res.data });
    })
}

    render() { 


    let { weather } = this.state;
    console.log('weather: ', weather);


    let mappedWeather = weather.length ?  weather.map((temp, index) => {
        return <div key={index}>
            {/* <p>{temp.list[0].}</p> */}
            <p>{temp}</p>
            </div>
            }) : ''

    // let forecast = 

    return ( 
        <div>
        
            {mappedWeather}
            Weather
        </div>
        );
        }
    }

const mapStateToProps = state => {
    return {
        chosenTrail: state.chosenTrail,

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);


