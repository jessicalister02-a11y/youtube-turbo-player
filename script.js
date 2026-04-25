let player;
let apiReady = false;

// 1. Load the YouTube API Script dynamically to ensure it bypasses sandbox issues
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This runs when the API is ready
function onYouTubeIframeAPIReady() {
  console.log("YouTube API Ready");
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'dQw4w9WgXcQ', 
    playerVars: {
      'origin': window.location.origin, // Helps with CodePen security
      'enablejsapi': 1
    },
    events: {
      'onReady': () => { 
        apiReady = true; 
        console.log("Player is Ready");
      }
    }
  });
}

// 3. The loading function with a "Force" check
function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  
  if (!videoId) {
    alert("Please enter a valid YouTube URL");
    return;
  }

  // If the API player object exists, use it
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(videoId);
    // Apply speed after a tiny delay to let the video load
    setTimeout(() => setSpeed(document.getElementById('speedRange').value), 1000);
  } else {
    // FALLBACK: If the API is failing, we rebuild the player
    console.log("API not responding, attempting manual rebuild...");
    onYouTubeIframeAPIReady(); 
  }
}

function setSpeed(speed) {
  speed = parseFloat(speed);
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
    document.getElementById('speedRange').value = speed;
    document.getElementById('speedValue').innerText = speed.toFixed(2);
  } else {
    console.error("Player not ready to change speed yet.");
  }
}

function extractVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length == 11) ? match[2] : null;
}
