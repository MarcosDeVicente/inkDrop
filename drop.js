// drop.js
const circleDetail = 360; // Reducir a 180 vértices

class Drop {
  constructor(x, y, r, col) {
    this.center = createVector(x, y);
    this.r = r;

    this.vertices = [];
    for (let i = 0; i < circleDetail; i++) {
      let angle = map(i, 0, circleDetail, 0, TWO_PI);
      let v = createVector(cos(angle), sin(angle));
      v.mult(this.r);
      v.add(this.center);
      this.vertices[i] = v;
    }
    this.col = col || this.randomColor();
  }

  randomColor() {
    return color(random(255), random(255), random(255));
  }

  marble(other) {
    let c = other.center;
    let r = other.r;
    for (let v of this.vertices) {
      let p = v.copy().sub(c);
      let m = p.mag();
      if (m > 0) {
        let root = sqrt(1 + (r * r) / (m * m));
        p.mult(root).add(c);
        v.set(p);
      }
    }
  }

  show() {
    fill(this.col);
    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
