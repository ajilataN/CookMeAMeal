import React, { Component } from "react"
import Helmet from "react-helmet"
import "./styles/HomeView.css"

class HomeView extends Component {
  // Constructor
  constructor(props) {
    super(props)
    this.state = {}
  }

  // Change page view
  setViewPageInParent = (obj) => {
    this.props.IdFromChild(obj)
  }

  render() {
    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #2A2A2A" }} />
        <div id="aboutText">
          "Cook Me a Meal" is a unique project that brings people together
          through the power of food.
        </div>

        <div id="home-background"></div> {/* Background Image */}
        
        <div className="new-card text-center">   
          <h4 id="mission">
            Our mission
          </h4>
          <div className="card-body">
            <p className="card-text-new">
              To foster a sense of community by sharing a delicious and
              wholesome meal with someone.
            </p>
            We provide a platform where individuals can connect, share their
            love of food, and experience the joy of breaking bread together.
          </div>
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={() => this.setViewPageInParent({ page: "signup" })}
            className="join-button btn btn-primary btn-lg btn-block"
            id="join"
          >
            Join now
          </button>
        </div>
      </div>
    )
  }
}

export default HomeView
