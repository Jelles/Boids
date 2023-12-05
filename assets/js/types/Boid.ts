import {Vector} from "assets/js/types/Vector";

export class Boid {
    public static BOID_SIZE: number = 25;
    public desiredSeparation: number = 25;
    public desiredCohesion: number = 50 / 1000;
    public desiredAlignment: number = 50;

    private wanderAngle: number = 0;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxForce: number = 0.1;
    maxSpeed: number = 2;
    rotation: number = 0;

    constructor() {
        this.position = new Vector(Math.random() * 500, Math.random() * 500);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.acceleration = new Vector(0, 0);
    }

    update(bounds: { width: number; height: number; }, boids: Boid[]) {
        this.applyBehaviors(boids);

        this.rotation = this.velocity.angle();

        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);
        this.acceleration = this.acceleration.multiply(0);


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

        const wanderForce = this.wander();
        this.applyForce(wanderForce);
    }

    seek(target: Vector) {
        let desired = target.subtract(this.position);
        desired = desired.normalize();
        desired = desired.multiply(this.maxSpeed);
        let steer = desired.subtract(this.velocity);
        steer = steer.limit(this.maxForce);
        return steer;
    }

    wander() {
        let wanderR = 25;
        let wanderD = 80;
        let change = 0.3;
        this.wanderAngle += Math.random() * change - change * .5;
        let circlePos = this.velocity;
        circlePos = circlePos.normalize();
        circlePos = circlePos.multiply(wanderD);
        circlePos = circlePos.add(this.position);
        let h = this.velocity.angle();
        let circleOffset = new Vector(wanderR * Math.cos(this.wanderAngle + h), wanderR * Math.sin(this.wanderAngle + h));
        let target = circlePos.add(circleOffset);
        return this.seek(target);
    }

    cohesion(boids: Boid[]) {
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < this.desiredCohesion)) {
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
        let steer = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < this.desiredSeparation)) {
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
        let sum = new Vector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = this.position.distance(boids[i].position);
            if ((d > 0) && (d < this.desiredAlignment)) {
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
}