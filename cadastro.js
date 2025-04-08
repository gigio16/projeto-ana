document.addEventListener('DOMContentLoaded', function() {
    // Fazer uma requisição para buscar os responsáveis
    fetch('/usuarios')
        .then(response => response.json())
        .then(data => {
            const selectusuario = document.getElementById('usuario');
            selectusuario.innerHTML = ''; 
            if (data.success && data.usuario.length > 0) {
                data.usuario.forEach(usuario => { 
                    const option = document.createElement('option');
                    option.value = usuario.id;
                    option.textContent = usuario.nome; 
                    selectusuario.appendChild(option);
                });
            } else {
                const option = document.createElement('option');
                option.value = "";
                option.textContent = "Nenhum usuário disponível";
                selectusuario.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
            const selectusuario = document.getElementById('nomeUsuario');
            selectusuario.innerHTML = '<option value="">Erro ao carregar usuários</option>';
        });
});

