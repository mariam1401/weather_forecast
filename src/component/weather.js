import React, {useEffect, useState} from "react";
import backImage from '../assets/1568658087480.jpeg'
import styles from './weather.module.css'
const Weather = ()=>{
    const [city,setCity]=useState('')
    const [click,setClick]=useState(false)
    const [icon,setIcon]=useState('')
    const [minTemp,setTemp]=useState()
    const [maxTemp,setMaxTemp]=useState()
    const [humidity,setHumidity]=useState()
    const [name,setName]=useState('')


    useEffect(()=>{
        if(click && city !== '') {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c43e5c688bff76ae03bdd393b348a6df`;
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setIcon(json.weather[0].icon)
                    setTemp(((json.main.temp_min)-273.15).toFixed(0))
                    setMaxTemp(((json.main.temp_max)-273.15).toFixed(0))
                    setHumidity((json.main.humidity))
                    setName(json.name)
                    console.log(json);
                } catch (error) {
                    console.log("error", error);
                }
            };
            fetchData()
            setClick(false)
            setCity('')
        }
    },[click])
    const handleValue = (e)=>{
        setCity(e.target.value)
    }
    const getWeather = ()=>{
        setClick(true)
    }
    return(
        <div className={styles.container}>
            <div className={styles.img_container}>
                <img src={backImage} className={styles.img} alt=''/>
            </div>
            <div>
            <div className={styles.text_container}>
                <div className={styles.title}>Enter a City:</div>
                <div className={styles.search_container}>
                    <input placeholder='Enter a City Name' className={styles.input} value={city}  onChange={handleValue}/>
                    <button className={styles.button} onClick={getWeather}> Get Weather</button>
                </div>
            </div>
                {(icon !=='')&&
                <div className={styles.div}>
                    <div className={styles.header}>
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className={styles.icon} alt=''/>
                        <span>{name}</span>
                    </div>
                    <span className={styles.span}>Max temp:  {maxTemp } <span>&#176;</span></span>
                    <span className={styles.span}> Min temp:  {minTemp} <span>&#176;</span></span>
                    <span className={styles.span}>Humidity:  {humidity} </span>
                </div>
                }
            </div>
        </div>
    )
}
export default Weather