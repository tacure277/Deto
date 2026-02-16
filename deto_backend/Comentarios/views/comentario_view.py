from rest_framework.decorators import api_view
from rest_framework.response import Response

from Comentarios.serializers.comentario_serializers import ComentarioSerializer
from Usuarios.models.usuario_model import Usuario
from Ideas.models.idea_model import Idea
from Comentarios.models.comentario_model import Comentario




@api_view(['GET', 'POST'])
def comentarios(request, idea_id):
    try:
        idea = Idea.objects.get(idea_id=idea_id)
    except Idea.DoesNotExist:
        return Response({'error': 'Idea no encontrada'}, status=404)

    if request.method == 'GET':
        comentarios = Comentario.objects.filter(idea=idea)
        return Response(ComentarioSerializer(comentarios, many=True).data)

    if request.method == 'POST':
        usuario_id = request.data.get('usuario_id')
        try:
            usuario = Usuario.objects.get(usuario_id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)
        comentario = Comentario.objects.create(
            contenido=request.data.get('contenido'),
            usuario=usuario,
            idea=idea
        )
        return Response(ComentarioSerializer(comentario).data, status=201)