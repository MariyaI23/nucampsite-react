import React from "react";

export const Loading = () => {
    return (
        <div className="col">
            <i className = " fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
            <p>Loading...</p>
        </div>
    )
}

//This component will represent the loading spinner while we are waiting for a data to load from our simulated server.
//We are using the spinner icon , the fa-pulse will make it rotate in 8 steps,fa-3x will increase it's size, fa-fw will make it with Fixed Width, text-primary class will make it blue.