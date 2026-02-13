package com.alvaro.deto_android;

import com.alvaro.deto_android.models.Idea;
import com.alvaro.deto_android.requests.CrearIdeaRequest;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {

    @GET("ideas/")
    Call<List<Idea>> getIdeas();

    @POST("ideas/crear/")
    Call<Idea> crearIdea(@Body CrearIdeaRequest request);
}
