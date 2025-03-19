import requests

url = "http://example.com/api/factura/"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
elif response.status_code == 409:
    error_detail = response.json()
    print(f"Error 409: {error_detail['message']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
