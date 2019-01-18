
class ParticleSketch {
	//constructor gets width and height parameters as well as setting other attributes.
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.particles = [];
		this.attractors = [];
		this.colorSlider;
		this.sizeSlider;

		//initial setup --> these are for setting up directly from calling our class ParticleSketch
		this.sketchBlendMode = ADD;
		this.sketchImageMode = CENTER;
		this.sketchFrameRate = 60;
		this.sketchBackground = 0;
		this.setup();
	}
	
	//Using this method to get the length of the particles
	getParticlesLength() {
		return this.particles.length;
	}
	
	//Using this method to get the length of the attractors
	getAttractorsLength() {
		return this.attractors.length;
	}
	
	//Blends the pixels in the display window according to the defined mode.
	setSketchBlendMode(sketchBlendMode) {
		this.sketchBlendMode = sketchBlendMode;
		blendMode(sketchBlendMode);
		return this;
	}
	//Set image mode. Modifies the location from which images are drawn by changing the way in which parameters given to image() are interpreted
	setSketchImageMode(sketchImageMode) {
		this.sketchImageMode = sketchImageMode;
		imageMode(sketchImageMode);
		return this;
	}
	//Specifies the number of frames to be displayed every second.
	setSketchFrameRate(sketchFrameRate) {
		this.sketchFrameRate = sketchFrameRate;
		frameRate(sketchFrameRate);
		return this;
	}
	//Sets the color used for the background of the p5.js canvas.
	setSketchBackground(sketchBackground) {
		this.sketchBackground = sketchBackground;
		background(sketchBackground);
		return this;
	}
	//Adds particle to the selected point defined by global variables mouseX, mouseY and the attributes of Particle which are vx and vy
	addParticle(mouseX, mouseY, vx = 0, vy = 0) {
		var particle = new Particle(mouseX, mouseY, vx, vy)
		particle.createParticleImage(this.colorSlider.value(), this.sizeSlider.value());
		this.particles.push(particle);
		return particle;
	}
	//Adds attractors to the selected point defined by global variables mouseX, mouseY of attractor class
	addAttractor(mouseX, mouseY) {
		var attractor = new Attractor(mouseX, mouseY);
		this.attractors.push(attractor);
		return attractor;
	}
	//Sets velocity of particles to random number (-5,5)
	setParticlesVelocity() {
		for (var particle of this.particles) {
			particle.velocity.x = random(-5, 5);
			particle.velocity.y = random(-5, 5);
		}
	}
	//Clears all particles from canvas.
	clearParticles() {
		this.particles = [];
		return this;
	}
	//Clears all attractors from canvas
	clearAttractors() {
		this.attractors = [];
		return this;
	}
  //function to set up the essential features such as canvas 
	setup() {
		createCanvas(this.width, this.height);
		blendMode(this.sketchBlendMode);
		imageMode(this.sketchImageMode);
		frameRate(this.sketchFrameRate);
		background(this.sketchBackground);
		this.colorSlider = this.sliderSetup(180, 10);
		this.sizeSlider = this.sliderSetup(180, 50);
		return this;
	}
	//drawing method to draw every time with the correct number of the particles and the attractors in the list.
	//it also displays the current frame rate and the current attractor/particle count
	draw() {
		//clearing the canvas every time is very important for having a active frame rate. 
		clear();
		this.setSketchBackground(this.sketchBackground);
		this.infoDisplay();
		for (var i = 0; i < this.getParticlesLength(); i++) {
			for (var j = 0; j < this.getAttractorsLength(); j++) {
				var force = this.particles[i].attract(this.attractors[j]);
				this.particles[i].applyForce(force);
			}
			this.particles[i].update();
			this.particles[i].display();
		}
		for (var i = 0; i < this.getAttractorsLength(); i++) {
			this.attractors[i].display();
		}
	}
	//Text setting/editing method specially created for the convinient adjustments of infoDisplay method. 
	setText(horizontalAlignment, verticalAligment, content, x, y, fontFamily = 'Monospace', fontSize = 24, fontColor = 'white') {
		textFont(fontFamily);
		textSize(fontSize);
		fill(fontColor);
		textAlign(horizontalAlignment, verticalAligment);
		text(content, x, y);
	}
	//method to display the main indicators to the screen, such as frame rate, attractor and particle count and the slider values.
	infoDisplay() {
		if (frameCount % 10 == 0) {
			this.SketchFrameRate = frameRate();
		}
		this.setText(RIGHT, BOTTOM, str(int(this.SketchFrameRate)) + " fps", this.width, this.height);
		this.setText(LEFT, BOTTOM, "Attractor : " + str(this.getAttractorsLength()), 0, this.height);
		this.setText(CENTER, BOTTOM, "Particle : " + str(this.getParticlesLength()), this.width / 2, this.height);
		this.setText(LEFT, CENTER, "Color : " + str(this.colorSlider.value()), 10, 20);
		this.setText(LEFT, CENTER, "Size  : " + str(this.sizeSlider.value()), 10, 60);
	}
	//method to setup the slider with initial values.
	sliderSetup(x, y, min = 0, max = 1, defaultValue = 0.8, step = 0.1) {
		var slider = createSlider(min, max, defaultValue, step);
		slider.position(x, y);
		return slider;
	}

}


//particle class
class Particle {
	//Constructor is getting the x, y, velocityX, velocityY as the parameters. using x and y to create location vector.
	constructor(x, y, velocityX, velocityY) {
		this.x = x;
		this.y = y;
		this.vx = velocityX;
		this.vy = velocityY;
		this.mass = 1.0;
		this.friction = 0.0;

		this.location = createVector(x, y);
		this.velocity = createVector(5.0, 0.0);
		this.accelaration = createVector(velocityX, velocityY);
		this.img;
	}
	//method to update the velocity of the function in order to use it in the draw function to draw appropraitly 
	update() {
		this.velocity.add(this.accelaration);
		this.velocity.mult(1.0 - this.friction);
		this.location.add(this.velocity);
		this.accelaration.set(0.0, 0.0);
	}
	//method to display the image, locationx and locationy attributes of the particle 
	display() {
		image(this.img, this.location.x, this.location.y);
	}
	//Defining the attraction to the particle once it encounter with the attractor
	attract(attractor) {
		var force = p5.Vector.sub(attractor.location, this.location);
		var distance = force.mag();
		distance = constrain(distance, 20.0, 200.0);
		force.normalize();
		var strength = (1.0 * this.mass * attractor.mass) / pow(distance, 2.0);
		force.mult(strength);
		return force;
	}
	//Setting/defining the amount of force that will be applied to the particle related to its attributes of mass and acceleration.
	applyForce(force) {
		var f = p5.Vector.div(force, this.mass);
		this.accelaration.add(f);
	}
	//method to re-adjust the variables regarding to their coordination uncertainites or inflations. 
	wallThrough() {
		if (this.location.x > width) {
			this.location.x = 0;
		}
		if (this.location.x < 0) {
			this.location.x = width;
		}
		if (this.location.y > height) {
			this.location.y = 0;
		}
		if (this.location.y < 0) {
			this.location.y = height;
		}
	}
	//method to Change the HSV colors to RGB color type.
	hsv2rgb(_h, _s, _v) {
		var h, s, v = _h,
			_s, _v;
		var c = v * s;
		var h = (h % 360) / 60;
		var x = c * (1 - abs(h % 2 - 1));
		var co;
		if (h >= 0 && h < 1) {
			co = createVector(c, x, 0);
		} else if (h >= 1 && h < 2) {
			co = (createVector(1, 1, 1).mult(v - c)).add(createVector(x, c, 0));
		} else if (h >= 2 && h < 3) {
			co = (createVector(1, 1, 1).mult(v - c)).add(createVector(0, c, x));
		} else if (h >= 3 && h < 4) {
			co = (createVector(1, 1, 1).mult(v - c)).add(createVector(0, x, c));
		} else if (h >= 4 && h < 5) {
			co = (createVector(1, 1, 1).mult(v - c)).add(createVector(x, 0, c));
		} else if (h >= 5 && h < 6) {
			co = (createVector(1, 1, 1).mult(v - c)).add(createVector(c, 0, x));
		}
		return co;
	}
	//Creating the image of the particle by getting two parameters which comes from the DOM slider function.
	createParticleImage(colorSliderValue, sizeSliderValue) {
		var side = 300;
		var center = 150;

		this.img = createImage(side, side);

		var num = pow(10, 1.8);

		var h = frameCount;
		var s = colorSliderValue;
		var v = sizeSliderValue;
		var c = v * s;
		var h = (h % 360) / 60;
		var x = c * (1 - abs(h % 2 - 1));
		var co;
		if (h >= 0 && h < 1) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(c, x, 0));
		} else if (h >= 1 && h < 2) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(x, c, 0));
		} else if (h >= 2 && h < 3) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(0, c, x));
		} else if (h >= 3 && h < 4) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(0, x, c));
		} else if (h >= 4 && h < 5) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(x, 0, c));
		} else if (h >= 5 && h < 6) {
			co = createVector(1, 1, 1).mult(v - c).add(createVector(c, 0, x));
		}

		var Cr = 255 * co.x;
		var Cg = 255 * co.y;
		var Cb = 255 * co.z;

		//var Cr =random(100, 255);
		//var Cg =random(100, 255);
		//var Cb =random(100, 255);

		//while ((Cr/Cg > 0.8 && Cr/Cg < 1.2) && (Cr/Cb > 0.8 && Cr/Cb < 1.2)) {
		//  var Cr =random(50, 255);
		//  var Cg =random(50, 255);
		//  var Cb =random(50, 255);
		//}

		this.img.loadPixels();
		for (var y = 0; y < side; y++) {
			for (var x = 0; x < side; x++) {
				var d = (sq(center - x) + sq(center - y)) / num;
				//var d = (sq(center - x) + sq(center - y))/num;
				var col = color(Cr / d, Cg / d, Cb / d);
				this.img.set(x, y, col);
			}
		}
		this.img.updatePixels();
		return this.img;
	}
}
//attractor class
class Attractor {
	//Attractor constructor that gets x and y as parameters in order to create location vector.
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.mass = 10000.0;
		this.location = createVector(x, y);
	}
	//Function to display the image, locationx and locationy attributes of the attractor 
	display() {
		fill(0, 0, 0, 0);
		stroke(200);
		ellipse(this.location.x, this.location.y, 5, 5);
	}
}
