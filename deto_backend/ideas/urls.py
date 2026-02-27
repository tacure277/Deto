from django.urls import path
from ideas.views import idea_views

urlpatterns = [

    path('ideas/', idea_views.lista_ideas),
    path('ideas/crear/', idea_views.crear_idea),
    path('ideas/<int:idea_id>/', idea_views.detalle_idea),

]