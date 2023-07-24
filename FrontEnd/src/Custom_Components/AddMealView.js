import { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";

class AddMealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {},
      fields: [{value: ""}],

    };
  }

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      meal: { ...prevState.meal, [e.target.name]: e.target.value }
    }));
  };

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  handleAddField() {
    const { fields } = this.state;
    this.setState({ fields: [...fields, { value: "" }] });
  }

  handleFieldChange(index, event) {
    const { fields } = this.state;
    fields[index].value = event.target.value;
    this.setState({ fields });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Fields:", this.state.fields);
    const ingredients = this.state.fields.map((field) => ({ name: field.value }));

    // Set the ingredients list in the state
    this.setState({ ingredientsList: ingredients });
  }


  QPostMeal =() =>{
    
    axios.post("http://88.200.63.148:5020/meal", {

      name: this.state.meal.name,
      number_of_portions: this.state.meal.number_of_portions,
      date: "2023-07-29",
      time_ready: "16:57:00",
      price: this.state.meal.price


      }).then((res) =>{
        console.log(this.state.meal.name)
        console.log(this.state.meal.number_of_portions)
        console.log(this.state.meal.price)
        console.log(this.state.meal.date)
        console.log(this.state.meal.time_ready)
        console.log("Sent to server...")
      })
        .catch(err => {
          console.log(err)
        })
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color: #D4D4CE" }} />
        <div className="card myCard" id="create">
          <h3 style={{ margin: "10px" }}>Create a meal</h3>
          <hr></hr>
          <div className="mb-3">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/international-food.png"
              alt="international-food"
            />
            {"  "}
            <label className="form-label">Name</label>
            {"  "}

            <input
              name="name"
              onChange={(e) => this.QGetTextFromField(e)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>

          <div className="mb-3" style={{ margin: "5px" }}>
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/ios-filled/50/soup-plate.png"
              alt="soup-plate"
            />
            {"    "}
            <label className="form-label" htmlFor="portions">
              Number of portions
            </label>{" "}
            {"   "}
            <input
              name="number_of_portions"
              placeholder="2"
              onChange={(e) => this.QGetTextFromField(e)}
              type="number"
              min="1"
              className="form-control numberInput"
            />
          </div>
          <div className="mb-3" style={{ margin: "5px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            </svg>{" "}
            <label className="form-label">Ready in: </label>
            <div className="inLineContainer">
              <div className="inLine">
              <input type="date" name="date" className="form-control" />
              </div>
            <div className="inLine">
            <input type="time" name="time_ready" className="form-control" />
            </div>
            </div>
          </div>
          <div style={{ margin: "5px" }}>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/ingredients-for-cooking.png"
              alt="ingredients-for-cooking"
            />
            {"    "}
            <label className="form-label">Ingredients</label>
            <form onSubmit={this.handleSubmit}>
              {fields.map((field, index) => (
                <input
                  style={{ margin: "2px" }}
                  className="form-control"
                  placeholder="Ingredient"
                  key={index}
                  type="text"
                  value={field.value}
                  onChange={(event) => this.handleFieldChange(index, event)}
                />
              ))}
              <div className="rightButtonDiv">
                <button
                  type="button"
                  className="btn"
                  id="addButton"
                  onClick={this.handleAddField}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>

          <div className="mb-3" style={{ margin: "5px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cash-coin"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>{" "}
            {"   "}
            <label className="form-label">Price</label>
            <input
              name="price"
              onChange={(e) => this.QGetTextFromField(e)}
              type="number"
              min="1"
              className="form-control numberInput"
              placeholder="€"
            />
          </div>
        </div>
        <div className="buttonContainer">
          <button
            id="postButton"
            onClick={() => {this.QPostMeal(); this.QSetViewInParent({page: "feed"})}}
            className="btn btn-primary bt defaultButton"
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default AddMealView;
