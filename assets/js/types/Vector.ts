export class Vector {
    x: number;
    y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    subtract(v: { x: number; y: number; }) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    multiply(n: number) {
        return new Vector(this.x * n, this.y * n);
    }
    divide(n: number) {
        return new Vector(this.x / n, this.y / n);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return this.divide(this.magnitude());
    }

    limit(maxSpeed: number) {
        if (this.magnitude() > maxSpeed) {
            return this.normalize().multiply(maxSpeed);
        } else {
            return this;
        }
    }

    angle() {
        return Math.atan2(this.y, this.x) * 180 / Math.PI;
    }

    distance(position: Vector) {
        return Math.sqrt(Math.pow(this.x - position.x, 2) + Math.pow(this.y - position.y, 2));
    }

    setMagnitude(maxSpeed: number) {
        return this.normalize().multiply(maxSpeed);
    }
}