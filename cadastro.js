document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nome: form.nome.value,
            email: form.email.value,
            senha: form.senha.value
        };

        if (form.senha.value !== form.confirmar_senha.value) {
            alert('Senhas não coincidem!');
            return;
        }

        try {
            const response = await fetch('/CadastroUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = '/index.html';
            } else {
                alert(result.message || 'Erro no cadastro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});
