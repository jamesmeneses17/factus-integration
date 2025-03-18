import requests

#credenciales y url de la API
URL_AUTH = 'https://api-sandbox.factus.com.co/oauth/token'
EMAIL = 'sandbox@factus.com.co'
PASSWORD = 'sandbox2024%'
CLIENT_ID = '9e5044cb-f5b5-49b1-aa73-dff89bb8adfd'
CLIENT_SECRET = 'vTSznOQscc1mu5wnCas4Lsm9TDiMgF0hC1KGQvky'
REFRESH_TOKEN = 'def50200b68347532eec38e8b6ea81b3c107a3fe8fd6522fc9fbb19f31f3711c7a6d87dc509ffc4266739387a99f219ea735a3981ad0a416ae77b96ea6ce304cc99394c650aefb350b1562b6e63c4c33bc0ef03384f0e0cbd5a52c1680fb38e387c9e9949fe51b3f1f65996e4c2003065a79a0d1fa251cf172de2670eaabdf12cee63d5bc2b34a873f388cb9819d3653f6475d980e28aeba4425c93a75477b2d7307673ad6f516fc2dc7822b5e759dfa6a7f2bb5fb35f52616362de9929e978999d641248337e0bb5df60bc842e960556d12740b5fe5792c9954f8850308bdc3433bd13e1960f63faa0c4bdfd07289eb12518d3a21a134301070bd08862e457c3eac5a616765a591f12d23640935ade6fef25e3c67e23b03731a2314c9cc4328782b762934b4a4dcc882f7021b7d0eab91cc271529a1fe36e0fd639759756e2d2d4876ba0d4696f7a21dad1cfc6296303fd87e97a2c5a2d95652ad3bf06ca4ea2aad142aac8785bcbaf342dd472b4614d538f35e943f0f3a040c68e411c25ac639e0e6ea'


def obtener_token():
    # Solicita un nuevo access token y refresh token utilizando las credenciales de usuario
    data = {
        "grant_type": "password",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "username": EMAIL,
        "password": PASSWORD,
    }
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    
    response = requests.post(URL_AUTH, data=data, headers=headers)

    if response.status_code == 200:
        new_tokens = response.json()
        new_access_token = new_tokens["access_token"]
        new_refresh_token = new_tokens["refresh_token"]
    
        print(f"Nuevo access_token: {new_access_token}")
    
        return new_access_token, new_refresh_token
    else:
        print("Error al obtener el token", response.json())
        return None, None


def refresh_acces_token():
    #obtiene un nuevo access token usando el refresh 
    
    data ={
       "grant_type": "refresh_token",
         "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": REFRESH_TOKEN
    }
    
    response = requests.post(URL_AUTH, data=data)

    if response.status_code == 200:
      new_tokens = response.json()
      new_access_token = new_tokens["access_token"]
      new_refresh_token = new_tokens.get("refresh_token", REFRESH_TOKEN)
    
      print(f"Nuevo access_token: {new_access_token}")
    
      return new_access_token, new_refresh_token
    else:
      print("Error al refrescar el token", response.json())
      return None, None


# Llamado a la funcion

access_token, refresh_token = obtener_token()
print(access_token, refresh_token)