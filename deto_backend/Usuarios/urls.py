from django.urls import path

from Usuarios.views import usuario_views
urlpatterns = [
    # Usuario views
    path('auth/registro/', usuario_views.registro),
    path('auth/login/', usuario_views.login),
    path('usuario/<int:usuario_id>/perfil/', usuario_views.perfil),


]