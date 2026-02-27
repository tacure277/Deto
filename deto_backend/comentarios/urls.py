from django.urls import path
from comentarios.views import comentario_view

urlpatterns = [
    path('ideas/<int:idea_id>/comentarios/', comentario_view.comentarios),

    path('ideas/<int:idea_id>/comentarios/crear/', comentario_view.crear_comentario),
]