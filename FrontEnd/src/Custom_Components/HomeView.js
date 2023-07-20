import { Component } from "react";
import power from "./power.png";
import Helmet from "react-helmet";

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
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        <div id="about">
          "Cook Me a Meal" is a unique project that brings people together
          through the power of food.
        </div>

        <div className="card text-center myCard">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <p id="subtitle" className="nav-link active">
                  Our mission
                </p>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <p className="card-text">
              To foster a sense of community by sharing a delicious and
              wholesome meal with someone.
            </p>
            <div style={{ maxWidth: "600px", margin: "auto" }}>
              <img id="homePic" src={power} alt="Power of food"></img>
            </div>
            We provide a platform where individuals can connect, share their
            love of food, and experience the joy of breaking bread together.
          </div>
        </div>

        <div className="buttonContainer">
          <button
            type="button"
            onClick={() => this.QSetViewInParent({ page: "signup" })}
            className="btn btn-primary btn-lg btn-block"
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
