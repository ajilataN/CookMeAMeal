import { Component } from "react"
import axios from "axios"
import MealIcon from "./icons/MealIcon"
import ProfileIcon from "./icons/ProfileIcon"
import LocationIcon from "./icons/LocationIcon"
import ClockIcon from "./icons/ClockIcon"
import PlateIcon from "./icons/PlateIcon" 
import CashIcon from "./icons/CashIcon"
import BackArrowIcon from "./icons/BackArrowIcon.js"
import IngredientsIcon from "./icons/IngredientsIcon"
import VeganIcon from "./icons/VeganIcon"

class SingleMealView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      meal: []
    }
  }

  // API to get the iformation about one meal
  componentDidMount(){
    console.log(this.props.data)
    axios.get("http://88.200.63.148:5020/meal/" + this.props.data)
    .then(res=>{
      console.log(res.data)
      this.setState({
        meal:res.data
      })
    })
  }

  // Change page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  render() {
    let meal = this.state.meal

    if (meal.length === 0) {
      return <div>Loading...</div>
    }

    // Format the time
    const time = meal[0].time_ready
    const [hrs, mins] = time.split(":")
    const formattedTime = `${hrs.padStart(2, "0")}:${mins.padStart(2, "0")}`
    // Format the date
    const dateInput = meal[0].date
    const date = new Date(dateInput) // Parse the ISO 8601 date string
    const day = date.getUTCDate().toString().padStart(2, "0")
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") // Months are zero-based
    const year = date.getUTCFullYear()
    const formattedDate = `${day}/${month}/${year}`

    console.log(this.state.meal.length)
    return (
      <div>
        { meal.length>0 ?
          <div className="card myCard">
            <h5 id="myCardHeader" className="card-header">
              <button
                className="invisibleBtn"
                onClick={() => this.setViewPageInParent({ page: "feed" })}
              >
                <BackArrowIcon/>
              </button>
              <MealIcon/>{"    "} { meal[0].name }
              {meal[0].vegan === 1 ? <VeganIcon/> : ""}
            </h5>

            <div id="myCardBody" className="card-body">
              <ProfileIcon/>
              <span className="subtitle"> {meal[0].u_name} {meal[0].surname}</span>
              <br></br>
              <LocationIcon/>
              <span>
                {meal[0].street} {meal[0].street_number}, {meal[0].postal_code} {meal[0].city}, Slovenija
              </span>
              <div className="vr"></div>
              <ClockIcon/>{"    "}
              <span> {formattedDate} {formattedTime} </span>
              <div className="vr"></div>
              <PlateIcon/>{"    "}
              <span> { meal[0].number_of_portions } </span>
              <br></br><br></br>
              <div>
                <IngredientsIcon/>
                <span id="ingredients">Ingredients</span>
                <ul>
                  {meal[0].i_names === null || meal[0].i_names ==="" ? "No ingredients":
                    meal[0].i_names.split(',').map((ingredient, index) => (
                      <li key={index}>{ ingredient }</li>
                    ))
                  }
                  
                </ul>
              </div>

              <br></br>
              <div className="rightButtonDiv">
                <CashIcon/>
                <span className="price"> { meal[0].price } </span>
                <a
                  id="priceBtn"
                  onClick={() => this.setViewPageInParent({ page: "order", id: meal[0].mealId })}
                  href="#"
                  className="btn btn-primary feedButton defaultButton"
                >
                  Order
                </a>
              </div>
            </div>
          </div>
        : "Loading.."
  }
      </div>
    )
  }
}

export default SingleMealView