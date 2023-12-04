import {Vector} from "assets/js/types/Vector";

export class Boid {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxForce: number;
    maxSpeed: number;
    rotation: number;
    constructor() {
        this.position = new Vector(Math.random() * 100, Math.random() * 100);
        this.velocity = new Vector(Math.random() * 5, Math.random() * 5);
        this.acceleration = new Vector(0, 0);
        this.rotation = 0;
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    update(bounds: { width: number; height: number; }, target: Vector) {
        this.position = this.position.add(this.velocity);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        this.acceleration = this.acceleration.multiply(0);
        this.rotation = this.velocity.angle() - 90;
        this.checkBounds(bounds.width, bounds.height);
        this.seek(target);
    }

    applyForce(force: Vector) {
        this.acceleration = this.acceleration.add(force);
    }

    seek(target: Vector) {
        let desired = target.subtract(this.position);
        desired = desired.normalize();
        desired = desired.multiply(this.maxSpeed);
        const steer = desired.subtract(this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    private checkBounds(canvasWidth: number, canvasHeight: number): void {
        const padding = 10; // Optional padding to keep boids away from edges

        if (this.position.x < padding) {
            this.position.x = padding;
            this.velocity.x *= -.5; // Optional: Reflect the velocity
        }

        if (this.position.x > canvasWidth - padding) {
            this.position.x = canvasWidth - padding;
            this.velocity.x *= -.5;
        }

        if (this.position.y < padding) {
            this.position.y = padding;
            this.velocity.y *= -.5;
        }

        if (this.position.y > canvasHeight - padding) {
            this.position.y = canvasHeight - padding;
            this.velocity.y *= -.5;
        }
    }
}