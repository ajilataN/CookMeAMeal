import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        type: "login"
      }
    };
  }
  getUserInput = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value }
    }));
  };

  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj);
  };

  sendUserDataToParent = (obj) => {
    this.props.userFromChild(obj);
  };


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
      console.log("Sent to the server...")
      this.sendUserDataToParent(res.data)
      this.setViewPageInParent({ page: "feed" })
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div className="card loginCard">
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
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
          className="btn btn-primary bt defaultButton log"
        >
          Login
        </button>
        <hr style={{marginTop: "16px"}}></hr>
        <button
          onClick={() => this.setViewPageInParent({ page: "signup" })}
          className="btn btn-primary bt log createNew"
        >
          Create new account
        </button>
      </div>
    );
  }
}

export default LoginView;
