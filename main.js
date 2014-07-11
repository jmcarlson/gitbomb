//
// Design Approach:
// * Revealing Module Pattern
// * Immediately-invoked function express (IIFE)
//
var MoonGame = (function() {

	// Define constants
	var NUM_BIRDS = 8;
	var MAX_TOP = 60;
	var MAX_LEFT = 90;

	// =======================================
	// Bird constructor/class
	// =======================================
	var Bird = function() {

	}
	Bird.prototype.create = function() {
		this.el = $('<i class="bird icon icon-twitter-bird"></i>');
		this.el.css({
			top: Math.random() * MAX_TOP + '%',
			left: Math.random() * MAX_LEFT + '%'
		})
		// console.log('Bird created at ' + this.el.css('top') + ' and ' + this.el.css('left'));
		return this.el
	}
	

	// =======================================
	// Flock constructor/class
	// =======================================
	var Flock = function(penguin) {
		this.penguin = penguin;
		this.birds = [];
	}
	Flock.prototype.create = function() {
		this.el = $('<div class="flock"></div>');
		this.el.append(this.penguin.create());
		// this.el.css('bottom', this.birds.length * 50)
		return this.el;
	}
	Flock.prototype.addClickHandler = function(bird) {
		var self = this;
		bird.el.on('click', function(e) {
			var self2 = this;
			$(this).attr('class', 'bird icon icon-github');
			// self.birds.push(bird);
			// self.create();

			// console.log('Pos(x,y): ' + e.pageX + ', ' + e.pageY);

			var intervalId = setInterval(function() {
				$(self2).css('top',parseInt($(self2).css('top')) + 2);
				if(parseInt($(self2).css('top')) > 450) {
					$(self2).css('opacity', '0.6');
					clearInterval(intervalId); 
				}
			},30);

		})
	}


	// =======================================
	// penguin constructor/class
	// =======================================
	var Penguin = function() {

	}
	Penguin.prototype.create = function() {
		this.el = $('<div id="penguin" class="icon icon-plancast"></div>');
		return this.el;
	}


	// =======================================
	// Entry point (no classes below)
	// =======================================

	// Define properties
	var birds = [];
	var flock = null;

	var init = function() {


		var penguin = new Penguin();
		flock = new Flock(penguin);
		$('.sky').append(flock.create());

		for (var i = 0; i < NUM_BIRDS; i++) {
			// console.log('Starting MoonGame');
			var twitter = new Bird();
			$('.sky').append(twitter.create());
			birds.push(twitter);
			flock.addClickHandler(twitter);
		};

		
		// birds.push(twitter);
		console.log(birds);
		// flock.addClickHandler(birds);

	}

	var move = function() {
		// Store pengium DOM element in var
		var object = $(document).find('#penguin');
		// store position

		var intervalId = setInterval(function() {
			object.css('left',parseInt(object.css('left')) + 2);
			if(parseInt(object.css('left')) > 900) {
				clearInterval(intervalId); 
			}
		},20);
	}

	// Return object literal, 'revealing' methods & properties
	// All others will be internal
	// Format is <public name>: <private name>
	return {
		init: init,
		move: move
	};

})();




$(document).on('ready', function() {
  
	MoonGame.init();
	MoonGame.move();

});