using UnityEngine;

public class FlashlightController : MonoBehaviour
{
    public float maxBattery = 60f;
    public float drainPerSecond = 1f;
    public float flickerChance = 0.01f;
    public float battery;

    private Light lightComp;
    private bool isOn = true;

    void Start()
    {
        lightComp = GetComponent<Light>();
        battery = maxBattery;
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.F)) isOn = !isOn;

        if (isOn && battery > 0f)
        {
            battery -= drainPerSecond * Time.deltaTime;
            lightComp.enabled = Random.value > flickerChance;
            lightComp.intensity = Mathf.Lerp(0.5f, 3f, battery / maxBattery);
        }
        else
        {
            lightComp.enabled = false;
        }

        if (battery <= 0f) isOn = false;
    }
}
