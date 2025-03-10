import requests
ACCESS_TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTUwNDRjYi1mNWI1LTQ5YjEtYWE3My1kZmY4OWJiOGFkZmQiLCJqdGkiOiJkOTI2NDZkMDg3NzM3YTMzNzRhYzI2OWU1MDNjZjU0NWIwNDY3NTA0YzAyMDNiMDQ1ZDYzYjYwNTEwMGJlYzM0YmRkMzNkZjhiNTljZWFkMCIsImlhdCI6MTc0MTU3OTI5OS43NjkzMTIsIm5iZiI6MTc0MTU3OTI5OS43NjkzMTQsImV4cCI6MTc0MTU4Mjg5OS43NTkwNTcsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.eF54xWEaft2FtaosdtJmJ-oathQP4A9cdC8LTeOWXwb_XlTYn38A05uEcPCDEKeELpLEzgyVm40XwCXUFwPEUUhrjqB3QqXm1uX6RM_4_ZMVO1sShe8Oc9FeHXYOFQvpfLtqr6GINba4HKq5xa2qSvjZE6zJKJHzNG6peTxUhDbY-Y4EQsQW5JU4WtStU7RbCM3vyhJkI3iypqWZBIZS9LCXnqAy07yqNm-FakzG4C9Wv-L2oaqJrL55Dg1_dTETOMi4nBAtJP-CtysAV1evJj2NBZ3LLG58tvTsiv9ie4Z1aZWz4sQHfMefOMFfPMcfnrtPGwtQD1bRGGLNKcjbgzYFc1Wbj_K0VM3LBwIStzxwq3Hk_W06PEqBL3qsOElfnQ350KEnT4vKUzMsRfftYyU9gjDRJZYJ2xe_KQ5gwNTkVl6LBVzd4CwEGkbTPWMKrKkN19dNwadOqTPmQ5TD0sZjClhu91Naq5eCdpjBstzo_Df-sOGHLF8OmdU_3dt6_-DJPZ0mnWtNI506Z_JNIJxcSvhM6DV1S-VcT3Zo2A6hX0B3kQrW33pOfebxiQSxFY26MoybGMYRETKVR7ojjISAg8g6I4RWWIvIrcjSnIdgQxkHBwek3tPvlbc80KERZlIg_ervV_5lGBHcSn8ID0KxAkdsWJy5rg873q3cxU0"

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
        