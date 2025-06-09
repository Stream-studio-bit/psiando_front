// src/routes/index.js - Sistema de roteamento da Psiando Global - VERSÃO FINAL

import { HomePage } from '../pages/HomePage.js';
import { SupervisorsPage } from '../pages/SupervisorsPage.js';

/**
 * Configuração de rotas da aplicação
 * Cada rota define path, componente, proteção e metadados
 */
export const routes = {
    // Rotas públicas
    '/': {
        component: HomePage,
        title: 'Psiando Global - Supervisão Clínica de Nova Geração',
        description: 'Plataforma global de supervisão clínica com IA integrada',
        requiresAuth: false,
        layout: 'main'
    },
    
    '/supervisors': {
        component: SupervisorsPage,
        title: 'Encontre Supervisores - Psiando Global',
        description: 'Conecte-se com supervisores qualificados ao redor do mundo',
        requiresAuth: false,
        layout: 'main'
    },
    
    '/auth/login': {
        component: 'AuthPage',
        title: 'Entrar - Psiando Global',
        description: 'Acesse sua conta na Psiando Global',
        requiresAuth: false,
        layout: 'auth',
        props: { mode: 'login' }
    },
    
    '/auth/register': {
        component: 'AuthPage',
        title: 'Criar Conta - Psiando Global',
        description: 'Junte-se à comunidade global de supervisão clínica',
        requiresAuth: false,
        layout: 'auth',
        props: { mode: 'register' }
    },
    
    '/certifications': {
        component: 'CertificationsPage',
        title: 'Certificações - Psiando Global',
        description: 'Certificações internacionais em supervisão clínica',
        requiresAuth: false,
        layout: 'main'
    },
    
    '/community': {
        component: 'CommunityPage',
        title: 'Comunidade - Psiando Global',
        description: 'Conecte-se com profissionais do mundo todo',
        requiresAuth: false,
        layout: 'main'
    },
    
    // Rotas protegidas (requerem autenticação)
    '/dashboard': {
        component: 'DashboardPage',
        title: 'Dashboard - Psiando Global',
        description: 'Painel de controle personalizado',
        requiresAuth: true,
        layout: 'dashboard'
    },
    
    '/supervision': {
        component: 'SupervisionPage',
        title: 'Minhas Supervisões - Psiando Global',
        description: 'Gerencie suas sessões de supervisão',
        requiresAuth: true,
        layout: 'dashboard'
    },
    
    '/profile': {
        component: 'ProfilePage',
        title: 'Meu Perfil - Psiando Global',
        description: 'Gerencie seu perfil profissional',
        requiresAuth: true,
        layout: 'dashboard'
    },
    
    // Rotas dinâmicas (simplificadas para evitar erros de import)
    '/supervisor/:id': {
        component: 'SupervisorDetailPage',
        title: 'Perfil do Supervisor - Psiando Global',
        description: 'Conheça mais sobre este supervisor',
        requiresAuth: false,
        layout: 'main',
        dynamic: true
    },
    
    '/session/:id': {
        component: 'SessionPage',
        title: 'Sessão de Supervisão - Psiando Global',
        description: 'Sessão de supervisão em andamento',
        requiresAuth: true,
        layout: 'session',
        dynamic: true
    }
};

/**
 * Router principal da aplicação
 * Gerencia navegação, autenticação e carregamento de componentes
 */
export class AppRouter {
    constructor() {
        this.currentRoute = null;
        this.currentComponent = null;
        this.authState = { isAuthenticated: false, user: null };
        
        this.init();
    }
    
    init() {
        // Configurar event listeners
        window.addEventListener('popstate', () => this.handleRouteChange());
        window.addEventListener('DOMContentLoaded', () => this.handleRouteChange());
        
        // Interceptar cliques em links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-route]') || e.target.closest('a[data-route]')) {
                e.preventDefault();
                const link = e.target.closest('a') || e.target;
                this.navigate(link.getAttribute('href'));
            }
        });
        
        // Rota inicial
        this.handleRouteChange();
    }
    
    /**
     * Navega para uma nova rota
     * @param {string} path - Caminho da rota
     * @param {object} state - Estado adicional
     */
    navigate(path, state = {}) {
        if (path !== window.location.pathname) {
            window.history.pushState(state, '', path);
            this.handleRouteChange();
        }
    }
    
    /**
     * Substitui a rota atual (sem adicionar ao histórico)
     * @param {string} path - Caminho da rota
     */
    replace(path) {
        window.history.replaceState({}, '', path);
        this.handleRouteChange();
    }
    
    /**
     * Volta uma página no histórico
     */
    back() {
        window.history.back();
    }
    
    /**
     * Processa mudanças de rota
     */
    async handleRouteChange() {
        const path = window.location.pathname;
        const route = this.matchRoute(path);
        
        if (!route) {
            this.handle404();
            return;
        }
        
        // Verificar autenticação
        if (route.requiresAuth && !this.authState.isAuthenticated) {
            this.navigate('/auth/login');
            return;
        }
        
        // Carregar componente
        try {
            await this.loadRoute(route, path);
        } catch (error) {
            console.error('Erro ao carregar rota:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Encontra a rota correspondente ao caminho
     * @param {string} path - Caminho atual
     * @returns {object|null} - Configuração da rota
     */
    matchRoute(path) {
        // Rota exata
        if (routes[path]) {
            return { ...routes[path], path, params: {} };
        }
        
        // Rotas dinâmicas
        for (const [routePath, config] of Object.entries(routes)) {
            if (config.dynamic) {
                const params = this.extractParams(routePath, path);
                if (params) {
                    return { ...config, path: routePath, params };
                }
            }
        }
        
        return null;
    }
    
    /**
     * Extrai parâmetros de rotas dinâmicas
     * @param {string} routePath - Padrão da rota (/user/:id)
     * @param {string} currentPath - Caminho atual (/user/123)
     * @returns {object|null} - Parâmetros extraídos
     */
    extractParams(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const pathParts = currentPath.split('/');
        
        if (routeParts.length !== pathParts.length) {
            return null;
        }
        
        const params = {};
        
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const pathPart = pathParts[i];
            
            if (routePart.startsWith(':')) {
                params[routePart.slice(1)] = pathPart;
            } else if (routePart !== pathPart) {
                return null;
            }
        }
        
        return params;
    }
    
    /**
     * Carrega e renderiza uma rota
     * @param {object} route - Configuração da rota
     * @param {string} path - Caminho atual
     */
    async loadRoute(route, path) {
        this.currentRoute = route;
        
        // Atualizar metadados da página
        this.updatePageMetadata(route);
        
        // Carregar componente
        let Component = route.component;
        
        // Se for string (nome do componente), tentar carregar dinamicamente
        if (typeof Component === 'string') {
            try {
                const module = await import(`../pages/${Component}.js`);
                Component = module[Component] || module.default;
            } catch (error) {
                console.warn(`Componente ${Component} não encontrado, renderizando placeholder`);
                Component = this.createPlaceholderComponent(route.component, path);
            }
        }
        
        // Preparar props
        const props = {
            ...route.props,
            params: route.params,
            query: this.parseQuery(window.location.search),
            router: this
        };
        
        // Renderizar componente
        const container = document.getElementById('main-content');
        if (container && Component) {
            // Se for uma classe/função, instanciar
            if (typeof Component === 'function') {
                this.currentComponent = new Component(props);
                container.innerHTML = this.currentComponent.render();
                
                // Executar lifecycle hooks
                if (this.currentComponent.mount) {
                    this.currentComponent.mount();
                }
            } else {
                // Se for HTML string
                container.innerHTML = Component;
            }
        }
    }

    /**
     * Cria um componente placeholder para desenvolvimento
     * @param {string} componentName - Nome do componente
     * @param {string} path - Caminho da rota
     * @returns {Function} - Componente placeholder
     */
    createPlaceholderComponent(componentName, path) {
        return class PlaceholderComponent {
            constructor(props) {
                this.props = props;
            }

            render() {
                return `
                    <div class="min-h-screen flex items-center justify-center bg-gray-50">
                        <div class="text-center max-w-md mx-auto p-8">
                            <div class="mb-6">
                                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span class="text-2xl">🚧</span>
                                </div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                                    Página em Desenvolvimento
                                </h1>
                                <p class="text-gray-600 mb-4">
                                    O componente <code class="bg-gray-100 px-2 py-1 rounded">${componentName}</code> 
                                    está sendo desenvolvido.
                                </p>
                                <p class="text-sm text-gray-500 mb-6">
                                    Rota: <code class="bg-gray-100 px-2 py-1 rounded">${path}</code>
                                </p>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onclick="router.back()" 
                                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    ← Voltar
                                </button>
                                <button 
                                    onclick="router.navigate('/')" 
                                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    🏠 Ir para Home
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }

            mount() {
                console.log(`Placeholder montado para ${componentName}`);
            }
        };
    }
    
    /**
     * Atualiza metadados da página (title, description, etc.)
     * @param {object} route - Configuração da rota
     */
    updatePageMetadata(route) {
        document.title = route.title;
        
        // Meta description
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
            descMeta = document.createElement('meta');
            descMeta.name = 'description';
            document.head.appendChild(descMeta);
        }
        descMeta.content = route.description;
        
        // Open Graph
        this.updateOpenGraph(route);
    }
    
    /**
     * Atualiza meta tags Open Graph
     * @param {object} route - Configuração da rota
     */
    updateOpenGraph(route) {
        const ogTags = {
            'og:title': route.title,
            'og:description': route.description,
            'og:url': window.location.href
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }
    
    /**
     * Processa query parameters
     * @param {string} search - String de query (?param=value)
     * @returns {object} - Objeto com parâmetros
     */
    parseQuery(search) {
        const params = new URLSearchParams(search);
        const query = {};
        
        for (const [key, value] of params) {
            query[key] = value;
        }
        
        return query;
    }
    
    /**
     * Lida com rotas não encontradas (404)
     */
    handle404() {
        document.title = 'Página não encontrada - Psiando Global';
        const container = document.getElementById('main-content');
        
        if (container) {
            container.innerHTML = `
                <div class="min-h-screen flex items-center justify-center bg-gray-50">
                    <div class="text-center">
                        <div class="mb-8">
                            <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                            <h2 class="text-2xl font-semibold text-gray-700 mb-2">Página não encontrada</h2>
                            <p class="text-gray-600">A página que você está procurando não existe.</p>
                        </div>
                        <button 
                            onclick="router.navigate('/')" 
                            class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            🏠 Voltar ao Início
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    /**
     * Lida com erros de carregamento
     * @param {Error} error - Erro ocorrido
     */
    handleError(error) {
        console.error('Erro no router:', error);
        
        const container = document.getElementById('main-content');
        if (container) {
            container.innerHTML = `
                <div class="min-h-screen flex items-center justify-center bg-gray-50">
                    <div class="text-center">
                        <div class="mb-8">
                            <h1 class="text-2xl font-semibold text-red-600 mb-4">Erro</h1>
                            <p class="text-gray-600 mb-2">Ocorreu um erro inesperado. Tente novamente.</p>
                            <p class="text-sm text-gray-500">${error.message}</p>
                        </div>
                        <div class="flex gap-4 justify-center">
                            <button 
                                onclick="location.reload()" 
                                class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                🔄 Recarregar Página
                            </button>
                            <button 
                                onclick="router.navigate('/')" 
                                class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                🏠 Ir para Home
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    /**
     * Atualiza estado de autenticação
     * @param {object} authState - Novo estado de autenticação
     */
    updateAuthState(authState) {
        this.authState = authState;
        
        // Reprocessar rota atual se necessário
        if (this.currentRoute && this.currentRoute.requiresAuth && !authState.isAuthenticated) {
            this.navigate('/auth/login');
        }
    }
}

// Instância global do router
export const router = new AppRouter();

// Disponibilizar globalmente para uso em templates
window.router = router;

// Função auxiliar para navegação
export const navigate = (path, state) => router.navigate(path, state);

// Função auxiliar para verificar rota atual
export const isCurrentRoute = (path) => window.location.pathname === path;

// Exportação da classe de rotas para extensão
export { AppRouter as Router };