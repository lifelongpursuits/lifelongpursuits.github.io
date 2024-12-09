/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);

// Background Audio Player
document.addEventListener('DOMContentLoaded', function() {
	// Wait a bit to ensure all DOM elements are loaded
	setTimeout(function() {
		var audio = document.getElementById('background-audio');
		
		// Verify audio element exists
		if (!audio) {
			console.error('Audio element not found. Please check your HTML.');
			return;
		}
		
		// Extract track title from the source
		var trackSource = audio.querySelector('source').src;
		var trackTitle = decodeURIComponent(trackSource.split('/').pop().replace('.mp3', '').replace(/-/g, ' '));
		
		// Create audio control container
		var audioContainer = document.createElement('div');
		audioContainer.style.display = 'flex';
		audioContainer.style.alignItems = 'center';
		audioContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
		audioContainer.style.borderRadius = '25px';
		audioContainer.style.padding = '15px 10px';
		audioContainer.style.margin = '40px 0 40px 150px';
		audioContainer.style.height = '30px';
		audioContainer.style.width = '315px';

		// Play/Pause Button
		var playPauseBtn = document.createElement('button');
		playPauseBtn.innerHTML = '▶️';
		playPauseBtn.style.background = 'none';
		playPauseBtn.style.border = 'none';
		playPauseBtn.style.color = 'white';
		playPauseBtn.style.cursor = 'pointer';
		playPauseBtn.style.marginRight = '5px';
		playPauseBtn.style.fontSize = '16px';
		playPauseBtn.style.padding = '0';
		playPauseBtn.style.lineHeight = '1';

		// Volume Slider
		var volumeSlider = document.createElement('input');
		volumeSlider.type = 'range';
		volumeSlider.min = '0';
		volumeSlider.max = '1';
		volumeSlider.step = '0.1';
		volumeSlider.value = '0.5';
		volumeSlider.style.width = '80px';
		volumeSlider.style.marginRight = '5px';
		volumeSlider.style.height = '10px';

		// Track Title
		var trackTitleElement = document.createElement('span');
		trackTitleElement.textContent = trackTitle;
		trackTitleElement.style.color = 'white';
		trackTitleElement.style.fontSize = '12px';
		trackTitleElement.style.marginLeft = '5px';
		trackTitleElement.style.whiteSpace = 'nowrap';
		trackTitleElement.style.overflow = 'hidden';
		trackTitleElement.style.textOverflow = 'ellipsis';
		trackTitleElement.style.maxWidth = '200px';

		// Append controls
		audioContainer.appendChild(playPauseBtn);
		audioContainer.appendChild(volumeSlider);
		audioContainer.appendChild(trackTitleElement);
		
		// Insert controls next to the audio element
		if (audio.parentNode) {
			audio.parentNode.insertBefore(audioContainer, audio.nextSibling);
		}

		// Initial setup
		audio.volume = 0.5;
		audio.loop = true;

		// Play on load with user interaction
		playPauseBtn.addEventListener('click', function() {
			try {
				if (audio.paused) {
					audio.play().then(() => {
						playPauseBtn.innerHTML = '⏸️';
					}).catch(e => {
						console.error('Autoplay was prevented:', e);
						alert('Please interact with the page to play audio');
					});
				} else {
					audio.pause();
					playPauseBtn.innerHTML = '▶️';
				}
			} catch (error) {
				console.error('Error toggling audio:', error);
			}
		});

		// Volume control
		volumeSlider.addEventListener('input', function() {
			audio.volume = this.value;
		});

		// Optional: Automatically try to play, but be prepared for autoplay restrictions
		audio.play().catch(e => {
			console.log('Autoplay was prevented, waiting for user interaction');
			playPauseBtn.innerHTML = '▶️';
		});
	}, 500);  // 500ms delay to ensure DOM is fully loaded
});