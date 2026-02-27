from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from comentarios.models.comentario_model import Comentario
from comentarios.serializers.comentario_serializers import ComentarioSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def comentarios(request, idea_id):
    if request.method == 'GET':
        comentarios = Comentario.objects.filter(idea_id=idea_id)
        serializer = ComentarioSerializer(comentarios, many=True, context={'request': request})
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_comentario(request, idea_id):

    token_usuario_id = request.auth.payload.get('user_id')



    contenido = request.data.get('contenido')

    if not contenido:
        return Response({'error': 'El contenido es requerido'}, status=400)

    try:
        comentario = Comentario.objects.create(
            contenido=contenido,
            usuario_id=token_usuario_id,
            idea_id=idea_id
        )

        serializer = ComentarioSerializer(comentario, context={'request': request})
        return Response(serializer.data, status=201)

    except Exception as e:

        return Response({'error': str(e)}, status=500)