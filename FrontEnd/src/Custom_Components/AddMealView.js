import { Component } from "react"
import Helmet from "react-helmet"
import axios from "axios"
import MealIcon from "./icons/MealIcon"
import ClockIcon from "./icons/ClockIcon"
import PlateIcon from "./icons/PlateIcon" 
import CashIcon from "./icons/CashIcon"
import IngredientsIcon from "./icons/IngredientsIcon"
import PlusIcon from "./icons/PlusIcon"

class AddMealView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      meal: {},
      // fields is an array of records that is used to store the dynamic input of the ingredients
      fields: [{value: ""}],
    }
  }

  // Get the input from the fields 
  getUserInput = (e) => {
    this.setState((prevState) => ({
      meal: { ...prevState.meal, [e.target.name]: e.target.value }
    }))
  }

  // Change the page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  // Add a new field with initial value empty
  addNewInputField= () => {
    const { fields } = this.state
    this.setState({ fields: [...fields, { value: "" }] })
  }

  // Update the value of a field
  saveInputOnChange = (index, event) =>{
    const { fields } = this.state
    fields[index].value = event.target.value
    this.setState({ fields })
  }

  saveIngredients = (event) => {
    event.preventDefault()
    console.log("Fields:", this.state.fields)
    const ingredients = this.state.fields.map((field) => ({ name: field.value }))

    // Set the ingredients list in the state
    this.setState({ ingredientsList: ingredients })
  }


  postMealData = async () =>{
    try{
      const res = await axios.post("http://88.200.63.148:5020/meal", {
        name: this.state.meal.name,
        number_of_portions: this.state.meal.number_of_portions,
        date: this.state.meal.date,
        time_ready: this.state.meal.time_ready,
        price: this.state.meal.price,
        ingredients: this.state.ingredientsList
      },
      { withCredentials: true }
      )
      const newMeal = res.data
      this.setViewPageInParent ({page: "feed"})
    }
    catch(err){
      console.log(err)
    }
  }

  render() {
    const { fields } = this.state
    return (
      <div>
        {/* Begin card */}
        <div className="card myCard" id="create">
          <h3 style={{ margin: "10px" }}>Create a meal</h3>
          <hr></hr>

          <div className="mb-3">
            <MealIcon/> {"  "}
            <label className="form-label">Name</label> {"  "}
            <input
              name="name"
              onChange={(e) => this.getUserInput(e)}
              type="text"
              className="form-control"
              placeholder="Name" />
          </div>

          <div className="mb-3" style={{ margin: "5px" }}>
            <PlateIcon/>{"    "}
            <label className="form-label" htmlFor="portions">
              Number of portions
            </label>{"    "}
            <input
              name="number_of_portions"
              placeholder="2"
              onChange={(e) => this.getUserInput(e)}
              type="number"
              min="1"
              className="form-control numberInput"/>
          </div>

          <div className="mb-3" style={{ margin: "5px" }}>
            <ClockIcon/>{"    "}
            <label className="form-label">Ready in: </label>
            <div className="inLineContainer">
              <div className="inLine">
                <input type="date" name="date" className="form-control" onChange={(e) => this.getUserInput(e)}/>
              </div>
              <div className="inLine">
                <input type="time" name="time_ready" className="form-control" onChange={(e) => this.getUserInput(e)}/>
              </div>
            </div>
          </div>

          <div style={{ margin: "5px" }}>
            <IngredientsIcon/> {"    "}
            <label className="form-label">Ingredients</label>
            <form onSubmit={this.saveIngredients}>
              <div className="inLine">
                { fields.map((field, index) => (
                  <input
                    style={{ margin: "2px" }}
                    className="form-control ingredientField"
                    placeholder="Ingredient"
                    key={index}
                    type="text"
                    value={field.value}
                    onChange={(event) => this.saveInputOnChange(index, event)}
                  />
                ))}
                <div className="rightButtonDiv">
                  <button
                    type="button"
                    className="btn"
                    id="addButton"
                    onClick={this.addNewInputField}
                  >
                    <PlusIcon/>
                  </button>
                  <button id="doneButton" type="submit" className="btn">Done</button>
                </div>
              </div>
              </form>
          </div>

          <div className="mb-3" style={{ margin: "5px" }}>
            <CashIcon/> {"    "}
            <label className="form-label">Price</label>
            <input
              name="price"
              onChange={(e) => this.getUserInput(e)}
              type="number"
              min="1"
              className="form-control numberInput"
              placeholder="€"
            />
          </div>
        </div>
        {/* End of card */}

        <div className="buttonContainer">
          <button
            id="postButton"
            onClick={() => {this.postMealData(); this.setViewPageInParent({page: "feed"})}}
            className="btn btn-primary bt defaultColoredButton"
          >
            Post
          </button>
        </div>
      </div>
    )
  }
}

export default AddMealView
