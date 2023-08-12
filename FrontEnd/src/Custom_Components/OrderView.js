import { Component } from "react"
import Helmet from "react-helmet"
import axios from "axios"
import PlateIcon from "./icons/PlateIcon"
import CashIcon from "./icons/CashIcon"

class OrderView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      meal: [],
      portions: 1,
    }
  }
  // Get the data about the meal which we want to order
  componentDidMount(){
    console.log(this.props.data)
    axios.get("http://88.200.63.148:5020/meal/" + this.props.data)
    .then(res=>{
      console.log(res.data)
      this.setState({
        meal: res.data.length > 0 ? res.data : [],
      })
    })
  }

  // Change the page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  // Adjust the number of portions
  updatePortionsNumber = (event) => {
    this.setState({ portions: parseInt(event.target.value, 10) || 1 })
  }

  // Post request for order
  postOrder = async () =>{
    try{
      const { meal, portions } = this.state
      const mealId = meal.length > 0 ? meal[0].mealId : null
      const cookId = meal.length > 0 ? meal[0].id_user : null

      if (!mealId || !cookId) {
        console.log("Meal data is missing.")
        return
      }
      const res = await axios.post("http://88.200.63.148:5020/order", {
        id_meal: mealId,
        portions: portions,
        id_cook: cookId
      },
      { withCredentials: true }
      )
      const newOrder = res.data
      this.setViewPageInParent ({page: "orders"})
    }
    catch(err){
      console.log(err)
    }
  }

  render() {
    const { meal, portions } = this.state
    const totalPrice = meal.length > 0 ? meal[0].price * portions : 0
    return (
      <div id="placeOrder">
        { meal.length>0 ?
          <div id="borderlessCard" class="card myCard">
            <div class="card-body">
              <h5
                style={{ fontSize: "20px", fontWeight: "bold" }}
                class="card-title"
              >
                Place your order
              </h5>
              <div>Price per plate: {meal[0].price}€</div>
              <div>Maximum number of plates: {meal[0].number_of_portions}</div>
              <h6 class="card-subtitle mb-2 text-muted order">
                Choose number of plates!
              </h6>
              <div style={{ margin: "auto", textAlign: "center" }}>
                <PlateIcon/>
                <input
                  name="portions"
                  value={portions}
                  placeholder="1"
                  onChange={this.updatePortionsNumber}
                  type="number"
                  min="1"
                  max={meal[0].number_of_portions}
                  id="portionOrder"
                  className="form-control numberInput"
                />
              </div>
              <h6 class="card-subtitle mb-2 text-muted order">Total:</h6>
              <div className="centerAllign">
                <CashIcon/>
              </div>
              <div id="totalPrice" className="price">
                {totalPrice.toFixed(2)}€
              </div>
              <hr id="horizontalDivider"></hr>
            </div>
            <div className="buttonContainer">
              <button
                onClick={() => {this.postOrder(); this.setViewPageInParent({ page: "orders" })}}
                className="btn btn-primary bt feedButton defaultColoredButton"
              >
                Finish
              </button>
            </div>
          </div>
        : "Loading..."
  }
      </div>
    )
  }
}

export default OrderView