import axios from "axios"
import { Component } from "react"
import Helmet from "react-helmet"

class SignupView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      user: {
        type: "signup"
      },
      passwordMatch: true,
    }
  }

  // Get input from fields
  getUserInput = (e) => {
    const { name, value } = e.target

    if (name === "password" || name === "password2") {
      const password = name === "password" ? value : this.state.user.password
      const password2 = name === "password2" ? value : this.state.user.password2

      this.setState({
        user: { ...this.state.user, [name]: value },
        passwordMatch: password === password2,
      })
    } else {
      this.setState((prevState) => ({
        user: { ...prevState.user, [name]: value },
      }))
    }
  }

  // Send user's data to parent
  sendUserToParent = () => {
    this.props.userFromChild(this.state.user)
  }

  // Change view page
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  // Post request for sing up
  postSignupData = () => {
    let user = this.state.user
    axios.post("http://88.200.63.148:5020/users/register", {
        name: user.name,
        surname: user.surname,
        email: user.email,
        telephone: user.telephone,
        street: user.street,
        street_number: user.street_number,
        city: user.city,
        postal_code: user.postal_code,
        password: user.password,
      })
      .then((res) => {
          if (res.data === "MISSING FIELD") {
          alert("Please complete all required fields before proceeding.")
        } else if (res.status === 200) {
          // Success, redirect or show a success message
          this.setViewPageInParent({ page: "login" })
        } else {
          // Handle unexpected response here
          alert("An unexpected error occurred. Please try again later.")
        }
      })
      .catch((err) => {
        // Handle network or server errors here
        console.log(err.response.data.message)
        alert(err.response.data.message)
      })
  }
  

  render() {
    return (
      <div>
        <div id="home-background"></div>
        <h3 id="newAccHeader">Create new account</h3>
        <div className="card loginCard">
          <form style={{ margin: "20px" }}>
            <div className="inLineContainer">
              <div className="mb-3 inLine">
                <label className="form-label">Name</label>
                <input
                  placeholder="Your name"
                  onChange={(e) => this.getUserInput(e)}
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>

              <div className="mb-3 inLine">
                <label className="form-label">Surname</label>
                <input
                  placeholder="Your surname"
                  onChange={(e) => this.getUserInput(e)}
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
                placeholder="example@example"
                onChange={(e) => this.getUserInput(e)}
                name="email"
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Telephone</label>
              <input
                placeholder="+386 xx xxx xxx"
                onChange={(e) => this.getUserInput(e)}
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
                    placeholder="Name of the street"
                    onChange={(e) => this.getUserInput(e)}
                    name="street"
                    type="text"
                    className="form-control"
                    id="street"
                  />
                </div>

                <div className="inLine">
                  <label className="form-label">Street Number</label>
                  <input
                    placeholder="Street number"
                    onChange={(e) => this.getUserInput(e)}
                    name="street_number"
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
                    placeholder="City"
                    onChange={(e) => this.getUserInput(e)}
                    name="city"
                    type="text"
                    className="form-control"
                    id="city"
                  />
                </div>

                <div className="inLine">
                  <label className="form-label">Postal Code</label>
                  <input
                    placeholder="Postal code"
                    onChange={(e) => this.getUserInput(e)}
                    name="postal_code"
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
                placeholder="Password"
                onChange={(e) => this.getUserInput(e)}
                name="password"
                type="password"
                className="form-control"
                id="password1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input
                placeholder="Repeat password"
                onChange={(e) => this.getUserInput(e)}
                name="password2"
                type="password"
                className={`form-control ${
                  this.state.passwordMatch ? "" : "is-invalid"
                }`}
                id="password2"
              />
              {! this.state.passwordMatch && (
                <div className="invalid-feedback">
                  Passwords do not match.
                </div>
              )}
            </div>

          </form>

          <button
            onClick={() => this.postSignupData()}
            className="btn btn-primary bt defaultColoredButton"
            disabled={!this.state.passwordMatch}
          >
            Sign up
          </button>
          <hr style={{marginTop: "16px"}}></hr>
          <button
            onClick={() => this.setViewPageInParent({ page: "login" })}
            className="btn btn-primary bt log defaultButton"
          >
            Login now
          </button>
        </div>

      </div>
    )
  }
}

export default SignupView