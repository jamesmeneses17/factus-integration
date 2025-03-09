from django.http import JsonResponse
from .services import obtener_datos_factus  # Asegúrate de importar correctamente la función

def obtener_rangos(request):
    data = obtener_datos_factus()  # Llama a la función correcta
    return JsonResponse(data, safe=False)  # Devuelve los datos en formato JSON
