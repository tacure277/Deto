package com.alvaro.deto_android;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.alvaro.deto_android.response.LoginResponse;
import com.alvaro.deto_android.requests.LoginRequest;
import com.alvaro.deto_android.service.UsuarioService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private TextInputEditText etCorreo;
    private TextInputEditText etPassword;
    private MaterialButton btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etCorreo = findViewById(R.id.etCorreo);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(v -> hacerLogin());

        TextView btnRegistrarse = findViewById(R.id.btonRegistrase);
        btnRegistrarse.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
            startActivity(intent);
        });
    }

    private void hacerLogin() {
        String correo = etCorreo.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (correo.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Completa todos los campos", Toast.LENGTH_SHORT).show();
            return;
        }

        btnLogin.setEnabled(false);
        btnLogin.setText("Iniciando...");

        LoginRequest request = new LoginRequest(correo, password);
        UsuarioService api = RetrofitClient.getUsuarioService();
        Call<LoginResponse> call = api.login(request);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                btnLogin.setEnabled(true);
                btnLogin.setText("Iniciar sesión");

                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    SharedPreferences prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE);
                    prefs.edit()
                            .putString("access_token", loginResponse.getAccess())
                            .putString("refresh_token", loginResponse.getRefresh())
                            .putInt("usuario_id", loginResponse.getUsuario().getUsuario_id())
                            .putString("nombre", loginResponse.getUsuario().getNombre())
                            .putString("correo", loginResponse.getUsuario().getCorreo())
                            .putString("descripcion", loginResponse.getUsuario().getDescripcion() != null ?
                                    loginResponse.getUsuario().getDescripcion() : "Sin descripción")
                            .putString("foto_perfil_url", loginResponse.getUsuario().getFoto_perfil_url())
                            .apply();
                    Toast.makeText(LoginActivity.this,
                            "¡Bienvenido " + loginResponse.getUsuario().getNombre() + "!",
                            Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();

                } else {
                    Toast.makeText(LoginActivity.this,
                            "Credenciales incorrectas",
                            Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                btnLogin.setEnabled(true);
                btnLogin.setText("Iniciar sesión");

                Toast.makeText(LoginActivity.this,
                        "Error de conexión: " + t.getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}