export const NUM_BUBBLE_COLORS = 5;

 // Neighbor offset table
export const NEIGHBOR_OFFSETS = [
    [
        [1, 0],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, -1]
    ], // Even row tiles
    [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, -1]
    ]
]; // Odd row tiles
