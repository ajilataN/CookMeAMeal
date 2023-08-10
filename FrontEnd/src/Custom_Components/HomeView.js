import React, { Component } from "react";
import Helmet from "react-helmet";
import "./HomeView.css"; // Import the CSS file

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

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
            onClick={() => this.QSetViewInParent({ page: "signup" })}
            className="join-button btn btn-primary btn-lg btn-block"
            id="join"
          >
            Join now
          </button>
        </div>
      </div>
    );
  }
}

export default HomeView;
