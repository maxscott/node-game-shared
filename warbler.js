var drawRegularPolygon = require('./util').drawRegularPolygon;
var Bullet = require('./bullet');

var Warbler = function Warbler (opts) {
  this.x = this.pointedX = opts.x;
  this.y = this.pointedY = opts.y;
  this.radius = opts.radius;
  this.color = opts.color;
  this.color2 = opts.color2;

  this.offset = 0;
  this.keys = [];
  this.speed = 170;
  this.bulletDelay = 0;
}

Warbler.player1 = function () {
  return new Warbler ({
    x: 30,
    y: 30,
    radius: 30,
    color: 'rgb(12, 10, 200)',
    color2: 'rgb(12, 100, 200)'
  });
}
Warbler.player2 = function () {
  return new Warbler ({
    x: 400,
    y: 30,
    radius: 30,
    color: 'rgb(200, 10, 12)',
    color2: 'rgb(200, 100, 12)'
  });
}
Warbler.player3 = function () {
  return new Warbler ({
    x: 30,
    y: 400,
    radius: 30,
    color: 'rgb(12, 200, 10)',
    color2: 'rgb(12, 200, 100)'
  });
}
Warbler.player4 = function () {
  return new Warbler ({
    x: 400,
    y: 400,
    radius: 30,
    color: 'rgb(200, 200, 10)',
    color2: 'rgb(200, 200, 100)'
  });
}

Warbler.prototype.render = function (ctx) {
  drawRegularPolygon(ctx, this.x, this.y, this.radius/3, this.radius, this.offset, true, this.color, true, this.color2, 10);
  drawRegularPolygon(ctx, this.pointedX, this.pointedY, 10, 3, this.offset, true, this.color, true, this.color2, 10);
}

Warbler.prototype.getCurrentActions = function () {
  return {
    left: this.keys['Left'],
    right: this.keys['Right'],
    up: this.keys['Up'],
    down: this.keys['Down'],
    click: this.keys['click']
  }
}

Warbler.prototype.update = function (dt, bullets, actions) {
  this.bulletDelay = Math.max(this.bulletDelay - dt, -1);
  var adjSpeed = dt/1000 * this.speed;
  if (actions.left)  this.x -= adjSpeed;
  if (actions.right) this.x += adjSpeed;
  if (actions.up)    this.y -= adjSpeed;
  if (actions.down)  this.y += adjSpeed;

  if (actions.click && this.bulletDelay < 0) {
    bullets.push(new Bullet(this));
    this.bulletDelay = 120;
  }

  var dx = this.pointedX - this.x;
  var dy = this.pointedY - this.y;
  var h = Math.sqrt(dx*dx + dy*dy);
  this.offset = (Math.acos(dy / h) || 0) * (dx < 0 ? -1 : 1);
}

Warbler.prototype.init = function (canvas, window) {
  var self = this;

  canvas.addEventListener('mousemove', function(ev) {
    self.pointedX = ev.x;
    self.pointedY = ev.y;
  });
  canvas.addEventListener('mousedown', function(ev) {
    self.keys['click'] = true;
  });
  canvas.addEventListener('mouseup', function(ev) {
    self.keys['click'] = false;
  });

  window.addEventListener('keydown', function(ev) {
    self.keys[ev.keyIdentifier] = true;
  });
  window.addEventListener('keyup', function(ev) {
    self.keys[ev.keyIdentifier] = false;
  });
}

module.exports = Warbler;
