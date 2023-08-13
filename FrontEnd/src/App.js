import { Component } from "react";
import HomeView from "./Custom_Components/HomeView";
import OrderView from "./Custom_Components/OrderView";
import AddMealView from "./Custom_Components/AddMealView";
import LoginView from "./Custom_Components/LoginView";
import FeedView from "./Custom_Components/FeedView";
import SignupView from "./Custom_Components/SignupView";
import SingleMealView from "./Custom_Components/SingleMealView";
import MyOrdersView from "./Custom_Components/MyOrdersView";
import MyMealView from "./Custom_Components/MyMealView"
import axios from "axios";
import "./Custom_Components/styles/general.css"

class App extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      // Default page on refresh
      currentPage: "home",
      // Meal id before we get any other
      meal: 1,
      // User not logged initially
      userStatus: { logged: false }
    }
  }

  // Function that makes a post request to logout a user and set the userStatus
  postLogout = () => {
    axios.post("http://88.200.63.148:5020/users/logout").then(() => {
      this.setState({
        userStatus: { logged: false, user: null },
        // Reset the page after logout
        currentPage: "login",
      })
    })
  }

  // Sets the current page
  setViewPage = (obj) => {
    this.setState({
      currentPage: obj.page,
      // Used to pass the id of a meal when clicked
      meal: obj.id || 1,
    })
  }

  // Function to set the status of the user when logged and pass the user object
  setUserStatus=(obj)=>{
    this.setState({
      userStatus:{ logged: true, user:[obj] }
    })
   }
   
// Function to handle the view of every page
// Every case sets different component
  getViewPage = (state) => {
    let page = state.currentPage;

    switch (page) {
      case "order":
        return state.userStatus.logged ? 
          <OrderView IdFromChild={this.setViewPage} data={this.state.meal}/> 
          : <div>
              <h4>You have to be logged-in to continue!</h4>
              <LoginView userFromChild={this.setUserStatus} IdFromChild={ this.setViewPage }/>
            </div>;

      case "feed":
        return <FeedView IdFromChild = { this.setViewPage } />;
      
      case "mymeal":
        return <MyMealView  />

      case "addmeal":
        return state.userStatus.logged ? <AddMealView IdFromChild={this.setViewPage} /> 
        :<div> <h4>You have to be logged-in to continue!</h4> <LoginView userFromChild={this.setUserStatus}
        IdFromChild={this.setViewPage}/></div>;

      case "signup":
        return (
          <SignupView
            IdFromChild={this.setViewPage}
          />
        );

      case "login":
        return (
          <LoginView
            userFromChild={this.setUserStatus}
            IdFromChild={this.setViewPage}
          />
        );

      case "meal":
        return (
          <SingleMealView
            IdFromChild={this.setViewPage}
            data={this.state.meal}
          />
        );

      case "home":
        return <HomeView IdFromChild={this.setViewPage} />;
      
      case "orders":
        return state.userStatus.logged ? <MyOrdersView userStatus={state.userStatus}/>
        : <div><h4>You have to be logged-in to continue!</h4><LoginView userFromChild={this.setUserStatus}
        IdFromChild={this.setViewPage}/></div>;

      default:
        return <HomeView />;
    }
  };

  // On component did mount sets the data for the user
  // Initially logged palse and undefined user
  componentDidMount() {
    axios.get("http://88.200.63.148:5020/users/login").then((res) => {
      this.setState({ userStatus:res.data })
      console.log(res);
    });
  }

  render() {
    // Take the user status data
    const { userStatus } = this.state;
    // Options that only a logged in user will see
    const loggedUsersHeader = (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a onClick={() => this.setViewPage({ page: "feed" })}
          className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
          href="#">
          Feed
        </a>
      </li>
      { userStatus.logged && (
        <>
          <li className="nav-item">
            <a
              onClick={() => this.setViewPage({ page: "addmeal" })}
              className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
              href="#">
              Add meal
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => this.setViewPage({ page: "mymeal" })}
              className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
              href="#">
              My meals
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => this.setViewPage({ page: "orders" })}
              className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
              href="#">
              Orders
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={this.postLogout}
              className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
              href="#">
              Logout
            </a>
          </li>
        </>
      )}
  </ul>
)
// Options that only a non logged in user will see
const nonLoggedUsersHeader = (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <a
        onClick={() => this.setViewPage({ page: "feed" })}
        className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
        href="#">
        Feed
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => this.setViewPage({ page: "login" })}
        className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
        href="#">
        Login
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => this.setViewPage({ page: "signup" })}
        className={`nav-link ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
        href="#">
        Sign up
      </a>
    </li>
  </ul>
)
  return (
    <div id="APP" className="container">
      <div id="menu" className="row">
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          id="mainHeader" >
          <div className="container-fluid">
            <div className="col-sm">
              <a
                onClick={() => this.setViewPage({ page: "home" })}
                className={`navbar-brand ${this.state.currentPage === 'home' ? 'homeBrand' : 'otherBrand'}`}
                href="#">
                Cook Me A Meal
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="com-sm">
                { userStatus.logged ? loggedUsersHeader : nonLoggedUsersHeader }
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Show page accordingly to the case of the function */}
      <div id="viewer">{ this.getViewPage(this.state) }</div>
    </div>
  )
}
}

export default App;
