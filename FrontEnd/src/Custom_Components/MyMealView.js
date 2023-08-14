import { Component } from "react";
import axios from "axios";
import "./styles/components.css";
import ProfileIcon from "./icons/ProfileIcon";
import PlateIcon from "./icons/PlateIcon";
import ClockIcon from "./icons/ClockIcon";
import IngredientsIcon from "./icons/IngredientsIcon";
import MealIcon from "./icons/MealIcon";
import CashIcon from "./icons/CashIcon";
import VeganIcon from "./icons/VeganIcon"

class MyMealView extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      // Meals array to populate with get request from API
      meals: [],
    };
  }

  componentDidMount() {
    // API to get every post from the DB
    axios
      .get("http://88.200.63.148:5020/meal/my", { withCredentials: true })
      .then((res) => {
        this.setState({
          // Update meals array with posts
          meals: res.data,
        });
        console.log(this.state.meals)
      });
  }

  // Change the page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj);
  };

  deleteMeal = (id) => {
    axios.delete("http://88.200.63.148:5020/meal/"+id)
    .then((response) => {
      // Handle the successful deletion here if needed
      console.log("Meal deleted successfully:", response.data);
      
      // You may want to update the state to remove the deleted meal
      // For example, filter out the deleted meal from the meals array
      this.setState((prevState) => ({
        meals: prevState.meals.filter((meal) => meal.mealId !== id),
      }));
    })
    .catch((error) => {
      // Handle the error here
      console.error("Error deleting meal:", error);
    });
  }

  render() {
    let data = this.state.meals;

    // Sort the data array in ascending order by the time and date
    data.sort((a, b) => {
      if (a.date === null && b.date === null) {
        return 0;
      } else if (a.date === null) {
        return 1;
      } else if (b.date === null) {
        return -1;
      }
      const dateComparison = a.date.localeCompare(b.date);

      if (dateComparison === 0) {
        const timeA = a.time_ready.split(":").map(Number);
        const timeB = b.time_ready.split(":").map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      }
      return dateComparison;
    });

    console.log("Data", data)
   // console.log("ING",data[0].ingredientNames)
    return (
      <div>
        {data.length > 0
          ? data.map((d, index) => {
              // Format the time
              const time = d.time_ready;
              const [hrs, mins] = time.split(":");
              console.log("Time1",time)
              const formattedTime = `${hrs.padStart(2, "0")}:${mins.padStart(
                2,
                "0"
              )}`;

              console.log("Time2",formattedTime)
              // Format the date
              const dateInput = d.date;
              const date = new Date(dateInput); // Parse the ISO 8601 date string
              const day = date.getUTCDate().toString().padStart(2, "0");
              const month = (date.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0"); // Months are zero-based
              const year = date.getUTCFullYear();
              const formattedDate = `${day}/${month}/${year}`;
              console.log()
              return (
                <div>
                    { index === 0 ? <><ProfileIcon />
                  <span className="subtitle">
                    {" "}
                    {d.u_name}
                    {"  "}
                    {d.surname}{" "}
                  </span></>
                  :""}
                  

                  <div className="card myCard" key={index}>
                    <h5 id="myCardHeader" className="card-header">
                      <MealIcon /> {d.name}
                    </h5>

                    <div id="myCardBody" className="card-body">
                    {d.vegan === 1 ? <VeganIcon/> : ""}

                      <ClockIcon />{" "}
                      <span>
                        {" "}
                        {formattedDate} {"  "} {formattedTime}{" "}
                      </span>
                      <div className="vr"></div>
                      <PlateIcon /> <span> {d.number_of_portions} </span>
                      <br></br>
                      <div>
                        <IngredientsIcon />
                        <span id="ingredients">Ingredients</span>
                        <ul>
                          {d.ingredientNames === null || d.ingredientNames === "" ? "No ingredients" :
                          d.ingredientNames
                            .split(",")
                            .map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))
                          }
                          
                        </ul>
                      </div>
                      <br></br>
                      <div className="centerAllign">
                        {" "}
                        <CashIcon />{" "}
                      </div>
                      <div className="price">{d.price} </div>
                      <hr id="horizontalDivider"></hr>
                      <br></br>
                      <div className="buttonContainer">
                        <a
                          onClick={() => this.deleteMeal(d.mealId)}
                          href="#"
                          className="btn btn-primary feedButton defaultButton"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          :  <div>
          <h5 className="warning">You haven't posted any meals yet!</h5>
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
    );
  }
}

export default MyMealView;