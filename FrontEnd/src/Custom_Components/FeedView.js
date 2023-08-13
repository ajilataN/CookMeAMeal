import { Component } from "react"
import "./styles/components.css"
import axios from "axios"
import MealIcon from "./icons/MealIcon"
import ProfileIcon from "./icons/ProfileIcon"
import LocationIcon from "./icons/LocationIcon"
import ClockIcon from "./icons/ClockIcon"
import PlateIcon from "./icons/PlateIcon" 
import CashIcon from "./icons/CashIcon"


class FeedView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      // Meals array to populate with get request from API
      meals: []
    }
  }

  componentDidMount(){
    // API to get every post from the DB
    axios.get("http://88.200.63.148:5020/meal", { withCredentials: true })
   .then(res =>{
     this.setState({
      // Update meals array with posts
      meals: res.data
     })
   })
 }

  // Change the page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  render() {
    // Local variable that will map the data from every meal
    let data = this.state.meals

    // Sort the data array in ascending order by the time and date
    data.sort((a, b) => {
      if (a.date === null && b.date === null) {
        return 0
      } else if (a.date === null) {
        return 1
      } else if (b.date === null) {
        return -1
      }
      const dateComparison = a.date.localeCompare(b.date)

      if (dateComparison === 0) {
        const timeA = a.time_ready.split(':').map(Number)
        const timeB = b.time_ready.split(':').map(Number)
        return timeA[0] - timeB[0] || timeA[1] - timeB[1]
      }
      return dateComparison
    })

    return (
      <div>
        {data.length > 0 ? 
          data.map((d, index) => {
            // Format the time
            const time = d.time_ready
            const [hrs, mins] = time.split(":")
            const formattedTime = `${hrs.padStart(2, "0")}:${mins.padStart(2, "0")}`
            // Format the date
            const dateInput = d.date
            const date = new Date(dateInput) // Parse the ISO 8601 date string
            const day = date.getUTCDate().toString().padStart(2, "0")
            const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based
            const year = date.getUTCFullYear()
            const formattedDate = `${day}/${month}/${year}`

            return(
              <div className="card myCard" key={index}>
                <h5 id="myCardHeader" className="card-header">
                  <MealIcon/>{" "} { d.name }
                </h5>

                <div id="myCardBody" className="card-body">
                  <ProfileIcon/>
                  <span className="subtitle"> { d.u_name }{"  "}{ d.surname } </span>

                  <br></br>

                  <LocationIcon/>
                  <span>
                    { d.street } { d.street_number }, { d.postal_code } { d.city }, Slovenija
                  </span>

                  <div className="vr"></div> {/* Vertical line separator */}

                  <ClockIcon/>{" "}
                  <span> {formattedDate} {"  "} {formattedTime} </span>

                  <div className="vr"></div>

                  <PlateIcon/>{" "}
                  <span> { d.number_of_portions } </span>

                  <br></br>
                  <br></br>

                  <div className="centerAllign"> <CashIcon/> </div>
                  <div className="price">{ d.price } </div>
                  <hr id="horizontalDivider"></hr>
                  <br></br>

                  <div className="buttonContainer">
                    <a
                      onClick={() => this.setViewPageInParent({ page: "meal", id: d.mealId })}
                      href="#"
                      className="btn btn-primary feedButton defaultButton">
                      Show more
                    </a>

                    <a
                      href="#"
                      onClick={() => this.setViewPageInParent({ page: "order", id: d.mealId })}
                      className="btn btn-primary feedButton defaultButton">
                      Order
                    </a>
                  </div>
                </div>
              </div>
            )
          }) :   
          <div>
          <h5 className="warning">Ups! Sorry, currently there are no posts to display.</h5>
          <br></br>
          <div className="button-container">
            <button
              type="button"
              onClick={() => this.setViewPageInParent({ page: "addmeal" })}
              className="join-button btn btn-primary btn-lg btn-block"
              id="join"
            >
              Post now
            </button>
          </div>
        </div>}
      </div>
    )
  }
}

export default FeedView
