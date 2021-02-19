class Tile {
  constructor(x, y, px, py, bomb, clicked) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.bomb = bomb;
    this.clicked = clicked;
    this.bombAround;
    this.analysed = false;
  }
  draw(nbrBombAutour) {
    if (!this.clicked) {
      canvas.ctx.fillStyle = "green";
      canvas.ctx.fillRect(this.x, this.y, w, h);
    }
    if (this.clicked && !this.bomb) {
      canvas.ctx.fillStyle = "beige";
      canvas.ctx.fillRect(this.x, this.y, w, h);
      canvas.ctx.strokeText(this.bombAround, this.x + w / 2, this.y + h / 2);
    }
    if (this.bomb) {
      canvas.ctx.fillStyle = "red";
      canvas.ctx.fillRect(this.x, this.y, w, h);
    }
  }
}
