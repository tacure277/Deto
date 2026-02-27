package com.alvaro.deto_android.service;

import com.alvaro.deto_android.models.Comentario;
import com.alvaro.deto_android.requests.ComentarioRequest;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import retrofit2.Call;
import retrofit2.http.*;


public interface ComentarioService {

    @GET("ideas/{idea_id}/comentarios/")
    Call<List<Comentario>> obtenerComentarios(@Path("idea_id") int ideaId);

    @POST("ideas/{idea_id}/comentarios/crear/")
    Call<Comentario> crearComentario(@Path("idea_id") int ideaId, @Body ComentarioRequest request);
}