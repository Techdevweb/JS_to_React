import React, {useRef,useState} from 'react' //Allows to use Referances
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam'//Brings in React's web cam

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
      <Webcam ref={webcamRef}
            style={{
              position:'absolute',
              margin:'auto',
              textAlign:'center',
              width: 640,
              height: 600,
            }}
          />
          <canvas ref={canvasRef}
            style={{
              position:'absolute',
              margin:'auto',
              textAlign:'center',
              width: 640,
              height: 600,
            }}
          />
       
      </header>
    </div>
  );
}

export default App;
