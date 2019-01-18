# particleSketch.js

A simple and easy to use sketch to create objects called **Particles** and **Attractors** and create actions that will happen one the Particles encounter with Attractors.

- [Getting Started](#getting-started)
- [License](#license)
- [Prerequisites](#prerequisites)
- [Required HTML Structure](#required-html-structure)
- [Usage](#usage)
  - [p5 Setup Function](#p5-setup-function)
  - [p5 Draw Function](#p5-draw-function)
  - [p5 keyTyped Function](#p5-keytyped-function)
  - [Full Usage](#full-usage)
- [Methods](#methods)
## Getting Started

**particleSketch.js** is a sketch file for the **P5** javascript library. It allows user to create Particle and Attractor objects on canvas and animate them with a  various type of options. It is possible to define color and size of an object by using releated **slider controls**.   It has been tested on Internet Explorer, Firefox, Safari, Opera, and Chrome.

## License

**particleSketch.js** licensed under the Apache License Version 2.0.

## Prerequisites

You need to have the following libraries to run the program:
```
* p5.js v0.7.0 or later
* p5.dom.js v0.7.0 or later
```

## Required HTML Structure

p5.js and p5.dom.js should be located between HEAD tags of html file. 

```html
<head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.js"></script>
</head>
```
particleSketch.js and main script file of your structure (ie. index.js) should be located between BODY tags.

```html
<body>
	<script src="p5.particle.sketch-1.0.js"></script>
	<script src="index.js"></script>
</body>
```

## Usage
particleSketch.js needs user iteraction to add, reset and change velocity for object by pressing below keyboard keys:
```
P - Adds a new Particle to the particles list when pressed (P) key
A - Adds a new Attractor to the attractors list when pressed (A) key
R - Once you have done playing with attractors and particles, if you would like to reset the lists in which terms, the things going on on the screen, this code allows you to reset everything by pressing the key R.
M - Changes velocity of particles ramdomly
```
Define global variable for ParticleSketch class;
```
let particleSketch;
```
### p5 Setup Function
The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color and to load media such as images and fonts as the program starts.

To setup particleSketch.js;
```javascript
function setup() {
	particleSketch = new ParticleSketch(800, 800);
}
```
### p5 Draw Function
Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.

To setup draw function for particleSketch.js;
```javascript
function draw() {
	particleSketch.draw();
}
```
### p5 keyTyped Function
The keyTyped() function is called once every time a key is pressed, but action keys such as Ctrl, Shift, and Alt are ignored. The most recent key pressed will be stored in the key variable.
```javascript
function keyTyped() {
	if (key === 'p') {
		particleSketch.addParticle(mouseX, mouseY);
	} else if (key === 'a') {
		particleSketch.addAttractor(mouseX, mouseY);
	} else if (key === 'r') {
		particleSketch.clearAttractors().clearParticles();
	} else if (key === 'm') {
		particleSketch.setParticlesVelocity();
	}
}
```
### Full Usage
```javascript
//index.js

let particleSketch;

function setup() {
	particleSketch = new ParticleSketch(800, 800);
}

function draw() {
	particleSketch.draw();
}

function keyTyped() {
	if (key === 'p') {
		particleSketch.addParticle(mouseX, mouseY);
	} else if (key === 'a') {
		particleSketch.addAttractor(mouseX, mouseY);
	} else if (key === 'r') {
		particleSketch.clearAttractors().clearParticles();
	} else if (key === 'm') {
		particleSketch.setParticlesVelocity();
	}
}

```
## Methods

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.

### getParticlesLength()
Gets length of currently active particles

```javascript
particleSketch.getParticlesLength();
```
### getAttractorsLength()
Gets length of currently active attractors

```javascript
particleSketch.getAttractorsLength();
```
### setSketchBlendMode(sketchBlendMode)
Blends the pixels in the display window according to the defined mode. [p5 Documentation](https://p5js.org/reference/#/p5/blendMode)

```javascript
particleSketch.setSketchBlendMode(ADD);
```
### setSketchImageMode(sketchImageMode)
Set image mode. Modifies the location from which images are drawn by changing the way in which parameters given to image() are interpreted. [p5 Documentation](https://p5js.org/reference/#/p5/imageMode)

```javascript
particleSketch.setSketchImageMode(CENTER);
```
### setSketchFrameRate(sketchFrameRate)
Specifies the number of frames to be displayed every second. [p5 Documentation](https://p5js.org/reference/#/p5/frameRate)

```javascript
particleSketch.setSketchFrameRate(60);
```
### setSketchBackground(sketchBackground)
Sets the color used for the background of the p5.js canvas. [p5 Documentation](https://p5js.org/reference/#/p5/background)

```javascript
particleSketch.setSketchBackground('#222222');
```
### setParticlesVelocity()
Sets velocity of particles to random number (-5,5) 

```javascript
particleSketch.setParticlesVelocity();
```
### setParticlesVelocity()
Sets velocity of particles to random number.

```javascript
particleSketch.setParticlesVelocity();
```
### clearParticles()
Clears all particles from canvas.

```javascript
particleSketch.clearParticles();
```
### clearAttractors()
Clears all attractors from canvas

```javascript
particleSketch.clearAttractors();
```



