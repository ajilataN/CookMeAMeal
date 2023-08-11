import React, { Component } from "react"

// This is a class that renders a picture used as icon in the FeedView
class IngredientsIcon extends Component {
    render(){
        return(
          <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/ingredients-for-cooking.png"
              alt="ingredients-for-cooking"
            />
        )
    }
}

export default IngredientsIcon