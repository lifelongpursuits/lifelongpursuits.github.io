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

// Duolingo Streak Functionality
function updateDuolingoStreak() {
    // Initial streak start date and base streak
    const initialStreakStartDate = new Date('2024-12-10');
    const initialStreak = 43;
    
    // Get current date in EST
    const now = new Date();
    const estOffset = -5; // EST offset from UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const today = new Date(utc + (3600000 * estOffset));
    
    // Set the date to the previous day if it's before 11:59 PM EST
    const comparisonDate = new Date(today);
    if (comparisonDate.getHours() < 23 || (comparisonDate.getHours() === 23 && comparisonDate.getMinutes() < 59)) {
        comparisonDate.setDate(comparisonDate.getDate() - 1);
    }
    
    // Calculate days since initial streak start
    const daysSinceStart = Math.floor((comparisonDate - initialStreakStartDate) / (1000 * 60 * 60 * 24));
    
    // Calculate current streak (start with 43, increment daily after 12/10/2024)
    const currentStreak = initialStreak + Math.max(0, daysSinceStart);
    
    // Create streak display element
    const streakElement = document.createElement('li');
    streakElement.classList.add('duolingo-streak-item');
    
    // Create image element with fallback
    const duolingoImg = new Image(40, 40);
    duolingoImg.src = 'images/icons8-duolingo-logo-32.png';
    duolingoImg.alt = 'Duolingo';
    duolingoImg.style.verticalAlign = 'middle';
    duolingoImg.style.marginRight = '5px';
    
    // Add error handling for image
    duolingoImg.onerror = function() {
        console.warn('Duolingo logo failed to load. Using text instead.');
        duolingoImg.style.display = 'none';
    };
    
    streakElement.innerHTML = `
        <a href="https://www.duolingo.com/profile/TheRealestAlive" target="_blank" class="icon brands fa-duolingo">
            ${duolingoImg.outerHTML}
            Duolingo Streak: ${currentStreak} days
        </a>
    `;
    
    // Find the social icons container
    const socialIconsContainer = document.querySelector('#footer .icons');
    
    if (socialIconsContainer) {
        // Remove any existing Duolingo streak element
        const existingStreakElement = socialIconsContainer.querySelector('.icon.brands.fa-duolingo');
        if (existingStreakElement) {
            existingStreakElement.remove();
        }
        
        // Insert the new streak element at the beginning of the social icons
        socialIconsContainer.insertBefore(streakElement, socialIconsContainer.firstChild);
    }
}

// Schedule updates at 11:59 PM EST
function scheduleStreakUpdate() {
    const now = new Date();
    const estOffset = -5; // EST offset from UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estNow = new Date(utc + (3600000 * estOffset));
    
    // Calculate next update time (11:59 PM EST)
    const nextUpdate = new Date(estNow);
    nextUpdate.setHours(23, 59, 0, 0);
    
    // If it's already past 11:59 PM, schedule for next day
    if (estNow > nextUpdate) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
    }
    
    const timeUntilNextUpdate = nextUpdate.getTime() - estNow.getTime();
    
    setTimeout(() => {
        updateDuolingoStreak();
        // Set up recurring daily update at 11:59 PM EST
        setInterval(updateDuolingoStreak, 24 * 60 * 60 * 1000);
    }, timeUntilNextUpdate);
}

// Run on page load and initialize scheduled updates
document.addEventListener('DOMContentLoaded', () => {
    updateDuolingoStreak();
    scheduleStreakUpdate();
});