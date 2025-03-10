from django.http import JsonResponse
from .services import obtener_datos_factus

#Urls de prueba para obtener datos de Factus

URL_RANGOS = "https://api-sandbox.factus.com.co/v1/numbering-ranges?filter[id]&filter[document]&filter[resolution_number]&filter[technical_key]&filter[is_active]"
URL_MUNICIPIOS = "https://api-sandbox.factus.com.co/v1/municipalities"
URL_TRIBUTOS = "https://api-sandbox.factus.com.co/v1/tributes/products?name="
URL_UNIDADES = "https://api-sandbox.factus.com.co/v1/measurement-units"

def obtener_rangos_numeracion(request):
    data = obtener_datos_factus(URL_RANGOS)
    return JsonResponse(data)

def obtener_municipios(request):
    data = obtener_datos_factus(URL_MUNICIPIOS)
    return JsonResponse(data)

def obtener_tributos(request):
    data = obtener_datos_factus(URL_TRIBUTOS)
    return JsonResponse(data)

def obtener_unidades_medida(request):
    data = obtener_datos_factus(URL_UNIDADES)
    return JsonResponse(data)