import { Component } from "react"
import Helmet from "react-helmet"
import axios from "axios"

class LoginView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      // User record to store user's data
      user: {
        type: "login"
      }
    }
  }

  // Get the input from the fields
  getUserInput = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value }
    }))
  }

  // Change the page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  // Pass the user's data to the parent
  sendUserDataToParent = (obj) => {
    this.props.userFromChild(obj)
  }

  // Post request for login
  postLoginData = () =>{
    let user = this.state.user
    axios.post("http://88.200.63.148:5020/users/login", {
        email: user.email,
        password: user.password
    },  { withCredentials: true })
    .then(res=>{
      if(res.data === "INCORRECT PASSWORD"){
        alert("INCORRECT PASSWORD!")
      }
      else if(res.data === "USER NOT REGISTRED"){
        alert("USER NOT REGISTRED!")
      }
      else if(res.data === "ENTER EMAIL AND PASSWORD"){
        alert("ENTER EMAIL AND PASSWORD!")
      }
      else{
      this.sendUserDataToParent(res.data)
      this.setViewPageInParent({ page: "feed" })
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div id="home-background"></div>
        <h3 id="newAccHeader">Log into Cook Me A Meal</h3>
        <div className="card loginCard">
          <form style={{ margin: "20px" }}>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                placeholder="example@example"
                onChange={(e) => this.getUserInput(e)}
                name="email"
                type="text"
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                placeholder="Password"
                onChange={(e) => this.getUserInput(e)}
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
            </div>
          </form>
          <button
            onClick={() => {this.postLoginData()
            }}
            className="btn btn-primary bt sign log defaultColoredButton"
          >
            Login
          </button>
          <hr style={{marginTop: "16px"}}></hr>
          <button
            onClick={() => this.setViewPageInParent({ page: "signup" })}
            className="btn btn-primary bt log defaultButton"
          >
            Create new account
          </button>
        </div>
      </div>
    )
  }
}

export default LoginView
