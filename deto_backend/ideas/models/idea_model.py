from django.db import models
from usuarios.models.usuario_model import Usuario


class Idea(models.Model):
    idea_id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    es_anonima = models.BooleanField(default=False)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    imagen = models.ImageField(upload_to="ideas/", null=True, blank=True)
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='ideas'
    )

    class Meta:
        db_table = 'ideas'
        verbose_name = 'Idea'
        verbose_name_plural = 'ideas'
        ordering = ['-fecha_publicacion']

    def save(self, *args, **kwargs):
        if not self.titulo:
            raise ValueError("Título vacío")
        if not self.descripcion:
            raise ValueError("Descripción vacía")
        if not self.usuario_id:
            raise ValueError("Usuario requerido")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.idea_id}] {self.titulo}"