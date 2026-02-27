from rest_framework import serializers
from usuarios.models.usuario_model import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    foto_perfil_url = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ['usuario_id', 'nombre', 'correo', 'descripcion', 'fecha_creacion', 'foto_perfil_url']
    def get_foto_perfil_url(self, obj) :
        if obj.foto_perfil :
            request = self.context.get('request')
            return request.build_absolute_uri(obj.foto_perfil.url)
        return None


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'contraseña']
        extra_kwargs = {
            'contraseña': {'write_only': True}
        }

    def validate_nombre(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("El nombre debe tener al menos 3 caracteres")
        return value

    def validate_correo(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("El correo debe ser @gmail.com")
        return value

    def validate_contraseña(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("La contraseña debe tener al menos un número")
        return value

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    contraseña = serializers.CharField()

