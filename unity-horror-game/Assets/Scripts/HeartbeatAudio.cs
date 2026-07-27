using UnityEngine;

// 敵が近づくと心拍音を鳴らす。効果音ファイルは使わず波形をコードで生成するため
// 追加アセット不要（完全無料）。
public class HeartbeatAudio : MonoBehaviour
{
    public float triggerDistance = 6f;

    private AudioSource source;
    private Transform enemyTransform;
    private float timer;

    void Start()
    {
        source = gameObject.AddComponent<AudioSource>();
        source.clip = GenerateHeartbeatClip();
        source.loop = false;
        source.spatialBlend = 0f;
        source.volume = 0.6f;
    }

    void Update()
    {
        if (enemyTransform == null)
        {
            GameObject enemy = GameObject.Find("Enemy");
            if (enemy == null) return;
            enemyTransform = enemy.transform;
        }

        float dist = Vector3.Distance(transform.position, enemyTransform.position);
        timer -= Time.deltaTime;
        if (dist < triggerDistance && timer <= 0f)
        {
            timer = Mathf.Lerp(0.35f, 1.1f, dist / triggerDistance);
            source.Play();
        }
    }

    AudioClip GenerateHeartbeatClip()
    {
        int sampleRate = 44100;
        float duration = 0.25f;
        int samples = (int)(sampleRate * duration);
        AudioClip clip = AudioClip.Create("Heartbeat", samples, 1, sampleRate, false);
        float[] data = new float[samples];
        for (int i = 0; i < samples; i++)
        {
            float t = (float)i / sampleRate;
            float envelope = Mathf.Exp(-t * 18f);
            data[i] = Mathf.Sin(2 * Mathf.PI * 55f * t) * envelope;
        }
        clip.SetData(data, 0);
        return clip;
    }
}
