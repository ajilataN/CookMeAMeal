import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";

class MyOrdersView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activeTable: "myOrders", // Default active table
      // press: false,
      orders: [],
    };
  }

    componentDidMount(){
        // console.log(this.props.data)
        axios.get("http://88.200.63.148:5020/order/my", {withCredentials: true})
        .then(res=>{
          console.log(res.data)
          this.setState({
            activeTable: "myOrders",
            orders: res.data.length > 0 ? res.data : [], 
            press: false
          })
        })
    }

    fetchOrders = (tableId) => {
      const endpoint =
        tableId === "myOrders"
          ? "http://88.200.63.148:5020/order/my"
          : "http://88.200.63.148:5020/order/pending";

      axios.get(endpoint, {withCredentials: true})
        .then((res) => {
          console.log("Data: ", res.data);
          this.setState({
            activeTable: tableId,
            orders: res.data || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    };

    handleTableButtonClick = (tableId) => {
      if (tableId === "myOrders") {
        this.fetchOrders("myOrders");
      } else if (tableId === "pendingOrders") {
        this.fetchOrders("pendingOrders");
        }
    };

    render(){
      const { activeTable, orders } = this.state;
      console.log(orders);
        return(
          <div>
            <div className="buttonContainer">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button 
                      style={{backgroundColor:"#04587c"}}
                      id="myOrdersButton"
                      type="button" className={`btn btn-secondary orderButton 
                      ${ activeTable === "myOrders" ? "active" : "" }`}
                      onClick={() => this.handleTableButtonClick("myOrders")}>
                      My Orders
                    </button>
                    <button
                      style={{backgroundColor:"#04587c"}}
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
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id_cook}</td>
                  <td>Meal name</td> {/* Replace with the correct property */}
                  <td>{order.portions}</td>
                  <td>{order.confirmed}</td>
                </tr>
      ))}
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
                { orders.map((order, index)=> (
                  <tr key={index}>
                    <th scope="row">{order.id_customer}</th>
                    <td>{order.id_meal}</td>
                    <td>{order.portions}</td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        id="addButton">
                          ✓
                      </button>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          )}
          </div>  
        )
    }
}

export default MyOrdersView;