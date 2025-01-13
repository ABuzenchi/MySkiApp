import classes from "./home.module.css"
const Home=()=> {
  return (
    <div className={classes.pageBackground}>
        <input className={classes.searchLocation}
                type="text"
                id="searchLocation"
                placeholder="Enter a location"
                required
              />
    </div>
    
  )
}
export default Home;