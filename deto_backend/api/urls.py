from django.urls import path
from . import views

urlpatterns = [
    path('auth/registro/', views.registro),
    path('auth/login/', views.login),
    path('usuario/<int:usuario_id>/perfil/', views.perfil),
    path('ideas/', views.lista_ideas),
    path('ideas/crear/', views.crear_idea),
    path('ideas/<int:idea_id>/', views.detalle_idea),
    path('ideas/<int:idea_id>/comentarios/', views.comentarios),
]
