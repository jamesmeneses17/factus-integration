import requests
#credenciales y url de la API

URL_AUTH='https://api-sandbox.factus.com.co/oauth/token'
EMAIL='sandbox@factus.com.co'
PASSWORD='sandbox2024%'
CLIENT_ID='9e5044cb-f5b5-49b1-aa73-dff89bb8adfd'
CLIENT_SECRET='vTSznOQscc1mu5wnCas4Lsm9TDiMgF0hC1KGQvky'

def obtener_token():
    #solicita el token de acceso a la API de factus
    payload = {
        "grant_type": "password",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,   
        "username": EMAIL,
        "password": PASSWORD, 
    }
    
    headers ={
        "Content_Type": "application/x-www-form-urlencoded",
    }
    
    response = requests.post(URL_AUTH, data=payload, headers=headers)
    
    
   
    if response.status_code == 200:
       return  response.json()
       
    else:
        print("Error al obtener el token",response.status_code, response.text)
        return None

# Llamado a la funcion
token_response = obtener_token()
print(token_response)

