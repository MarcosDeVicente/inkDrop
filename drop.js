// drop.js
const circleDetail = 360; // Detalle del círculo, reducible a 180 vértices para optimización

class Drop {
  constructor(x, y, r, col) {
    this.center = createVector(x, y);
    this.r = r;
    this.vertices = this.createVertices();
    this.col = col || this.randomColor();
  }

  // Crear vértices del círculo basado en el detalle y radio
  createVertices() {
    let vertices = [];
    for (let i = 0; i < circleDetail; i++) {
      let angle = map(i, 0, circleDetail, 0, TWO_PI);
      let v = createVector(cos(angle), sin(angle))
        .mult(this.r)
        .add(this.center);
      vertices[i] = v;
    }
    return vertices;
  }

  // Generar un color aleatorio
  randomColor() {
    return color(random(255), random(255), random(255));
  }

  // Efecto de mármol entre gotas
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

  // Mostrar la gota
  show() {
    fill(this.col);
    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
