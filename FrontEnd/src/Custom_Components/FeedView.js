import { Component } from "react";
import "./components.css";
import Helmet from "react-helmet";
import axios from "axios";

class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

 componentDidMount(){
     axios.get("http://88.200.63.148:5020/meal", {withCredentials: true})
    .then(res =>{
      this.setState({
       meals:res.data
      })

      console.log(res.data)
    })
   }

  render() {
    let data = this.state.meals
    console.log(data);
    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        {data.length > 0 ? 
          data.map((d) => {
            const time = d.time_ready
            const [hrs, mins] = time.split(":")
            const formattedTime = `${hrs.padStart(2, "0")}:${mins.padStart(2, "0")}`

            const dateInput = d.date
            const date = new Date(dateInput); // Parse the ISO 8601 date string
            const day = date.getUTCDate().toString().padStart(2, "0");
            const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
            const year = date.getUTCFullYear();
            const formattedDate = `${year}-${month}-${day} `;

            return(
              <div className="card myCard" key={d.id}>
          <h5 className="card-header">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/ios-filled/50/international-food.png"
              alt="international-food"
            />{" "}
            { d.name }
            {/* Lasagne alla ferrarese */}
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
            <span className="subtitle"> { d.u_name }{"  "}{ d.surname }
               {/* Natalija Tashkova */}
               </span>
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
              { d.street } { d.street_number }, { d.postal_code } { d.city }, Slovenija
               {/* Kraljeva Ulica 11, 6000 Koper, Slovenija */}
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
              {formattedDate}
              {formattedTime}
              {/* 15:00 */}
              </span>
            <div className="vr"></div>
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/ios-filled/50/soup-plate.png"
              alt="soup-plate"
            />{" "}
            <span> { d.number_of_portions }
              {/* 4 */}
              </span>
            <br></br>
            <br></br>
            <div className="centerAllign">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-cash-coin"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
            </div>
            <div className="price">{ d.price }
              {/* 5€ */}
              </div>
            <hr id="horizontalDivider"></hr>
            <br></br>
            <div className="buttonContainer">
              <a
                onClick={() => this.QSetViewInParent({ page: "meal", id: d.mealId })}
                href="#"
                className="btn btn-primary feedButton defaultButton"
              >
                Show more
              </a>
              <a
                href="#"
                onClick={() => this.QSetViewInParent({ page: "order", id: d.mealId })}
                className="btn btn-primary feedButton defaultButton"
              >
                Order
              </a>
            </div>
          </div>
        </div>
            )
          }) : "Loading..."  
      }
      </div>
    );
  }
}

export default FeedView;
