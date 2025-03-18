from django.http import JsonResponse
from .services import obtener_datos_factus, obtener_facturas
from django.views.decorators.csrf import csrf_exempt
import json
from .services import enviar_factura
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

#Urls de prueba para obtener datos de Factus

URL_RANGOS = "https://api-sandbox.factus.com.co/v1/numbering-ranges?filter[id]&filter[document]&filter[resolution_number]&filter[technical_key]&filter[is_active]"
URL_MUNICIPIOS = "https://api-sandbox.factus.com.co/v1/municipalities"
URL_TRIBUTOS = "https://api-sandbox.factus.com.co/v1/tributes/products?name="
URL_UNIDADES = "https://api-sandbox.factus.com.co/v1/measurement-units"

def obtener_rangos(request):
    data = obtener_datos_factus(URL_RANGOS)
    return JsonResponse(data, safe=False)

class FacturaListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        filtros = {
            "identification": request.GET.get("filter[identification]"),
            "names": request.GET.get("filter[names]"),
            "number": request.GET.get("filter[number]"),
            "prefix": request.GET.get("filter[prefix]"),
            "reference_code": request.GET.get("filter[reference_code]"),
            "status": request.GET.get("filter[status]"),
        }
        
        data = obtener_facturas(filtros)
        return Response(data)
    

def obtener_municipios(request):
    data = obtener_datos_factus(URL_MUNICIPIOS)
    return JsonResponse(data)

def obtener_tributos(request):
    data = obtener_datos_factus(URL_TRIBUTOS)
    return JsonResponse(data)

def obtener_unidades_medida(request):
    data = obtener_datos_factus(URL_UNIDADES)
    return JsonResponse(data)

@csrf_exempt
def crear_factura(request):
    if request.method == "POST":
        try:
            data_factura = json.loads(request.body) #Convierte Json a diccionario
            resultado = enviar_factura(data_factura)
            return JsonResponse(resultado)
        except json.JSONDecodeError:
          return JsonResponse({"error": "⚠️ Error: Formato JSON inválido"}, status=400)
    else:
           return JsonResponse({"error": "⚠️ Método no permitido"}, status=405)