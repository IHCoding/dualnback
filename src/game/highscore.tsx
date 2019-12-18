import React from "react";
//import { userService } from "../services/userService";
// import AppBar from "material-ui/AppBar";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export interface IProps {
  }

export interface IState {
  //websocket: WebSocket;
  scores: string[];
  n: number;
}

class HighscorePage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      scores: ["", "", "", "", ""],
      n: 1
    };

    this.setN = this.setN.bind(this);
  }

  private oldN = 1;
  private connection;

  componentDidMount() {
    this.connect();
  }

  connect() {
    this.connection = new WebSocket('ws');

    this.connection.onopen = () => {
      console.log("websocket connected");
      this.connection.send("HS " + this.state.n);
    };

    this.connection.onmessage = m => {
      var data = JSON.parse(m.data);
      this.setState({ scores: data });
      this.oldN = this.state.n;
    };

    this.connection.onclose = e => {
      console.log("websocket closed: " + e.reason);
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.connection.onerror = err => {
      console.error("websocket error: " + err.timeStamp);
      this.connection.close();
    };
  }

  render() {
    return (
      <div>
          {this.connection.readyState !== 1 ? (
            <p>Could Not connect to the server</p>
          ) : (
            <input
              type="range"
              min="1"
              max="20"
              className="slider"
              value={this.oldN}
              onInput={this.setN}
              disabled={this.connection.readyState !== 1}
            />
          )}
          <p>n1: {this.oldN}</p>
          <ol>
            {this.state.scores.map(s => (
              <li>{s}</li>
            ))}
          </ol>
      </div>
    );
  }

  private setN(e: any) {
    if (this.connection.readyState === 1) {
      this.connection.send("HS " + this.state.n);
    }
    this.setState({ n: e.target.value });
  }
}

export default HighscorePage;
