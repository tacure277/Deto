from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from ideas.serializers.idea_serializers import IdeaSerializer
from usuarios.models.usuario_model import Usuario
from ideas.models.idea_model import Idea


@api_view(['GET'])
@permission_classes([AllowAny])  # Cualquiera puede ver ideas
def lista_ideas(request):
    usuario_id = request.query_params.get('usuario_id')
    if usuario_id:
        ideas = Idea.objects.filter(usuario_id=usuario_id)
    else:
        ideas = Idea.objects.all()

    serializer = IdeaSerializer(ideas, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_idea(request):

    usuario_id = request.auth.payload.get('user_id')


    try:
        usuario = Usuario.objects.get(usuario_id=usuario_id)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)


    es_anonima = request.data.get('es_anonima', False)

    if isinstance(es_anonima, str):
        es_anonima = es_anonima.lower() == 'true'

    try:
        idea = Idea.objects.create(
            titulo=request.data.get('titulo'),
            descripcion=request.data.get('descripcion'),
            es_anonima=es_anonima,
            imagen=request.FILES.get('imagen'),
            usuario=usuario
        )
    except Exception as e:
        return Response({'error': str(e)}, status=500)

    serializer = IdeaSerializer(idea, context={'request': request})
    return Response(serializer.data, status=201)
@api_view(['GET'])
@permission_classes([AllowAny])
def detalle_idea(request, idea_id):
    try:
        idea = Idea.objects.get(idea_id=idea_id)
        serializer = IdeaSerializer(idea, context={'request': request})
        return Response(serializer.data)
    except Idea.DoesNotExist:
        return Response({'error': 'Idea no encontrada'}, status=404)