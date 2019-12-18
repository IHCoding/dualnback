import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "../App.css";
import "./DualnBackView.css";
import Game from "./Game";
import { userService } from "../services/userService";

import { BrowserRouter as Router, Link } from "react-router-dom";

export interface IProps {
  loggedIn: boolean;
}

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
  loggedIn: boolean;
  n: number;
  connected: boolean;
}

class DualnBackView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
      loggedIn: props.loggedIn,
      n: 1,
      connected: true
    };

    this.setGridSize = this.setGridSize.bind(this);
    this.setN = this.setN.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  public render() {
    return (
      <div className="DualnBackView">
        <Container>
          {/* <Button
            color="primary"
            className={this.state.gameRunning ? "hidden" : ""}
            onClick={this.saveHighscore}
          > Save Score </Button>
          <Link to="/login">Login</Link>
           */}
          <div>
            <Link to="/highscores">Highscores</Link>
          </div>

          <Row>
            <Col xs="3">
              <Row>
                <input
                  type="range"
                  min="3"
                  max="5"
                  className="slider"
                  value={this.state.gridSize}
                  onInput={this.setGridSize}
                  onChange={this.setGridSize}
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  className="slider"
                  value={this.state.n}
                  onInput={this.setN}
                  onChange={this.setN}
                />
                <p>n: {this.state.n}</p>
              </Row>
            </Col>
            <Col xs="6">
              <Game
                rows={this.state.gridSize}
                columns={this.state.gridSize}
                running={this.state.gameRunning}
                onScoreChange={this.onScoreChange}
                n={this.state.n}
              />
            </Col>
            <Col xs="3">
              <Row>
                <Col xs="12">
                  <Button
                    color="primary"
                    className={this.state.gameRunning ? "hidden" : ""}
                    onClick={this.onPlay}
                  >
                    Play
                  </Button>
                  <Button
                    color="primary"
                    className={!this.state.gameRunning ? "hidden" : ""}
                    onClick={this.onStop}
                  >
                    Stop
                  </Button>
                  {this.state.loggedIn ? (
                    <Button
                      color="primary"
                      onClick={this.saveHighscore.bind(this)}
                      disabled={!this.state.connected}
                    >
                      Save Highscore
                    </Button>
                  ) : (
                    <p>Log in to save highscore </p>
                  )}
                  {this.state.connected ? null : (
                    <p>Unable to connect to the server</p>
                  )}
                </Col>
              </Row>
              <Row>
                <p>{this.state.score}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  private setGridSize(e: any) {
    this.setState({ gridSize: e.target.value });
  }

  private setN(e: any) {
    this.setState({ n: e.target.value });
    this.setState({ gameRunning: false });
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
    this.setState({ score: 0 });
  }

  private onStop(e: any) {
    this.setState({ gameRunning: false });
  }

  private onScoreChange(prevScore: number, nextScore: number) {
    this.setState({ score: nextScore });
  }

  // private saveHighscore() {
  //   var ws = new WebSocket("ws://localhost:4000/api");

  //   ws.onopen = () => {
  //     console.log("websocket connected");
  //     this.setState({ connected: true });
  //     ws.send(
  //       userService.getToken() +
  //         ";" +
  //         this.state.n +
  //         ";" +
  //         this.state.score.toString()
  //     );
  //   };

  //   ws.onerror = err => {
  //     console.error("websocket error: " + err.timeStamp);
  //     this.setState({ connected: false });
  //     ws.close();
  //   };

  //   ws.onclose = err => {
  //     console.error("websocket closed: " + err.timeStamp);
  //     this.setState({ connected: false });
  //     setTimeout(() => {
  //       this.saveHighscore();
  //     }, 1000);
  //   };
  // }

  private saveHighscore(e: any) {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      const req = fetch("api/score/create", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          Host: "localhost:3000",
          Connection: "Keep-alive"
        },
        body: JSON.stringify({
          score: this.state.score
        })
      }).then(res => console.log(res));
    }
  }
}

export default DualnBackView;
