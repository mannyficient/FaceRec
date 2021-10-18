import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/nav/nav";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import { Particle } from "tsparticles";
import Clarifai from "clarifai";
import FaceRecognition from "./components/faceRecogniton/FaceRecognition";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

const app = new Clarifai.App({
  apiKey: "c24316cd4d22400f8365bbd52c43817b",
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

export class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        ></Navigation>
        {route === "home" ? (
          <div>
            <Logo></Logo>
            <Rank></Rank>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            ></ImageLinkForm>
            <FaceRecognition box={box} imageUrl={imageUrl}></FaceRecognition>
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange}></SignIn>
        ) : (
          <Register onRouteChange={this.onRouteChange}></Register>
        )}
      </div>
    );
  }
}

export default App;
