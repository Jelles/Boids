import {Vector} from "assets/js/types/Vector";

export class Boid {
    public static BOID_SIZE = 5;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxForce: number;
    maxSpeed: number;
    rotation: number;
    constructor() {
        this.position = new Vector(Math.random() * 500, Math.random() * 500);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.acceleration = new Vector(0, 0);
        this.rotation = 0;
        this.maxForce = 0.1;
        this.maxSpeed = 2;
    }

    update(bounds: { width: number; height: number; }, boids: Boid[]) {
        this.rotation = this.velocity.angle();

        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);
        this.acceleration = this.acceleration.multiply(0);


        this.checkBounds(bounds.width, bounds.height);

        console.log(this.position);
    }

    applyForce(force: Vector) {
        this.acceleration = this.acceleration.add(force);
    }

    applyBehaviors(boids: Boid[]) {
        const separateForce = this.separation(boids);
        const alignForce = this.alignment(boids);
        const cohesionForce = this.cohesion(boids);

        separateForce.multiply(1.5);
        alignForce.multiply(1.0);
        cohesionForce.multiply(1.0);

        this.applyForce(separateForce);
        this.applyForce(alignForce);
        this.applyForce(cohesionForce);
    }

    seek(target: Vector) {
        let desired = target.subtract(this.position);
        desired = desired.normalize();
        desired = desired.multiply(this.maxSpeed);
        let steer = desired.subtract(this.velocity);
        steer = steer.limit(this.maxForce);
        return steer;
    }

    map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
        return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }

    wander() {
        let wanderR = 25;
        let wanderD = 80;
        let change = 0.05;
        this.velocity = this.velocity.normalize();
        let circleCenter = this.velocity.multiply(wanderD);
        let displacement = new Vector(0, -1);
        displacement = this.setAngle(displacement, this.rotation);
        circleCenter = circleCenter.add(displacement.multiply(wanderR));
        let wanderForce = circleCenter.subtract(this.position);
        return wanderForce;
    }

    cohesion(boids: Boid[]) {
        let neighbordist = Boid.BOID_SIZE * 4;
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum = sum.add(boids[i].position);
                count++;
            }
        }
        if (count > 0) {
            sum = sum.divide(count);
            return this.seek(sum);
        } else {
            return new Vector(0, 0);
        }
    }

    separation(boids: Boid[]) {
        let desiredseparation = Boid.BOID_SIZE * 3;
        let steer = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < desiredseparation)) {
                let diff = this.position.subtract(boids[i].position);
                diff = diff.normalize();
                diff = diff.divide(d);
                steer = steer.add(diff);
                count++;
            }
        }
        if (count > 0) {
            steer = steer.divide(count);
        }
        if (steer.magnitude() > 0) {
            steer = steer.normalize();
            steer = steer.multiply(this.maxSpeed);
            steer = steer.subtract(this.velocity);
            steer = steer.limit(this.maxForce);
        }
        return steer;
    }

    alignment(boids: Boid[]) {
        let neighbordist = Boid.BOID_SIZE * 4;
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum = sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum = sum.divide(count);
            sum = sum.normalize();
            sum = sum.multiply(this.maxSpeed);
            let steer = sum.subtract(this.velocity);
            steer = steer.limit(this.maxForce);
            return steer;
        } else {
            return new Vector(0, 0);
        }
    }
    
    private checkBounds(canvasWidth: number, canvasHeight: number): void {
        const boidSize = Boid.BOID_SIZE * .5;
        const x = this.position.x;
        const y = this.position.y;

        if (x > canvasWidth - boidSize) {
            this.velocity.x += -1;
        } else if (x < boidSize) {
            this.velocity.x += 1;
        }

        if (y > canvasHeight - boidSize) {
            this.velocity.y += -1;
        } else if (y < boidSize) {
            this.velocity.y += 1;
        }

    }

    private setAngle(displacement: Vector, number: number) {
        let len = displacement.magnitude();
        displacement.x = Math.cos(number) * len;
        displacement.y = Math.sin(number) * len;
        return displacement;
    }
}