import React, { useEffect } from "react";
import { Button, Grid, Container, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import agentHome from "../../assets/images/agent-home.svg";
import "amazon-connect-streams";
import axios from "axios";
import "./Home.css";
import Survey from "./Survey";
import { useAuth } from '../auth';

const AWS = require("aws-sdk");

let callStart;
let callEnd;
let userPhone;
let callReason;
let agentName;

const SecAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const phrases = [
  "\"The only goal you can't accomplish is the one you don't go after\"",
  '"Don\'t count the days, make the days count"',
  '"The best way to predict your future is to create it"',
  '“Opportunities don\'t happen, you create them”',
  '"I never dreamed about success. I worked for it."'
];
let random = phrases[Math.floor(Math.random() * phrases.length)];

function HomeDashboard({ start, status, video }) {

  useEffect(() => {
    if (auth.isConnected) {
      reconnect();
    }
  }, []);


  const [videoStatus, setVideoStatus] = React.useState(null);
  const [callStatus, setCallStatus] = React.useState(null);
  const [contactInfo, setContactInfo] = React.useState(null);
  const auth = useAuth();

  const setBehavior = () => {
    // eslint-disable-next-line no-undef
    connect.contact(function (contact) {
      setContactInfo(contact);
      console.log(contact);
      contact.onIncoming(function (contact) {}.bind(this));

      contact.onRefresh(function (contact) {}.bind(this));

      contact.onAccepted(function (contact) {}.bind(this));

      // Call established
      contact.onConnected(function (contact) {}.bind(this));

      // call ended
      contact.onEnded(function () {}.bind(this));

      // Triggered for the normal inbound calls.
      contact.onConnecting(function (contact) {}.bind(this));

      contact.onIncoming(
        async function () {
          console.log("Incoming");
          setCallStatus("incoming");
        }.bind(this)
        )
        
        // Triggered for the Queue callbacks.
        contact.onAccepted(
          async function () {
            auth.setActiveCall(true)
            console.log(auth.activeCall)
            console.log("Accepted");
            start();
            setCallStatus("accepted");
            callStart = Date.now();
            userPhone = contact.getContactId();
        }.bind(this)
      );

      contact.onEnded(
        async function () {
          console.log("Ended");
          setCallStatus("ended");
          callEnd = Date.now();
          auth.setActiveCall(false);
        }.bind(this)
      );
    });
  };

  const reconnect = () => {
    var container = document.getElementById("home-dashboard");
    // eslint-disable-next-line no-undef
    container.appendChild(auth.iframe);
    console.log("Reconnecting");
  };

  const connectCCP = () => {
    const container = document.getElementById("home-dashboard");
    // eslint-disable-next-line no-undef
    connect.core.initCCP(container, {
      ccpUrl: "https://ccm-connect-test.my.connect.aws/ccp-v2/",
      loginPopup: true,
      loginOptions: {
        autoClose: true,
        height: 900,
        width: 1600,
      },
      region: "us-east-1",
      ccpAckTimeout: 9999999,
      ccpLoadTimeout: 9999999,
    });
    console.log("Connect CCP initialized");
    auth.setIsConnected(true);
    // eslint-disable-next-line no-undef
    connect.core.onInitialized(function () {
      console.log("Loaded CCP, now ready to use");
      setBehavior();
      // eslint-disable-next-line no-undef
      auth.setIframe(document.getElementsByTagName("iframe")[0]);
    });
  };

  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.Credentials({
      accessKeyId: "AKIAXWEUBHORYYQ74KCG",
      secretAccessKey: "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",
    }),
  });

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'azul-recordings' },
  });

  const sendVideo = async (fileName) => {
    console.log("Sending video");
    setVideoStatus("sending")
    const params = {
      Key: fileName,
      // eslint-disable-next-line no-undef
      Body: video,
      ContentType: 'video/mp4',
    };
    await s3.upload(params).promise();
    console.log("Video sent");
    setVideoStatus("sent")
    console.log(videoStatus)
    
  };

  const closeTicket = e => {
    let formValues = {};
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const entries = formData.entries();
    for (const entry of entries) {
      if(!formValues.hasOwnProperty(entry[0])) {
        formValues[entry[0]] = [];
      }
      formValues[entry[0]].push(entry[1]);
    }
    const fileName = Date.now() + ".mp4";
    sendVideo(fileName);
    console.log(contactInfo);
    // survey copy
    const surveyCopy = JSON.parse(JSON.stringify(formValues));
    delete surveyCopy['Type of issue'];
    delete surveyCopy['Solved or not'];
    const surveyCopyAnswers = Object.values(surveyCopy);
    const surveyCopyAnswersArray = []
    for(let i=0; i<surveyCopyAnswers.length; i++) {
      for(let j=0; j<surveyCopyAnswers[i].length; j++) {
        surveyCopyAnswersArray.push(surveyCopyAnswers[i][j]);
      } 
    }
    let data = {
      "employee_id": auth.user.employee_id,
      "call_timestamp": callStart.toString(),
      "duration": callEnd - callStart,
      "video_reference": fileName,
      "tags": surveyCopyAnswersArray,
      "user_phone": "55367748394",
      "call_reason": formValues['Type of issue'][0], // Type of issue: enviamos el primer valor
      "agent_name": auth.user.name,
      "successful": (formValues['Solved or not'][0] === "Solved") ? true : false, // Solved or not
      "supervisor_id": auth.user.assign_supervisor
    }
    
    // data = JSON.stringify(data);
    //Save new video
    console.log(data);
    axios.post('https://azul-api.ccmchallenges.com/videos/new-video', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res);
    });
    setCallStatus("waiting");
  }
  
  return (
    <Container id="home-dashboard">
      { videoStatus === "sent" ?
      (
      <Snackbar open={true} autoHideDuration={3000} onClose={() => setVideoStatus(null)}>
        <SecAlert severity="success" sx={{ width: '100%' }}>
          Video sent
        </SecAlert>
      </Snackbar>
      ) : <></> }
      {callStatus != "ended" ? (
        <div
          className="center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {!auth.isConnected ? (
            <div className="text">
              <Typography variant="h3" gutterBottom>
                Welcome to Amazon RSH, {auth.user.name} !
              </Typography>
              <img
                src={agentHome}
                alt="agent-home"
                style={{
                  padding: "5% 0px",
                }}
              />
              <Typography
                variant="h3"
                style={{
                  fontSize: "0.9rem",
                  color: "#828282",
                  fontStyle: "italic",
                }}
              >
                {random}
                <Button variant="contained" id="connect-button" onClick={connectCCP}>
                  Connect to CCP
                </Button> 
              </Typography>
            </div>
          ) : (
            <div className="text">
              <p>
                Do not refresh this page while recording.
              </p>
            </div>
          )}
        </div>) : (
          <div>
            <Survey status={status} closeTicket={closeTicket} />
          </div>
        )}
      </Container>
  );
}

export default HomeDashboard;
