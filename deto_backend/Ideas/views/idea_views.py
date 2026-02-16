from rest_framework.decorators import api_view
from rest_framework.response import Response

from Ideas.serializers.idea_serializers import IdeaSerializer
from Usuarios.models.usuario_model import Usuario
from Ideas.models.idea_model import Idea


@api_view(['GET'])
def lista_ideas(request):
    usuario_id = request.query_params.get('usuario_id')
    if usuario_id:
        ideas = Idea.objects.filter(usuario_id=usuario_id)
    else:
        ideas = Idea.objects.all()
    return Response(IdeaSerializer(ideas, many=True).data)


@api_view(['POST'])
def crear_idea(request):
    usuario_id = request.data.get('usuario_id')
    try:
        usuario = Usuario.objects.get(usuario_id=usuario_id)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)
    idea = Idea.objects.create(
        titulo=request.data.get('titulo'),
        descripcion=request.data.get('descripcion'),
        es_anonima=request.data.get('es_anonima', False),
        usuario=usuario
    )
    return Response(IdeaSerializer(idea).data, status=201)


@api_view(['GET'])
def detalle_idea(request, idea_id):
    try:
        idea = Idea.objects.get(idea_id=idea_id)
        return Response(IdeaSerializer(idea).data)
    except Idea.DoesNotExist:
        return Response({'error': 'Idea no encontrada'}, status=404)