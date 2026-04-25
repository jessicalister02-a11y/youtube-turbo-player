let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'dQw4w9WgXcQ', // Default video
    playerVars: {
      'rel': 0,
      'modestbranding': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  const speedRange = document.getElementById('speedRange');
  speedRange.addEventListener('input', (e) => {
    setSpeed(e.target.value);
  });
}

function setSpeed(speed) {
  speed = parseFloat(speed);
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
    
    // Update the UI
    document.getElementById('speedRange').value = speed;
    document.getElementById('speedValue').innerText = speed.toFixed(2);
    
    console.log("Speed requested: " + speed);
  }
}

function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  
  if (videoId) {
    player.loadVideoById(videoId);
    // Give the video a second to load before forcing the speed
    setTimeout(() => {
      const currentSpeed = document.getElementById('speedRange').value;
      setSpeed(currentSpeed);
    }, 1000);
  } else {
    alert("Please enter a valid YouTube URL");
  }
}

function extractVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length == 11) ? match[2] : null;
}
