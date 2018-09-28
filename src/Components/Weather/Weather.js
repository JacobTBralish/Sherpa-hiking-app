import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
let moment = require('moment');



class Weather extends Component {
    constructor(props){
    super(props);
    this.state = {
        weather: [],
        newWeather: []

    }
}
componentDidMount() {
    console.log(this.props.chosenTrail)
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.chosenTrail[0].latitude}&lon=${this.props.chosenTrail[0].longitude}&APPID=59b00ca946aa0fbe99a7218a649b7168&units=imperial`).then(res => {
        console.log(res.data)
        this.setState({ weather: res.data });
    })
}

getDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2){
        day = '0' + day;	
    } 
    return [year, month, day].join('');
}

findWeatherInfoByDay = (obj, cb) => {
    let dates = [];
    for (const value of obj){
        console.log('value: ', value);
    dates.push({day:moment(cb( value.dt_txt.split(' '))).format('MMMM Do YYYY'), minTemp: Math.floor(value.main.temp_min), maxTemp: Math.floor(value.main.temp_max), description: value.weather[0].description, icon: value.weather[0].icon})
    }
    return dates
  }
  
  
  



    render() { 

        let { findWeatherInfoByDay, getDate } = this;
        let { weather, newWeather } = this.state;
        console.log('weather: ', newWeather);
        
        let mappedWeather = findWeatherInfoByDay(weather, getDate).map((day, index) => {
            console.log('day: ', day);
            return <div>
                {day}
            </div>
        })



        // let mappedWeather = weather.length ?  weather.map((temp, index) => {

        //     return <div key={index}>
        //     {/* <p>{temp.list[0].}</p> */}
        //     <p>{temp}</p>
        //     </div>
        //     }) : ''
            
        // let mappedForecast = weatherArray ? weatherArray.map()

            
            
        


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






            // let { newWeather } = this.state;
                // this.state.newWeather = [
                  
                //   {date:moment(this.getDate(temp.list[1].dt_txt.split(' '))).format('MMMM Do YYYY'),
                //   low: temp.list[1].main.temp_min,
                //   high: temp.list[1].main.temp_max, 
                //   description: temp.list[1].weather[0].description},
                  
                //   {date:moment(this.getDate(temp.list[9].dt_txt.split(' '))).format('MMMM Do YYYY'),
                //   low: temp.list[9].main.temp_min,
                //   high: temp.list[9].main.temp_max,
                //   description: temp.list[9].weather[0].description},
                  
                //   {date:moment(this.getDate(temp.list[17].dt_txt.split(' '))).format('MMMM Do YYYY'),
                //   low: temp.list[17].main.temp_min,
                //   high: temp.list[17].main.temp_max,
                //   description: temp.list[17].weather[0].description},
              
                //   {date:moment(this.getDate(temp.list[25].dt_txt.split(' '))).format('MMMM Do YYYY'),
                //   low: temp.list[25].main.temp_min,
                //   high: temp.list[25].main.temp_max,
                //   description: temp.list[25].weather[0].description},
              
                //   {date:moment(this.getDate(temp.list[33].dt_txt.split(' '))).format('MMMM Do YYYY'),
                //   low: temp.list[33].main.temp_min,
                //   high: temp.list[33].main.temp_max,
                //   description: temp.list[33].weather[0].description}
                //   ]
                //   return<div>{JSON.parse(this.state.newWeather)}</div>  
                // }) : ''
                
                // console.log(this.state.newWeather)
              
