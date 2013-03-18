/*
*			Case show for Summers Advertising by Yuzhe
*/

var gapIndex = 0.2;

function caseShow() {				

	imageFolder = "images_cases/" + data['category'].title + '/';
	this.min = 0;
	this.max = data['articles'].length;

	// this.currentImg = document.getElementById('mainImg');
	// this.currentImg = document.querySelectorAll('.mainImg')[0];	
	this.main = document.getElementById('tv');
	
	this.showArea = document.getElementById("tv");
	
	var hashIndex = window.location.hash.substr(1);								
	switch( hashIndex ) {
		case 'first':
			this.index = this.min;
			break;
		case 'last':
			this.index = this.max -1;
			break;
		default:			
			this.index = hashIndex && data.articles[hashIndex] != undefined ? hashIndex : 0;
			break;
	}
	
	// auto scroll to target area if we got any hash
	if ( hashIndex != undefined ) {	
		window.scrollTo( 0, document.querySelectorAll('#bar1')[0].offsetParent.offsetTop );
	}
	
	this.inAction = false;
	
	this.category = data['category'];	
	
	var self = this;
	
	this.imageFolder = "images_cases/" + this.category.title + '/';	
	
	this.slideInit();
		
	this.currentBox = new caseBox();	
	this.currentBox.build( data.articles[ this.index ] );
	this.currentBox.show();
	
	this.nextBox = new caseBox();
	var nextArticle = (data.articles[ parseInt(this.index) +1 ] == undefined ? { src: self.getSwitchImg() } : data.articles[ parseInt(this.index) +1 ] );
	this.nextBox.build( nextArticle );
	this.nextBox.rightReady();
	
	this.prevBox = new caseBox();
	var prevArticle = (data.articles[ this.index -1 ] == undefined ? { src: self.getSwitchImg() } : data.articles[ this.index -1 ] );
	this.prevBox.build( prevArticle);
	this.prevBox.leftReady();
	
	self.loadSnap();
	
	// initialize event listeners
	
	if (document.getElementById("next").addEventListener == undefined) {		
		// for foolish IE8
		document.getElementById("next").attachEvent("onclick", function(e) {
			self.next();
		})
		document.getElementById("prev").attachEvent("onclick", function(e) {
			self.previous();
		})
	} else {			
		document.getElementById("next").addEventListener("click", function(e) {
			e.preventDefault();
			self.next();
		})
		document.getElementById("prev").addEventListener("click", function(e) {
			e.preventDefault();
			self.previous();
		})
	}
	
	function resizeHandler(e) {		
		for( var i in document.querySelectorAll('#stage') ) {
			var element = document.querySelectorAll('#stage')[i];
			
			if (element.style == undefined) {
				continue;
			}
			element.style.width = self.showArea.offsetWidth + "px";
		}
		
		document.getElementById("tv-row").style.margin = "0 0 0 -" + self.showArea.offsetWidth + "px";
		self.currentBox.show();
		self.nextBox.rightReady();
		self.prevBox.leftReady();
	}

	// resize box element
	window.onresize = function( e ) {
		resizeHandler(e);
	}
	var event;
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent("resize", true, true);
	} else {
		event = document.createEventObject();
		event.eventType = "resize";
	}
	
	event.eventName = "resize";
	event.memo = { };
	
	if (document.createEvent) {
		window.dispatchEvent(event);
	} else if (window.fireEvent) {
		window.fireEvent("on" + event.eventType, event);
	} else {
		resizeHandler();
	}
}

caseShow.prototype.switchImg = function(index) {

	var article = data['articles'][index];
	
	this.currentImg.src = this.imageFolder + article.src;
	this.loadSnap();
	
	document.getElementById("title").innerHTML = article.title;
	if (document.getElementById("content")) {			
		document.getElementById("siteName").innerHTML = article.title;
		document.getElementById("content").innerHTML = article.content;
		document.getElementById("siteLink").setAttribute('href', article.link);
	} else {
		document.getElementById("viewLink").setAttribute('href', this.imageFolder  + article.src.split('.')[0]+ '_org.jpg');
	}
	
	// switch window hash
	window.location.hash = '#' + index;
}

caseShow.prototype.switchCategory = function( code ) {
	
	var reg = new RegExp( '(\\s|^)selectedCategory(\\s|$)' );
	var elements = document.querySelectorAll('.selectedCategory');
	for( var i = 0; i< elements.length; i ++) {					
		elements[ i ].className = elements[ i ].className.replace(reg, ' ');
	}
}

caseShow.prototype.previous = function() {
		
	var self = this;

	// this.index = this.index ? this.index -1 : this.max -1;			
	this.index = ( this.index - 1 ) < this.min ?  ( window.location.href =  this.category.prev + '.html#last' ) : this.index -1;			
	this.slideTo( Math.ceil( document.getElementById("tv").offsetWidth * ( 1 + gapIndex ) ), function() {		
		var prevBox = new caseBox();			
		var prevArticle = (data.articles[ self.index -1 ] == undefined ? { src: self.getSwitchImg() } : data.articles[ self.index -1 ] );
		
		prevBox.build( prevArticle );
			
		self.nextBox.remove();
		self.nextBox = self.currentBox.rightReady();
		self.currentBox = self.prevBox.show();
		self.prevBox = prevBox.leftReady();
		
		self.loadSnap();
	}  );
	
	// preload three images 
	for ( var i = self.index; i > self.index -3 && i > self.min; i-- ) {
		var preloadElement = document.createElement("img");
		if (data['articles'][i].img != undefined) {
			continue;
		}
		preloadElement.setAttribute('src', imageFolder + data['articles'][i].src);
		data['articles'][i].img = preloadElement;
	}
}

caseShow.prototype.next = function() {
	
	var self = this;
	
	// this.index = ( this.index + 1 ) % this.max;			
	this.index = ( parseInt(self.index) +1 ) >= this.max ? ( window.location.href =  this.category.next + '.html#first' ) : parseInt(self.index) +1;			
	this.slideTo( -1 * Math.ceil( document.getElementById("tv").offsetWidth * ( 1 + gapIndex ) ), function() {		
		var nextBox = new caseBox();	
		
		
		var nextArticle = (data.articles[ parseInt(self.index) +1 ] == undefined ? { src: self.getSwitchImg() } : data.articles[ parseInt(self.index) +1 ] );
	
		nextBox.build( nextArticle );
		self.prevBox.remove();
		self.prevBox = self.currentBox.leftReady();
		self.currentBox = self.nextBox.show();
		self.nextBox = nextBox.rightReady();
		
		self.loadSnap();
	} );
	
	// preload three images 
	for ( var i = self.index; i < self.index +3 && i < self.max; i++ ) {
		var preloadElement = document.createElement("img");
		if (data['articles'][i].img != undefined) {
			continue;
		}
		preloadElement.setAttribute('src', imageFolder + data['articles'][i].src);
		data['articles'][i].img = preloadElement;
	}
	
}


caseShow.prototype.loadSnap = function() {
	var previousImg = document.getElementById("previousImg");
	var nextImg = document.getElementById("nextImg");	
		
	if (( this.index - 1 ) < this.min) {		
		previousImg.src =  'images/' + this.category.prev + '.png';
	} else {		
		var previousIndex =  this.index ? this.index -1 : this.max -1;
		previousImg.src = this.imageFolder  + data['articles'][previousIndex].src.split('.')[0]+ '_snap.png';
	}
	
	if (( parseInt(this.index) +1 + 1 ) >= this.max) {		
		nextImg.src = 'images/' + this.category.next + '.png';
	} else {		
		var nextIndex = ( parseInt(this.index) +1 ) % this.max;			
		nextImg.src = this.imageFolder  + data['articles'][nextIndex].src.split('.')[0]+ '_snap.png';
	}
	
}

caseShow.prototype.slideInit = function() {

	var self = this;
	self.recording = false;
	self.shift_x = 0;
	self.main.style.position = 'relative';
	self.touchMode = ( typeof( this.showArea.ontouchstart ) != 'undefined' );

	function getClientX( e ) {
		
		if (self.touchMode) {
			return e.touches[0].clientX;
		} else {
			return e.clientX;
		}
		
	}
	
	function getScreenY( e ) {
		
		if (self.touchMode) {
			return e.touches[0].screenY;
		}
		
		return false;
		
	}

	function eventStart(e) {
		e.preventDefault != undefined ? e.preventDefault() : e.returnValue = false;
				
		self.recording = true;		
		self.start_x = getClientX(e);
		self.start_y = getScreenY(e);
		
		if ( this.movenId != undefined ) { clearInterval(self.movenId); }
	}
	
	function draging(e) {
		
		e.preventDefault != undefined ? e.preventDefault() : e.returnValue = false;
		if (!self.recording) {
			return;
		}
		self.shift_x = getClientX(e) - self.start_x;
		
		self.currentBox.shift(self.shift_x);
		if ( self.nextBox != null ) self.nextBox.shift(self.shift_x);
		if ( self.prevBox != null ) self.prevBox.shift(self.shift_x);		
		
		if (self.touchMode) {
			self.shift_y = getScreenY(e) - self.start_y;
			if ( Math.abs(self.shift_y) > 30 ) { 
				self.shift_y = self.shift_y > self.currentBox.offsetHeight ? self.currentBox.offsetHeigh : self.shift_y ;
				window.scrollBy( 0, ( ( self.shift_y -30) * -1  ) / 5 ); 
			}
		}
	}
	
	function eventEnd(e) {
		
		e.preventDefault != undefined ? e.preventDefault() : e.returnValue = false;
		
		self.recording = false;
		
		if ( self.shift_x == 0 ) {
			return;
		}		
				
		// finishing image movement
		// return image position if drag distance not reached		
		
		if ( self.shift_x > document.getElementById('tv').offsetWidth / 5 ) {
			self.previous();			
		} else if (self.shift_x < ( -1 * document.getElementById('tv').offsetWidth / 5 ) ) {			
			self.next();										
		} else {						
			self.slideTo(0);						
		}
		
		
		// or slide to next image or previous image
	}
		// detect event listeners
	if ( self.touchMode ) {	
		this.main.addEventListener('touchstart', eventStart);	
		this.main.addEventListener('touchmove', draging);	
		this.main.addEventListener('touchend', eventEnd);	
	} else {
		this.main.addEventListener == undefined ? this.main.attachEvent('onmousedown', eventStart) : this.main.addEventListener('mousedown', eventStart);	
		this.main.addEventListener == undefined ? this.main.attachEvent('onmousemove', draging) : this.main.addEventListener('mousemove', draging);	
		this.main.addEventListener == undefined ? this.main.attachEvent('onmouseup', eventEnd) : this.main.addEventListener('mouseup', eventEnd);	
	}
	
}

caseShow.prototype.getSwitchImg = function() {

	var longMode = ( document.querySelector('.mainImg').width < document.querySelector('.mainImg').height );
	
	if ( this.index <= 0) {
		
		if (longMode) {
			return 'images/previmg2.png';
		} else {
			return 'images/previmg.png';
		}
				
	} else {
	
		if (longMode) {
			return 'images/nextimg2.png';
		} else {
			return 'images/nextimg.png';
		}
	
	}
	
}

caseShow.prototype.slideTo = function( dest, callBack ) {	
		var self = this;
		
		if (self.inAction) {
			return;
		}
		self.inAction = true;
	
		var duration = 250;
		var step = 15;
		var stage = duration/step;
		var distance = 0;
		var move = ( dest - self.shift_x ) / stage;
		
		self.movenId = setInterval(function() {
			if ( this.currentStage == undefined ) {
				this.currentStage = 0;
			} else if ( this.currentStage >= duration ) {
				this.currentStage = 0;				
				self.inAction = false;
				
				self.shift_x  = 0;
				self.currentBox.shift(dest);
				if ( self.nextBox != null ) self.nextBox.shift(dest);
				if ( self.prevBox != null ) self.prevBox.shift(dest);
				
				window.location.hash = '#' + self.index;
								
				clearInterval(self.movenId);
				
				if ( typeof( callBack ) == 'function' ) {
					callBack();
				}
				
				return;
			}
			distance = self.shift_x +  ( move * ( this.currentStage/step ) );				
			
			self.currentBox.shift(distance);
			if ( self.nextBox != null ) self.nextBox.shift(distance);
			if ( self.prevBox != null ) self.prevBox.shift(distance);
			
			this.currentStage += step;
		}, step);		
}


function caseBox() {
	
	var self = this;	
	this.basePosition = 0;
	
	
}

caseBox.prototype.build = function( article ) {
		
	var self = this;
	var origin = document.getElementById("stage");
	
	var clone = origin.cloneNode( true );
	
	self.box = clone;
	
	if ( article == undefined) { 
		article = {};
	}
	
	for( var index in self.box.childNodes ) {
		var node = self.box.childNodes[index];
		// separate each element
		if ( node == undefined || node.nodeName == '#text' ) {
			continue;
		}
		
		if ( /box/.test(node.className) ) {
			// main box container
			var image = node.querySelectorAll('.mainImg')[0];
			if ( article.title == undefined ) {
				image.setAttribute('src', article.src);
			} else {
				image.setAttribute('src', imageFolder + article.src);
			}
			
		} else if ( /explain/.test(node.className) ) {
			// if article doesn't has title, remove explain section
			if ( article.title == undefined ) {
				self.box.removeChild( node );
			}
			
			// explain the text area			
			for( var e_index =0 ; e_index < node.childNodes.length; e_index ++ ) {
				var explainNode = node.childNodes[ e_index ];

				if ( /title/.test(explainNode.className) ) {
					explainNode.innerHTML = article.title;
				} else if ( /content/.test(explainNode.className) ) {
					
					explainNode.innerHTML = article.content;
				} else if ( /link/.test(explainNode.className) ) {
					var link = explainNode.querySelectorAll('.siteLink')[0];
					var siteName = link.querySelectorAll('.siteName')[0];
					
					link.setAttribute('href', article.link);
					siteName.innerHTML = article.title;
				} else if ( /view/.test(explainNode.className) ) {
					var link = explainNode.querySelectorAll('.viewLink')[0];
					
					link.setAttribute('href', imageFolder + article.src.split('.')[0]+ '_org.jpg');
				}
				
			}
			
		}
		
	}	
	
}

caseBox.prototype.shift = function( distance ) {
	this.box.style.left = ( this.basePosition + distance) + "px";
	return this;
}

caseBox.prototype.remove = function() {
	this.box.parentNode.removeChild(this.box);
}

caseBox.prototype.leftReady = function() {	
	var tvRow = document.getElementById("tv-row");
	this.basePosition = (document.getElementById('tv').offsetWidth * gapIndex) * -1;
	
	this.box.style.left = this.basePosition + 'px';
	tvRow.insertBefore(this.box, tvRow.childNodes[ 0 ]);
	
	return this;
}

caseBox.prototype.rightReady = function() {
	var tvRow = document.getElementById("tv-row");
	this.basePosition = (document.getElementById('tv').offsetWidth * gapIndex);
	
	this.box.style.left = this.basePosition + 'px';
	tvRow.insertBefore(this.box, tvRow.childNodes[ tvRow.childNodes.length -1].nextSibling);
	
	return this;
}

caseBox.prototype.show = function() {
	var tvRow = document.getElementById("tv-row");
	this.basePosition = 0;
	this.box.style.left = '0px';
	
	var index = tvRow.childNodes.length <= 0 ? 1 : tvRow.childNodes.length;
	
	tvRow.insertBefore( this.box, ( tvRow.childNodes[ tvRow.childNodes.length -1] == undefined ? null :  tvRow.childNodes[ tvRow.childNodes.length -1]) );
	
	return this;
}

