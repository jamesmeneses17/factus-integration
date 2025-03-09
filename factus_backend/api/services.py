import requests

FACTUS_API_URL = "https://api.factus.com.co/v1/numbering-ranges?filter[id]&filter[document]&filter[resolution_number]&filter[technical_key]&filter[is_active]"  # Verifica la URL correcta
ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZTUwNDRjYi1mNWI1LTQ5YjEtYWE3My1kZmY4OWJiOGFkZmQiLCJqdGkiOiJjNjQ0NTZmYTY3MmRiYzc2N2EwY2Y3MjFjZjM4NWQ5NjZkZDMxYjlhNjYyZDdhZTc5NzBhNjcyN2NmYWNiYjM2YmQxYzFmYjFiNjZmM2JiNiIsImlhdCI6MTc0MTUwMzkyNS44MDg1MzksIm5iZiI6MTc0MTUwMzkyNS44MDg1NDEsImV4cCI6MTc0MTUwNzUyNS43OTc2NjksInN1YiI6IjMiLCJzY29wZXMiOltdfQ.r4vVMCPym3_zM4NROwXRarLOsecpAf8nTULuPdRHpgzUOcTIm6yqMSoUT0NcpHc5xXy7Kh1P_ak7wTo6irz4W6tIy6wZRS8_Oc7-93BguIjBuheS5zneU4-XCoqspO2WZ6dDCSST4l-O1VqEQ-cj548tSQKlI-miN7kn40cBxkTVTuJb8YrL_4SZNvQGOF9rZBnr_9sDLpiC1w2jv-X_nzhWP_DWM7ytV72avudPYilp81nJyZ3col4Feocb4m8rB4hm4GtkvHrt4d5Qk_1OvKqFlaJwXocGDtC-fuvJSRAwXzLruJHawKb0xRE2eyRuLxt42QqJSqWn7zRvAbmw3SgxGDf2glc4CO0AtARCEAP_4kvYmPzfFTXZNq2vDvS7VF1yx27Z-Dcyasc3f8YNPZKphxFxFzvjb8XkESoK8L6ndsxI8aW3YXnsQNbcpbZ9m8WOMmrLyrnnmWg2Wf6zyPfKu21fAJjbqWL5H1koSB02OIyYjtL5HOitfxhwXJTc7Sg5itjjeO2Ee5McXbHgGWpLolr2xTOQXr6Vqs50g92QjnxYVrX8m_MfUXD8kE8_iEO4o2Rh0i6HoZDedHkv5NlCweZ7eo1_-8KW9jVJ3u-LqMchS9K-kT42dOs2cZGOhnHW_YysqmX4ElJfOUZc5KZyc2SSI7mEZnSlmCeaKxE"

headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json",
}

def obtener_datos_factus():
    try:
        response = requests.get(FACTUS_API_URL, headers=headers)
        print(f"📌 Código de respuesta: {response.status_code}")  # ✅ Ver código de estado
        print(f"📌 Respuesta de Factus: {response.text}")  # ✅ Ver respuesta JSON en crudo

        if response.status_code == 200:
            return response.json()  # ✅ Devuelve los datos JSON
        else:
            return {"error": f"⚠️ Error {response.status_code}: {response.text}"}

    except requests.exceptions.RequestException as e:
        return {"error": f"⚠️ Error de conexión: {str(e)}"}
