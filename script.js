let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'dQw4w9WgXcQ',
    events: {
      'onReady': () => console.log("Player Ready")
    }
  });
}

function setSpeed(speed) {
  speed = parseFloat(speed);
  
  // 1. Try the official way first (works up to 2x)
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
  }

  // 2. The "Turbo" Hack: Target the video element directly
  // This works if the browser allows cross-origin access (often blocked on live sites)
  try {
    const videoElement = document.querySelector('iframe').contentWindow.document.querySelector('video');
    if (videoElement) {
      videoElement.playbackRate = speed;
      console.log("Forced video element to:", speed);
    }
  } catch (e) {
    console.warn("Browser security blocked the 4x hack. Stick to 2x or use a Browser Extension.");
  }

  // Update UI regardless
  document.getElementById('speedValue').innerText = speed.toFixed(2);
}

function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  if (videoId) {
    player.loadVideoById(videoId);
  }
}

function extractVideoID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length == 11) ? match[2] : null;
}
