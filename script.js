let player;
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');

// 1. This function is called automatically by the YouTube API script in the HTML
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'dQw4w9WgXcQ', // Initial placeholder video
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 2. Setup listeners once the player is ready
function onPlayerReady(event) {
  speedRange.addEventListener('input', (e) => {
    setSpeed(e.target.value);
  });
}

// 3. The core function to change speed
function setSpeed(speed) {
  speed = parseFloat(speed);
  
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
    
    // Update the UI
    speedRange.value = speed;
    speedValue.innerText = speed.toFixed(2);
    
    console.log("Speed set to: " + speed);
  }
}

// 4. Load a new video from the URL input
function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  
  if (videoId) {
    player.loadVideoById(videoId);
    // Brief timeout to ensure the new video is ready before applying speed
    setTimeout(() => {
      setSpeed(speedRange.value);
    }, 500);
  } else {
    alert("Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)");
  }
}

// 5. Helper to turn a full URL into a 11-character ID
function extractVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length == 11) ? match[2] : null;
}