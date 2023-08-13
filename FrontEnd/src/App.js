import { Component } from "react";
import HomeView from "./Custom_Components/HomeView";
import OrderView from "./Custom_Components/OrderView";
import AddMealView from "./Custom_Components/AddMealView";
import LoginView from "./Custom_Components/LoginView";
import FeedView from "./Custom_Components/FeedView";
import SignupView from "./Custom_Components/SignupView";
import SingleMealView from "./Custom_Components/SingleMealView";
import MyOrdersView from "./Custom_Components/MyOrdersView";
import MyMealView from "./Custom_Components/MyMealView";
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
        return <FeedView IdFromChild = { this.setViewPage } />
      
      case "mymeal":
        return <MyMealView IdFromChild = { this.setViewPage } />

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
          className={`nav-link ${t