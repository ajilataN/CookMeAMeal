import { Component } from "react";
import HomeView from "./Custom_Components/HomeView";
import OrderView from "./Custom_Components/OrderView";
import AddMealView from "./Custom_Components/AddMealView";
import LoginView from "./Custom_Components/LoginView";
import FeedView from "./Custom_Components/FeedView";
import SignupView from "./Custom_Components/SignupView";
import SingleMealView from "./Custom_Components/SingleMealView";
import MyOrdersView from "./Custom_Components/MyOrdersView";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home",
      meal: 1,
      userStatus: { logged: false }
    };
  }

  handleLogout = () => {
    axios.post("http://88.200.63.148:5020/users/logout").then(() => {
      this.setState({
        userStatus: { logged: false, user: null },
        currentPage: "login", // Reset the current page to home after logout
      });
    });
  };
  

  QHandleUserLog = (obj) => {
    this.QSetView({ page: "feed" });
  };

  QSetView = (obj) => {
    this.setState({
      currentPage: obj.page,
      meal: obj.id || 1,
    });
  };

  QSetUser=(obj)=>{
    this.setState({
      userStatus:{logged:true,user:[obj]}
    })
   }
   

  QGetView = (state) => {
    let page = state.currentPage;
    switch (page) {
      case "order":
        return state.userStatus.logged ? <OrderView 
                  QIDFromChild={this.QSetView} 
                  data={this.state.meal} /> 
                  : <div><h4>You have to be logged-in to continue!</h4><LoginView QUserFromChild={this.QSetUser}
                  QIDFromChild={this.QSetView}/></div>;

      case "feed":
        return <FeedView QIDFromChild={this.QSetView} />;

      case "addmeal":
        return state.userStatus.logged ? <AddMealView QIDFromChild={this.QSetView} /> 
        :<div> <h4>You have to be logged-in to continue!</h4> <LoginView QUserFromChild={this.QSetUser}
        QIDFromChild={this.QSetView}/></div>;

      case "signup":
        return (
          <SignupView
            QIDFromChild={this.QSetView}
            // QUserFromChild={this.QHandleUserLog}
          />
        );

      case "login":
        return (
          <LoginView
            QUserFromChild={this.QSetUser}
            QIDFromChild={this.QSetView}
          />
        );

      case "meal":
        return (
          <SingleMealView
            QIDFromChild={this.QSetView}
            data={this.state.meal}
          />
        );

      case "home":
        return <HomeView QIDFromChild={this.QSetView} />;
      
      case "orders":
        return state.userStatus.logged ? <MyOrdersView userStatus={state.userStatus}/>
        : <div><h4>You have to be logged-in to continue!</h4><LoginView QUserFromChild={this.QSetUser}
        QIDFromChild={this.QSetView}/></div>;

      default:
        return <HomeView />;
    }
  };


  componentDidMount() {
    axios.get("http://88.200.63.148:5020/users/login").then((res) => {
      this.setState({userStatus:res.data})
      console.log(res);
    });
  }

  render() {
    const { userStatus } = this.state;
  
    const loggedInMenuItems = (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <a
        onClick={() => this.QSetView({ page: "feed" })}
        className="nav-link"
        href="#"
      >
        Feed
      </a>
    </li>
    {userStatus.logged && (
      <>
        <li className="nav-item">
          <a
            onClick={() => this.QSetView({ page: "addmeal" })}
            className="nav-link"
            href="#"
          >
            Add meal
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => this.QSetView({ page: "orders" })}
            className="nav-link "
            href="#"
          >
            Orders
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={this.handleLogout}
            className="nav-link "
            href="#"
          >
            Logout
          </a>
        </li>
      </>
    )}
  </ul>
);

const loggedOutMenuItems = (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <a
        onClick={() => this.QSetView({ page: "feed" })}
        className="nav-link"
        href="#"
      >
        Feed
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => this.QSetView({ page: "login" })}
        className="nav-link "
        href="#"
      >
        Login
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => this.QSetView({ page: "signup" })}
        className="nav-link "
        href="#"
      >
        Sign up
      </a>
    </li>
  </ul>
);

  
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "#023246" }}
          >
            <div className="container-fluid">
              <div className="col-sm">
                <a
                  onClick={() => this.QSetView({ page: "home" })}
                  className="navbar-brand"
                  href="#"
                >
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
                  {userStatus.logged ? loggedInMenuItems : loggedOutMenuItems}
                </div>
              </div>
            </div>
          </nav>
        </div>
  
        <div id="viewer">{this.QGetView(this.state)}</div>
      </div>
    );
  }
  

}

export default App;
