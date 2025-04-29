

document.addEventListener('DOMContentLoaded', function() {
    // Menu Navigation
    const menuItems = document.querySelectorAll('.menu li');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items and content sections
            menuItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Show corresponding content section
            const target = this.querySelector('a').getAttribute('href').substring(1);
            document.getElementById(`${target}-content`).classList.add('active');
        });
    });
    
    // Tabs Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Toggle IP List based on IP Restriction toggle
    const ipRestriction = document.getElementById('ip-restriction');
    const ipList = document.querySelector('.ip-list');
    
    ipRestriction.addEventListener('change', function() {
        ipList.style.display = this.checked ? 'block' : 'none';
    });
    
    // Add IP Address
    const addIpBtn = document.getElementById('add-ip-btn');
    const ipItems = document.querySelector('.ip-items');
    
    addIpBtn.addEventListener('click', function() {
        const ipItem = document.createElement('div');
        ipItem.className = 'ip-item';
        ipItem.innerHTML = `
            <input type="text" placeholder="Digite o IP">
            <button class="btn-remove-ip"><i class="fas fa-times"></i></button>
        `;
        ipItems.appendChild(ipItem);
        
        // Add event listener to remove button
        ipItem.querySelector('.btn-remove-ip').addEventListener('click', function() {
            ipItem.remove();
        });
    });
    
    // Show/Hide custom date range based on period selection
    const reportPeriod = document.getElementById('report-period');
    const dateRange = document.querySelector('.date-range');
    
    reportPeriod.addEventListener('change', function() {
        dateRange.style.display = this.value === 'custom' ? 'flex' : 'none';
    });
    
    // Modal functionality
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserModal = document.getElementById('add-user-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const confirmAddUser = document.getElementById('confirm-add-user');
    
    addUserBtn.addEventListener('click', function() {
        addUserModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addUserModal.classList.remove('active');
        });
    });
    
    confirmAddUser.addEventListener('click', function() {
        // Here you would typically send the data to the server
        alert('Usuário adicionado com sucesso!');
        addUserModal.classList.remove('active');
        document.getElementById('add-user-form').reset();
    });
    
    // Initialize Charts
    initializeCharts();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addUserModal) {
            addUserModal.classList.remove('active');
        }
    });
});

function initializeCharts() {
    // Activity Chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    const activityChart = new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Logins',
                data: [120, 190, 170, 220, 180, 250],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Ações',
                data: [80, 120, 150, 180, 200, 220],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // User Distribution Chart
    const userDistCtx = document.getElementById('userDistributionChart').getContext('2d');
    const userDistChart = new Chart(userDistCtx, {
        type: 'doughnut',
        data: {
            labels: ['Administradores', 'Editores', 'Visualizadores'],
            datasets: [{
                data: [12, 45, 1188],
                backgroundColor: [
                    '#F44336',
                    '#FF9800',
                    '#607D8B'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
    
    // Report Chart
    const reportCtx = document.getElementById('reportChart').getContext('2d');
    const reportChart = new Chart(reportCtx, {
        type: 'bar',
        data: {
            labels: ['01/04 - 07/04', '08/04 - 14/04', '15/04 - 21/04', '22/04 - 28/04'],
            datasets: [{
                label: 'Logins',
                data: [342, 298, 310, 280],
                backgroundColor: '#4CAF50'
            }, {
                label: 'Edições',
                data: [156, 201, 178, 195],
                backgroundColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// User Management System

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // VARIÁVEIS GLOBAIS
    // =============================================
    let users = [];          // Array para armazenar todos os usuários
    let currentPage = 1;     // Página atual da paginação
    const usersPerPage = 5;  // Número de usuários por página
    let currentUserId = null; // ID do usuário sendo editado/visualizado

    // =============================================
    // ELEMENTOS DOM
    // =============================================
    // Referências aos elementos HTML importantes
    const usersTableBody = document.getElementById('users-table-body');
    const userModal = document.getElementById('user-modal');
    const deleteModal = document.getElementById('delete-modal');
    const userForm = document.getElementById('user-form');
    const modalTitle = document.getElementById('modal-title');
    const saveUserBtn = document.getElementById('save-user');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const addUserBtn = document.getElementById('add-user-btn');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');

    // =============================================
    // INICIALIZAÇÃO
    // =============================================
    loadUsers(); // Carrega os usuários ao iniciar

    // =============================================
    // EVENT LISTENERS
    // =============================================
    addUserBtn.addEventListener('click', () => openUserModal('add'));
    saveUserBtn.addEventListener('click', saveUser);
    confirmDeleteBtn.addEventListener('click', deleteUser);
    applyFiltersBtn.addEventListener('click', applyFilters);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);

    // =============================================
    // FUNÇÕES PRINCIPAIS
    // =============================================

    /**
     * Carrega os usuários (simulando uma chamada API)
     * Atualmente usa dados mockados, mas pode ser substituído por uma chamada AJAX real
     */
    function loadUsers() {
        // Dados de exemplo (mock)
        const mockUsers = [
            {
                id: 1,
                name: "João Silva",
                email: "joao.silva@empresa.com",
                username: "joao.silva",
                role: "admin",
                status: "active",
                lastLogin: "29/04/2023 14:30",
                avatar: "https://via.placeholder.com/30"
            },
            // ... outros usuários mockados
        ];
        
        users = mockUsers;
        renderUsers();       // Renderiza a tabela
        renderPagination();  // Configura a paginação
    }

    /**
     * Renderiza os usuários na tabela
     * @param {Array} filteredUsers - Lista de usuários filtrados (opcional)
     */
    function renderUsers(filteredUsers = users) {
        usersTableBody.innerHTML = ''; // Limpa a tabela
        
        // Calcula os usuários para a página atual
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        const paginatedUsers = filteredUsers.slice(start, end);
        
        // Cria uma linha na tabela para cada usuário
        paginatedUsers.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>
                    <div class="user-avatar">
                        <img src="${user.avatar}" alt="${user.name}">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="badge badge-${user.role}">${getRoleName(user.role)}</span></td>
                <td><span class="badge badge-${user.status}">${getStatusName(user.status)}</span></td>
                <td>${user.lastLogin}</td>
                <td>
                    <button class="btn-action btn-view" data-id="${user.id}"><i class="fas fa-eye"></i></button>
                    <button class="btn-action btn-edit" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-delete" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            usersTableBody.appendChild(tr);
        });
        
        // Adiciona eventos aos botões de ação
        addActionButtonEvents();
    }

    /**
     * Abre o modal de usuário nos modos: add, edit ou view
     * @param {string} action - Tipo de ação ('add', 'edit', 'view')
     * @param {number} userId - ID do usuário (opcional para add)
     */
    function openUserModal(action, userId = null) {
        currentUserId = userId;
        const form = document.getElementById('user-form');
        
        // Configura o modal conforme o tipo de ação
        switch(action) {
            case 'add':
                modalTitle.textContent = 'Adicionar Novo Usuário';
                form.reset();
                document.getElementById('user-password').required = true;
                break;
                
            case 'edit':
                modalTitle.textContent = 'Editar Usuário';
                const user = users.find(u => u.id == userId);
                fillUserForm(user);
                document.getElementById('user-password').required = false;
                break;
                
            case 'view':
                modalTitle.textContent = 'Visualizar Usuário';
                const viewUser = users.find(u => u.id == userId);
                fillUserForm(viewUser);
                disableFormFields();
                saveUserBtn.textContent = 'Fechar';
                saveUserBtn.onclick = () => userModal.classList.remove('active');
                break;
        }
        
        // Habilita campos e configura botão para add/edit
        if (action !== 'view') {
            enableFormFields();
            saveUserBtn.textContent = 'Salvar';
            saveUserBtn.onclick = saveUser;
        }
        
        userModal.classList.add('active');
    }

    /**
     * Salva o usuário (cria novo ou atualiza existente)
     */
    function saveUser() {
        const form = document.getElementById('user-form');
        
        // Valida o formulário antes de prosseguir
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Obtém os dados do formulário
        const userData = {
            id: document.getElementById('user-id').value,
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            username: document.getElementById('user-username').value,
            password: document.getElementById('user-password').value,
            role: document.getElementById('user-role').value,
            status: document.getElementById('user-status').value,
            lastLogin: new Date().toLocaleString(),
            avatar: "https://via.placeholder.com/30"
        };
        
        // Decide se é uma edição ou criação de novo usuário
        if (currentUserId) {
            // Atualiza usuário existente
            const index = users.findIndex(u => u.id == currentUserId);
            users[index] = { ...users[index], ...userData };
        } else {
            // Cria novo usuário com ID sequencial
            userData.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            users.push(userData);
        }
        
        // Atualiza a interface
        renderUsers();
        userModal.classList.remove('active');
        showAlert('Usuário salvo com sucesso!', 'success');
    }

    /**
     * Exclui o usuário após confirmação
     */
    function deleteUser() {
        // Filtra o usuário a ser removido
        users = users.filter(user => user.id != currentUserId);
        
        // Atualiza a interface
        renderUsers();
        deleteModal.classList.remove('active');
        showAlert('Usuário excluído com sucesso!', 'success');
    }

    // =============================================
    // FUNÇÕES AUXILIARES
    // =============================================

    /**
     * Adiciona eventos aos botões de ação (view, edit, delete)
     */
    function addActionButtonEvents() {
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', () => openUserModal('view', btn.dataset.id));
        });
        
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => openUserModal('edit', btn.dataset.id));
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => openDeleteModal(btn.dataset.id));
        });
    }

    /**
     * Preenche o formulário com dados do usuário
     * @param {Object} user - Objeto usuário
     */
    function fillUserForm(user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-username').value = user.username;
        document.getElementById('user-role').value = user.role;
        document.getElementById('user-status').value = user.status;
    }

    /**
     * Habilita todos os campos do formulário
     */
    function enableFormFields() {
        const inputs = userForm.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = false);
    }

    /**
     * Desabilita todos os campos do formulário
     */
    function disableFormFields() {
        const inputs = userForm.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = true);
    }

    /**
     * Abre o modal de confirmação de exclusão
     * @param {number} userId - ID do usuário a ser excluído
     */
    function openDeleteModal(userId) {
        currentUserId = userId;
        deleteModal.classList.add('active');
    }

    /**
     * Aplica os filtros selecionados
     */
    function applyFilters() {
        const roleFilter = document.getElementById('user-role').value;
        const statusFilter = document.getElementById('user-status').value;
        
        let filteredUsers = users;
        
        // Filtra por perfil se não for "todos"
        if (roleFilter !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
        }
        
        // Filtra por status se não for "todos"
        if (statusFilter !== 'all') {
            filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
        }
        
        // Reseta para a primeira página e renderiza
        currentPage = 1;
        renderUsers(filteredUsers);
        renderPagination(filteredUsers);
    }

    /**
     * Renderiza os controles de paginação
     * @param {Array} filteredUsers - Lista de usuários filtrados
     */
    function renderPagination(filteredUsers = users) {
        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
        pageNumbers.innerHTML = '';
        
        // Cria botões para cada página
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `btn-pagination ${i === currentPage ? 'active' : ''}`;
            btn.textContent = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderUsers(filteredUsers);
                renderPagination(filteredUsers);
            });
            pageNumbers.appendChild(btn);
        }
        
        // Habilita/desabilita botões de navegação
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    /**
     * Navega para a página anterior
     */
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderUsers();
            renderPagination();
        }
    }

    /**
     * Navega para a próxima página
     */
    function goToNextPage() {
        const totalPages = Math.ceil(users.length / usersPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderUsers();
            renderPagination();
        }
    }

    /**
     * Converte o código do perfil para nome amigável
     * @param {string} role - Código do perfil
     * @returns {string} Nome do perfil
     */
    function getRoleName(role) {
        const roles = {
            admin: 'Administrador',
            editor: 'Editor',
            viewer: 'Visualizador'
        };
        return roles[role] || role;
    }

    /**
     * Converte o código de status para nome amigável
     * @param {string} status - Código do status
     * @returns {string} Nome do status
     */
    function getStatusName(status) {
        const statuses = {
            active: 'Ativo',
            inactive: 'Inativo',
            blocked: 'Bloqueado'
        };
        return statuses[status] || status;
    }

    /**
     * Exibe um alerta temporário na tela
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo do alerta ('success', 'error')
     */
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        // Remove o alerta após 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});

// =============================================
// ESTILOS DINÂMICOS PARA OS ALERTAS
// =============================================
const style = document.createElement('style');
style.textContent = `
.alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
}

.alert-success {
    background-color: #4CAF50;
}

.alert-error {
    background-color: #F44336;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);

// Adicionar funcionalidade completa de CRUD
const initUserManagement = () => {
    // Implementar:
    // - Carregamento de usuários da API
    // - Atualização em tempo real
    // - Integração com endpoints do servidor
    // - Validações avançadas
};

// Inicializar quando a seção de usuários estiver ativa
document.getElementById('usuarios-content').addEventListener('DOMContentLoaded', initUserManagement);
