import './bootstrap.min.css';
import './App.css';
import icon from './icon.png';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import Navbar from './Navbar.js';  
import { fetchEmotionData, fetchSentimentData, fetchTextEmotionData, fetchTextSentimentData } from './apiService.js'; // Import the API functions

class App extends React.Component {
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: true
  }

  renderOutput = (input_mode) => {
    let rows = 1
    let mode = "url"
    if (input_mode === "text") {
      mode = "text"
      rows = 4
    }
    this.setState({
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
      sentimentOutput: [],
      sentiment: true
    });
  }

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let mode = this.state.mode;
    let input = document.getElementById("textinput").value;

    if (mode === "text") {
      fetchTextSentimentData(input)
        .then((response) => {
          // Handle the response as needed
          this.handleSentimentResponse(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (mode === "url") {
      fetchSentimentData(input)
        .then((response) => {
          // Handle the response as needed
          this.handleSentimentResponse(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let mode = this.state.mode;
    let input = document.getElementById("textinput").value;

    if (mode === "text") {
      fetchTextEmotionData(input)
        .then((response) => {
          // Handle the response as needed
          this.handleEmotionResponse(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (mode === "url") {
      fetchEmotionData(input)
        .then((response) => {
          // Handle the response as needed
          this.handleEmotionResponse(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  handleSentimentResponse = (response) => {
    const data = response.data;
    this.setState({ sentimentOutput: data.label });
    let output = data.label;
    let color = "white";
    switch (output) {
      case "positive":
        color = "green";
        break;
      case "negative":
        color = "red";
        break;
      default:
        color = "yellow";
    }
    output = <div style={{ color: color, fontSize: 20 }}>{output}</div>;
    this.setState({ sentimentOutput: output });
  }

  handleEmotionResponse = (response) => {
    const data = response.data;
    this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='App mt-3'>
          <img src={icon} alt="MoodCheck Icon" width="100" height="100" className="center"/>
          <h1 className="gradient-text text-center mt-2">Find the emotions. Understand the sentiments.</h1>
          <h5 className="text-slate-500 mb-4">Decode the unspoken in every text.</h5>
          <button className="btn btn-warning mr-5 shadow-lg" onClick={() => { this.renderOutput('text')}}>Text</button>
          <button className="btn btn-dark shadow-lg"  onClick={()=>{this.renderOutput('url')}}>URL</button>
          <br/><br/>
          {this.state.innercomp}
          <br/>
          <button className="btn-primary mt-2 mr-2 mb-5" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
          <button className="btn-primary mt-2 mb-5" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
          <br/>
              {this.state.sentimentOutput}
        </div>
      </div>
    );
  }
}

export default App;
