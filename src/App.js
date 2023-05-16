import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize=5
  apikey=process.env.REACT_APP_NEWS_API
  constructor(){
    super();
    this.state={
      mode:"light",
      text:"Enable dark mode",
      progress:0
    }
  }
  setProgress=(p)=>{
    this.setState({progress:p})
  }
  toggleMode=()=>{
    if(this.state.mode==="light"){
      document.body.style.backgroundColor="#121212"
      this.setState({
        mode:"dark",
        text:"Enable light mode"
      })
    }
    else{
      document.body.style.backgroundColor="#e4e5f1"
      this.setState({
        mode:"light",
        text:"Enable dark mode"
      })
    }
  }

  render() {
    return (
      <div>
        <Router> 
        <Navbar mode={this.state.mode} toggleMode={this.toggleMode} text={this.state.text}/>
        <LoadingBar color='#f11946' progress={this.state.progress} height={3}/>
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="general" pageSize={this.pageSize} country={'in'} category={'general'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="business" pageSize={this.pageSize} country={'in'} category={'business'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="entertainment" pageSize={this.pageSize} country={'in'} category={'entertainment'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/general"element={<News setProgress={this.setProgress} apikey={this.apikey}  key="general" pageSize={this.pageSize} country={'in'} category={'general'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="health" pageSize={this.pageSize} country={'in'} category={'health'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/science"element={<News setProgress={this.setProgress} apikey={this.apikey}  key="science" pageSize={this.pageSize} country={'in'} category={'science'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="sports" pageSize={this.pageSize} country={'in'} category={'sports'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
            <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="technology" pageSize={this.pageSize} country={'in'} category={'technology'} mode={this.state.mode} toggleMode={this.toggleMode}/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

