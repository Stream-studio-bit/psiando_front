// src/pages/HomePage.js - Página inicial da Psiando Global - PARTE 1/10

export class HomePage {
    constructor(props = {}) {
        this.props = props;
        this.currentPage = props.page || 'home';
        this.state = {
            isLoading: false,
            testimonials: [
                {
                    id: 1,
                    name: "Dr. Maria Silva",
                    role: "Psicóloga Clínica",
                    location: "São Paulo, Brasil",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332a387?w=150",
                    content: "A Psiando Global revolucionou minha prática. Consegui encontrar supervisores especializados em TCC que me ajudaram a crescer profissionalmente.",
                    rating: 5
                },
                {
                    id: 2,
                    name: "Dr. Carlos Rodriguez",
                    role: "Supervisor Sênior",
                    location: "Madrid, Espanha",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                    content: "Como supervisor, a plataforma me permite conectar com profissionais de diferentes culturas, enriquecendo minha própria experiência.",
                    rating: 5
                },
                {
                    id: 3,
                    name: "Dr. Sarah Johnson",
                    role: "Psicóloga Organizacional",
                    location: "Londres, Reino Unido",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
                    content: "O sistema de IA para matching é impressionante. Fui conectada com o supervisor perfeito para minha área de especialização.",
                    rating: 5
                }
            ],
            features: [
                {
                    icon: "🤖",
                    title: "IA Avançada",
                    description: "Algoritmos inteligentes fazem o match perfeito entre supervisor e supervisionado",
                    details: ["Análise de compatibilidade", "Sugestões personalizadas", "Insights de progresso"]
                },
                {
                    icon: "🌍",
                    title: "Alcance Global",
                    description: "Conecte-se com profissionais qualificados em mais de 50 países",
                    details: ["Supervisores certificados", "Diferentes fusos horários", "Múltiplos idiomas"]
                },
                {
                    icon: "📈",
                    title: "Desenvolvimento Contínuo",
                    description: "Trilhas de aprendizado personalizadas para seu crescimento profissional",
                    details: ["Planos de desenvolvimento", "Acompanhamento de metas", "Certificações validadas"]
                },
                {
                    icon: "🔒",
                    title: "Segurança Total",
                    description: "Seus dados e sessões protegidos com criptografia de ponta",
                    details: ["Conformidade LGPD/GDPR", "Criptografia end-to-end", "Backup automático"]
                }
            ],
            stats: [
                { number: "50K+", label: "Profissionais Ativos", color: "text-blue-600" },
                { number: "15+", label: "Países Atendidos", color: "text-purple-600" },
                { number: "98%", label: "Satisfação", color: "text-green-600" },
                { number: "24/7", label: "Suporte", color: "text-orange-600" }
            ]
        };
        
        // Bind dos métodos para preservar o contexto
        this.navigateToPage = this.navigateToPage.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.openDemo = this.openDemo.bind(this);
        this.scheduleDemo = this.scheduleDemo.bind(this);
        this.contactSales = this.contactSales.bind(this);
        this.downloadBrochure = this.downloadBrochure.bind(this);
        this.exploreGroups = this.exploreGroups.bind(this);
    }

    render() {
    return `
        <div class="homepage">
            <div id="page-content">
                ${this.renderPageContent()}
            </div>
        </div>
    `;
}


    renderHeader() {
        const menuItems = [
            { title: "Supervisores", page: "supervisores" },
            { title: "Supervisionados", page: "supervisionados" },
            { title: "Instituições", page: "instituicoes" },
            { title: "Certificações", page: "certificacoes" },
            { title: "Comunidade", page: "comunidade" }
        ];

        return `
            <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <div class="flex-shrink-0 cursor-pointer" onclick="window.homePageInstance.navigateToPage('home')">
                                <div class="flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                        <span class="text-white font-bold text-sm">P</span>
                                    </div>
                                    <span class="text-xl font-bold text-gray-900">Psiando Global</span>
                                </div>
                            </div>
                        </div>

                        <!-- Navigation Menu -->
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                ${menuItems.map(item => `
                                    <button 
                                        onclick="window.homePageInstance.navigateToPage('${item.page}')"
                                        class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                            this.currentPage === item.page 
                                                ? 'text-blue-600 bg-blue-50' 
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }"
                                    >
                                        ${item.title}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Auth Buttons -->
                        <div class="hidden md:flex items-center space-x-4">
                            <button 
                                onclick="router.navigate('/auth/login')"
                                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Entrar
                            </button>
                            <button 
                                onclick="router.navigate('/auth/register')"
                                class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                            >
                                Começar Agora
                            </button>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button 
                                onclick="window.homePageInstance.toggleMobileMenu()"
                                class="text-gray-700 hover:text-blue-600 p-2"
                            >
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="md:hidden hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        ${menuItems.map(item => `
                            <button 
                                onclick="window.homePageInstance.navigateToPage('${item.page}')"
                                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                    this.currentPage === item.page 
                                        ? 'text-blue-600 bg-blue-50' 
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                }"
                            >
                                ${item.title}
                            </button>
                        `).join('')}
                        <div class="pt-4 pb-3 border-t border-gray-200">
                            <div class="flex flex-col space-y-3 px-3">
                                <button 
                                    onclick="router.navigate('/auth/login')"
                                    class="text-gray-700 hover:text-blue-600 text-left py-2 text-base font-medium"
                                >
                                    Entrar
                                </button>
                                <button 
                                    onclick="router.navigate('/auth/register')"
                                    class="bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-center"
                                >
                                    Começar Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    // PARTE 2/10 - Navegação e renderização da página principal
    
    renderPageContent() {
        switch(this.currentPage) {
            case 'supervisores':
                return this.renderSupervisoresPage();
            case 'supervisionados':
                return this.renderSupervisionadosPage();
            case 'instituicoes':
                return this.renderInstituicoesPage();
            case 'certificacoes':
                return this.renderCertificacoesPage();
            case 'comunidade':
                return this.renderComunidadePage();
            default:
                return this.renderHomePage();
        }
    }

    // CORREÇÃO DO PROBLEMA DE DUPLICAÇÃO - Método otimizado
    navigateToPage(page) {
    this.currentPage = page;

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    const container = document.querySelector('#page-content');
    if (container) {
        container.innerHTML = this.renderPageContent();
        this.setupAfterNavigation();
    }
}


    setupAfterNavigation() {
        // Recriar instância global
        window.homePageInstance = this;
        
        // Reconfigurar animações se necessário
        this.setupAnimations();
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    // PÁGINA PRINCIPAL (HOME)
    renderHomePage() {
        return `
            ${this.renderHeroSection()}
            ${this.renderStatsSection()}
            ${this.renderFeaturesSection()}
            ${this.renderHowItWorksSection()}
            ${this.renderTestimonialsSection()}
            ${this.renderPricingSection()}
            ${this.renderCTASection()}
        `;
    }

    renderHeroSection() {
        return `
            <section class="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
                <!-- Background Elements -->
                <div class="absolute inset-0">
                    <div class="absolute top-0 left-0 w-full h-full">
                        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                        <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                        <div class="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                    </div>
                    <div class="absolute inset-0 bg-black opacity-20"></div>
                </div>

                <!-- Content -->
                <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div class="text-center">
                        <!-- Main Heading -->
                        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Supervisão Clínica
                            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                de Nova Geração
                            </span>
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Democratizando o acesso à supervisão clínica de qualidade. 
                            Conecte-se com supervisores experientes do mundo todo em uma 
                            plataforma inteligente, escalável e certificada.
                        </p>

                        <!-- Value Proposition -->
                        <div class="mb-12 max-w-3xl mx-auto">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
                                <div class="flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span>IA Integrada</span>
                                </div>
                                <div class="flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Certificações Internacionais</span>
                                </div>
                                <div class="flex items-center justify-center space-x-2">
                                    <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Networking Global</span>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button 
                                onclick="router.navigate('/auth/register')" 
                                class="w-full sm:w-auto bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                🚀 Começar Gratuitamente
                            </button>
                            <button 
                                onclick="window.homePageInstance.navigateToPage('supervisores')" 
                                class="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                            >
                                🔍 Explorar Supervisores
                            </button>
                        </div>

                        <!-- Trust Indicators -->
                        <div class="mt-12 text-blue-200 text-sm">
                            <p class="mb-4">Certificado por:</p>
                            <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
                                <span class="text-xs font-medium">CFP • APA • BPS • CRP</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg class="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </section>
        `;
    }
    // PARTE 3/10 - Stats, Features e How It Works Sections

    renderStatsSection() {
        return `
            <section class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        ${this.state.stats.map(stat => `
                            <div class="text-center transform hover:scale-105 transition-transform duration-300">
                                <div class="text-4xl md:text-5xl font-bold ${stat.color} mb-2">
                                    ${stat.number}
                                </div>
                                <div class="text-gray-600 font-medium">
                                    ${stat.label}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderFeaturesSection() {
        return `
            <section class="py-20 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Section Header -->
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Por que escolher a Psiando Global?
                        </h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Vamos além da simples conexão supervisor-supervisionado. 
                            Oferecemos um ecossistema completo de desenvolvimento profissional.
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${this.state.features.map((feature, index) => `
                            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <!-- Icon -->
                                <div class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    ${feature.icon}
                                </div>
                                
                                <!-- Title -->
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                                    ${feature.title}
                                </h3>
                                
                                <!-- Description -->
                                <p class="text-gray-600 mb-6">
                                    ${feature.description}
                                </p>
                                
                                <!-- Details -->
                                <ul class="text-sm text-gray-500 space-y-2">
                                    ${feature.details.map(detail => `
                                        <li class="flex items-center">
                                            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                            ${detail}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderHowItWorksSection() {
        const steps = [
            {
                number: "01",
                title: "Crie seu Perfil",
                description: "Cadastre-se gratuitamente e conte sobre sua experiência, especialidades e objetivos profissionais.",
                icon: "👤"
            },
            {
                number: "02", 
                title: "IA faz o Match",
                description: "Nossa inteligência artificial analisa seu perfil e conecta você com supervisores compatíveis.",
                icon: "🤖"
            },
            {
                number: "03",
                title: "Agende Sessões",
                description: "Escolha horários que funcionem para você e seu supervisor em nossa plataforma integrada.",
                icon: "📅"
            },
            {
                number: "04",
                title: "Desenvolva-se",
                description: "Participe de sessões, receba feedback e acompanhe seu crescimento profissional em tempo real.",
                icon: "📈"
            }
        ];

        return `
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Section Header -->
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Como funciona
                        </h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Em apenas 4 passos simples, você está conectado com o supervisor ideal 
                            e pronto para acelerar seu desenvolvimento profissional.
                        </p>
                    </div>

                    <!-- Steps -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${steps.map((step, index) => `
                            <div class="text-center group relative">
                                <!-- Step Number -->
                                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                    ${step.number}
                                </div>
                                
                                <!-- Icon -->
                                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    ${step.icon}
                                </div>
                                
                                <!-- Title -->
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                                    ${step.title}
                                </h3>
                                
                                <!-- Description -->
                                <p class="text-gray-600">
                                    ${step.description}
                                </p>
                            </div>
                        `).join('')}
                    </div>

                    <!-- CTA -->
                    <div class="text-center mt-12">
                        <button 
                            onclick="router.navigate('/auth/register')" 
                            class="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Começar Agora - É Grátis
                        </button>
                    </div>
                </div>
            </section>
        `;
    }
    // PARTE 4/10 - Testimonials, Pricing e CTA Sections

    renderTestimonialsSection() {
        return `
            <section class="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Section Header -->
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            O que nossos usuários dizem
                        </h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Mais de 50.000 profissionais já transformaram suas carreiras conosco.
                        </p>
                    </div>

                    <!-- Testimonials Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${this.state.testimonials.map(testimonial => `
                            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <!-- Rating -->
                                <div class="flex mb-4">
                                    ${Array(testimonial.rating).fill(0).map(() => `
                                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    `).join('')}
                                </div>

                                <!-- Content -->
                                <p class="text-gray-700 mb-6 italic">
                                    "${testimonial.content}"
                                </p>

                                <!-- Author -->
                                <div class="flex items-center">
                                    <img 
                                        src="${testimonial.avatar}" 
                                        alt="${testimonial.name}"
                                        class="w-12 h-12 rounded-full mr-4 object-cover"
                                    >
                                    <div>
                                        <div class="font-semibold text-gray-900">
                                            ${testimonial.name}
                                        </div>
                                        <div class="text-sm text-gray-600">
                                            ${testimonial.role}
                                        </div>
                                        <div class="text-xs text-gray-500">
                                            ${testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderPricingSection() {
        const plans = [
            {
                name: "Básico",
                price: "Grátis",
                period: "",
                description: "Perfeito para começar sua jornada",
                features: [
                    "1 sessão gratuita por mês",
                    "Acesso à comunidade",
                    "Recursos básicos de IA",
                    "Suporte por email"
                ],
                cta: "Começar Grátis",
                popular: false
            },
            {
                name: "Profissional",
                price: "R$ 97",
                period: "/mês",
                description: "Para profissionais em desenvolvimento",
                features: [
                    "4 sessões mensais",
                    "Supervisores verificados",
                    "IA avançada para matching",
                    "Relatórios de progresso",
                    "Suporte prioritário",
                    "Acesso a workshops"
                ],
                cta: "Escolher Plano",
                popular: true
            },
            {
                name: "Global",
                price: "R$ 197",
                period: "/mês",
                description: "Acesso a supervisores internacionais + certificações",
                features: [
                    "Sessões ilimitadas",
                    "Dashboard de supervisor",
                    "Ferramentas de gestão",
                    "Certificações incluídas",
                    "Suporte 24/7",
                    "API personalizada",
                    "Treinamento especializado"
                ],
                cta: "Falar com Vendas",
                popular: false
            }
        ];

        return `
            <section class="py-20 bg-gray-900 text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">
                            Planos que crescem com você
                        </h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comece gratuitamente e evolua conforme suas necessidades.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${plans.map(plan => `
                            <div class="relative bg-gray-800 rounded-xl p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:scale-105 transition-transform duration-300">
                                ${plan.popular ? `
                                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Mais Popular
                                        </span>
                                    </div>
                                ` : ''}

                                <div class="text-center mb-8">
                                    <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
                                    <div class="text-4xl font-bold mb-2">
                                        ${plan.price}
                                        <span class="text-lg text-gray-400">${plan.period}</span>
                                    </div>
                                    <p class="text-gray-400">${plan.description}</p>
                                </div>

                                <ul class="space-y-4 mb-8">
                                    ${plan.features.map(feature => `
                                        <li class="flex items-center">
                                            <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
                                            ${feature}
                                        </li>
                                    `).join('')}
                                </ul>

                                <button class="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                                    plan.popular 
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }">
                                    ${plan.cta}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderCTASection() {
        return `
            <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p class="text-xl text-blue-100 mb-8">
                        Junte-se à maior plataforma de supervisão clínica do mundo. 
                        Comece gratuitamente e descubra supervisores que vão acelerar seu crescimento.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button 
                            onclick="router.navigate('/auth/register')" 
                            class="w-full sm:w-auto bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                        >
                            🚀 Criar Conta Gratuita
                        </button>
                        <button 
                            onclick="window.homePageInstance.navigateToPage('supervisores')" 
                            class="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                        >
                            📋 Ver Demonstração
                        </button>
                    </div>

                    <div class="text-blue-200 text-sm">
                        <p>✅ Sem cartão de crédito • ✅ Configuração em 2 minutos • ✅ Suporte em português</p>
                    </div>
                </div>
            </section>
        `;
    }
    // PARTE 5/10 - PÁGINA SUPERVISORES COMPLETA

    renderSupervisoresPage() {
        const supervisorCategories = [
            {
                title: "Psicologia Clínica",
                icon: "🧠",
                count: "2.847",
                specialties: ["TCC", "Psicanálise", "Gestalt", "Sistêmica"],
                avgRating: 4.9,
                priceRange: "R$ 80-200"
            },
            {
                title: "Psicologia Organizacional",
                icon: "🏢",
                count: "1.234",
                specialties: ["RH", "Liderança", "Coaching", "Desenvolvimento"],
                avgRating: 4.8,
                priceRange: "R$ 120-300"
            },
            {
                title: "Neuropsicologia",
                icon: "🔬",
                count: "456",
                specialties: ["Avaliação", "Reabilitação", "Infantil", "Adulto"],
                avgRating: 4.9,
                priceRange: "R$ 150-350"
            },
            {
                title: "Psicologia Escolar",
                icon: "🎓",
                count: "789",
                specialties: ["Aprendizagem", "Inclusão", "Orientação", "Família"],
                avgRating: 4.7,
                priceRange: "R$ 90-180"
            }
        ];

        const featuredSupervisors = [
            {
                name: "Dr. Ana Carolina Silva",
                photo: "https://images.unsplash.com/photo-1494790108755-2616b332a387?w=200",
                specialty: "TCC e Transtornos de Ansiedade",
                experience: "15 anos",
                location: "São Paulo, Brasil",
                rating: 4.9,
                sessions: 1247,
                price: "R$ 120/sessão",
                languages: ["Português", "Espanhol"],
                availability: "Manhã e Tarde"
            },
            {
                name: "Dr. Carlos Rodriguez",
                photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
                specialty: "Psicanálise Lacaniana",
                experience: "20 anos",
                location: "Madrid, Espanha",
                rating: 5.0,
                sessions: 892,
                price: "€ 85/sessão",
                languages: ["Espanhol", "Português", "Inglês"],
                availability: "Tarde e Noite"
            },
            {
                name: "Dr. Sarah Johnson",
                photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
                specialty: "Psicologia Organizacional",
                experience: "12 anos",
                location: "Londres, Reino Unido",
                rating: 4.8,
                sessions: 654,
                price: "£ 95/sessão",
                languages: ["Inglês", "Português"],
                availability: "Flexível"
            }
        ];

        return `
            <div class="supervisores-page">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Encontre seu Supervisor Ideal
                            </h1>
                            <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                                Conecte-se com mais de 5.000 supervisores qualificados ao redor do mundo. 
                                Nossa IA encontra o match perfeito baseado na sua especialidade e objetivos.
                            </p>
                            
                            <!-- Search Bar -->
                            <div class="max-w-2xl mx-auto bg-white rounded-lg p-2 flex">
                                <input 
                                    type="text" 
                                    placeholder="Buscar por especialidade, nome ou localização..."
                                    class="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
                                >
                                <button class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                                    🔍 Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Categories Section -->
                <section class="py-16 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Especialidades Disponíveis</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            ${supervisorCategories.map(category => `
                                <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                                    <div class="text-4xl mb-4">${category.icon}</div>
                                    <h3 class="text-xl font-semibold mb-2">${category.title}</h3>
                                    <div class="text-blue-600 font-bold mb-3">${category.count} supervisores</div>
                                    
                                    <div class="space-y-2 mb-4">
                                        <div class="flex items-center text-sm text-gray-600">
                                            <span class="text-yellow-500">⭐</span>
                                            <span class="ml-1">${category.avgRating}/5.0</span>
                                        </div>
                                        <div class="text-sm text-gray-600">${category.priceRange}</div>
                                    </div>
                                    
                                    <div class="flex flex-wrap gap-1">
                                        ${category.specialties.map(spec => `
                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${spec}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Featured Supervisors -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Supervisores em Destaque</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${featuredSupervisors.map(supervisor => `
                                <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div class="flex items-center mb-4">
                                        <img src="${supervisor.photo}" alt="${supervisor.name}" class="w-16 h-16 rounded-full object-cover mr-4">
                                        <div>
                                            <h3 class="font-semibold text-lg">${supervisor.name}</h3>
                                            <p class="text-gray-600 text-sm">${supervisor.specialty}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="space-y-3">
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-600">Experiência:</span>
                                            <span class="font-medium">${supervisor.experience}</span>
                                        </div>
                                        
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-600">Localização:</span>
                                            <span class="text-sm">${supervisor.location}</span>
                                        </div>
                                        
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-600">Avaliação:</span>
                                            <div class="flex items-center">
                                                <span class="text-yellow-500">⭐</span>
                                                <span class="ml-1 font-medium">${supervisor.rating}</span>
                                                <span class="text-gray-500 ml-1">(${supervisor.sessions} sessões)</span>
                                            </div>
                                        </div>
                                        
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-600">Preço:</span>
                                            <span class="font-bold text-blue-600">${supervisor.price}</span>
                                        </div>
                                        
                                        <div class="flex flex-wrap gap-1 mt-3">
                                            ${supervisor.languages.map(lang => `
                                                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${lang}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <div class="mt-6 flex gap-2">
                                        <button class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                            Ver Perfil
                                        </button>
                                        <button class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                            Contatar
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center mt-12">
                            <button class="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                Ver Todos os Supervisores
                            </button>
                        </div>
                    </div>
                </section>

                <!-- How It Works for Supervisors -->
                <section class="py-16 bg-blue-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Como Funciona a Supervisão</h2>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                                <h3 class="font-semibold mb-2">Escolha seu Supervisor</h3>
                                <p class="text-gray-600 text-sm">Navegue pelos perfis e encontre o supervisor que melhor se adequa aos seus objetivos</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                                <h3 class="font-semibold mb-2">Agende uma Sessão</h3>
                                <p class="text-gray-600 text-sm">Use nossa agenda integrada para marcar sessões nos horários disponíveis</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                                <h3 class="font-semibold mb-2">Participe da Supervisão</h3>
                                <p class="text-gray-600 text-sm">Tenha suas sessões por videochamada em nossa plataforma segura</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                                <h3 class="font-semibold mb-2">Acompanhe seu Progresso</h3>
                                <p class="text-gray-600 text-sm">Receba feedback detalhado e acompanhe sua evolução profissional</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Supervisor Benefits -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Benefícios para Supervisores</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="text-center p-6">
                                <div class="text-4xl mb-4">💰</div>
                                <h3 class="text-xl font-semibold mb-3">Monetize sua Experiência</h3>
                                <p class="text-gray-600">Transforme seu conhecimento em renda extra supervisionando profissionais do mundo todo</p>
                            </div>
                            <div class="text-center p-6">
                                <div class="text-4xl mb-4">🌍</div>
                                <h3 class="text-xl font-semibold mb-3">Alcance Global</h3>
                                <p class="text-gray-600">Expanda sua influência profissional supervisionando em diferentes países e culturas</p>
                            </div>
                            <div class="text-center p-6">
                                <div class="text-4xl mb-4">⏰</div>
                                <h3 class="text-xl font-semibold mb-3">Flexibilidade Total</h3>
                                <p class="text-gray-600">Defina seus próprios horários e preços. Trabalhe quando e como quiser</p>
                            </div>
                        </div>
                        
                        <div class="text-center mt-12">
                            <button 
                                onclick="router.navigate('/supervisor/register')" 
                                class="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                Tornar-se Supervisor
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    // PARTE 6/10 - PÁGINA SUPERVISIONADOS

    renderSupervisionadosPage() {
        const supervisionadosBenefits = [
            {
                icon: "🎯",
                title: "Desenvolvimento Personalizado",
                description: "Trilhas de aprendizado customizadas baseadas em suas necessidades específicas",
                features: ["Avaliação inicial completa", "Plano de desenvolvimento individual", "Metas claras e mensuráveis"]
            },
            {
                icon: "📚",
                title: "Recursos de Aprendizagem",
                description: "Acesso a biblioteca completa de materiais e ferramentas especializadas",
                features: ["Biblioteca digital", "Casos clínicos", "Templates e protocolos"]
            },
            {
                icon: "🤝",
                title: "Networking Profissional",
                description: "Conecte-se com outros profissionais e construa sua rede de contatos",
                features: ["Grupos de estudo", "Eventos virtuais", "Fóruns especializados"]
            },
            {
                icon: "📊",
                title: "Acompanhamento de Progresso",
                description: "Monitore sua evolução com relatórios detalhados e feedback contínuo",
                features: ["Dashboard personalizado", "Relatórios de progresso", "Certificações"]
            }
        ];

        const supervisionPrograms = [
            {
                title: "Básico",
                duration: "3 meses",
                sessions: "1 sessão por mês",
                price: "Grátis",
                features: [
                    "3 sessões experimentais de 1h",
                    "Supervisor dedicado",
                    "Acesso à biblioteca digital",
                    "Certificado de participação"
                ],
                popular: false
            },
            {
                title: "Profissional",
                duration: "12 meses", 
                sessions: "48 sessões",
                price: "R$ 97,00",
                features: [
                    "4 sessões mensais de 1h",
                    "Supervisor senior",
                    "Plano de desenvolvimento individual",
                    "Acesso a grupos de estudo",
                    "Certificado de conclusão"
                ],
                popular: true
            },
            {
                title: "Global",
                duration: "12 meses",
                sessions: "48 sessões",
                price: "R$ 197,00",
                features: [
                    "4 sessões mensais de 1h",
                    "Supervisor especialista",
                    "Mentoria de carreira",
                    "Acesso VIP a eventos",
                    "Certificação internacional",
                    "Supervisão em grupo"
                ],
                popular: false
            }
        ];

        return `
            <div class="supervisionados-page">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Acelere seu Desenvolvimento Profissional
                            </h1>
                            <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                                Programas estruturados de supervisão que transformam profissionais iniciantes 
                                em especialistas reconhecidos. Orientação personalizada, recursos exclusivos e networking global.
                            </p>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button 
                                    onclick="router.navigate('/auth/register')" 
                                    class="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    🚀 Começar Minha Jornada
                                </button>
                                <button 
                                    onclick="window.homePageInstance.openDemo()" 
                                    class="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                                >
                                    📹 Ver Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Benefits Section -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Por que ser Supervisionado na Psiando?</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            ${supervisionadosBenefits.map(benefit => `
                                <div class="text-center group">
                                    <div class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">${benefit.icon}</div>
                                    <h3 class="text-xl font-semibold mb-4">${benefit.title}</h3>
                                    <p class="text-gray-600 mb-6">${benefit.description}</p>
                                    <ul class="text-sm text-gray-500 space-y-2">
                                        ${benefit.features.map(feature => `
                                            <li class="flex items-center justify-center">
                                                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                ${feature}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Programs Section -->
                <section class="py-16 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Programas de Supervisão</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${supervisionPrograms.map(program => `
                                <div class="bg-white rounded-xl p-8 ${program.popular ? 'ring-2 ring-blue-500 scale-105' : ''} shadow-lg hover:shadow-xl transition-all duration-300">
                                    ${program.popular ? `
                                        <div class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 text-center">
                                            Mais Escolhido
                                        </div>
                                    ` : ''}
                                    
                                    <h3 class="text-2xl font-bold mb-4">${program.title}</h3>
                                    <div class="text-3xl font-bold text-blue-600 mb-2">${program.price}</div>
                                    <div class="text-gray-600 mb-6">${program.duration} • ${program.sessions}</div>
                                    
                                    <ul class="space-y-3 mb-8">
                                        ${program.features.map(feature => `
                                            <li class="flex items-start">
                                                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                ${feature}
                                            </li>
                                        `).join('')}
                                    </ul>
                                    
                                    <button class="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                                        program.popular 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    }">
                                        Escolher Programa
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Success Stories -->
                <section class="py-16 bg-blue-600 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Histórias de Sucesso</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="text-center">
                                <div class="text-4xl font-bold mb-2">85%</div>
                                <div class="text-blue-200">dos supervisionados conseguem promoção em 6 meses</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold mb-2">92%</div>
                                <div class="text-blue-200">relatam melhoria significativa na confiança profissional</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold mb-2">78%</div>
                                <div class="text-blue-200">iniciam consultório próprio após programa completo</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Testimonials -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Depoimentos de Supervisionados</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div class="bg-gray-50 rounded-xl p-8">
                                <div class="flex items-center mb-6">
                                    <img src="https://images.unsplash.com/photo-1494790108755-2616b332a387?w=100" alt="Juliana Santos" class="w-16 h-16 rounded-full object-cover mr-4">
                                    <div>
                                        <h4 class="font-semibold">Juliana Santos</h4>
                                        <p class="text-gray-600">Psicóloga Clínica</p>
                                    </div>
                                </div>
                                <p class="text-gray-700 italic">"O programa intensivo mudou completamente minha carreira. Em 6 meses, passei de recém-formada a coordenadora de uma equipe multidisciplinar."</p>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-8">
                                <div class="flex items-center mb-6">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Ricardo Lima" class="w-16 h-16 rounded-full object-cover mr-4">
                                    <div>
                                        <h4 class="font-semibold">Ricardo Lima</h4>
                                        <p class="text-gray-600">Psicólogo Organizacional</p>
                                    </div>
                                </div>
                                <p class="text-gray-700 italic">"A supervisão me deu a confiança que precisava para abrir meu próprio consultório. Hoje tenho uma agenda lotada e sou referência na minha região."</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold mb-6">Pronto para Acelerar sua Carreira?</h2>
                        <p class="text-xl mb-8">Junte-se a milhares de profissionais que já transformaram suas carreiras com nossos programas de supervisão.</p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onclick="router.navigate('/auth/register')" 
                                class="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300"
                            >
                                Começar Agora
                            </button>
                            <button 
                                onclick="window.homePageInstance.openDemo()" 
                                class="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                            >
                                Agendar Consulta
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    // PARTE 7/10 - PÁGINA INSTITUIÇÕES

    renderInstituicoesPage() {
        const institutionFeatures = [
            {
                icon: "🏛️",
                title: "Gestão Centralizada",
                description: "Dashboard completo para gerenciar múltiplos profissionais e supervisores em uma única plataforma",
                benefits: ["Controle de acesso por níveis", "Relatórios institucionais", "Billing unificado", "Gestão de equipes"]
            },
            {
                icon: "📊",
                title: "Analytics Avançados",
                description: "Insights detalhados sobre o progresso e performance dos profissionais supervisionados",
                benefits: ["Métricas de desenvolvimento", "ROI da supervisão", "Indicadores de qualidade", "Relatórios personalizados"]
            },
            {
                icon: "🎓",
                title: "Programas Customizados",
                description: "Trilhas de supervisão personalizadas de acordo com os objetivos da instituição",
                benefits: ["Currículos específicos", "Certificações próprias", "Metodologias exclusivas", "Branding institucional"]
            },
            {
                icon: "👥",
                title: "Supervisão em Escala",
                description: "Capacidade para gerenciar centenas de profissionais simultaneamente",
                benefits: ["Matching otimizado", "Agendamento inteligente", "Recursos ilimitados", "Suporte dedicado"]
            }
        ];

        const institutionPlans = [
            {
                name: "Startup",
                description: "Para clínicas e consultórios pequenos",
                price: "R$ 497",
                period: "/mês",
                users: "Até 25 profissionais",
                features: [
                    "Dashboard de gestão",
                    "Relatórios básicos",
                    "Suporte por email",
                    "Integrações básicas",
                    "Branding personalizado"
                ],
                popular: false
            },
            {
                name: "Growth",
                description: "Para instituições em crescimento",
                price: "R$ 1.497",
                period: "/mês",
                users: "Até 100 profissionais",
                features: [
                    "Todas as features do Startup",
                    "Analytics avançados",
                    "Suporte prioritário",
                    "API personalizada",
                    "Treinamento especializado",
                    "Certificações customizadas"
                ],
                popular: true
            },
            {
                name: "Enterprise",
                description: "Para grandes instituições",
                price: "Sob consulta",
                period: "",
                users: "Usuários ilimitados",
                features: [
                    "Todas as features do Growth",
                    "Dedicated success manager",
                    "SLA garantido",
                    "Infraestrutura dedicada",
                    "Compliance avançado",
                    "Integrações enterprise"
                ],
                popular: false
            }
        ];

        const caseStudies = [
            {
                institution: "Hospital das Clínicas - SP",
                type: "Hospital Universitário",
                challenge: "Supervisionar 200+ residentes de psicologia",
                solution: "Implementação de programa estruturado com supervisores especializados",
                results: [
                    "95% de aprovação dos residentes",
                    "30% redução no tempo de gestão",
                    "40% melhoria na qualidade das supervisões"
                ],
                testimonial: "A Psiando Global revolucionou nosso programa de residência. A plataforma permitiu escalar sem perder qualidade.",
                author: "Dr. Roberto Santos - Diretor de Ensino"
            },
            {
                institution: "Grupo Fleury",
                type: "Rede de Clínicas",
                challenge: "Padronizar supervisão em 50+ unidades",
                solution: "Plataforma unificada com supervisores certificados e protocolos padronizados",
                results: [
                    "100% das unidades integradas",
                    "50% redução nos custos de supervisão",
                    "98% satisfação dos profissionais"
                ],
                testimonial: "Conseguimos manter a excelência em todas as nossas unidades com a solução da Psiando Global.",
                author: "Dra. Maria Fernanda - Diretora Clínica"
            }
        ];

        return `
            <div class="instituicoes-page">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Soluções Enterprise para Instituições
                            </h1>
                            <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                                Transforme a supervisão clínica da sua instituição com nossa plataforma enterprise. 
                                Gerencie centenas de profissionais com eficiência, qualidade e compliance total.
                            </p>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button 
                                    onclick="window.homePageInstance.scheduleDemo()" 
                                    class="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    📅 Agendar Demonstração
                                </button>
                                <button 
                                    onclick="window.homePageInstance.contactSales()" 
                                    class="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                                >
                                    💬 Falar com Especialista
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Stats Section -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
                                <div class="text-gray-600">Instituições Parceiras</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-purple-600 mb-2">95%</div>
                                <div class="text-gray-600">Redução no Tempo de Gestão</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-green-600 mb-2">10K+</div>
                                <div class="text-gray-600">Profissionais Gerenciados</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-orange-600 mb-2">40%</div>
                                <div class="text-gray-600">Melhoria na Qualidade</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="py-16 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Recursos Enterprise</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            ${institutionFeatures.map(feature => `
                                <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div class="text-4xl mb-4">${feature.icon}</div>
                                    <h3 class="text-xl font-semibold mb-3">${feature.title}</h3>
                                    <p class="text-gray-600 mb-4 text-sm">${feature.description}</p>
                                    
                                    <ul class="text-xs text-gray-500 space-y-1">
                                        ${feature.benefits.map(benefit => `
                                            <li class="flex items-center">
                                                <svg class="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                ${benefit}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Pricing Section -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Planos Institucionais</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${institutionPlans.map(plan => `
                                <div class="bg-white border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'} rounded-xl p-8 ${plan.popular ? 'scale-105' : ''} hover:shadow-lg transition-all duration-300">
                                    ${plan.popular ? `
                                        <div class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 text-center">
                                            Mais Popular
                                        </div>
                                    ` : ''}
                                    
                                    <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
                                    <p class="text-gray-600 mb-4">${plan.description}</p>
                                    
                                    <div class="mb-4">
                                        <div class="text-3xl font-bold text-blue-600">${plan.price}</div>
                                        <div class="text-gray-500">${plan.period}</div>
                                        <div class="text-sm text-gray-600 mt-2">${plan.users}</div>
                                    </div>
                                    
                                    <ul class="space-y-3 mb-8">
                                        ${plan.features.map(feature => `
                                            <li class="flex items-start">
                                                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span class="text-sm">${feature}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    
                                    <button class="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                                        plan.popular 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    }">
                                        ${plan.name === 'Enterprise' ? 'Contatar Vendas' : 'Começar Teste Grátis'}
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Case Studies -->
                <section class="py-16 bg-blue-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Casos de Sucesso</h2>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            ${caseStudies.map(study => `
                                <div class="bg-white rounded-xl p-8 shadow-lg">
                                    <div class="flex items-center mb-6">
                                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                            <span class="text-white font-bold">🏥</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold">${study.institution}</h3>
                                            <p class="text-gray-600">${study.type}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="space-y-4">
                                        <div>
                                            <h4 class="font-semibold text-red-600 mb-2">Desafio:</h4>
                                            <p class="text-gray-700">${study.challenge}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 class="font-semibold text-blue-600 mb-2">Solução:</h4>
                                            <p class="text-gray-700">${study.solution}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 class="font-semibold text-green-600 mb-2">Resultados:</h4>
                                            <ul class="space-y-1">
                                                ${study.results.map(result => `
                                                    <li class="flex items-center text-gray-700">
                                                        <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                        </svg>
                                                        ${result}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                        
                                        <div class="border-t pt-4">
                                            <p class="text-gray-700 italic">"${study.testimonial}"</p>
                                            <p class="text-sm text-gray-600 mt-2">— ${study.author}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Integration Options -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Integrações Disponíveis</h2>
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center text-center">
                            <div class="p-4">
                                <div class="text-2xl mb-2">📊</div>
                                <div class="text-sm font-medium">Microsoft Teams</div>
                            </div>
                            <div class="p-4">
                                <div class="text-2xl mb-2">💼</div>
                                <div class="text-sm font-medium">Salesforce</div>
                            </div>
                            <div class="p-4">
                                <div class="text-2xl mb-2">📈</div>
                                <div class="text-sm font-medium">Power BI</div>
                            </div>
                            <div class="p-4">
                                <div class="text-2xl mb-2">🔐</div>
                                <div class="text-sm font-medium">Active Directory</div>
                            </div>
                            <div class="p-4">
                                <div class="text-2xl mb-2">📝</div>
                                <div class="text-sm font-medium">Office 365</div>
                            </div>
                            <div class="p-4">
                                <div class="text-2xl mb-2">⚡</div>
                                <div class="text-sm font-medium">Zapier</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Security & Compliance -->
                <section class="py-16 bg-gray-900 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Segurança e Compliance</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="text-center">
                                <div class="text-4xl mb-4">🔒</div>
                                <h3 class="text-xl font-semibold mb-3">Criptografia de Ponta</h3>
                                <p class="text-gray-300">Dados protegidos com criptografia AES-256 e transmissão via TLS 1.3</p>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl mb-4">📋</div>
                                <h3 class="text-xl font-semibold mb-3">Compliance Total</h3>
                                <p class="text-gray-300">Conformidade com LGPD, GDPR, HIPAA e ISO 27001</p>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl mb-4">🛡️</div>
                                <h3 class="text-xl font-semibold mb-3">Auditoria Completa</h3>
                                <p class="text-gray-300">Logs detalhados e trilhas de auditoria para compliance total</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="py-16 bg-indigo-600 text-white">
                    <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold mb-6">
                            Pronto para Transformar sua Instituição?
                        </h2>
                        <p class="text-xl text-blue-100 mb-8">
                            Agende uma demonstração personalizada e descubra como podemos 
                            otimizar seus processos de supervisão clínica.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onclick="window.homePageInstance.scheduleDemo()" 
                                class="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                            >
                                📅 Agendar Demonstração
                            </button>
                            <button 
                                onclick="window.homePageInstance.contactSales()" 
                                class="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                            >
                                💬 Falar com Especialista
                            </button>
                        </div>
                        
                        <div class="mt-8 text-blue-200 text-sm">
                            <p>✅ Teste grátis de 30 dias • ✅ Implementação em 48h • ✅ Suporte dedicado</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    // PARTE 8/10 - PÁGINA CERTIFICAÇÕES

    renderCertificacoesPage() {
        const certifications = [
            {
                title: "Certificação em Supervisão Clínica",
                level: "Básico",
                duration: "40 horas",
                price: "R$ 897",
                description: "Fundamentos da supervisão clínica com foco em técnicas e metodologias essenciais",
                modules: [
                    "Fundamentos da supervisão",
                    "Técnicas de feedback",
                    "Ética profissional",
                    "Desenvolvimento de competências"
                ],
                recognition: ["CRP", "CFP"],
                popular: false
            },
            {
                title: "Certificação Avançada em Supervisão",
                level: "Avançado",
                duration: "80 horas",
                price: "R$ 1.497",
                description: "Programa completo para formação de supervisores especialistas",
                modules: [
                    "Todas as disciplinas do nível básico",
                    "Supervisão em grupo",
                    "Metodologias avançadas",
                    "Pesquisa em supervisão",
                    "Gestão de programas",
                    "Supervisão intercultural"
                ],
                recognition: ["CRP", "CFP", "APA", "BPS"],
                popular: true
            },
            {
                title: "Certificação Internacional",
                level: "Expert",
                duration: "120 horas",
                price: "R$ 2.497",
                description: "Certificação com reconhecimento internacional para supervisores seniores",
                modules: [
                    "Todas as disciplinas anteriores",
                    "Supervisão digital",
                    "Inteligência artificial na supervisão",
                    "Liderança em supervisão",
                    "Formação de formadores",
                    "Consultoria organizacional"
                ],
                recognition: ["CRP", "CFP", "APA", "BPS", "EuroPsy"],
                popular: false
            }
        ];

        const certificationBenefits = [
            {
                icon: "🏆",
                title: "Reconhecimento Profissional",
                description: "Certificações reconhecidas pelos principais órgãos de classe do mundo"
            },
            {
                icon: "📈",
                title: "Crescimento na Carreira",
                description: "Aumento médio de 40% na remuneração após certificação"
            },
            {
                icon: "🌍",
                title: "Alcance Global",
                description: "Validação internacional para trabalhar em qualquer país"
            },
            {
                icon: "🎓",
                title: "Educação Continuada",
                description: "Créditos de educação continuada válidos por 3 anos"
            }
        ];

        return `
            <div class="certificacoes-page">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Certificações Internacionais
                            </h1>
                            <p class="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
                                Valide suas competências em supervisão clínica com certificações reconhecidas 
                                mundialmente. Eleve sua carreira ao próximo nível com credenciais de prestígio.
                            </p>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button 
                                    onclick="router.navigate('/auth/register')" 
                                    class="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    🎯 Iniciar Certificação
                                </button>
                                <button 
                                    onclick="window.homePageInstance.downloadBrochure()" 
                                    class="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
                                >
                                    📄 Baixar Brochure
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Benefits Section -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Benefícios das Certificações</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            ${certificationBenefits.map(benefit => `
                                <div class="text-center group">
                                    <div class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">${benefit.icon}</div>
                                    <h3 class="text-xl font-semibold mb-4">${benefit.title}</h3>
                                    <p class="text-gray-600">${benefit.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Certifications Section -->
                <section class="py-16 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Programas de Certificação</h2>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            ${certifications.map(cert => `
                                <div class="bg-white rounded-xl p-8 ${cert.popular ? 'ring-2 ring-orange-500 scale-105' : ''} shadow-lg hover:shadow-xl transition-all duration-300">
                                    ${cert.popular ? `
                                        <div class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 text-center">
                                            Mais Procurado
                                        </div>
                                    ` : ''}
                                    
                                    <div class="text-center mb-6">
                                        <h3 class="text-2xl font-bold mb-2">${cert.title}</h3>
                                        <div class="text-sm text-orange-600 font-medium mb-2">Nível ${cert.level}</div>
                                        <div class="text-3xl font-bold text-orange-600 mb-2">${cert.price}</div>
                                        <div class="text-gray-600">${cert.duration}</div>
                                    </div>
                                    
                                    <p class="text-gray-600 mb-6">${cert.description}</p>
                                    
                                    <div class="mb-6">
                                        <h4 class="font-semibold mb-3">Módulos do Programa:</h4>
                                        <ul class="space-y-2">
                                            ${cert.modules.map(module => `
                                                <li class="flex items-start">
                                                    <svg class="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                    </svg>
                                                    <span class="text-sm">${module}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <h4 class="font-semibold mb-3">Reconhecimento:</h4>
                                        <div class="flex flex-wrap gap-2">
                                            ${cert.recognition.map(org => `
                                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${org}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <button class="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                                        cert.popular 
                                            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                    }">
                                        Inscrever-se
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Recognition Section -->
                <section class="py-16 bg-orange-600 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 class="text-3xl font-bold mb-8">Reconhecimento Mundial</h2>
                        <p class="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                            Nossas certificações são reconhecidas pelos principais órgãos de psicologia do mundo
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                            <div class="text-center">
                                <div class="text-2xl font-bold mb-2">CRP</div>
                                <div class="text-sm text-orange-200">Conselho Regional de Psicologia</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold mb-2">CFP</div>
                                <div class="text-sm text-orange-200">Conselho Federal de Psicologia</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold mb-2">APA</div>
                                <div class="text-sm text-orange-200">American Psychological Association</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold mb-2">BPS</div>
                                <div class="text-sm text-orange-200">British Psychological Society</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold mb-2">EuroPsy</div>
                                <div class="text-sm text-orange-200">European Certificate in Psychology</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Certification Process -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Como Funciona o Processo</h2>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                                <h3 class="font-semibold mb-2">Inscrição</h3>
                                <p class="text-gray-600 text-sm">Escolha seu programa e complete sua inscrição online</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                                <h3 class="font-semibold mb-2">Estudos</h3>
                                <p class="text-gray-600 text-sm">Acesse materiais online e participe de aulas ao vivo</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                                <h3 class="font-semibold mb-2">Avaliação</h3>
                                <p class="text-gray-600 text-sm">Complete provas teóricas e práticas de supervisão</p>
                            </div>
                            <div class="text-center">
                                <div class="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                                <h3 class="font-semibold mb-2">Certificação</h3>
                                <p class="text-gray-600 text-sm">Receba seu certificado e validação internacional</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    // PARTE 9/10 - PÁGINA COMUNIDADE

    renderComunidadePage() {
        const communityFeatures = [
            {
                icon: "👥",
                title: "Grupos de Estudo",
                description: "Participe de grupos temáticos com profissionais da sua área",
                count: "150+ grupos ativos"
            },
            {
                icon: "📚",
                title: "Biblioteca Colaborativa",
                description: "Acesso a artigos, casos clínicos e materiais compartilhados",
                count: "5.000+ recursos"
            },
            {
                icon: "🎥",
                title: "Webinars e Eventos",
                description: "Eventos semanais com especialistas reconhecidos",
                count: "50+ eventos/mês"
            },
            {
                icon: "💬",
                title: "Fóruns Especializados",
                description: "Discussões sobre casos, técnicas e novidades da área",
                count: "200+ tópicos diários"
            }
        ];

        const upcomingEvents = [
            {
                title: "TCC na Prática: Casos Complexos",
                date: "15 Jun 2025",
                time: "19:00",
                speaker: "Dr. Ana Silva",
                participants: 847,
                type: "Webinar"
            },
            {
                title: "Supervisão Digital: Tendências",
                date: "18 Jun 2025", 
                time: "20:00",
                speaker: "Dr. Carlos Rodriguez",
                participants: 623,
                type: "Workshop"
            },
            {
                title: "Ética em Supervisão Clínica",
                date: "22 Jun 2025",
                time: "19:30",
                speaker: "Dra. Maria Santos",
                participants: 912,
                type: "Palestra"
            }
        ];

        const studyGroups = [
            {
                name: "TCC Brasil",
                members: 1234,
                activity: "Alta",
                topics: ["Técnicas avançadas", "Casos clínicos", "Pesquisas recentes"],
                nextMeeting: "16 Jun"
            },
            {
                name: "Psicanálise Contemporânea",
                members: 856,
                activity: "Média",
                topics: ["Teoria lacaniana", "Casos difíceis", "Supervisão analítica"],
                nextMeeting: "19 Jun"
            },
            {
                name: "Psicologia Organizacional",
                members: 567,
                activity: "Alta",
                topics: ["RH estratégico", "Coaching", "Desenvolvimento"],
                nextMeeting: "17 Jun"
            }
        ];

        return `
            <div class="comunidade-page">
                <!-- Hero Section -->
                <section class="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Comunidade Global de Psicólogos
                            </h1>
                            <p class="text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
                                Conecte-se com mais de 50.000 profissionais ao redor do mundo. 
                                Compartilhe conhecimento, participe de eventos e cresça junto com a maior comunidade de psicologia do planeta.
                            </p>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button 
                                    onclick="router.navigate('/auth/register')" 
                                    class="bg-white text-cyan-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    🚀 Participar da Comunidade
                                </button>
                                <button 
                                    onclick="window.homePageInstance.exploreGroups()" 
                                    class="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-cyan-600 transition-all duration-300"
                                >
                                    🔍 Explorar Grupos
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Recursos da Comunidade</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            ${communityFeatures.map(feature => `
                                <div class="text-center group">
                                    <div class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">${feature.icon}</div>
                                    <h3 class="text-xl font-semibold mb-4">${feature.title}</h3>
                                    <p class="text-gray-600 mb-4">${feature.description}</p>
                                    <div class="text-cyan-600 font-bold">${feature.count}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Upcoming Events -->
                <section class="py-16 bg-gray-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${upcomingEvents.map(event => `
                                <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div class="flex justify-between items-start mb-4">
                                        <div class="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                                            ${event.type}
                                        </div>
                                        <div class="text-right text-sm text-gray-600">
                                            <div>${event.date}</div>
                                            <div>${event.time}</div>
                                        </div>
                                    </div>
                                    
                                    <h3 class="text-xl font-semibold mb-3">${event.title}</h3>
                                    <p class="text-gray-600 mb-4">com ${event.speaker}</p>
                                    
                                    <div class="flex justify-between items-center">
                                        <div class="text-sm text-gray-500">
                                            ${event.participants} inscritos
                                        </div>
                                        <button class="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                                            Inscrever-se
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Study Groups -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Grupos de Estudo Populares</h2>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            ${studyGroups.map(group => `
                                <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div class="flex justify-between items-start mb-4">
                                        <h3 class="text-xl font-semibold">${group.name}</h3>
                                        <span class="text-xs px-2 py-1 rounded-full ${
                                            group.activity === 'Alta' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }">
                                            ${group.activity}
                                        </span>
                                    </div>
                                    
                                    <div class="space-y-3 mb-6">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Membros:</span>
                                            <span class="font-medium">${group.members}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Próximo encontro:</span>
                                            <span class="font-medium">${group.nextMeeting}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <h4 class="font-medium mb-2">Tópicos principais:</h4>
                                        <div class="flex flex-wrap gap-1">
                                            ${group.topics.map(topic => `
                                                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${topic}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <button class="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                                        Participar do Grupo
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <!-- Community Stats -->
                <section class="py-16 bg-cyan-600 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Nossa Comunidade em Números</h2>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div class="text-4xl font-bold mb-2">50K+</div>
                                <div class="text-cyan-200">Membros Ativos</div>
                            </div>
                            <div>
                                <div class="text-4xl font-bold mb-2">150+</div>
                                <div class="text-cyan-200">Grupos de Estudo</div>
                            </div>
                            <div>
                                <div class="text-4xl font-bold mb-2">500+</div>
                                <div class="text-cyan-200">Eventos Realizados</div>
                            </div>
                            <div>
                                <div class="text-4xl font-bold mb-2">25+</div>
                                <div class="text-cyan-200">Países Representados</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Community Guidelines -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-center mb-12">Diretrizes da Comunidade</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="text-3xl mb-4">🤝</div>
                                <h3 class="font-semibold mb-2">Respeito Mútuo</h3>
                                <p class="text-gray-600 text-sm">Tratamos todos os membros com respeito e profissionalismo</p>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl mb-4">📚</div>
                                <h3 class="font-semibold mb-2">Compartilhamento</h3>
                                <p class="text-gray-600 text-sm">Encorajamos o compartilhamento de conhecimento e experiências</p>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl mb-4">🔒</div>
                                <h3 class="font-semibold mb-2">Confidencialidade</h3>
                                <p class="text-gray-600 text-sm">Respeitamos a privacidade e confidencialidade profissional</p>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl mb-4">⚖️</div>
                                <h3 class="font-semibold mb-2">Ética</h3>
                                <p class="text-gray-600 text-sm">Seguimos os mais altos padrões éticos da profissão</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Community CTA -->
                <section class="py-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold mb-6">Faça Parte da Nossa Comunidade</h2>
                        <p class="text-xl mb-8">
                            Conecte-se com profissionais de todo o mundo e acelere seu crescimento na psicologia.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onclick="router.navigate('/auth/register')" 
                                class="bg-white text-cyan-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300"
                            >
                                Participar Agora
                            </button>
                            <button 
                                onclick="window.homePageInstance.exploreGroups()" 
                                class="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-cyan-600 transition-all duration-300"
                            >
                                Explorar Grupos
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    // PARTE 10/10 - MÉTODOS AUXILIARES E EXPORT

    // MÉTODOS AUXILIARES
    openDemo() {
        alert('Abrindo demonstração...');
        // Implementar lógica para abrir demo
    }

    scheduleDemo() {
        alert('Redirecionando para agendamento...');
        // Implementar redirecionamento para calendário
    }

    contactSales() {
        alert('Abrindo chat com vendas...');
        // Implementar chat ou formulário de contato
    }

    downloadBrochure() {
        alert('Iniciando download do brochure...');
        // Implementar download do PDF
    }

    exploreGroups() {
        alert('Explorando grupos de estudo...');
        // Implementar navegação para grupos
    }

    mount() {
        // Lifecycle hook executado após o componente ser montado
        // Criar instância global para acesso aos métodos
        window.homePageInstance = this;
        this.setupAnimations();
        this.trackPageView();
        this.setupMobileMenu();
        this.setupScrollToTop();
    }

    setupAnimations() {
        // Configurar animações de scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        // Observar elementos que devem ser animados
        const animateElements = document.querySelectorAll('[class*="rounded-xl"], .transform');
        animateElements.forEach(el => observer.observe(el));
    }

    setupMobileMenu() {
        // Adicionar event listener para fechar menu ao clicar em links
        const mobileLinks = document.querySelectorAll('#mobile-menu button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        });
    }

    setupScrollToTop() {
        // Botão para voltar ao topo
        window.addEventListener('scroll', () => {
            const scrollBtn = document.getElementById('scroll-to-top');
            if (window.pageYOffset > 300) {
                if (scrollBtn) scrollBtn.style.display = 'block';
            } else {
                if (scrollBtn) scrollBtn.style.display = 'none';
            }
        });
    }

    trackPageView() {
        // Analytics tracking
        console.log(`Page viewed: ${this.currentPage}`);
        
        // Implementar tracking real aqui
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: this.currentPage,
                page_location: window.location.href
            });
        }
    }

    unmount() {
        // Cleanup quando o componente for desmontado
        // Remover event listeners, cancelar observadores, etc.
        
        // Remover observers de animação
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        // Remover event listeners de scroll
        window.removeEventListener('scroll', this.scrollHandler);
        
        // Limpar instância global
        if (window.homePageInstance === this) {
            delete window.homePageInstance;
        }
        
        console.log('HomePage component unmounted');
    }
}

// Exportar a classe para uso em outros módulos
export default HomePage;