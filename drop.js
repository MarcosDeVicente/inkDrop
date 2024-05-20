const circleDetail = 150; // Reducir el detalle del círculo a 180 vértices

class Drop {
  constructor(x, y, r, col) {
    this.center = createVector(x, y); // Usar p5.Vector para optimizaciones internas de p5.js
    this.r = r;
    this.vertices = this.createVertices();
    this.col = col || this.randomColor();
  }

  // Crear vértices del círculo basado en el detalle y radio
  createVertices() {
    let vertices = [];
    for (let i = 0; i < circleDetail; i++) {
      let angle = (i / circleDetail) * TWO_PI;
      let v = createVector(cos(angle), sin(angle))
        .mult(this.r)
        .add(this.center);
      vertices.push(v);
    }
    return vertices;
  }

  // Generar un color aleatorio
  randomColor() {
    return color(random(255), random(255), random(255));
  }

  // Efecto agua entre gotas
  marble(other) {
    let c = other.center;
    let rSquared = other.r * other.r;

    for (let v of this.vertices) {
      let p = p5.Vector.sub(v, c);
      let mSquared = p.x * p.x + p.y * p.y;

      if (mSquared > 0) {
        let root = sqrt(1 + rSquared / mSquared);
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
