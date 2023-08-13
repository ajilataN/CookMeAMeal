import React, { Component } from "react"

// This is a class that renders a picture used as icon in the FeedView
class ProfileIcon extends Component {
    render(){
        return(
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#112f1a"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
        )
    }
}

export default ProfileIcon