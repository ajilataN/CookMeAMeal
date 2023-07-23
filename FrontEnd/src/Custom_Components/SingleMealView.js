import { Component } from "react";
import Helmet from "react-helmet";
import Ingredients from "./Ingredients.js";
import axios from "axios";

class SingleMealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: []
    };
  }

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  componentDidMount(){
    axios.get("/meal/"+this.props.data)
    .then(res=>{
      this.setState({
        meal:res.data
      })
    })
  }

  render() {
    let meal = this.state.meal;

    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        {
          meal.length>0 ?
        
        <div className="card myCard">
          <h5 className="card-header">
            <button
              className="invisibleBtn"
              onClick={() => this.QSetViewInParent({ page: "feed" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/ios-filled/50/international-food.png"
              alt="international-food"
            />{" "}
              {meal[0].name}
          </h5>

          <div className="card-body">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            <span className="subtitle"> {meal[0].u_name} {meal[0].surname}</span>
            <br></br>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span>
              {meal[0].street} {meal[0].street_number}, {meal[0].postal_code} {meal[0].city}, Slovenija
               </span>
            <div className="vr"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            </svg>{" "}
            <span>
            {meal[0].date} {meal[0].time_ready}
            </span>
            <div className="vr"></div>
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/ios-filled/50/soup-plate.png"
              alt="soup-plate"
            />{" "}
            <span>
            {meal[0].number_of_portions}
            </span>
            <br></br>
            <Ingredients />
            <br></br>
            <div className="rightButtonDiv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
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
              <span className="price">
              {meal[0].price}  
              </span>
              <a
                id="priceBtn"
                onClick={() => this.QSetViewInParent({ page: "order" })}
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
    );
  }
}

export default SingleMealView;