import React, { Component } from "react"

// This is a class that renders a picture used as icon in the FeedView
class VeganIcon extends Component {
    render(){
        return(
          <img
              width="30"
              height="25"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png"
              alt="ingredients-for-cooking"
            />
        )
    }
}

export default VeganIcon