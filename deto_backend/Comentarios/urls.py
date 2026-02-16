from django.urls import path
from Comentarios.views import comentario_view
urlpatterns = [

    path('ideas/<int:idea_id>/comentarios/', comentario_view.comentarios),
]