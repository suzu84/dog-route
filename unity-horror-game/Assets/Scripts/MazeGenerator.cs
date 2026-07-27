using System.Collections.Generic;

public class MazeCell
{
    public int x, z;
    public bool visited;
    public bool wallNorth = true;
    public bool wallSouth = true;
    public bool wallEast = true;
    public bool wallWest = true;
}

public static class MazeGenerator
{
    public static MazeCell[,] Generate(int width, int height, int seed)
    {
        var rng = seed == 0 ? new System.Random() : new System.Random(seed);
        var grid = new MazeCell[width, height];
        for (int x = 0; x < width; x++)
            for (int z = 0; z < height; z++)
                grid[x, z] = new MazeCell { x = x, z = z };

        var stack = new Stack<MazeCell>();
        var start = grid[0, 0];
        start.visited = true;
        stack.Push(start);

        while (stack.Count > 0)
        {
            var current = stack.Peek();
            var neighbors = GetUnvisitedNeighbors(grid, current, width, height);
            if (neighbors.Count == 0)
            {
                stack.Pop();
                continue;
            }
            var (next, dir) = neighbors[rng.Next(neighbors.Count)];
            RemoveWall(current, next, dir);
            next.visited = true;
            stack.Push(next);
        }
        return grid;
    }

    private static List<(MazeCell, string)> GetUnvisitedNeighbors(MazeCell[,] grid, MazeCell cell, int width, int height)
    {
        var result = new List<(MazeCell, string)>();
        if (cell.z + 1 < height && !grid[cell.x, cell.z + 1].visited) result.Add((grid[cell.x, cell.z + 1], "N"));
        if (cell.z - 1 >= 0 && !grid[cell.x, cell.z - 1].visited) result.Add((grid[cell.x, cell.z - 1], "S"));
        if (cell.x + 1 < width && !grid[cell.x + 1, cell.z].visited) result.Add((grid[cell.x + 1, cell.z], "E"));
        if (cell.x - 1 >= 0 && !grid[cell.x - 1, cell.z].visited) result.Add((grid[cell.x - 1, cell.z], "W"));
        return result;
    }

    private static void RemoveWall(MazeCell a, MazeCell b, string dir)
    {
        switch (dir)
        {
            case "N": a.wallNorth = false; b.wallSouth = false; break;
            case "S": a.wallSouth = false; b.wallNorth = false; break;
            case "E": a.wallEast = false; b.wallWest = false; break;
            case "W": a.wallWest = false; b.wallEast = false; break;
        }
    }
}
