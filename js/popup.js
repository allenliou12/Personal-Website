$(document).ready(function () {
  // Initialize Magnific Popup for video links
  $('.popup-video').magnificPopup({
    type: 'iframe', // Use iframe for video
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/', // String that detects type of video
          id: 'v=', // String that splits ID and URL
          src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL for iframe
        },
        // Add more patterns for other video sources if needed
      },
      markup: '<div class="mfp-iframe-scaler">' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        '</div>',
      width: 1200, // Set to a larger value for testing
      height: 800 // Set to a larger value for testing
    },
    callbacks: {
      open: function () {
        // Increase background opacity when popup opens
        $('.mfp-bg').css('background', 'rgba(0, 0, 0, 0.9)'); // Set higher opacity
      },
      close: function () {
        // Reset background opacity when popup closes
        $('.mfp-bg').css('background', 'rgba(0, 0, 0, 0.7)'); // Reset to original opacity
      }
    }
  });
});