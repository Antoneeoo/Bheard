// Check if two circles intersect
export function circleIntersection(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) {
    // Calculate the distance between the centers
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len < r1 + r2) {
        // Circles intersect
        return true;
    }

    return false;
}

// Convert radians to degrees
export function radToDeg(angle: number) {
    return angle * (180 / Math.PI);
}

// Convert degrees to radians
export function degToRad(angle: number) {
    return angle * (Math.PI / 180);
}

// Get a random int between low and high, inclusive
export function randRange(low: number, high: number) {
    return Math.floor(low + Math.random() * (high - low + 1));
}