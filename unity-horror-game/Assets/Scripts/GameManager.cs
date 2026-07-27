using UnityEngine;

// このスクリプトを空の GameObject にアタッチして Play するだけで
// 迷路・プレイヤー・敵・出口・UI がすべて自動生成されます。
public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    [Header("Maze Settings")]
    public int mazeWidth = 10;
    public int mazeHeight = 10;
    public float cellSize = 4f;
    public int seed = 0;

    public MazeCell[,] Grid { get; private set; }
    public Transform Player { get; private set; }
    public bool GameOver { get; private set; }

    private GameUI ui;

    void Awake()
    {
        Instance = this;
        Grid = MazeGenerator.Generate(mazeWidth, mazeHeight, seed);
        BuildLevel();
        SpawnPlayer();
        SpawnExit();
        SpawnEnemy();
        SetupAtmosphere();
        ui = gameObject.AddComponent<GameUI>();
    }

    Vector3 CellToWorld(int x, int z) => new Vector3(x * cellSize, 0, z * cellSize);

    void BuildLevel()
    {
        GameObject levelRoot = new GameObject("Level");

        GameObject floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
        floor.name = "Floor";
        floor.transform.parent = levelRoot.transform;
        floor.transform.position = new Vector3((mazeWidth - 1) * cellSize / 2f, 0, (mazeHeight - 1) * cellSize / 2f);
        floor.transform.localScale = new Vector3(mazeWidth * cellSize / 10f + 1f, 1, mazeHeight * cellSize / 10f + 1f);
        floor.GetComponent<Renderer>().material.color = new Color(0.08f, 0.08f, 0.08f);

        float wallHeight = 3f;
        for (int x = 0; x < mazeWidth; x++)
        {
            for (int z = 0; z < mazeHeight; z++)
            {
                var cell = Grid[x, z];
                Vector3 pos = CellToWorld(x, z);
                if (cell.wallNorth) CreateWall(levelRoot.transform, pos + new Vector3(0, wallHeight / 2f, cellSize / 2f), new Vector3(cellSize, wallHeight, 0.2f));
                if (cell.wallWest) CreateWall(levelRoot.transform, pos + new Vector3(-cellSize / 2f, wallHeight / 2f, 0), new Vector3(0.2f, wallHeight, cellSize));
                if (x == mazeWidth - 1 && cell.wallEast) CreateWall(levelRoot.transform, pos + new Vector3(cellSize / 2f, wallHeight / 2f, 0), new Vector3(0.2f, wallHeight, cellSize));
                if (z == 0 && cell.wallSouth) CreateWall(levelRoot.transform, pos + new Vector3(0, wallHeight / 2f, -cellSize / 2f), new Vector3(cellSize, wallHeight, 0.2f));
            }
        }
    }

    void CreateWall(Transform parent, Vector3 pos, Vector3 scale)
    {
        GameObject wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
        wall.name = "Wall";
        wall.transform.parent = parent;
        wall.transform.position = pos;
        wall.transform.localScale = scale;
        wall.GetComponent<Renderer>().material.color = new Color(0.15f, 0.13f, 0.12f);
    }

    void SpawnPlayer()
    {
        GameObject playerObj = new GameObject("Player");
        playerObj.tag = "Player";
        playerObj.transform.position = CellToWorld(0, 0) + Vector3.up * 1f;
        CharacterController cc = playerObj.AddComponent<CharacterController>();
        cc.height = 1.8f;
        cc.center = new Vector3(0, 0.9f, 0);
        cc.radius = 0.35f;

        GameObject camObj = new GameObject("PlayerCamera");
        camObj.transform.parent = playerObj.transform;
        camObj.transform.localPosition = new Vector3(0, 1.6f, 0);
        Camera cam = camObj.AddComponent<Camera>();
        cam.nearClipPlane = 0.05f;
        camObj.AddComponent<AudioListener>();
        camObj.tag = "MainCamera";

        GameObject lightObj = new GameObject("Flashlight");
        lightObj.transform.parent = camObj.transform;
        lightObj.transform.localPosition = Vector3.zero;
        lightObj.transform.localRotation = Quaternion.identity;
        Light spot = lightObj.AddComponent<Light>();
        spot.type = LightType.Spot;
        spot.range = 12f;
        spot.spotAngle = 50f;
        spot.intensity = 3f;
        spot.color = new Color(1f, 0.95f, 0.8f);
        lightObj.AddComponent<FlashlightController>();

        playerObj.AddComponent<PlayerController>();
        playerObj.AddComponent<HeartbeatAudio>();

        Player = playerObj.transform;
    }

    void SpawnExit()
    {
        Vector2Int exitCell = new Vector2Int(mazeWidth - 1, mazeHeight - 1);
        GameObject exit = GameObject.CreatePrimitive(PrimitiveType.Cube);
        exit.name = "Exit";
        exit.transform.position = CellToWorld(exitCell.x, exitCell.y) + Vector3.up * 1f;
        exit.transform.localScale = new Vector3(1.2f, 2f, 1.2f);
        Renderer r = exit.GetComponent<Renderer>();
        r.material.color = Color.green;
        r.material.EnableKeyword("_EMISSION");
        r.material.SetColor("_EmissionColor", Color.green * 2f);
        exit.GetComponent<Collider>().isTrigger = true;
        exit.AddComponent<ExitTrigger>();
    }

    void SpawnEnemy()
    {
        Vector2Int enemyCell = new Vector2Int(mazeWidth / 2, mazeHeight / 2);
        GameObject enemy = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        enemy.name = "Enemy";
        enemy.transform.position = CellToWorld(enemyCell.x, enemyCell.y) + Vector3.up * 1f;
        enemy.transform.localScale = new Vector3(0.8f, 1.1f, 0.8f);
        enemy.GetComponent<Renderer>().material.color = Color.black;
        enemy.GetComponent<Collider>().isTrigger = true;
        enemy.AddComponent<EnemyAI>().Init(enemyCell);
    }

    void SetupAtmosphere()
    {
        RenderSettings.fog = true;
        RenderSettings.fogColor = Color.black;
        RenderSettings.fogMode = FogMode.Exponential;
        RenderSettings.fogDensity = 0.06f;
        RenderSettings.ambientLight = new Color(0.03f, 0.03f, 0.04f);
    }

    public void TriggerGameOver()
    {
        if (GameOver) return;
        GameOver = true;
        ui.ShowGameOver();
        Player.GetComponent<PlayerController>().enabled = false;
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    public void TriggerWin()
    {
        if (GameOver) return;
        GameOver = true;
        ui.ShowWin();
        Player.GetComponent<PlayerController>().enabled = false;
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    public void RestartGame()
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().buildIndex);
    }
}
