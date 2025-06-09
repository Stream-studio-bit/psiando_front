// src/pages/SupervisorDetailPage.js - Página de Detalhes do Supervisor

export class SupervisorDetailPage {
    constructor(props = {}) {
        this.props = props;
        this.supervisorId = props.params?.id || '1';
        this.state = {
            supervisor: null,
            loading: true,
            reviews: [],
            showScheduleModal: false
        };
    }

    async loadSupervisorData() {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data baseado no ID
        const mockSupervisor = {
            id: this.supervisorId,
            name: 'Dr. Carlos Rodriguez',
            title: 'Supervisor Clínico Sênior',
            specialties: ['TCC', 'Supervisão Clínica', 'Psicanálise', 'Terapia de Casal'],
            experience: 15,
            rating: 4.9,
            totalReviews: 127,
            completedSessions: 2150,
            location: 'Madrid, Espanha',
            timezone: 'GMT+1',
            languages: ['Português', 'Espanhol', 'Inglês', 'Francês'],
            hourlyRate: 120,
            currency: 'EUR',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
            availability: 'Disponível',
            responseTime: '2 horas',
            bio: 'Dr. Carlos Rodriguez é um psicólogo clínico com mais de 15 anos de experiência em supervisão clínica e terapia cognitivo-comportamental. Formado pela Universidad Complutense de Madrid, possui especialização em supervisão clínica pela European Association for Psychotherapy. Atualmente atende profissionais de diversos países, oferecendo supervisão personalizada e de alta qualidade.',
            education: [
                'PhD em Psicologia Clínica - Universidad Complutense de Madrid (2008)',
                'Mestrado em Terapia Cognitivo-Comportamental - Instituto Beck (2005)',
                'Especialização em Supervisão Clínica - European Association for Psychotherapy (2010)'
            ],
            certifications: [
                'Especialista em TCC certificado pela AECC',
                'Supervisor Clínico Certificado pela EAP',
                'Membro da European Association for Psychotherapy',
                'Certificação Internacional em EMDR',
                'Certified Professional Coach (ICF)'
            ],
            achievements: [
                'Mais de 2.150 sessões de supervisão realizadas',
                'Autor de 12 artigos científicos publicados',
                'Palestrante em 25+ conferências internacionais',
                'Supervisor de 150+ profissionais ao redor do mundo',
                'Prêmio de Excelência em Supervisão Clínica (2023)'
            ],
            availableSlots: [
                { date: '2025-06-09', time: '09:00', available: true },
                { date: '2025-06-09', time: '14:00', available: true },
                { date: '2025-06-10', time: '10:00', available: true },
                { date: '2025-06-10', time: '16:00', available: false },
                { date: '2025-06-11', time: '09:00', available: true }
            ]
        };

        this.state.supervisor = mockSupervisor;
        this.state.loading = false;
        this.loadReviews();
    }

    loadReviews() {
        this.state.reviews = [
            {
                id: 1,
                author: 'Maria Silva',
                rating: 5,
                date: '2025-05-15',
                comment: 'Excelente supervisor! Dr. Carlos me ajudou muito a desenvolver minhas habilidades em TCC. Suas orientações são sempre precisas e construtivas.',
                helpful: 12
            },
            {
                id: 2,
                author: 'João Santos',
                rating: 5,
                date: '2025-05-10',
                comment: 'Profissional excepcional. Muito experiente e paciente. Recomendo para qualquer psicólogo que queira crescer profissionalmente.',
                helpful: 8
            },
            {
                id: 3,
                author: 'Ana Costa',
                rating: 4,
                date: '2025-05-02',
                comment: 'Ótimo supervisor, muito conhecimento técnico. Às vezes as sessões poderiam ser um pouco mais práticas, mas no geral muito satisfeita.',
                helpful: 5
            }
        ];
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }

        if (!this.state.supervisor) {
            return this.renderNotFound();
        }

        return `
            <div class="supervisor-detail-page min-h-screen bg-gray-50">
                ${this.renderHeader()}
                ${this.renderContent()}
                ${this.state.showScheduleModal ? this.renderScheduleModal() : ''}
            </div>
        `;
    }

    renderLoading() {
        return `
            <div class="min-h-screen flex items-center justify-center bg-gray-50">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p class="text-gray-600 text-lg">Carregando perfil do supervisor...</p>
                </div>
            </div>
        `;
    }

    renderNotFound() {
        return `
            <div class="min-h-screen flex items-center justify-center bg-gray-50">
                <div class="text-center">
                    <div class="mb-8">
                        <span class="text-6xl">😕</span>
                        <h1 class="text-2xl font-bold text-gray-900 mb-4 mt-4">Supervisor não encontrado</h1>
                        <p class="text-gray-600 mb-6">O supervisor que você está procurando não existe ou foi removido.</p>
                    </div>
                    <button onclick="window.history.back()" class="btn-primary">
                        ← Voltar
                    </button>
                </div>
            </div>
        `;
    }

    renderHeader() {
        const supervisor = this.state.supervisor;
        return `
            <div class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
                        <!-- Avatar e badge -->
                        <div class="flex-shrink-0 relative">
                            <img 
                                src="${supervisor.avatar}" 
                                alt="${supervisor.name}"
                                class="w-32 h-32 rounded-full object-cover shadow-lg"
                            >
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${supervisor.availability === 'Disponível' ? 'bg-green-400' : 'bg-yellow-400'} shadow-lg"></div>
                        </div>

                        <!-- Informações principais -->
                        <div class="flex-1">
                            <div class="mb-4">
                                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                                    ${supervisor.name}
                                </h1>
                                <p class="text-xl text-gray-600 mb-4">
                                    ${supervisor.title}
                                </p>
                            </div>
                            
                            <!-- Métricas -->
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="text-center">
                                    <div class="flex items-center justify-center mb-1">
                                        <span class="text-yellow-400 text-xl">★</span>
                                        <span class="ml-1 text-lg font-semibold">${supervisor.rating}</span>
                                    </div>
                                    <span class="text-sm text-gray-600">${supervisor.totalReviews} avaliações</span>
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-gray-900 mb-1">${supervisor.experience}</div>
                                    <span class="text-sm text-gray-600">anos experiência</span>
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-gray-900 mb-1">${supervisor.completedSessions}</div>
                                    <span class="text-sm text-gray-600">sessões realizadas</span>
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-gray-900 mb-1">${supervisor.responseTime}</div>
                                    <span class="text-sm text-gray-600">tempo resposta</span>
                                </div>
                            </div>

                            <!-- Especialidades -->
                            <div class="mb-6">
                                <h3 class="text-sm font-medium text-gray-700 mb-2">Especialidades:</h3>
                                <div class="flex flex-wrap gap-2">
                                    ${supervisor.specialties.map(specialty => `
                                        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                                            ${specialty}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Informações adicionais -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div class="flex items-center">
                                    <span class="mr-2">📍</span>
                                    <span>${supervisor.location} (${supervisor.timezone})</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="mr-2">🌐</span>
                                    <span>${supervisor.languages.join(', ')}</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="mr-2">💼</span>
                                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded">${supervisor.availability}</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="mr-2">⚡</span>
                                    <span>Responde em ${supervisor.responseTime}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Preço e ações -->
                        <div class="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-gray-900">€${supervisor.hourlyRate}</div>
                                <div class="text-gray-600">por hora</div>
                                <div class="text-xs text-gray-500 mt-1">~R$ ${Math.round(supervisor.hourlyRate * 5.5)}</div>
                            </div>
                            
                            <div class="flex flex-col space-y-3 w-full">
                                <button 
                                    onclick="supervisorPage.showScheduleModal()"
                                    class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    📅 Agendar Sessão
                                </button>
                                <button class="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                    💬 Enviar Mensagem
                                </button>
                                <button class="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    ❤️ Adicionar aos Favoritos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderContent() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Conteúdo principal -->
                    <div class="lg:col-span-2 space-y-8">
                        ${this.renderBio()}
                        ${this.renderEducation()}
                        ${this.renderReviews()}
                    </div>

                    <!-- Sidebar -->
                    <div class="space-y-6">
                        ${this.renderAvailability()}
                        ${this.renderAchievements()}
                        ${this.renderQuickStats()}
                    </div>
                </div>
            </div>
        `;
    }

    renderBio() {
        return `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Sobre o Supervisor</h2>
                <div class="prose prose-gray max-w-none">
                    <p class="text-gray-700 leading-relaxed">
                        ${this.state.supervisor.bio}
                    </p>
                </div>
            </div>
        `;
    }

    renderEducation() {
        const supervisor = this.state.supervisor;
        return `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-6">Formação e Certificações</h2>
                
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span class="mr-2">🎓</span>
                        Educação
                    </h3>
                    <div class="space-y-3">
                        ${supervisor.education.map(edu => `
                            <div class="flex items-start">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span class="text-gray-700">${edu}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span class="mr-2">🏆</span>
                        Certificações
                    </h3>
                    <div class="space-y-3">
                        ${supervisor.certifications.map(cert => `
                            <div class="flex items-start">
                                <span class="text-green-500 mr-3 mt-0.5">✓</span>
                                <span class="text-gray-700">${cert}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderReviews() {
        return `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-gray-900">Avaliações dos Supervisionados</h2>
                    <div class="text-sm text-gray-600">
                        ${this.state.reviews.length} de ${this.state.supervisor.totalReviews} avaliações
                    </div>
                </div>

                <div class="space-y-6">
                    ${this.state.reviews.map(review => `
                        <div class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        ${review.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div class="font-medium text-gray-900">${review.author}</div>
                                        <div class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString('pt-BR')}</div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    ${Array(5).fill(0).map((_, i) => `
                                        <span class="text-${i < review.rating ? 'yellow' : 'gray'}-400">★</span>
                                    `).join('')}
                                </div>
                            </div>
                            <p class="text-gray-700 mb-3">${review.comment}</p>
                            <div class="flex items-center text-sm text-gray-500">
                                <button class="flex items-center hover:text-blue-600 transition-colors">
                                    <span class="mr-1">👍</span>
                                    Útil (${review.helpful})
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-6 text-center">
                    <button class="text-blue-600 hover:text-blue-700 font-medium">
                        Ver todas as ${this.state.supervisor.totalReviews} avaliações →
                    </button>
                </div>
            </div>
        `;
    }

    renderAvailability() {
        return `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Disponibilidade</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Status:</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            ${this.state.supervisor.availability}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Resposta:</span>
                        <span class="text-gray-900 font-medium">Em até ${this.state.supervisor.responseTime}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Fuso horário:</span>
                        <span class="text-gray-900">${this.state.supervisor.timezone}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Idiomas:</span>
                        <span class="text-gray-900">${this.state.supervisor.languages.length}</span>
                    </div>
                </div>

                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div class="flex items-center mb-2">
                        <span class="mr-2">⏰</span>
                        <span class="font-medium text-blue-900">Próximos horários</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        ${this.state.supervisor.availableSlots.slice(0, 3).map(slot => `
                            <div class="flex justify-between items-center">
                                <span class="text-blue-700">${new Date(slot.date).toLocaleDateString('pt-BR')} às ${slot.time}</span>
                                <span class="px-2 py-1 bg-${slot.available ? 'green' : 'red'}-100 text-${slot.available ? 'green' : 'red'}-800 rounded text-xs">
                                    ${slot.available ? 'Livre' : 'Ocupado'}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderAchievements() {
        const supervisor = this.state.supervisor;
        return `
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Conquistas</h3>
                <div class="space-y-4">
                    ${supervisor.achievements.map(achievement => `
                        <div class="flex items-start">
                            <span class="text-yellow-500 mr-3 mt-0.5">🏆</span>
                            <span class="text-gray-700 text-sm leading-relaxed">${achievement}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderQuickStats() {
        return `
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 class="text-lg font-bold mb-4">Por que escolher Dr. Carlos?</h3>
                <div class="space-y-3 text-sm">
                    <div class="flex items-center">
                        <span class="mr-2">✨</span>
                        <span>Top 5% supervisores da plataforma</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2">⚡</span>
                        <span>Resposta rápida garantida</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2">🌟</span>
                        <span>98% taxa de satisfação</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2">🎯</span>
                        <span>Especialista em desenvolvimento profissional</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderScheduleModal() {
        return `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick="supervisorPage.hideScheduleModal()">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-900">Agendar Sessão</h3>
                        <button onclick="supervisorPage.hideScheduleModal()" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="mb-6">
                        <p class="text-gray-600 mb-4">Escolha um horário disponível com ${this.state.supervisor.name}:</p>
                        <div class="space-y-2">
                            ${this.state.supervisor.availableSlots.filter(slot => slot.available).map(slot => `
                                <button class="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                    <div class="font-medium">${new Date(slot.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                                    <div class="text-sm text-gray-600">${slot.time} - ${slot.time.split(':')[0]}:${(parseInt(slot.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00 (${this.state.supervisor.timezone})</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button onclick="supervisorPage.hideScheduleModal()" class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Confirmar Agendamento
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showScheduleModal() {
        this.state.showScheduleModal = true;
        this.rerender();
    }

    hideScheduleModal() {
        this.state.showScheduleModal = false;
        this.rerender();
    }

    rerender() {
        const container = document.getElementById('main-content');
        if (container) {
            container.innerHTML = this.render();
        }
    }

    async mount() {
        // Disponibilizar globalmente para os event handlers
        window.supervisorPage = this;
        
        await this.loadSupervisorData();
        
        // Re-render após carregar dados
        this.rerender();
        
        console.log('✅ SupervisorDetailPage montada para supervisor:', this.supervisorId);
    }

    unmount() {
        // Cleanup
        window.supervisorPage = null;
        console.log('SupervisorDetailPage desmontada');
    }
}

// Export default para compatibilidade
export default SupervisorDetailPage;