using UnityEngine;
using UnityEngine.UI;

public class GameUI : MonoBehaviour
{
    private Text messageText;
    private Text batteryText;

    void Awake()
    {
        GameObject canvasObj = new GameObject("Canvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        Font builtinFont = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");

        GameObject textObj = new GameObject("Message");
        textObj.transform.SetParent(canvasObj.transform, false);
        messageText = textObj.AddComponent<Text>();
        messageText.font = builtinFont;
        messageText.alignment = TextAnchor.MiddleCenter;
        messageText.fontSize = 48;
        messageText.color = Color.red;
        messageText.text = "";
        RectTransform rt = messageText.GetComponent<RectTransform>();
        rt.anchorMin = new Vector2(0.5f, 0.5f);
        rt.anchorMax = new Vector2(0.5f, 0.5f);
        rt.sizeDelta = new Vector2(800, 200);
        rt.anchoredPosition = Vector2.zero;

        GameObject battObj = new GameObject("Battery");
        battObj.transform.SetParent(canvasObj.transform, false);
        batteryText = battObj.AddComponent<Text>();
        batteryText.font = builtinFont;
        batteryText.alignment = TextAnchor.LowerLeft;
        batteryText.fontSize = 22;
        batteryText.color = Color.white;
        RectTransform brt = batteryText.GetComponent<RectTransform>();
        brt.anchorMin = new Vector2(0, 0);
        brt.anchorMax = new Vector2(0, 0);
        brt.pivot = new Vector2(0, 0);
        brt.sizeDelta = new Vector2(300, 40);
        brt.anchoredPosition = new Vector2(20, 20);
    }

    void Update()
    {
        if (GameManager.Instance.GameOver) return;
        Transform player = GameManager.Instance.Player;
        if (player == null) return;
        FlashlightController flashlight = player.GetComponentInChildren<FlashlightController>();
        if (flashlight != null)
            batteryText.text = $"Battery: {Mathf.CeilToInt(flashlight.battery / flashlight.maxBattery * 100)}%";
    }

    public void ShowGameOver()
    {
        messageText.color = Color.red;
        messageText.text = "YOU DIED\n\n(Press R to Restart)";
        StartCoroutine(WaitForRestart());
    }

    public void ShowWin()
    {
        messageText.color = Color.green;
        messageText.text = "YOU ESCAPED\n\n(Press R to Restart)";
        StartCoroutine(WaitForRestart());
    }

    System.Collections.IEnumerator WaitForRestart()
    {
        yield return null;
        while (!Input.GetKeyDown(KeyCode.R))
            yield return null;
        GameManager.Instance.RestartGame();
    }
}
