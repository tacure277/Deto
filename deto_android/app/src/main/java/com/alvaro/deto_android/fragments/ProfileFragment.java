package com.alvaro.deto_android.fragments;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.fragment.app.Fragment;

import com.alvaro.deto_android.LoginActivity;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.RetrofitClient;
import com.alvaro.deto_android.models.Usuario;
import com.alvaro.deto_android.service.UsuarioService;
import com.bumptech.glide.Glide;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.imageview.ShapeableImageView;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class ProfileFragment extends Fragment {

    private ShapeableImageView imgAvatar;
    private TextView tvNombre, tvEmail, tvDescripcion;
    private MaterialButton btnEditarPerfil, btnCerrarSesion;

    private Uri fotoUri;
    private File fotoArchivo;

    private final ActivityResultLauncher<Intent> cameraLauncher =
            registerForActivityResult(
                    new ActivityResultContracts.StartActivityForResult(),
                    result -> {
                        if (result.getResultCode() == getActivity().RESULT_OK) {
                            if (fotoUri != null) {
                                imgAvatar.setImageURI(fotoUri);
                                subirFotoPerfil(fotoUri);
                            }
                        }
                    });

    private final ActivityResultLauncher<Intent> galleryLauncher =
            registerForActivityResult(
                    new ActivityResultContracts.StartActivityForResult(),
                    result -> {
                        if (result.getResultCode() == getActivity().RESULT_OK && result.getData() != null) {
                            fotoUri = result.getData().getData();
                            imgAvatar.setImageURI(fotoUri);
                            subirFotoPerfil(fotoUri);
                        }
                    });


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_profile, container, false);

        imgAvatar = view.findViewById(R.id.imgAvatar);
        tvNombre = view.findViewById(R.id.tvNombre);
        tvEmail = view.findViewById(R.id.tvEmail);
        tvDescripcion = view.findViewById(R.id.tvDescripcion);
        btnEditarPerfil = view.findViewById(R.id.btnEditarPerfil);
        btnCerrarSesion = view.findViewById(R.id.btnCerrarSesion);

        cargarPerfil();

        imgAvatar.setOnClickListener(v -> mostrarDialogoSeleccionImagen());

        btnEditarPerfil.setOnClickListener(v -> {
            Log.d("PROFILE_DEBUG", "CLICK EN EDITAR PERFIL");

            EditarPerfilFragment editarFragment = new EditarPerfilFragment();

            getParentFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, editarFragment)
                    .addToBackStack("editar_perfil")
                    .commit();
        });

        btnCerrarSesion.setOnClickListener(v -> {
            SharedPreferences prefs = requireContext()
                    .getSharedPreferences("UserPrefs", MODE_PRIVATE);

            new Thread(() -> Glide.get(requireContext()).clearDiskCache()).start();
            Glide.get(requireContext()).clearMemory();

            prefs.edit().clear().apply();

            Intent intent = new Intent(getActivity(), LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        });

        return view;
    }
    private void mostrarDialogoSeleccionImagen() {
        String[] opciones = {"Tomar foto", "Elegir de galería", "Cancelar"};

        new MaterialAlertDialogBuilder(requireContext())
                .setTitle("Actualizar foto de perfil")
                .setItems(opciones, (dialog, which) -> {
                    switch (which) {
                        case 0:
                            abrirCamara();
                            break;
                        case 1:
                            abrirGaleria();
                            break;
                        default:
                            dialog.dismiss();
                    }
                })
                .show();
    }

    private void abrirCamara() {
        if (ContextCompat.checkSelfPermission(requireContext(),
                android.Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {

            requestPermissions(new String[]{android.Manifest.permission.CAMERA}, 100);
            return;
        }

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        if (intent.resolveActivity(requireActivity().getPackageManager()) != null) {
            try {
                fotoArchivo = crearArchivoImagen();
                fotoUri = FileProvider.getUriForFile(
                        requireContext(),
                        requireContext().getPackageName() + ".fileprovider",
                        fotoArchivo);

                intent.putExtra(MediaStore.EXTRA_OUTPUT, fotoUri);
                cameraLauncher.launch(intent);

            } catch (IOException e) {
                Toast.makeText(getContext(),
                        "Error al crear archivo",
                        Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void abrirGaleria() {
        Intent intent = new Intent(Intent.ACTION_PICK,
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        galleryLauncher.launch(intent);
    }

    private File crearArchivoImagen() throws IOException {
        String timeStamp = new SimpleDateFormat(
                "yyyyMMdd_HHmmss",
                Locale.getDefault()).format(new Date());

        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = requireContext()
                .getExternalFilesDir(Environment.DIRECTORY_PICTURES);

        return File.createTempFile(imageFileName, ".jpg", storageDir);
    }

    private void subirFotoPerfil(Uri imagenUri) {

        try {

            InputStream inputStream =
                    getContext().getContentResolver().openInputStream(imagenUri);

            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes);
            inputStream.close();

            RequestBody requestFile =
                    RequestBody.create(MediaType.parse("image/*"), bytes);

            String fileName = "foto_" + System.currentTimeMillis() + ".jpg";

            MultipartBody.Part fotoPart =
                    MultipartBody.Part.createFormData(
                            "foto", fileName, requestFile);

            UsuarioService api = RetrofitClient.getUsuarioService();
            Call<Usuario> call = api.actualizarFotoPerfil(fotoPart);

            call.enqueue(new Callback<Usuario>() {
                @Override
                public void onResponse(Call<Usuario> call,
                                       Response<Usuario> response) {

                    if (response.isSuccessful()
                            && response.body() != null) {

                        String nuevaUrl =
                                response.body().getFoto_perfil_url();

                        SharedPreferences prefs =
                                requireContext().getSharedPreferences(
                                        "UserPrefs", MODE_PRIVATE);

                        prefs.edit()
                                .putString("foto_perfil_url", nuevaUrl)
                                .apply();

                        cargarPerfil();
                    }
                }

                @Override
                public void onFailure(Call<Usuario> call, Throwable t) {
                    Toast.makeText(getContext(),
                            "Error: " + t.getMessage(),
                            Toast.LENGTH_SHORT).show();
                }
            });

        } catch (Exception e) {
            Toast.makeText(getContext(),
                    "Error al procesar imagen",
                    Toast.LENGTH_SHORT).show();
        }
    }

    private void cargarPerfil() {

        SharedPreferences prefs =
                requireContext().getSharedPreferences(
                        "UserPrefs", MODE_PRIVATE);

        String nombre = prefs.getString("nombre", "Usuario");
        String email = prefs.getString("correo", "email@example.com");
        String fotoUrl = prefs.getString("foto_perfil_url", null);
        String descripcion = prefs.getString("descripcion", "Sin descripción");

        tvNombre.setText(nombre);
        tvEmail.setText(email);
        tvDescripcion.setText(descripcion);

        if (fotoUrl != null && !fotoUrl.isEmpty()) {

            if (fotoUrl.contains("127.0.0.1")) {
                fotoUrl = fotoUrl.replace("127.0.0.1", "10.0.2.2");
            }

            Glide.with(this)
                    .load(fotoUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .circleCrop()
                    .into(imgAvatar);
        } else {
            imgAvatar.setImageResource(R.mipmap.ic_launcher);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {

        super.onRequestPermissionsResult(
                requestCode, permissions, grantResults);

        if (requestCode == 100) {
            if (grantResults.length > 0 &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                abrirCamara();
            } else {
                Toast.makeText(getContext(),
                        "Permiso de cámara denegado",
                        Toast.LENGTH_SHORT).show();
            }
        }
    }
}