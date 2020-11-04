import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log("Inside Constructor");
  //   this.state = {
  //     lat: null,
  //     errMessage: null,
  //   };
  //
  //   console.log("end of cons");
  // }

  state = {
    lat: null,
    errMessage: null,
  };

  componentDidMount() {
    console.log("Inside Component did Mount...");
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Before Update");
        this.setState({ lat: position.coords.latitude });
        console.log("After Update");
      },
      (err) => {
        this.setState({ errMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log("Inside Component did Update...");
  }

  componentWillUnmount() {
    console.log("Inside Component will Unmount");
  }

  renderContent() {
    if (this.state.errMessage && !this.state.lat) {
      return <div>Error: {this.state.errMessage}</div>;
    } else if (!this.state.errMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return (
      <div>
        <Spinner message="Please accept the location request" />
      </div>
    );
  }

  render() {
    console.log("Inside Render");
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
