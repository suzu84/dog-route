using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 4f;
    public float lookSpeed = 2f;
    public float gravity = -9.81f;

    private CharacterController controller;
    private Camera cam;
    private float pitch;
    private Vector3 velocity;

    void Start()
    {
        controller = GetComponent<CharacterController>();
        cam = GetComponentInChildren<Camera>();
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    void Update()
    {
        if (GameManager.Instance != null && GameManager.Instance.GameOver) return;

        float mouseX = Input.GetAxis("Mouse X") * lookSpeed;
        float mouseY = Input.GetAxis("Mouse Y") * lookSpeed;
        transform.Rotate(Vector3.up * mouseX);
        pitch = Mathf.Clamp(pitch - mouseY, -80f, 80f);
        cam.transform.localRotation = Quaternion.Euler(pitch, 0, 0);

        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 move = (transform.right * h + transform.forward * v);
        move = Vector3.ClampMagnitude(move, 1f) * moveSpeed;

        if (controller.isGrounded && velocity.y < 0) velocity.y = -1f;
        velocity.y += gravity * Time.deltaTime;

        controller.Move((move + velocity) * Time.deltaTime);
    }
}
