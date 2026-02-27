package com.alvaro.deto_android.adapters;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.models.Idea;
import com.google.android.material.chip.Chip;
import java.util.ArrayList;
import java.util.List;
import com.bumptech.glide.Glide;

public class IdeasAdapter extends RecyclerView.Adapter<IdeasAdapter.IdeaViewHolder> {

    private List<Idea> ideas = new ArrayList<>();
    private OnIdeaClickListener listener;

    public interface OnIdeaClickListener {
        void onIdeaClick(Idea idea);
    }

    public IdeasAdapter(OnIdeaClickListener listener) {
        this.listener = listener;
    }

    @NonNull
    @Override
    public IdeaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_idea, parent, false);
        return new IdeaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull IdeaViewHolder holder, int position) {
        Idea idea = ideas.get(position);

        String fotoAutor = idea.getFoto_autor_url();
        if (fotoAutor != null && !fotoAutor.isEmpty()) {
            if (fotoAutor.contains("127.0.0.1")) {
                fotoAutor = fotoAutor.replace("127.0.0.1", "10.0.2.2");
            }
            Glide.with(holder.itemView.getContext())
                    .load(fotoAutor)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .circleCrop()
                    .into(holder.imgAvatar);
        } else {
            holder.imgAvatar.setImageResource(R.mipmap.ic_launcher);
        }

        String imagenIdea = idea.getImagen_url();
        if (imagenIdea != null && !imagenIdea.isEmpty()) {
            if (imagenIdea.contains("127.0.0.1")) {
                imagenIdea = imagenIdea.replace("127.0.0.1", "10.0.2.2");
            }
            holder.imgIdea.setVisibility(View.VISIBLE);
            Glide.with(holder.itemView.getContext())
                    .load(imagenIdea)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .centerCrop()
                    .into(holder.imgIdea);
        } else {
            holder.imgIdea.setVisibility(View.GONE);
        }

        if (idea.isEs_anonima()) {
            holder.tvAutor.setText("Anónimo");
            holder.chipAnonimo.setVisibility(View.VISIBLE);
        } else {
            holder.tvAutor.setText(idea.getAutor() != null ? idea.getAutor() : "Usuario");
            holder.chipAnonimo.setVisibility(View.GONE);
        }

        holder.tvTitulo.setText(idea.getTitulo() != null ? idea.getTitulo() : "");
        holder.tvDescripcion.setText(idea.getDescripcion() != null ? idea.getDescripcion() : "");

        holder.tvNumComentarios.setText(idea.getNum_comentarios() + " comentarios");

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onIdeaClick(idea);
            }
        });
    }
    @Override
    public int getItemCount() {
        return ideas.size();
    }

    public void setIdeas(List<Idea> ideas) {
        this.ideas = ideas;
        notifyDataSetChanged();
    }

    static class IdeaViewHolder extends RecyclerView.ViewHolder {
        ImageView imgAvatar;
        TextView tvAutor;
        TextView tvTitulo;
        TextView tvDescripcion;
        TextView tvNumComentarios;
        Chip chipAnonimo;
        ImageView imgIdea;

        public IdeaViewHolder(@NonNull View itemView) {
            super(itemView);
            imgAvatar = itemView.findViewById(R.id.imgAvatar);
            tvAutor = itemView.findViewById(R.id.tvAutor);
            tvTitulo = itemView.findViewById(R.id.tvTitulo);
            tvDescripcion = itemView.findViewById(R.id.tvDescripcion);
            tvNumComentarios = itemView.findViewById(R.id.tvNumComentarios);
            chipAnonimo = itemView.findViewById(R.id.chipAnonimo);
            imgIdea = itemView.findViewById(R.id.imgIdea);
        }
    }
}