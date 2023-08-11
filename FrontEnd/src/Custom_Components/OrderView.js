import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";


class OrderView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meal: [],
      portions: 1,
    };
  }

  QSetViewInParent = (obj) => {
    this.props.IdFromChild(obj);
  };

  handlePortionsChange = (event) => {
    this.setState({ portions: parseInt(event.target.value, 10) || 1 });
  };

  componentDidMount(){
    console.log(this.props.data)
    axios.get("http://88.200.63.148:5020/meal/" + this.props.data)
    .then(res=>{
      console.log(res.data)
      this.setState({
        meal: res.data.length > 0 ? res.data : [],
      })
      //console.log(meal)
    })
  }

  postOrder = async () =>{
    try{
      const { meal, portions } = this.state;
      const mealId = meal.length > 0 ? meal[0].mealId : null;
      const cookId = meal.length > 0 ? meal[0].id_user : null;

      if (!mealId || !cookId) {
        console.log("Meal data is missing.");
        return;
      }
      const res = await axios.post("http://88.200.63.148:5020/order", {
        id_meal: mealId,
        portions: portions,
        id_cook: cookId
      },
      {withCredentials: true}
      );
      console.log("Order:" + res);
      const newOrder = res.data;
      this.QSetViewInParent ({page: "orders"});
    }
    catch(err){
      console.log(err)
    }
  }

  render() {
    const { meal, portions } = this.state;
    const totalPrice = meal.length > 0 ? meal[0].price * portions : 0;
    return (
      <div id="placeOrder">
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        {
          meal.length>0 ?
        <div class="card myCard">
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
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/soup-plate.png"
                alt="soup-plate"
              />
              <input
                name="portions"
                value={portions}
                placeholder="1"
                onChange={this.handlePortionsChange}
                type="number"
                min="1"
                max={meal[0].number_of_portions}
                id="portionOrder"
                className="form-control numberInput"
              />
            </div>
            <h6 class="card-subtitle mb-2 text-muted order">Total:</h6>
            <div className="centerAllign">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-cash-coin"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
            </div>
            <div id="totalPrice" className="price">
            {totalPrice.toFixed(2)}€
            </div>
            <hr id="horizontalDivider"></hr>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => {this.postOrder(); this.QSetViewInParent({ page: "orders" })}}
              className="btn btn-primary bt feedButton defaultButton"
            >
              Finish
            </button>
          </div>
        </div>
        : "Loading..."
  }
      </div>
    );
  }
}

export default OrderView;
