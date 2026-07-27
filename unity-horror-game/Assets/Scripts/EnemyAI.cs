using System.Collections.Generic;
using UnityEngine;

public class EnemyAI : MonoBehaviour
{
    public float speed = 2.2f;
    public float repathInterval = 0.6f;
    public float catchDistance = 1.0f;

    private Vector2Int currentCell;
    private List<Vector3> path = new List<Vector3>();
    private int pathIndex;
    private float repathTimer;
    private GameManager gm;

    public void Init(Vector2Int startCell)
    {
        currentCell = startCell;
    }

    void Start()
    {
        gm = GameManager.Instance;
    }

    void Update()
    {
        if (gm.GameOver) return;

        repathTimer -= Time.deltaTime;
        if (repathTimer <= 0f)
        {
            repathTimer = repathInterval;
            Repath();
        }

        if (path.Count > 0 && pathIndex < path.Count)
        {
            Vector3 target = path[pathIndex];
            Vector3 dir = target - transform.position;
            dir.y = 0;
            if (dir.magnitude < 0.15f)
            {
                pathIndex++;
            }
            else
            {
                transform.position += dir.normalized * speed * Time.deltaTime;
            }
        }

        float distToPlayer = Vector3.Distance(transform.position, gm.Player.position);
        if (distToPlayer < catchDistance)
        {
            gm.TriggerGameOver();
        }
    }

    void Repath()
    {
        Vector2Int playerCell = WorldToCell(gm.Player.position);
        Vector2Int myCell = WorldToCell(transform.position);
        List<Vector2Int> cellPath = BFS(myCell, playerCell);
        path.Clear();
        pathIndex = 0;
        foreach (var c in cellPath)
        {
            path.Add(CellToWorld(c));
        }
    }

    Vector2Int WorldToCell(Vector3 pos)
    {
        return new Vector2Int(Mathf.RoundToInt(pos.x / gm.cellSize), Mathf.RoundToInt(pos.z / gm.cellSize));
    }

    Vector3 CellToWorld(Vector2Int c)
    {
        return new Vector3(c.x * gm.cellSize, transform.position.y, c.y * gm.cellSize);
    }

    List<Vector2Int> BFS(Vector2Int start, Vector2Int goal)
    {
        var grid = gm.Grid;
        var visited = new HashSet<Vector2Int> { start };
        var prev = new Dictionary<Vector2Int, Vector2Int>();
        var queue = new Queue<Vector2Int>();
        queue.Enqueue(start);

        while (queue.Count > 0)
        {
            var cur = queue.Dequeue();
            if (cur == goal) break;

            foreach (var pair in GetOpenNeighbors(grid, cur))
            {
                if (!pair.Item2 || visited.Contains(pair.Item1)) continue;
                visited.Add(pair.Item1);
                prev[pair.Item1] = cur;
                queue.Enqueue(pair.Item1);
            }
        }

        var result = new List<Vector2Int>();
        if (!visited.Contains(goal)) return result;
        var step = goal;
        while (step != start)
        {
            result.Add(step);
            step = prev[step];
        }
        result.Reverse();
        return result;
    }

    IEnumerable<(Vector2Int, bool)> GetOpenNeighbors(MazeCell[,] grid, Vector2Int c)
    {
        var cell = grid[c.x, c.y];
        yield return (new Vector2Int(c.x, c.y + 1), !cell.wallNorth);
        yield return (new Vector2Int(c.x, c.y - 1), !cell.wallSouth);
        yield return (new Vector2Int(c.x + 1, c.y), !cell.wallEast);
        yield return (new Vector2Int(c.x - 1, c.y), !cell.wallWest);
    }
}
