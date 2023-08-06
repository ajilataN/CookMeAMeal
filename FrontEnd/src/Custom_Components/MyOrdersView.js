import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";

class MyOrdersView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activeTable: "myOrders", // Default active table
      meal: [],
      press: false
    };
  }

    componentDidMount(){
        console.log(this.props.data)
        axios.get("http://88.200.63.148:5020/meal/order" + this.props.data)
        .then(res=>{
          console.log(res.data)
          this.setState({
            activeTable: "myOrders",
            meal: res.data.length > 0 ? res.data : [], 
            press: false
          })
        })
      }

    handleTableButtonClick = (tableId) => {
      this.setState({
        activeTable: tableId
      });
    };

    render(){
      const { activeTable, meal } = this.state;
        return(
          <div>
            <div className="buttonContainer">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button 
                      id="myOrdersButton"
                      type="button" className={`btn btn-secondary orderButton 
                      ${ activeTable === "myOrders" ? "active" : "" }`}
                      onClick={() => this.handleTableButtonClick("myOrders")}>
                      My Orders
                    </button>
                    <button
                      id="pendingOrdersButton"
                      type="button" className={`btn btn-secondary orderButton 
                      ${  activeTable === "pendingOrders" ? "active" : "" }`}
                      onClick={() => this.handleTableButtonClick("pendingOrders")}>
                      Pending Orders
                    </button>
                </div>
            </div>
          {activeTable === "myOrders" && (
            <table className="table" id="myOrders">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Cook</th>
                  <th scope="col">Meal</th>
                  <th scope="col">Portions</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Sara Pachemska</th>
                  <td>Pasta Carbonara</td>
                  <td>2</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          )}
          {activeTable === "pendingOrders" && (
            <table className="table" id="pendingOrders">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Meal</th>
                  <th scope="col">Portions</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Natalija Tashkova</th>
                  <td>Pasta Carbonara</td>
                  <td>2</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      id="addButton">
                        ✓
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          </div>  
        )
    }
}

export default MyOrdersView;