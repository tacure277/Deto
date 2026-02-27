package com.alvaro.deto_android;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.alvaro.deto_android.response.LoginResponse;
import com.alvaro.deto_android.requests.RegistroRequest;
import com.alvaro.deto_android.service.UsuarioService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    private EditText etNombre;
    private EditText etCorreo;
    private EditText etPassword;
    private EditText etRepetirPassword;
    private Button btnRegistrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        etNombre = findViewById(R.id.usuario);
        etCorreo = findViewById(R.id.editTextEmail);
        etPassword = findViewById(R.id.editTextPassword);
        etRepetirPassword = findViewById(R.id.RepetirContraseña);
        btnRegistrar = findViewById(R.id.button);

        btnRegistrar.setOnClickListener(v -> hacerRegistro());

        TextView btnLogin = findViewById(R.id.btonLogin);
        btnLogin.setOnClickListener(v -> finish());
    }

    private void hacerRegistro() {
        String nombre = etNombre.getText().toString().trim();
        String correo = etCorreo.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String repetirPassword = etRepetirPassword.getText().toString().trim();

        if (nombre.isEmpty() || correo.isEmpty() || password.isEmpty() || repetirPassword.isEmpty()) {
            Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!correo.contains("@") || !correo.contains(".")) {
            Toast.makeText(this, "Correo electrónico no válido", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 8) {
            Toast.makeText(this, "La contraseña debe tener al menos 8 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(repetirPassword)) {
            Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show();
            return;
        }

        btnRegistrar.setEnabled(false);
        btnRegistrar.setText("Registrando...");

        RegistroRequest request = new RegistroRequest(nombre, correo, password);
        UsuarioService api = RetrofitClient.getUsuarioService();
        Call<LoginResponse> call = api.registro(request);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                btnRegistrar.setEnabled(true);
                btnRegistrar.setText("Registrarse");

                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse registroResponse = response.body();

                    // Guardar datos
                    SharedPreferences prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE);
                    prefs.edit()
                            .putString("access_token", registroResponse.getAccess())
                            .putString("refresh_token", registroResponse.getRefresh())
                            .putInt("usuario_id", registroResponse.getUsuario().getUsuario_id())
                            .putString("nombre", registroResponse.getUsuario().getNombre())
                            .putString("correo", registroResponse.getUsuario().getCorreo())
                            .apply();

                    Toast.makeText(RegisterActivity.this,
                            "¡Registro exitoso! Bienvenido " + registroResponse.getUsuario().getNombre(),
                            Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();

                } else {
                    String errorMsg = "Error en el registro";
                    if (response.code() == 400) {
                        errorMsg = "El correo ya está registrado o los datos son inválidos";
                    } else if (response.code() == 500) {
                        errorMsg = "Error del servidor";
                    }
                    Toast.makeText(RegisterActivity.this, errorMsg, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                btnRegistrar.setEnabled(true);
                btnRegistrar.setText("Registrarse");
                Toast.makeText(RegisterActivity.this,
                        "Error de conexión: " + t.getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}