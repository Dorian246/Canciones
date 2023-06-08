document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    
    var titulo = document.getElementById('titulo').value;
    var artista = document.getElementById('artista').value;
    
    
    buscarCanciones(titulo, artista);
  });
  
  function buscarCanciones(titulo, artista) {
    
    var apiKey = '11c59c9bdee3d3af5a8c7370cf5471a8'; 
    var apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + encodeURIComponent(titulo) + '&artist=' + encodeURIComponent(artista) + '&api_key=' + apiKey + '&format=json';
    
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
       
        mostrarVideos(data.results.trackmatches.track);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function mostrarVideos(tracks) {
    var videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    
    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      var videoItem = document.createElement('div');
      videoItem.classList.add('video-item');
      
      var videoEmbed = document.createElement('iframe');
      videoEmbed.src = 'https://www.youtube.com/embed/' + track.videoid;
      videoEmbed.allow = 'autoplay; encrypted-media';
      videoEmbed.allowfullscreen = true;
      
      videoItem.appendChild(videoEmbed);
      videosContainer.appendChild(videoItem);
    }
  }
    
function loadClient() {
  gapi.load('client', initClient);
}


function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyAjsm_rxEOqdEbaCxLYXBn4nM2VAb-BHkk',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  }).then(function() {

  });
}
window.onload = loadClient;