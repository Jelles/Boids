import {Vector} from "assets/js/types/Vector";

export class Boid {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxForce: number;
    maxSpeed: number;
    rotation: number;
    constructor() {
        this.position = new Vector(0,0);
        this.velocity = new Vector(Math.random() * 5, Math.random() * 5);
        this.acceleration = new Vector(0, 0);
        this.rotation = 0;
        this.maxForce = 0.1;
        this.maxSpeed = 4;
    }

    update(bounds: { width: number; height: number; }, boids: Boid[]) {
        this.applyBehaviors(boids);

        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);
        this.acceleration = this.acceleration.multiply(0);


        this.rotation = this.velocity.angle() - 90;
        this.checkBounds(bounds.width, bounds.height);
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
        let neighbordist = 50;
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
        let desiredseparation = 35;
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
        let neighbordist = 50;
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
        // do not flip the velocity add force instead
        if (this.position.x > canvasWidth) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = canvasWidth;
        }
        if (this.position.y > canvasHeight) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = canvasHeight;
        }

    }

    private setAngle(displacement: Vector, number: number) {
        let len = displacement.magnitude();
        displacement.x = Math.cos(number) * len;
        displacement.y = Math.sin(number) * len;
        return displacement;
    }
}