function setup() {
    try{
        noCanvas()
    }catch(e) {}

    beeSetup()
}

function draw() {
}



/**
 * Bee related content section
 *
**/
var beeCounter = 5

function beeSetup() {
  setInterval(moveBee, 3000, 'bee1');
  setInterval(moveBee, 3500, 'bee2');
  setInterval(moveBee, 4000, 'bee3');  
  setInterval(moveBee, 4500, 'bee4');
  setInterval(moveBee, 5000, 'bee5'); 
}

function beeClicked(img) {
  beeCounter = beeCounter - 1;
  img.parentNode.removeChild(img);
  
  var txtElement = document.getElementById('beeText')
  if(beeCounter === 4) {
    txtElement.innerHTML = 'Eine berühmte Honigbiene, aber noch 559 andere bekannte Arten.'
  }else if(beeCounter === 3) {
    txtElement.innerHTML = 'Ein Glas Honig, aber 200 dafür benötigte Bienen.'
  }else if(beeCounter === 2) {
    txtElement.innerHTML = 'Eine Biene, aber 10 Einsätze pro Tag.'
  }else if(beeCounter === 1) {
    txtElement.innerHTML = 'Die Biene ist für unsere Ernährung das dritthäufigste Nutztier.'
  }else {
    txtElement.innerHTML = 'Na, hast du schonmal eine richtige Biene gesehen?'
    document.getElementById('beeCounter').style.display = "none"
  }
  
  var counterElement = document.getElementById('beeCounter')
  counterElement.innerHTML = beeCounter
  
}

function moveBee(beeId) {
  var img = document.getElementById(beeId)
  var imgWidth = 40 + 5
  if(img) {
    var maxLeft = windowWidth - imgWidth
    var maxHeight = windowHeight - imgWidth
    var minHeight = imgWidth
  
    var leftPos = Math.floor(Math.random() * (maxLeft))
    var topPos = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
  
    img.style.left = leftPos + 'px'
    img.style.top = topPos + 'px'
  }
}