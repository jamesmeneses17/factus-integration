import requests
ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTUwNDRjYi1mNWI1LTQ5YjEtYWE3My1kZmY4OWJiOGFkZmQiLCJqdGkiOiI5MzE5OTU2MmVlYzY0ZDA1NGRlNzI2ZDhjZWNiMTRlNWY4N2Q2YTNiYWUyZWI3NDQxNDA2MmI1ODQ4YmNjZWNkOWQ4M2NlZTc3NDhhZmM3NCIsImlhdCI6MTc0MTY0MTY0Mi4xNjkwMiwibmJmIjoxNzQxNjQxNjQyLjE2OTAyMiwiZXhwIjoxNzQxNjQ1MjQyLjE2MDQ2NCwic3ViIjoiMyIsInNjb3BlcyI6W119.HloyRebNx29AsSO1khMQyklWossxejFfD2wvTE1ptQO9iviS6PZ6EPde0gdVPxz_4KPnEIkUqWIPsziYvkLwiFxHXBFRDjREwBfnGZHVOlyiuos0M6SLDQRFvB_VqiQVmILy3EDcCMOKx0fuE4QUoCSMxeltvMRs7hQifYiuOyFfGB026EcXEIvG3tu46Ssao57Gs73E4V4RcMGmplUh_v0LWKHMyWKkUGYYXTcHnB0r-wWMBqoyvqpZ0n9OPkD96pPb_lMHvZXgZs6yhs5VwT6YKGBseoIeaChmsj61Ruzl9_q_r3cG8-NlNAwEnyjIL8qZURlp6zJ3kztX7s6ZdaKOagj9XvNg13buBBMXjbAsCiA6Ywy6OAx2XjaFdz46Nfg0hO7vqp2dsalRYluQsFtM-0hW6ZDgAgGc8zxbrO3LVRYmgRW1D4aCKv4xkW1gdoOPviu6mkyxBRQKIYGzCmthTLaejPfXfdVNN3EKeXOqRQ8regT2_o4K2JMlMlqKyr4SKEL59x8PmorQvyMQ5v5tHHRsdKbfDadK_fT7plBCqZjHkPr7xrc783b0WhzaAp-0GGvQoW7OCo81iXru3YCoR0904OnKI0oQpBCpODcGJ2UqNFDFiowElM3T8QeyyEzFRHgcRbv6lgJalVUVtxDspVwlqNRcATIcjTYJpp4"
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
        