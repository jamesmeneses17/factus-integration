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

def descargar_pdf_factura(numero_factura):
    #descargar pdf de una factura
    
    url = f"https://api-sandbox.factus.com.co/v1/bills/download-pdf/{numero_factura}"
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

        
def eliminar_factura(reference_code):
    
    # eliminar factura por referencia
    
    url = f"https://api-sandbox.factus.com.co/v1/bills/destroy/reference/{reference_code}"
    try:
        response = requests.delete(url, headers=headers)
        print(f"Código de respuesta ({url}): {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code == 200:
            return response.json()  # Devuelve la respuesta en formato JSON
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Error de conexión: {str(e)}"}
        

def obtener_eventos_factura(numero_factura):
    #obtener eventos de una factura
    
    url = f"https://api-sandbox.factus.com.co/v1/bills/{numero_factura}/radian/events"
    try:
        response = requests.get(url, headers=headers)
        print(f"Código de respuesta ({url}): {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Error {e}"}


def enviar_evento_aceptacion_tacita(numero_factura, event_type, datos_evento):
    url = f"https://api-sandbox.factus.com.co/v1/bills/radian/events/update/{numero_factura}/{event_type}"
    try:
        response = requests.post(url, json=datos_evento, headers=headers)
        print(f"Código de respuesta ({url}): {response.status_code}")
        print(f"Respuesta de Factus ({url}): {response.text}")
        
        if response.status_code in [200, 201]:
            return response.json()
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Error de conexión: {str(e)}"}
    


def crear_validar_nota_credito(access_token, data_nota_credito):
    "Crear y validar nota credito en Factus"
    
    url = "https://api-sandbox.factus.com.co/v1/credit-notes/validate"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }
    
    try:
        response = requests.post(url, json=data_nota_credito, headers=headers)
        
        if response.status_code == 201:
            print("Nota crédito creada y validada exitosamente.")
            return response.json()
        elif response.status_code == 409:
            print("Conflicto: La nota crédito ya existe.")
            return response.json()
        elif response.status_code == 422:
            print("Error de validación en los datos enviados.")
            return response.json()
        else:
            print(f"Error inesperado: {response.status_code}")
            return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {str(e)}")
        return {"error": str(e)}


def listar_notas_credito(access_token, filtros=None):
    "Listar todas las notas crédito en Factus"
    
    url = "https://api-sandbox.factus.com.co/v1/credit-notes?filter[identification]&filter[names]&filter[number]&filter[prefix]&filter[reference_code]&filter[status]"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }
    
    # Agregar filtros a la URL si existen
    if filtros:
        params = "&".join([f"filter[{key}]={value}" for key, value in filtros.items()])
        url = f"{url}?{params}"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()  # Devuelve las notas crédito
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Error de conexión: {str(e)}"}