// src/pages/SupervisorsPage.js - Página de busca e listagem de supervisores

export class SupervisorsPage {
    constructor(props = {}) {
        this.props = props;
        this.state = {
            supervisors: [
                {
                    id: '1',
                    name: 'Dr. Carlos Rodriguez',
                    specialties: ['TCC', 'Supervisão Clínica', 'Psicanálise'],
                    experience: 15,
                    rating: 4.9,
                    location: 'Madrid, Espanha',
                    languages: ['Português', 'Espanhol', 'Inglês'],
                    hourlyRate: 120,
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                    availability: 'Disponível',
                    certifications: ['Especialista em TCC', 'Supervisor Clínico Certificado']
                },
                {
                    id: '2',
                    name: 'Dra. Sarah Johnson',
                    specialties: ['Psicologia Organizacional', 'Coaching', 'Liderança'],
                    experience: 12,
                    rating: 4.8,
                    location: 'Londres, Reino Unido',
                    languages: ['Inglês', 'Português'],
                    hourlyRate: 150,
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                    availability: 'Ocupado',
                    certifications: ['PhD em Psicologia', 'Certified Executive Coach']
                },
                {
                    id: '3',
                    name: 'Dr. Marco Silva',
                    specialties: ['Terapia Familiar', 'Adolescentes', 'Trauma'],
                    experience: 8,
                    rating: 4.7,
                    location: 'São Paulo, Brasil',
                    languages: ['Português', 'Inglês'],
                    hourlyRate: 80,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                    availability: 'Disponível',
                    certifications: ['Especialista em Terapia Familiar', 'EMDR Certified']
                }
            ],
            filters: {
                specialty: '',
                location: '',
                priceRange: '',
                availability: 'all'
            },
            searchQuery: ''
        };
    }

    render() {
        return `
            <div class="supervisors-page min-h-screen bg-gray-50">
                <!-- Header da Página -->
                <div class="bg-white shadow-sm border-b">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">
                            Encontre seu Supervisor Ideal
                        </h1>
                        <p class="text-lg text-gray-600 max-w-3xl">
                            Conecte-se com supervisores experientes e certificados ao redor do mundo. 
                            Nossa IA encontra o match perfeito para seu desenvolvimento profissional.
                        </p>
                    </div>
                </div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <!-- Sidebar de Filtros -->
                        <div class="lg:col-span-1">
                            ${this.renderFilters()}
                        </div>

                        <!-- Lista de Supervisores -->
                        <div class="lg:col-span-3">
                            ${this.renderSupervisorsList()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFilters() {
        return `
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                
                <!-- Busca -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Buscar
                    </label>
                    <input 
                        type="text" 
                        placeholder="Nome ou especialidade..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        oninput="this.dispatchEvent(new CustomEvent('filter-change'))"
                    >
                </div>

                <!-- Especialidade -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Especialidade
                    </label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Todas</option>
                        <option value="tcc">TCC</option>
                        <option value="psicanálise">Psicanálise</option>
                        <option value="organizacional">Psicologia Organizacional</option>
                        <option value="familiar">Terapia Familiar</option>
                    </select>
                </div>

                <!-- Localização -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                    </label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Qualquer lugar</option>
                        <option value="brasil">Brasil</option>
                        <option value="europa">Europa</option>
                        <option value="america-norte">América do Norte</option>
                    </select>
                </div>

                <!-- Faixa de Preço -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Valor por Hora
                    </label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Qualquer valor</option>
                        <option value="0-100">Até R$ 100</option>
                        <option value="100-150">R$ 100 - R$ 150</option>
                        <option value="150+">Acima de R$ 150</option>
                    </select>
                </div>

                <!-- Disponibilidade -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Disponibilidade
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="radio" name="availability" value="all" checked class="mr-2">
                            <span class="text-sm">Todos</span>
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="availability" value="available" class="mr-2">
                            <span class="text-sm">Disponível agora</span>
                        </label>
                    </div>
                </div>

                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Aplicar Filtros
                </button>
            </div>
        `;
    }

    renderSupervisorsList() {
        return `
            <div class="space-y-6">
                <!-- Header da Lista -->
                <div class="flex justify-between items-center">
                    <p class="text-gray-600">
                        Mostrando ${this.state.supervisors.length} supervisores
                    </p>
                    <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Melhor avaliação</option>
                        <option>Menor preço</option>
                        <option>Maior experiência</option>
                        <option>Disponibilidade</option>
                    </select>
                </div>

                <!-- Lista de Cards -->
                <div class="grid grid-cols-1 gap-6">
                    ${this.state.supervisors.map(supervisor => this.renderSupervisorCard(supervisor)).join('')}
                </div>
            </div>
        `;
    }

    renderSupervisorCard(supervisor) {
        const availabilityColor = supervisor.availability === 'Disponível' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100';
        
        return `
            <div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
                <div class="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <!-- Avatar e Status -->
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img 
                                src="${supervisor.avatar}" 
                                alt="${supervisor.name}"
                                class="w-20 h-20 rounded-full object-cover"
                            >
                            <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${supervisor.availability === 'Disponível' ? 'bg-green-400' : 'bg-yellow-400'}"></span>
                        </div>
                    </div>

                    <!-- Informações Principais -->
                    <div class="flex-1">
                        <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div class="flex-1">
                                <!-- Nome e Avaliação -->
                                <div class="flex items-center space-x-3 mb-2">
                                    <h3 class="text-xl font-semibold text-gray-900">${supervisor.name}</h3>
                                    <div class="flex items-center">
                                        <span class="text-yellow-400">★</span>
                                        <span class="text-sm text-gray-600 ml-1">${supervisor.rating}</span>
                                    </div>
                                </div>

                                <!-- Localização e Experiência -->
                                <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                        </svg>
                                        ${supervisor.location}
                                    </span>
                                    <span>${supervisor.experience} anos de experiência</span>
                                </div>

                                <!-- Especialidades -->
                                <div class="mb-3">
                                    <div class="flex flex-wrap gap-2">
                                        ${supervisor.specialties.map(specialty => `
                                            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                ${specialty}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>

                                <!-- Idiomas -->
                                <div class="text-sm text-gray-600 mb-3">
                                    <strong>Idiomas:</strong> ${supervisor.languages.join(', ')}
                                </div>

                                <!-- Certificações -->
                                <div class="text-sm text-gray-600">
                                    <strong>Certificações:</strong> ${supervisor.certifications.join(', ')}
                                </div>
                            </div>

                            <!-- Preço e Ações -->
                            <div class="flex flex-col items-end space-y-3 mt-4 md:mt-0">
                                <!-- Status -->
                                <span class="px-3 py-1 text-xs font-medium rounded-full ${availabilityColor}">
                                    ${supervisor.availability}
                                </span>

                                <!-- Preço -->
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-gray-900">R$ ${supervisor.hourlyRate}</div>
                                    <div class="text-sm text-gray-600">por hora</div>
                                </div>

                                <!-- Botões -->
                                <div class="flex flex-col space-y-2 w-full md:w-auto">
                                    <button 
                                        onclick="router.navigate('/supervisor/${supervisor.id}')"
                                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Ver Perfil
                                    </button>
                                    <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                        Enviar Mensagem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        console.log('SupervisorsPage montada');
    }

    unmount() {
        console.log('SupervisorsPage desmontada');
    }
}