import requests

ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTUwNDRjYi1mNWI1LTQ5YjEtYWE3My1kZmY4OWJiOGFkZmQiLCJqdGkiOiI1ZDQ0ZDM4MTEyMTkwNDNlNzIyNGNmNGE0MDg0MTU0NzkzNTg1OGZhYWFiN2MyYTE4Mzg0MDY3YzZlZDQyOTYyNmQ3MGQxMzY4YzdkNjk0OSIsImlhdCI6MTc0MTU2NTAxOS4zNjI1OTUsIm5iZiI6MTc0MTU2NTAxOS4zNjI1OTcsImV4cCI6MTc0MTU2ODYxOS4zNTE2NTIsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.X-ALn1hdc1vvbTEM-Gm1pjDQl3WmYyZN2hYe79BqQeVrajlrTw-wjoPB7TgziUhlJnrWQBq-1vv2AXbBJnu-gxErCf_uzhYO_ZkG555bnf1fxY_RAs5NtnXeUa6Tc1vCMNhQRGSn9Cfh5IFAUbNPFcCil48KZXm_Y8LBhmvsbbWwP03R15gFDpJvGRxM44SeMiMO7XrcoZ61m0sgftWV5e_sdLrxxa4dIrCtx3cN9FV6I4Af9cPhfYvXRUpOG7ifL574u2G5fUqqIZ7PyoI43GjVljageOx70OMVVT_pdE6mCKEtR0HoGUGp2oB6idqTnBJFQ_FG41YJrKkCXrqvPr1ovmxfrfWCHmfYIYoOZ53cm752MUFS8DZYBtJR6F9jl3RAczoH25WAVU87P61a1AwTUcW0b5kBK3YhMZajE7VncaW_pB70VuHHYNDwlnP-Vra49SWD6aSbkN99K8uYsec474EwtJg_b8iY5-Y77MGuHjJMOlPfHLcKi-2CITFdTIWceewszWcSTcW6t-VkovLNdDfurOqFeFFI4_YxY0xjP56Mkn4uDEUvJ2lLGIFw0StEH5w03CfOsvn0YbM1s2NSnkAKP7sGaOLjq2vnXuxNen542nqPFmP1-KsSZ6SIYgCF9aQ8CD6ky-BuulN8jTdbEWQ_0Yj97bwRR3on24c" # Aquí usas tu token real


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
        
      