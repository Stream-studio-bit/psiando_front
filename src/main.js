// src/main.js - Arquivo de entrada da aplicação Psiando Global - VERSÃO CORRIGIDA PARA HOMEPAGE

// Importar HomePage
import { HomePage } from './pages/HomePage.js';

// Inicializar aplicação
class PsiandoApp {
    constructor() {
        this.homePage = null;
        this.init();
    }

    init() {
        this.setupGlobalStyles();
        this.renderApp();
        this.setupEventListeners();
        this.loadModules();
    }

    setupGlobalStyles() {
        // Remover estilos de loading
        const root = document.getElementById('root');
        root.innerHTML = '';
        
        // Adicionar classes globais
        document.body.classList.add('antialiased', 'min-h-screen');
    }

    async loadModules() {
        try {
            // Carregar módulos de forma assíncrona para evitar erros de import
            const routerModule = await import('./routes/index.js');
            const themeModule = await import('./themes/ThemeProvider.js');
            const authModule = await import('./contexts/AuthContext.js');

            console.log('✅ Módulos carregados com sucesso');
            
            // Configurar conectores entre módulos
            if (routerModule.router && authModule.authProvider) {
                // Conectar router com auth
                authModule.authProvider.addStateChangeListener((authState) => {
                    routerModule.router.updateAuthState(authState);
                });
            }

        } catch (error) {
            console.warn('⚠️ Alguns módulos não puderam ser carregados:', error);
            // A aplicação continuará funcionando com funcionalidades básicas
        }
    }

    renderApp() {
        const root = document.getElementById('root');
        
        // Criar instância da HomePage
        this.homePage = new HomePage({ page: 'home' });
        
        // Renderizar usando a HomePage
        root.innerHTML = `
            <div id="app" class="min-h-screen bg-gray-50">
                <!-- Header da HomePage -->
                ${this.homePage.renderHeader()}
                
                <!-- Conteúdo Principal via HomePage -->
                <main id="main-content">
                    ${this.homePage.renderPageContent()}
                </main>

                <!-- Footer -->
                <footer class="bg-gray-900 text-white">
                    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <!-- Logo e descrição -->
                            <div class="col-span-1 md:col-span-2">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span class="text-white font-bold text-sm">P</span>
                                    </div>
                                    <span class="ml-2 text-xl font-semibold">Psiando Global</span>
                                </div>
                                <p class="text-gray-400 mb-4">
                                    Democratizando o acesso à supervisão clínica de qualidade, 
                                    conectando psicólogos do mundo todo em uma plataforma inteligente e escalável.
                                </p>
                                <div class="flex space-x-4">
                                    <a href="#" class="text-gray-400 hover:text-white">
                                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-white">
                                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-white">
                                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <!-- Links úteis -->
                            <div>
                                <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Plataforma</h3>
                                <ul class="space-y-2 text-gray-400">
                                    <li><button onclick="window.homePageInstance.navigateToPage('supervisores')" class="hover:text-white">Para Supervisores</button></li>
                                    <li><button onclick="window.homePageInstance.navigateToPage('supervisionados')" class="hover:text-white">Para Supervisionados</button></li>
                                    <li><button onclick="window.homePageInstance.navigateToPage('certificacoes')" class="hover:text-white">Certificações</button></li>
                                    <li><a href="#" class="hover:text-white">Preços</a></li>
                                </ul>
                            </div>

                            <!-- Suporte -->
                            <div>
                                <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">Suporte</h3>
                                <ul class="space-y-2 text-gray-400">
                                    <li><a href="#" class="hover:text-white">Central de Ajuda</a></li>
                                    <li><button onclick="window.homePageInstance.navigateToPage('comunidade')" class="hover:text-white">Comunidade</button></li>
                                    <li><a href="#" class="hover:text-white">Blog</a></li>
                                    <li><a href="#" class="hover:text-white">Contato</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                            <p class="text-gray-400 text-sm">
                                © 2025 Psiando Global. Todos os direitos reservados.
                            </p>
                            <div class="text-lg font-semibold text-white mt-2 md:mt-0">
                                🚀 Stream Studio
                            </div>
                            <div class="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-400">
                                <a href="#" class="hover:text-white">Privacidade</a>
                                <a href="#" class="hover:text-white">Termos</a>
                                <a href="#" class="hover:text-white">Cookies</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        `;

        // Montar a HomePage após renderizar
        this.homePage.mount();
    }

    setupEventListeners() {
        // Criar router global simples para compatibilidade
        window.router = {
            navigate: (path) => {
                console.log('🚀 Router navigate chamado para:', path);
                if (path.startsWith('/auth/')) {
                    // Simular navegação para auth
                    alert(`Redirecionando para: ${path}`);
                } else {
                    // Usar HomePage para navegação interna
                    if (window.homePageInstance) {
                        const pageName = path.replace('/', '');
                        window.homePageInstance.navigateToPage(pageName);
                    }
                }
            }
        };

        // Configurar instância global para debug
        window.app = this;
        
        console.log('✅ Event listeners configurados');
    }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PsiandoApp();
});

console.log('🚀 Psiando Global iniciada com sucesso!');