package com.alvaro.deto_android.fragments;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.alvaro.deto_android.R;
import com.alvaro.deto_android.RetrofitClient;
import com.alvaro.deto_android.models.Usuario;
import com.alvaro.deto_android.service.UsuarioService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.HashMap;
import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class EditarPerfilFragment extends Fragment {

    private TextInputEditText etNombre;
    private TextInputEditText etDescripcion;
    private TextInputEditText etPasswordActual;
    private TextInputEditText etNuevaPassword;
    private TextInputEditText etConfirmarPassword;
    private MaterialButton btnGuardar;
    private MaterialButton btnCancelar;

    private UsuarioService usuarioService;
    private int usuarioId;
    private String token;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_editar_perfil, container, false);

        initViews(view);

        initData();

        cargarDatosUsuario();


        setupListeners();

        return view;
    }

    private void initViews(View view) {
        etNombre = view.findViewById(R.id.etNombre);
        etDescripcion = view.findViewById(R.id.etDescripcion);
        etPasswordActual = view.findViewById(R.id.etPasswordActual);
        etNuevaPassword = view.findViewById(R.id.etNuevaPassword);
        etConfirmarPassword = view.findViewById(R.id.etConfirmarPassword);
        btnGuardar = view.findViewById(R.id.btnGuardar);
        btnCancelar = view.findViewById(R.id.btnCancelar);
    }

    private void initData() {
        usuarioService = RetrofitClient.getUsuarioService();
        SharedPreferences prefs = requireContext().getSharedPreferences("UserPrefs", MODE_PRIVATE);
        usuarioId = prefs.getInt("usuario_id", 0);
        token = prefs.getString("access_token", null);
    }

    private void cargarDatosUsuario() {
        SharedPreferences prefs = requireContext().getSharedPreferences("UserPrefs", MODE_PRIVATE);

        String nombre = prefs.getString("nombre", "");
        String descripcion = prefs.getString("descripcion", "");

        etNombre.setText(nombre);
        etDescripcion.setText(descripcion);
    }

    private void setupListeners() {
        btnCancelar.setOnClickListener(v -> {
            requireActivity().onBackPressed();
        });

        btnGuardar.setOnClickListener(v -> {
            if (validarCampos()) {
                guardarCambios();
            }
        });
    }

    private boolean validarCampos() {
        String nombre = etNombre.getText().toString().trim();
        String passwordActual = etPasswordActual.getText().toString().trim();
        String nuevaPass = etNuevaPassword.getText().toString().trim();
        String confirmPass = etConfirmarPassword.getText().toString().trim();

        if (nombre.isEmpty()) {
            etNombre.setError("El nombre no puede estar vacío");
            etNombre.requestFocus();
            return false;
        }

        if (!nuevaPass.isEmpty() || !confirmPass.isEmpty() || !passwordActual.isEmpty()) {

            if (passwordActual.isEmpty()) {
                etPasswordActual.setError("Ingresa tu contraseña actual");
                etPasswordActual.requestFocus();
                return false;
            }

            if (nuevaPass.isEmpty()) {
                etNuevaPassword.setError("Ingresa la nueva contraseña");
                etNuevaPassword.requestFocus();
                return false;
            }

            if (nuevaPass.length() < 8) {
                etNuevaPassword.setError("La contraseña debe tener al menos 6 caracteres");
                etNuevaPassword.requestFocus();
                return false;
            }

            if (!nuevaPass.equals(confirmPass)) {
                etConfirmarPassword.setError("Las contraseñas no coinciden");
                etConfirmarPassword.requestFocus();
                return false;
            }
        }

        return true;
    }

    private void guardarCambios() {
        btnGuardar.setEnabled(false);
        btnGuardar.setText("Guardando...");

        String nuevoNombre = etNombre.getText().toString().trim();
        String nuevaDescripcion = etDescripcion.getText().toString().trim();

        Map<String, String> datosPerfil = new HashMap<>();
        datosPerfil.put("nombre", nuevoNombre);
        datosPerfil.put("descripcion", nuevaDescripcion);

        usuarioService.actualizarPerfil(datosPerfil).enqueue(new Callback<Usuario>() {
            @Override
            public void onResponse(Call<Usuario> call, Response<Usuario> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Usuario usuario = response.body();

                    // Actualizar SharedPreferences
                    SharedPreferences prefs = requireContext().getSharedPreferences("UserPrefs", MODE_PRIVATE);
                    SharedPreferences.Editor editor = prefs.edit();
                    editor.putString("nombre", usuario.getNombre());
                    editor.putString("descripcion", usuario.getDescripcion() != null ? usuario.getDescripcion() : "");
                    editor.apply();

                    String nuevaPass = etNuevaPassword.getText().toString().trim();
                    if (!nuevaPass.isEmpty()) {
                        cambiarPassword();
                    } else {
                        Toast.makeText(getContext(), "Perfil actualizado correctamente", Toast.LENGTH_SHORT).show();
                        finalizar();
                    }
                } else {
                    Toast.makeText(getContext(), "Error al actualizar perfil", Toast.LENGTH_SHORT).show();
                    btnGuardar.setEnabled(true);
                    btnGuardar.setText("Guardar Cambios");
                }
            }

            @Override
            public void onFailure(Call<Usuario> call, Throwable t) {
                Toast.makeText(getContext(), "Error de conexión: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                btnGuardar.setEnabled(true);
                btnGuardar.setText("Guardar Cambios");
            }
        });
    }

    private void cambiarPassword() {
        String passwordActual = etPasswordActual.getText().toString().trim();
        String nuevaPassword = etNuevaPassword.getText().toString().trim();

        Map<String, String> passwords = new HashMap<>();
        passwords.put("password_actual", passwordActual);
        passwords.put("nueva_password", nuevaPassword);

        usuarioService.cambiarPassword(passwords).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(getContext(), "Contraseña actualizada correctamente", Toast.LENGTH_SHORT).show();
                } else {
                    try {
                        String error = response.errorBody().string();
                        Toast.makeText(getContext(), "Error: " + error, Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        Toast.makeText(getContext(), "Error al cambiar contraseña", Toast.LENGTH_SHORT).show();
                    }
                }
                finalizar();
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(getContext(), "Error de conexión: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                finalizar();
            }
        });
    }

    private void finalizar() {
        btnGuardar.setEnabled(true);
        btnGuardar.setText("Guardar Cambios");
        requireActivity().onBackPressed();
    }
}