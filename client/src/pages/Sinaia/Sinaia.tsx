import React from 'react'
import Weather from '../../components/weather/weather'
import CarouselPhoto from '../../components/carousel-photo/carousel-photo'
import classes from "./Sinaia.module.css"

export default function Sinaia() {
  return (
    <>
    <div className={classes.container}>
    <Weather location="Sinaia"/>
    <CarouselPhoto/>
    </div>
    </>
  )
}
