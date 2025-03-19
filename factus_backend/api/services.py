import requests
from  .auth_factus import obtener_token,refresh_acces_token


ACCESS_TOKEN, REFRESH_TOKEN = obtener_token()

headers = {
    "Authorization":f"Bearer {ACCESS_TOKEN}",
    "Content-Type":"application/json"
}

def obtener_datos_factus(url):
    # Funcion para obtener los datos desde cualquier URL de Factus
    try:
        response = requests.get(url, headers=headers)
        print(f"Codigo de respuesta ({url}) : {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code == 200:
            return response.json() # Devuelve la respuesta en formato JSON
        else:
            return {"error":f"Error {response.status_code}: {response.text}"}
        
    except requests.exceptions.RequestException as e:
            return {"error":f"Error {e}"}
        
def enviar_factura(data_factura):
    #Funcion para enviar factura a factus
     url = "https://api-sandbox.factus.com.co/v1/bills/validate"  # Url de prueba para enviar factura
     
     try :
         response = requests.post(url,json=data_factura, headers=headers)
         print(f"Codigo de respuesta : {response.status_code}")
         print(f"Respuesta de Factus : {response.text}")
         
         if response.status_code in [200,201]:
             return response.json()  #Devuelve la respuesta en formato JSON con el resultado
         else:
             return {"error":f"Error {response.status_code}: {response.text}"}
         
    
     except requests.exceptions.RequestException as e:
           return {"error": f"⚠️ Error de conexión: {str(e)}"}


def obtener_facturas(filtros):
    url = "https://api-sandbox.factus.com.co/v1/bills"
    params = {f"filter[{key}]": value for key, value in filtros.items() if value}
    
    try:
        response = requests.get(url, headers=headers, params=params)
        print(f"Codigo de respuesta ({url}) : {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code == 200:
            return response.json()  # Devuelve la respuesta en formato JSON
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
        
    except requests.exceptions.RequestException as e:
        return {"error": f"Error {e}"}

def obtener_factura_por_numero(numero_factura):
    #obetener factura por numero
    url = f"https://api-sandbox.factus.com.co/v1/bills/show/{numero_factura}"
    try :
        response = requests.get(url,headers=headers)
        print(f"Código de respuesta ({url}): {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code == 200:
            return response.json()
        else:
            return {"error":f"Error {response.status_code}: {response.text}"}
    except requests.exceptions.RequestException as e:
        return {"error":f"Error {e}"}

        
        