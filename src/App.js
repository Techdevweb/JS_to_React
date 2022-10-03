import React, {useRef,useState} from 'react' //Allows to use Referances
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam'//Brings in React's web cam
import { data } from 'jquery';

// Define some websocket stuff:

let WS_URL;

if (location.protocol == 'http:'){
  console.log("HTTP Connection");
  WS_URL = "ws://localhost:8000/ws/camera";
}

if (location.protocol == 'https:'){
  WS_URL =  "wss://test.msuaiclub.com:443/ws/camera";
}

// Create the websocket:

const ws = new WebSocket(WS_URL);
ws.onopen = () => {
  console.log(`Connected to ${WS_URL}`);
}


function send_frame(frame) {

  // We send the given frame to our backend.
  // This frame MUST be in base 64 format!
  // Here we define the metadata/payload format.
  // Not very tricky, we just send face data

  // Create and send face data;

  ws.send('{"id": "face"}' + frame);
}


ws.onmessage = (message) => {

  // Here is where we decode any incoming data from the websocket.
  // Add any utility code here you like!

  // Decode the metadata we receive:

  meta = message.data.slice(0, message.data.indexOf('}')+1);

  // Get payload data:

  payload = message.data.slice(message.data.indexOf('}')+1);

  // Parse our data:

  data = JSON.parse(payload);
  meta_data = JSON.parse(meta);

  // Output some data to the console for debugging:

  console.log("Server says: " + JSON.stringify(data));
  console.log("Metadata: " + meta);

  // We are ONLY working with face data, output the face name:

  $('#info').text(JSON/stringify(data));

  // We should probably wait for a period here...
  // TODO: Implement this
}

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
