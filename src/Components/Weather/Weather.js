import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './Weather.css';
let moment = require('moment');



class Weather extends Component {
    constructor(props){
    super(props);
    this.state = {
        weather: [],
        newWeather: [],
        toggleValue: false

    }
}
componentDidMount() {
    console.log(this.props.chosenTrail)
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.chosenTrail[0].latitude}&lon=${this.props.chosenTrail[0].longitude}&APPID=59b00ca946aa0fbe99a7218a649b7168&units=imperial`).then(res => {
        console.log(res.data)
        this.setState({ weather: res.data.list });
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

// findWeatherInfoByDay(obj, cb){
//     let dates = [];
//     for (const value of obj){
//     dates.push({day:moment(cb( value.dt_txt.split(' '))).format('MMMM Do YYYY'), minTemp: Math.floor(value.main.temp_min), maxTemp: Math.floor(value.main.temp_max), description: value.weather[0].description, icon: value.weather[0].icon})
//     }
//     return dates
//   }
  
//   findDate(list, getDate)
  
  


//     findWeatherInfoByDay(obj, cb){
//         console.log('obj: ', obj);
//         let dates = [];
//         for (const value in obj){
//             console.log('value: ', obj[value].list);
//         dates.push({day:moment(cb(obj[value].dt_txt)).format('MMMM Do YYYY'), minTemp: Math.floor(obj[value].main.temp_min), maxTemp: Math.floor(obj[value].main.temp_max), description: obj[value].weather[0].description, icon: obj[value].weather[0].icon })
//         }
//         for (let i=0; i< dates.length; i++){
//             let indexOfDay = dates.indexOf(dates[i].day)
//             // if (dates[i].day == )
//         }
//     return dates
//   }



findWeatherInfoByDay = (arr, cb) => {
    let dates = [];
    for (let i=0; i<arr.length; i++){
      let dateString = moment(cb(arr[i].dt_txt)).format('MMMM Do YYYY')
    //   console.log(dateString)
      if(dates.some(e => e.day === dateString)){
        dates[dates.findIndex(e => e.day === dateString)].hour.push({minTemp: Math.floor(arr[i].main.temp_min), 
          maxTemp: Math.floor(arr[i].main.temp_max), 
          description: arr[i].weather[0].description, 
          icon: arr[i].weather[0].icon })
      } else {
      dates.push({
        day: dateString,
        hour: [{ 
          minTemp: Math.floor(arr[i].main.temp_min), 
          maxTemp: Math.floor(arr[i].main.temp_max), 
          description: arr[i].weather[0].description, 
          icon: arr[i].weather[0].icon 
          }]
        })
      }
    }
    console.log('dates: ', dates);
    return dates
  }
  
    
    // toggleValueButton = () => {
    //     this.setState({toggleValue: !this.state.toggleValue})
    // }



    toggleValueButton = () => {
        this.setState((prevState) =>{
         console.log('prevstate', prevState)
            return {
                toggleValue: !prevState.toggleValue,
            }
         })
     }




    render() { 
        console.log(this.state.toggleValue);

        let { findWeatherInfoByDay, getDate } = this;
        let { weather } = this.state;
        console.log('weather: ', weather);
        
        let mappedWeather = findWeatherInfoByDay.length ? findWeatherInfoByDay(weather, getDate).map((day, index) => {
                let mappedDay = day.hour.map((info, index) => {
                    // console.log('====', info)
                                // console.log(mappedWeather);
                    return<div className='weatherInfoBox' key={index}>
                                <ul className='dropdownContent'>
                                    <li><img alt={info.description} src={`http://openweathermap.org/img/w/${info.icon}.png`}></img></li>
                                    <li id='weatherText'>High: {info.maxTemp}°F</li>
                                    <li id='weatherText'>Low: {info.minTemp}°F</li>
                                    <li id='weatherText'>{info.description}</li>
                                </ul>
                             
                            </div>
                })
                return<div className='weatherMain' key={index}>
                <h3>{day.day}</h3>
                <div className='mappedDayBox'>{mappedDay}</div>
                
            </div>
        }) : 'loading...'
        
        
        
        
        return ( 
            <div className='weatherBoxDisplay'>
                <div><button className='weatherButton' onClick={this.toggleValueButton}>Click to view the weather for this week!</button></div>
            { this.state.toggleValue ?
        <div className='weatherContainer'>
            {mappedWeather}
        </div>
         :
        ''
            }

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



