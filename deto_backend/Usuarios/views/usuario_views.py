from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Usuarios.models.usuario_model import Usuario
from Usuarios.serializers import UsuarioSerializer



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