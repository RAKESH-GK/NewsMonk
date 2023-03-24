import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

const App =()=> {
  let pageSize=5
  let apikey=process.env.REACT_APP_NEWS_API
  const [mode,setMode]=useState('light');
  const [progress,setProgress]=useState(0);
  const [text,setText]=useState('Enable dark mode');

  const toggleMode=()=>{
    if(mode==="light"){
      document.body.style.backgroundColor="#121212"
      setMode("dark");
      setText("Enable light mode");
    }
    else{
      document.body.style.backgroundColor="#e4e5f1"
      setMode("light");
      setText("Enable dark mode");
    }
  }

  return (
    <div>
      <Router> 
      <Navbar mode={mode} toggleMode={toggleMode} text={text}/>
      <LoadingBar color='#f11946' progress={progress} height={3}/>
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apikey={apikey}  key="general" pageSize={pageSize} country={'in'} category={'general'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey}  key="business" pageSize={pageSize} country={'in'} category={'business'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey}  key="entertainment" pageSize={pageSize} country={'in'} category={'entertainment'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/general"element={<News setProgress={setProgress} apikey={apikey}  key="general" pageSize={pageSize} country={'in'} category={'general'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey}  key="health" pageSize={pageSize} country={'in'} category={'health'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/science"element={<News setProgress={setProgress} apikey={apikey}  key="science" pageSize={pageSize} country={'in'} category={'science'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey}  key="sports" pageSize={pageSize} country={'in'} category={'sports'} mode={mode} toggleMode={toggleMode}/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey}  key="technology" pageSize={pageSize} country={'in'} category={'technology'} mode={mode} toggleMode={toggleMode}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
