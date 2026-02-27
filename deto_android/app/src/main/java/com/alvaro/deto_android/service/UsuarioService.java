package com.alvaro.deto_android.service;

import com.alvaro.deto_android.models.Usuario;
import com.alvaro.deto_android.requests.LoginRequest;
import com.alvaro.deto_android.requests.RegistroRequest;
import com.alvaro.deto_android.response.LoginResponse;

import java.util.Map;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface UsuarioService {

    @POST("auth/login/")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("auth/registro/")
    Call<LoginResponse> registro(@Body RegistroRequest request);

    @GET("auth/perfil/")
    Call<Usuario> obtenerPerfil();

    @Multipart
    @POST("auth/perfil/foto/")
    Call<Usuario> actualizarFotoPerfil(@Part MultipartBody.Part foto);

    @GET("auth/perfil/{usuario_id}/")
    Call<Usuario> obtenerPerfilPorId(@Path("usuario_id") int usuarioId);


    @PUT("auth/perfil/")
    Call<Usuario> actualizarPerfil(@Body Map<String, String> datos);

    @POST("auth/cambiar-password/")
    Call<ResponseBody> cambiarPassword(@Body Map<String, String> passwords);
}