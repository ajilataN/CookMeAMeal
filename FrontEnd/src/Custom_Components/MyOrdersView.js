import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";

class MyOrdersView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activeTable: "myOrders", // Default active table
      meal: [],
      press: false,
      orders: [],
    };
  }

    componentDidMount(){
        // console.log(this.props.data)
        // axios.get("http://88.200.63.148:5020/meal/order" + this.props.data)
        // .then(res=>{
        //   console.log(res.data)
        //   this.setState({
        //     activeTable: "myOrders",
        //     meal: res.data.length > 0 ? res.data : [], 
        //     press: false
        //   })
        // })
        const { userStatus } = this.props

        if (userStatus && userStatus.logged) {
          this.fetchOrders("myOrders");
        }
      }

      fetchOrders = (tableId) => {
        const endpoint =
          tableId === "myOrders"
            ? `/order/my/${this.props.userStatus.user[0].id}`
            : `/order/pending/${this.props.userStatus.user[0].id}`;
    
        axios.get(endpoint)
          .then((res) => {
            this.setState({
              activeTable: tableId,
              orders: res.data || [], // Update the orders state with fetched data
            });
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          });
      };

    handleTableButtonClick = (tableId) => {
      // this.setState({
      //   activeTable: tableId
      // });
      this.fetchOrders(tableId);
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
                      onClick={() => {this.handleTableButtonClick("myOrders"); "this.style.backgroundColor='#023246'"}}>
                      My Orders
                    </button>
                    <button
                      style={{backgroundColor:"#04587c"}}
                      id="pendingOrdersButton"
                      type="button" className={`btn btn-secondary orderButton 
                      ${  activeTable === "pendingOrders" ? "active" : "" }`}
                      onClick={() => {this.handleTableButtonClick("pendingOrders");
                      "this.style.backgroundColor='#023246'"
                      }}>
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
                  <th scope="row">{orders.id_cook}</th>
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