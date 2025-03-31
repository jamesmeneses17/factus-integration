from django.http import JsonResponse
from .services import obtener_datos_factus, obtener_facturas,obtener_factura_por_numero,descargar_pdf_factura,eliminar_factura,obtener_eventos_factura,enviar_evento_aceptacion_tacita,crear_validar_nota_credito

from django.views.decorators.csrf import csrf_exempt
import json
from .services import enviar_factura,listar_notas_credito
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .auth_factus import obtener_token

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
    

def ver_factura(request, numero_factura):
    #vista para ver una factura por numero
    
    data = obtener_factura_por_numero(numero_factura)
    return JsonResponse(data)


def descargar_pdf(request, numero_factura):
    #vista para descargar el pdf
    
    data =descargar_pdf_factura(numero_factura)
    return JsonResponse(data)

def eliminar_factura_view(request, reference_code):
    #vista para eliminar una factura
    
    data = eliminar_factura(reference_code)
    return JsonResponse(data, safe=False)

def eventos_factura(request, numero_factura):
    
    #vista para obtener los eventos de una factura
    
    data = obtener_eventos_factura(numero_factura)
    return JsonResponse(data, safe=False)

@csrf_exempt
def aceptar_tacita(request, numero_factura, event_type):
  # vista para enviar un evento de aceptación tácita
  
    if request.method == "POST":
        try:
            datos_evento = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "El cuerpo de la solicitud no es un JSON válido."}, status=400)
        
        resultado = enviar_evento_aceptacion_tacita(numero_factura, event_type, datos_evento)
        return JsonResponse(resultado, safe=False)
    else:
        return JsonResponse({"error": "Método no permitido."}, status=405)
    
@csrf_exempt
def crear_nota_credito(request):
    if request.method == "POST":
        try:
            # Obtener el cuerpo de la solicitud
            data_nota_credito = json.loads(request.body)
            
            # Obtener el token de acceso
            access_token, _ = obtener_token()
            if not access_token:
                return JsonResponse({"error": "No se pudo obtener el token de acceso."}, status=401)
            
            # Llamar al servicio para crear y validar la nota crédito
            resultado = crear_validar_nota_credito(access_token, data_nota_credito)
            return JsonResponse(resultado, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "⚠️ Error: Formato JSON inválido"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"⚠️ Error inesperado: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "⚠️ Método no permitido"}, status=405)
    
    
@csrf_exempt
def ver_notas_credito(request):
    """
    Vista para listar y filtrar notas crédito.
    """
    if request.method == "GET":
        # Obtener el token de acceso
        access_token, _ = obtener_token()
        if not access_token:
            return JsonResponse({"error": "No se pudo obtener el token de acceso."}, status=401)
        
        # Obtener los filtros de la solicitud
        filtros = request.GET.dict()  # Convierte los parámetros de la URL en un diccionario
        
        # Llamar al servicio para listar las notas crédito
        resultado = listar_notas_credito(access_token, filtros)
        return JsonResponse(resultado, safe=False)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)