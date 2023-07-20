//import axios from "axios";
import { Component } from "react";
import Helmet from "react-helmet";

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        type: "signup"
      }
    };
  }

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value }
    }));
  };

  QSendUserToParent = () => {
    this.props.QUserFromChild(this.state.user);
  };

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  /* QPostSignUp = ()=> {
    let user = this.state.user 
    axios.post("/users/register",{
      username: user.username,
      email: user.email,
      password: user.password
    }).then(res =>{
      console.log("Sent to server...")
    }).catch(err =>{
      console.log(err)
    })
  }*/

  render() {
    return (
      <div className="card loginCard">
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />

        <form style={{ margin: "20px" }}>
          <div className="inLineContainer">
            <div className="mb-3 inLine">
              <label className="form-label">Name</label>
              <input
                onChange={(e) => this.QGetTextFromField(e)}
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3 inLine">
              <label className="form-label">Surname</label>
              <input
                onChange={(e) => this.QGetTextFromField(e)}
                name="surname"
                type="text"
                className="form-control"
                id="surname"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="email"
              type="emial"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telephone</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="telephone"
              type="tel"
              className="form-control"
              id="telephone"
            />
          </div>
          <div className="mb-3">
            <div className="inLineContainer">
              <div className="inLine">
                <label className="form-label">Street</label>
                <input
                  onChange={(e) => this.QGetTextFromField(e)}
                  name="street"
                  type="text"
                  className="form-control"
                  id="street"
                />
              </div>
              <div className="inLine">
                <label className="form-label">Street Number</label>
                <input
                  onChange={(e) => this.QGetTextFromField(e)}
                  name="streetNumber"
                  type="number"
                  className="form-control"
                  id="streetNumber"
                />
              </div>
            </div>
            <div className="inLineContainer">
              <div className="inLine">
                <label className="form-label">City</label>
                <input
                  onChange={(e) => this.QGetTextFromField(e)}
                  name="city"
                  type="text"
                  className="form-control"
                  id="city"
                />
              </div>
              <div className="inLine">
                <label className="form-label">Postal Code</label>
                <input
                  onChange={(e) => this.QGetTextFromField(e)}
                  name="postalCode"
                  type="number"
                  className="form-control"
                  id="postalCode"
                />
              </div>
            </div>
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
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="password"
              type="password"
              className="form-control"
              id="password2"
            />
          </div>
        </form>
        {/* <div className="buttonContainer"> */}
        <button
          onClick={() => {
            //this.QSentUserToParent();
            this.QSetViewInParent({ page: "login" });
          }}
          className="btn btn-primary bt defaultButton"
        >
          Sign up
        </button>
        {/* </div> */}
      </div>
    );
  }
}

export default SignupView;
