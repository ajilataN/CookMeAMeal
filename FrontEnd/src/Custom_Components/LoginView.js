import { Component } from "react";
import Helmet from "react-helmet";
//import axios from "axios";

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

  QSentUserToParent = () => {
    this.props.QUserFromChild(this.state.user);
  };

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  // QPostLogin = () =>{
  //   let user = this.state.user
  //   axios.post("/users/login", {
  //       username: user.username,
  //       password: user.password
  //   },{withCredentials: true})
  //   .then(res=>{
  //     console.log("Sent to the server...")
  //     this.QSendUser2Parent(res.data)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }

  render() {
    return (
      <div className="card loginCard">
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="password"
              type="password"
              className="form-control"
              id="password1"
            />
          </div>
        </form>
        <button
          onClick={() => this.QSetViewInParent({ page: "feed" })}
          //onClick={() => this.QSentUserToParent()}
          className="btn btn-primary bt defaultButton log"
        >
          Login
        </button>
      </div>
    );
  }
}

export default LoginView;
