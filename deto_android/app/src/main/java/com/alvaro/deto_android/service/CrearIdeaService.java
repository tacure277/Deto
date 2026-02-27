package com.alvaro.deto_android.service;

import com.alvaro.deto_android.models.Idea;
import com.alvaro.deto_android.requests.CrearIdeaRequest;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface CrearIdeaService {

    @GET("ideas/")
    Call<List<Idea>> getIdeas();

    @Multipart
    @POST("ideas/crear/")
    Call<Idea> crearIdea(
            @Part("titulo") RequestBody titulo,
            @Part("descripcion") RequestBody descripcion,
            @Part("es_anonima") RequestBody esAnonima,
            @Part MultipartBody.Part imagen
    );
}
