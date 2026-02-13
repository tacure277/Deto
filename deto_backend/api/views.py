from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models.usuario_model import Usuario
from .models.idea_model import Idea
from .models.comentario_model import Comentario
from .serializers import UsuarioSerializer, IdeaSerializer, ComentarioSerializer


@api_view(['POST'])
def registro(request):
    correo = request.data.get('correo')
    if Usuario.objects.filter(correo=correo).exists():
        return Response({'error': 'Correo ya registrado'}, status=400)
    usuario = Usuario.objects.create(**request.data)
    return Response(UsuarioSerializer(usuario).data, status=201)


@api_view(['POST'])
def login(request):
    try:
        usuario = Usuario.objects.get(
            correo=request.data.get('correo'),
            contraseña=request.data.get('contraseña')
        )
        return Response(UsuarioSerializer(usuario).data)
    except Usuario.DoesNotExist:
        return Response({'error': 'Credenciales incorrectas'}, status=401)


@api_view(['GET', 'PUT'])
def perfil(request, usuario_id):
    try:
        usuario = Usuario.objects.get(usuario_id=usuario_id)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)

    if request.method == 'GET':
        return Response(UsuarioSerializer(usuario).data)

    if request.method == 'PUT':
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


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