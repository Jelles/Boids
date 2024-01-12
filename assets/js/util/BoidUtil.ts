class BoidUtil {
    static drawDirectionArrow(ctx: CanvasRenderingContext2D, startX: number, startY: number, length: number, angle: any) {
        // Convert angle to radians
        const angleInRad = angle * Math.PI / 180;

        // Calculate end point of arrow shaft
        const endX = startX + length * Math.cos(angleInRad);
        const endY = startY + length * Math.sin(angleInRad);

        // Calculate the points for the arrow head
        const headLength = length * 0.2; // Length of the head parts
        const headAngle = Math.PI / 8; // Angle at the arrow head tip

        ctx.beginPath();

        // Arrow shaft
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        // Arrow head left part
        ctx.lineTo(
            endX - headLength * Math.cos(angleInRad - headAngle),
            endY - headLength * Math.sin(angleInRad - headAngle)
        );

        // Move back to the tip of the arrow head
        ctx.moveTo(endX, endY);

        // Arrow head right part
        ctx.lineTo(
            endX - headLength * Math.cos(angleInRad + headAngle),
            endY - headLength * Math.sin(angleInRad + headAngle)
        );

        ctx.stroke(); // Or ctx.fill() if you want a solid arrow
    }

    static drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        ctx.beginPath();
        // Assume the arrow points to the right and starts at (x, y)
        ctx.moveTo(x, y + height / 2); // Move to the arrow tail middle point
        ctx.lineTo(x + width - height / 2, y + height / 2); // Draw line to the head base
        ctx.lineTo(x + width - height / 2, y); // Move to the top corner of the head
        ctx.lineTo(x + width, y + height / 2); // Draw line to the arrow tip
        ctx.lineTo(x + width - height / 2, y + height); // Draw line to the bottom corner of the head
        ctx.lineTo(x + width - height / 2, y + height / 2); // Draw line back to the head base
        ctx.closePath(); // Optional: close the path to create a solid shape
        ctx.fill(); // Fill the arrow shape
        // ctx.stroke(); // Use stroke if you want the outline of the arrow instead
    }

    static drawBoid(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, angle: number) {
        ctx.beginPath();

        // These are the points for an upward-pointing triangle centered at (0, 0)
        const points = [
            { x: 0, y: -height / 2 }, // Top point
            { x: -width / 2, y: height / 2 }, // Bottom left point
            { x: 0, y: height / 2 - 5 }, // Point between left and right and a bit higher
            { x: width / 2, y: height / 2 }, // Bottom right point
        ];

        // Rotate the points around the origin (0, 0)
        const rotatedPoints = points.map(point => {
            return {
                x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
                y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
            };
        });

        // Move to the initial point (top of the triangle)
        ctx.moveTo(x + rotatedPoints[0].x, y + rotatedPoints[0].y);

        // Draw lines to each of the other points
        rotatedPoints.forEach(point => {
            ctx.lineTo(x + point.x, y + point.y);
        });

        // Close the path and fill the shape
        ctx.closePath();
        ctx.fill();
    }

    static drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

export default BoidUtil;