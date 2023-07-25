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
  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value }
    }));
  };

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  QSendUser2Parent = (obj) => {
    this.props.QUserFromChild(obj);
  };


  QPostLogin = () =>{
    let user = this.state.user
    axios.post("http://88.200.63.148:5020/users/login", {
        email: user.email,
        password: user.password
    },{withCredentials: true})
    .then(res=>{
      console.log("Sent to the server...")
      this.QSendUser2Parent(res.data)
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
              onChange={(e) => this.QGetTextFromField(e)}
              name="email"
              type="text"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="password"
              type="password"
              className="form-control"
              id="password"
            />
          </div>
        </form>
        <button
          onClick={() => {this.QPostLogin(); 
            this.QSetViewInParent({ page: "feed" })
          }}
          className="btn btn-primary bt defaultButton log"
        >
          Login
        </button>
      </div>
    );
  }
}

export default LoginView;
