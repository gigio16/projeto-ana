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