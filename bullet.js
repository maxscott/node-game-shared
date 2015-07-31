var drawRegularPolygon = require('util').drawRegularPolygon;

var Bullet = function Bullet (warbler) {
  this.radius = 10;
  this.speed = 930;
  this.owner = warbler;
  this.color = warbler.color2;
  this.color2 = warbler.color;
  this.color = "purple";
  this.color2 = "purple";
  this.offset = Math.random();
  var dx = warbler.pointedX - warbler.x;
  var dy = warbler.pointedY - warbler.y;
  var h = Math.sqrt(dx*dx + dy*dy);
  this.angleOfShot = Math.acos(dy / h) * (dx < 0 ? -1 : 1);
  this.x = warbler.x + (Math.sin(this.angleOfShot) * (warbler.radius + this.radius));
  this.y = warbler.y + (Math.cos(this.angleOfShot) * (warbler.radius + this.radius));
}

Bullet.prototype.update = function update (dt) {
  var adjSpeed = this.speed * dt/1000;
  this.x += Math.sin(this.angleOfShot) * adjSpeed;
  this.y += Math.cos(this.angleOfShot) * adjSpeed;
}

Bullet.prototype.render = function render (ctx) {
  drawRegularPolygon(ctx, this.x, this.y, this.radius/2, this.radius, this.offset, true, this.color, true, this.color2, 10);
}

module.exports = Bullet;
