using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

[SerializeField]
class User
{
    public string username;
    public string password;
}
public class LogInService : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(GetText());
    }

    public void SignIn()
    {
        StartCoroutine(GetText());
    }

    IEnumerator PostLogin(user)
    {
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:8080/user/signin", "");
        yield return www.Send();

        if (www.isError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // Show results as text
            Debug.Log(www.downloadHandler.text);

            // Or retrieve results as binary data
            byte[] results = www.downloadHandler.data;
        }
    }
}
