"""
URL configuration for factus_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import (obtener_rangos, obtener_municipios, obtener_tributos, obtener_unidades_medida,crear_factura,FacturaListView,ver_factura,descargar_pdf,eliminar_factura_view)
    

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/rangos/', obtener_rangos, name='obtener_rangos'),
    path('api/municipios/', obtener_municipios, name='obtener_municipios'),
    path('api/tributos/', obtener_tributos, name='obtener_tributos'),
    path('api/unidades-medida/', obtener_unidades_medida, name='obtener_unidades_medida'),
    path('api/factura/', crear_factura, name='crear_factura'),
    path('api/facturas/', FacturaListView.as_view(), name='listar_facturas'),
    path('api/factura/<str:numero_factura>/', ver_factura, name='ver_factura'),
    path('api/factura/pdf/<str:numero_factura>/', descargar_pdf, name='descargar_pdf_factura'),
    path('api/factura/eliminar/<str:reference_code>/', eliminar_factura_view, name='eliminar_factura'),
]
