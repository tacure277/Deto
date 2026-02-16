package com.alvaro.deto_android.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.models.Idea;
import com.google.android.material.chip.Chip;
import java.util.ArrayList;
import java.util.List;

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

        holder.tvTitulo.setText(idea.getTitulo());
        holder.tvDescripcion.setText(idea.getDescripcion());


        if (idea.isEs_anonima()) {
            holder.tvAutor.setText("Anónimo");
            holder.chipAnonimo.setVisibility(View.VISIBLE);
        } else {
            holder.tvAutor.setText(idea.getAutor() != null ? idea.getAutor() : "Usuario");
            holder.chipAnonimo.setVisibility(View.GONE);
        }

        holder.tvNumComentarios.setText("0 comentarios");

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
        TextView tvAutor;
        TextView tvTitulo;
        TextView tvDescripcion;
        TextView tvNumComentarios;
        Chip chipAnonimo;

        public IdeaViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAutor = itemView.findViewById(R.id.tvAutor);
            tvTitulo = itemView.findViewById(R.id.tvTitulo);
            tvDescripcion = itemView.findViewById(R.id.tvDescripcion);
            tvNumComentarios = itemView.findViewById(R.id.tvNumComentarios);
            chipAnonimo = itemView.findViewById(R.id.chipAnonimo);
        }
    }
}