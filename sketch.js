let classifier;
let modelURL = './model/';

function setup() {
}

function draw() {
  drawCanvas()
}

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json')
}


/**
 * ML5 related section
 *
**/

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  
  // Store the label and classify again!
  label = results[0].label;
  console.log(label)
  if(label === 'honey') {
    window.location.href = 'https://chaosbohne.github.io/honey/sub/game/index.html'
  }
}

/**
 * Camera related content section
 *
**/
var video
var canvasWidth
var canvasHeight
var isCanvasCreated = false

// Called when start video button is clicked
function startScan() {
  // Hide button in view when clicked
  document.getElementById("scanBtn").style.display = "none"
  // Find all media devices and call function "gotDevices"
  navigator.mediaDevices.enumerateDevices().then(gotDevices); 
}

// Draw video to canvas
function drawCanvas() {
  if(video && video.loadedmetadata) {   
    if(isCanvasCreated === false) {
      // Ratio of video stream
      const videoRatio = video.width / video.height
      // Total width of canvas
      const canvasContainer = document.getElementById("canvasContainer").clientWidth
      
      // Width of canvas, bit less than total width
      canvasWidth = canvasContainer - 30
      // Height of canvas
      canvasHeight = canvasWidth / videoRatio
      
      // Create canvas
      const canvas = createCanvas(canvasWidth, canvasHeight)
      canvas.parent('canvasContainer');      
      
      isCanvasCreated = true
    }
    
    var capture = video.get(0, 0, video.width, video.height)
    image(capture, 0, 0, canvasWidth, canvasHeight)
    classifyVideo()
  }  
}


// Get device (back camera) out of multiple devices
function getDeviceToUse(devices) {
  var device = null
  
  if(devices.length === 1) {
    device = devices[0]
  }else {
    device = devices.filter(device => device.label.includes('back')).shift()
    
    if(device == null) {
      device = devices.pop()
    }
  }
  
  return device
}

// Example to get phone camera https://editor.p5js.org/codingtrain/sketches/JjRoa1lWO
function gotDevices(deviceInfos) {
  // List of devs
  const devices = []
  
  // Get all video devices
  for (let i = 0; i < deviceInfos.length; i++) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind == 'videoinput') {
      devices.push({
        label: deviceInfo.label,
        id: deviceInfo.deviceId
      });
    }
  }
  
  // Get one device (back camera) out of all devices
  var device = getDeviceToUse(devices)
  
  var constraints
  if(device.id) {
    constraints = {
      audio: false,
      video: {
        deviceId: {
          exact: device.id
        }
      }
    }    
  }else if(device.groupId){
    constraints = {
      audio: false,
      video: {
        groupId: {
          exact: device.groupId
        }
      }
    }      
  }
  

  
  video = createCapture(constraints);
  video.hide()
}
