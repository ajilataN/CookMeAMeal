import { Component } from "react"
import Helmet from "react-helmet"
import axios from "axios"

class MyOrdersView extends Component{
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      activeTable: "myOrders", // Default active table
      orders: [],
    }
  }

  componentDidMount(){
    // console.log(this.props.data)
    axios.get("http://88.200.63.148:5020/order/my", { withCredentials: true })
    .then(res=>{
      console.log(res.data)
      this.setState({
        activeTable: "myOrders",
        orders: res.data.length > 0 ? res.data : [], 
        press: false
      })
    })
  }
  // Fetch corresponding orders from API
  getOrders = (tableId) => {
    const endpoint =
      tableId === "myOrders"
        ? "http://88.200.63.148:5020/order/my"
        : "http://88.200.63.148:5020/order/pending"
    axios.get(endpoint, {withCredentials: true})
      .then((res) => {
        console.log("Data: ", res.data)
        this.setState({
          activeTable: tableId,
          orders: res.data || [],
        })
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }

  // Get corresponding table based on id
  getMyOrPendingOrders = (tableId) => {
    if (tableId === "myOrders")
      this.getOrders("myOrders")
    else if (tableId === "pendingOrders")
      this.getOrders("pendingOrders")
  }

  // Post request to update the confirmation
  confirmOrder = (orderId) => {
    axios.post(`http://88.200.63.148:5020/order/confirm/${orderId}`, {}, { withCredentials: true })
      .then((res) => {
        // Refresh the orders after confirmation
        this.getOrders(this.state.activeTable)
      })
      .catch((error) => {
        console.error("Error confirming order:", error)
      })
  }
    
  render(){
    const { activeTable, orders } = this.state
    return(
      <div>
        <div className="buttonContainer">
          <div className="btn-group" role="group">
            <button 
              id="myOrdersButton"
              type="button" className={`btn btn-secondary defaultColoredButton 
              ${ activeTable === "myOrders" ? "active" : "" }`}
              onClick={() => this.getMyOrPendingOrders("myOrders")}>
              My Orders
            </button>
            <button
              id="pendingOrdersButton"
              type="button" className={`btn btn-secondary defaultColoredButton 
              ${  activeTable === "pendingOrders" ? "active" : "" }`}
              onClick={() => this.getMyOrPendingOrders("pendingOrders")}>
              Pending Orders
            </button>
          </div>
        </div>

        { activeTable === "myOrders" && (
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
              { orders.map((order, index) => (
                <tr key={index}>
                  <td>{ order.cookName }</td>
                  <td>{ order.mealName }</td>
                  <td>{ order.portions }</td>
                  <td>{ order.confirmed ? <div style={{color:"green"}}>Confirmed!</div>: <div style={{color:"#FFCC00"}}>Pending...</div> }</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        { activeTable === "pendingOrders" && (
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
                  <th scope="row">{ order.customerName }</th>
                  <td>{ order.mealName }</td>
                  <td>{ order.portions }</td>
                  <td>
                    { order.confirmed === 0 ? (
                      <button
                        type="button"
                        className="btn"
                        id="addButton"
                        onClick={() => this.confirmOrder(order.orderId)}>
                          ✓
                      </button>
                    ): ("Confirmed"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>  
    )
  }
}

export default MyOrdersView