// src/themes/ThemeProvider.js - Sistema de gerenciamento de temas da Psiando Global

/**
 * Configurações de temas para diferentes perfis de usuário
 * Seguindo o manual de cores da Psiando Global
 */
export const themes = {
    // Tema para supervisionados - foco em crescimento e aprendizado
    supervisionado: {
        name: 'Supervisionado',
        colors: {
            primary: 'var(--primary-500)',
            primaryHover: 'var(--primary-600)',
            secondary: 'var(--success-500)', 
            accent: 'var(--energy-400)',
            background: 'var(--gray-50)',
            surface: 'var(--white)',
            textPrimary: 'var(--gray-900)',
            textSecondary: 'var(--gray-600)',
            border: 'var(--gray-200)',
            success: 'var(--success-500)',
            warning: 'var(--warning-500)',
            error: 'var(--error-500)'
        },
        gradient: 'from-blue-500 to-green-500',
        emoji: '🌱'
    },

    // Tema para supervisores - transmite autoridade e sabedoria  
    supervisor: {
        name: 'Supervisor',
        colors: {
            primary: 'var(--wisdom-600)',
            primaryHover: 'var(--wisdom-700)', 
            secondary: 'var(--primary-600)',
            accent: 'var(--success-500)',
            background: 'var(--wisdom-50)',
            surface: 'var(--white)',
            textPrimary: 'var(--gray-900)',
            textSecondary: 'var(--gray-700)',
            border: 'var(--wisdom-200)',
            success: 'var(--success-500)',
            warning: 'var(--warning-500)',
            error: 'var(--error-500)'
        },
        gradient: 'from-purple-600 to-blue-600',
        emoji: '🎓'
    },

    // Tema administrativo - neutro e profissional
    admin: {
        name: 'Administrador',
        colors: {
            primary: 'var(--gray-800)',
            primaryHover: 'var(--gray-900)',
            secondary: 'var(--primary-500)',
            accent: 'var(--energy-500)',
            background: 'var(--gray-100)',
            surface: 'var(--white)',
            textPrimary: 'var(--gray-900)',
            textSecondary: 'var(--gray-600)',
            border: 'var(--gray-300)',
            success: 'var(--success-500)',
            warning: 'var(--warning-500)',
            error: 'var(--error-500)'
        },
        gradient: 'from-gray-700 to-gray-900',
        emoji: '⚙️'
    },

    // Tema padrão para visitantes
    default: {
        name: 'Padrão',
        colors: {
            primary: 'var(--primary-500)',
            primaryHover: 'var(--primary-600)',
            secondary: 'var(--gray-600)',
            accent: 'var(--energy-500)',
            background: 'var(--white)',
            surface: 'var(--gray-50)',
            textPrimary: 'var(--gray-900)',
            textSecondary: 'var(--gray-600)',
            border: 'var(--gray-200)',
            success: 'var(--success-500)',
            warning: 'var(--warning-500)',
            error: 'var(--error-500)'
        },
        gradient: 'from-blue-500 to-purple-600',
        emoji: '🌐'
    }
};

/**
 * Provider de temas que gerencia o estado global de temas
 */
export class ThemeProvider {
    constructor() {
        this.currentTheme = 'default';
        this.listeners = [];
        this.init();
    }

    init() {
        // Carregar tema salvo do localStorage
        const savedTheme = localStorage.getItem('psiando-theme');
        if (savedTheme && themes[savedTheme]) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('default');
        }

        // Detectar preferência de modo escuro do sistema
        this.setupDarkModeDetection();
    }

    /**
     * Define o tema atual
     * @param {string} themeName - Nome do tema (supervisionado, supervisor, admin, default)
     */
    setTheme(themeName) {
        if (!themes[themeName]) {
            console.warn(`Tema "${themeName}" não encontrado. Usando tema padrão.`);
            themeName = 'default';
        }

        this.currentTheme = themeName;
        const theme = themes[themeName];

        // Aplicar variáveis CSS
        this.applyThemeVariables(theme);

        // Salvar no localStorage
        localStorage.setItem('psiando-theme', themeName);

        // Notificar listeners
        this.notifyListeners(themeName, theme);

        console.log(`✨ Tema aplicado: ${theme.name} ${theme.emoji}`);
    }

    /**
     * Aplica as variáveis CSS do tema
     * @param {object} theme - Configuração do tema
     */
    applyThemeVariables(theme) {
        const root = document.documentElement;

        // Aplicar cores do tema
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${this.camelToKebab(key)}`, value);
        });

        // Aplicar classe do tema no body
        document.body.className = document.body.className
            .replace(/theme-\w+/g, '')
            .trim() + ` theme-${this.currentTheme}`;

        // Atualizar meta theme-color para PWA
        this.updateMetaThemeColor(theme.colors.primary);
    }

    /**
     * Converte camelCase para kebab-case
     * @param {string} str - String em camelCase
     * @returns {string} - String em kebab-case
     */
    camelToKebab(str) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    }

    /**
     * Atualiza meta tag theme-color
     * @param {string} color - Cor primária do tema
     */
    updateMetaThemeColor(color) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        // Converter variável CSS para cor hex (simplificado)
        const computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue(color.replace('var(', '').replace(')', ''));
        metaThemeColor.content = computedColor || '#3b82f6';
    }

    /**
     * Define tema baseado no perfil do usuário
     * @param {object} user - Objeto do usuário com role
     */
    setThemeFromUserRole(user) {
        if (!user || !user.role) {
            this.setTheme('default');
            return;
        }

        const roleThemeMap = {
            'supervisionado': 'supervisionado',
            'supervisor': 'supervisor', 
            'admin': 'admin',
            'superadmin': 'admin'
        };

        const themeName = roleThemeMap[user.role] || 'default';
        this.setTheme(themeName);
    }

    /**
     * Obtém o tema atual
     * @returns {object} - Configuração do tema atual
     */
    getCurrentTheme() {
        return {
            name: this.currentTheme,
            config: themes[this.currentTheme]
        };
    }

    /**
     * Lista todos os temas disponíveis
     * @returns {array} - Array com informações dos temas
     */
    getAvailableThemes() {
        return Object.entries(themes).map(([key, theme]) => ({
            key,
            name: theme.name,
            emoji: theme.emoji,
            gradient: theme.gradient
        }));
    }

    /**
     * Verifica se está no modo escuro
     * @returns {boolean}
     */
    isDarkMode() {
        return document.body.classList.contains('dark-mode');
    }

    /**
     * Alterna modo escuro
     */
    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = this.isDarkMode();
        
        // Salvar preferência
        localStorage.setItem('psiando-dark-mode', isDark.toString());
        
        // Aplicar variáveis de modo escuro
        this.applyDarkModeVariables(isDark);
        
        // Notificar listeners
        this.notifyListeners(this.currentTheme, themes[this.currentTheme], isDark);
        
        console.log(`🌙 Modo escuro: ${isDark ? 'ativado' : 'desativado'}`);
    }

    /**
     * Aplica variáveis específicas do modo escuro
     * @param {boolean} isDark - Se está no modo escuro
     */
    applyDarkModeVariables(isDark) {
        const root = document.documentElement;
        
        if (isDark) {
            root.style.setProperty('--theme-background', 'var(--gray-900)');
            root.style.setProperty('--theme-surface', 'var(--gray-800)');
            root.style.setProperty('--theme-text-primary', 'var(--white)');
            root.style.setProperty('--theme-text-secondary', 'var(--gray-300)');
            root.style.setProperty('--theme-border', 'var(--gray-700)');
        } else {
            // Restaurar cores originais do tema
            const theme = themes[this.currentTheme];
            root.style.setProperty('--theme-background', theme.colors.background);
            root.style.setProperty('--theme-surface', theme.colors.surface);
            root.style.setProperty('--theme-text-primary', theme.colors.textPrimary);
            root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
            root.style.setProperty('--theme-border', theme.colors.border);
        }
    }

    /**
     * Configura detecção automática de modo escuro do sistema
     */
    setupDarkModeDetection() {
        // Verificar preferência salva
        const savedDarkMode = localStorage.getItem('psiando-dark-mode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            this.applyDarkModeVariables(true);
        } else if (savedDarkMode === null) {
            // Se não há preferência salva, detectar do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-mode');
                this.applyDarkModeVariables(true);
            }
        }

        // Listener para mudanças na preferência do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const savedPreference = localStorage.getItem('psiando-dark-mode');
            if (savedPreference === null) {
                // Só seguir sistema se usuário não definiu preferência
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    this.applyDarkModeVariables(true);
                } else {
                    document.body.classList.remove('dark-mode');
                    this.applyDarkModeVariables(false);
                }
            }
        });
    }

    /**
     * Adiciona listener para mudanças de tema
     * @param {function} callback - Função chamada quando tema muda
     */
    addThemeChangeListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Remove listener de mudanças de tema
     * @param {function} callback - Função a ser removida
     */
    removeThemeChangeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    /**
     * Notifica todos os listeners sobre mudança de tema
     * @param {string} themeName - Nome do tema
     * @param {object} themeConfig - Configuração do tema
     * @param {boolean} isDark - Se está no modo escuro
     */
    notifyListeners(themeName, themeConfig, isDark = this.isDarkMode()) {
        this.listeners.forEach(callback => {
            try {
                callback({
                    themeName,
                    themeConfig,
                    isDark,
                    timestamp: Date.now()
                });
            } catch (error) {
                console.error('Erro no listener de tema:', error);
            }
        });
    }

    /**
     * Gera CSS customizado para o tema atual
     * @returns {string} - CSS do tema
     */
    generateThemeCSS() {
        const theme = themes[this.currentTheme];
        const isDark = this.isDarkMode();

        return `
            /* Tema: ${theme.name} ${theme.emoji} */
            .theme-${this.currentTheme} {
                --current-theme-primary: ${theme.colors.primary};
                --current-theme-secondary: ${theme.colors.secondary};
                --current-theme-accent: ${theme.colors.accent};
            }

            /* Componentes temáticos */
            .btn-theme-primary {
                background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
                color: white;
                border: none;
                transition: all 0.3s ease;
            }

            .btn-theme-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }

            .card-theme {
                background: ${isDark ? 'var(--gray-800)' : theme.colors.surface};
                border: 1px solid ${theme.colors.border};
                border-radius: 12px;
                transition: all 0.3s ease;
            }

            .card-theme:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0,0,0,${isDark ? '0.3' : '0.1'});
            }

            .gradient-theme-bg {
                background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
            }

            .text-theme-primary {
                color: ${theme.colors.primary};
            }

            .border-theme-primary {
                border-color: ${theme.colors.primary};
            }

            /* Animações específicas do tema */
            .theme-pulse {
                animation: themePulse 2s infinite;
            }

            @keyframes themePulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 ${theme.colors.primary}40;
                }
                50% {
                    box-shadow: 0 0 0 20px ${theme.colors.primary}00;
                }
            }
        `;
    }

    /**
     * Injeta CSS do tema no documento
     */
    injectThemeCSS() {
        // Remove CSS anterior
        const existingStyle = document.getElementById('psiando-theme-css');
        if (existingStyle) {
            existingStyle.remove();
        }

        // Injeta novo CSS
        const style = document.createElement('style');
        style.id = 'psiando-theme-css';
        style.textContent = this.generateThemeCSS();
        document.head.appendChild(style);
    }

    /**
     * Exporta configuração do tema atual
     * @returns {object} - Configuração exportável
     */
    exportThemeConfig() {
        return {
            themeName: this.currentTheme,
            themeConfig: themes[this.currentTheme],
            isDarkMode: this.isDarkMode(),
            timestamp: Date.now(),
            version: '1.0.0'
        };
    }

    /**
     * Importa configuração de tema
     * @param {object} config - Configuração a ser importada
     */
    importThemeConfig(config) {
        if (config.themeName && themes[config.themeName]) {
            this.setTheme(config.themeName);
            
            if (config.isDarkMode !== undefined) {
                if (config.isDarkMode && !this.isDarkMode()) {
                    this.toggleDarkMode();
                } else if (!config.isDarkMode && this.isDarkMode()) {
                    this.toggleDarkMode();
                }
            }
        }
    }

    /**
     * Reset para configurações padrão
     */
    reset() {
        localStorage.removeItem('psiando-theme');
        localStorage.removeItem('psiando-dark-mode');
        document.body.classList.remove('dark-mode');
        this.setTheme('default');
        console.log('🔄 Tema resetado para configurações padrão');
    }

    /**
     * Obtém informações de debug do tema
     * @returns {object} - Informações de debug
     */
    getDebugInfo() {
        return {
            currentTheme: this.currentTheme,
            isDarkMode: this.isDarkMode(),
            availableThemes: Object.keys(themes),
            appliedVariables: this.getAppliedCSSVariables(),
            listeners: this.listeners.length
        };
    }

    /**
     * Obtém variáveis CSS aplicadas atualmente
     * @returns {object} - Variáveis CSS
     */
    getAppliedCSSVariables() {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const variables = {};

        // Capturar variáveis de tema
        ['primary', 'secondary', 'accent', 'background', 'surface', 'text-primary', 'text-secondary', 'border'].forEach(prop => {
            variables[prop] = computedStyle.getPropertyValue(`--theme-${prop}`).trim();
        });

        return variables;
    }
}

// Instância global do provedor de temas
export const themeProvider = new ThemeProvider();

// Disponibilizar globalmente
window.themeProvider = themeProvider;

// Hook para componentes React (se necessário)
export const useTheme = () => {
    return {
        currentTheme: themeProvider.currentTheme,
        themes: themes,
        setTheme: (theme) => themeProvider.setTheme(theme),
        toggleDarkMode: () => themeProvider.toggleDarkMode(),
        isDarkMode: () => themeProvider.isDarkMode(),
        addListener: (callback) => themeProvider.addThemeChangeListener(callback),
        removeListener: (callback) => themeProvider.removeThemeChangeListener(callback)
    };
};

// CSS base que deve ser injetado
export const baseThemeCSS = `
    /* Variáveis CSS base */
    :root {
        --transition-fast: 0.15s ease;
        --transition-normal: 0.3s ease;
        --transition-slow: 0.5s ease;
        --border-radius-sm: 6px;
        --border-radius-md: 8px;
        --border-radius-lg: 12px;
        --border-radius-xl: 16px;
        --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
        --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
        --shadow-lg: 0 8px 24px rgba(0,0,0,0.15);
        --shadow-xl: 0 16px 48px rgba(0,0,0,0.15);
    }

    /* Transições globais */
    * {
        transition: background-color var(--transition-normal), 
                   color var(--transition-normal),
                   border-color var(--transition-normal),
                   box-shadow var(--transition-normal);
    }

    /* Classes utilitárias */
    .theme-transition {
        transition: all var(--transition-normal);
    }

    .theme-shadow {
        box-shadow: var(--shadow-md);
    }

    .theme-shadow:hover {
        box-shadow: var(--shadow-lg);
    }

    /* Modo escuro */
    .dark-mode {
        color-scheme: dark;
    }

    .dark-mode img {
        opacity: 0.9;
    }

    .dark-mode .theme-shadow {
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    /* Animações de entrada */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out;
    }

    /* Estados de hover melhorados */
    .hover-lift {
        transition: transform var(--transition-normal);
    }

    .hover-lift:hover {
        transform: translateY(-4px);
    }

    /* Indicadores de tema ativo */
    .theme-indicator {
        position: relative;
    }

    .theme-indicator::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: var(--theme-primary);
        transition: width var(--transition-normal);
    }

    .theme-indicator.active::after {
        width: 100%;
    }
`;

// Injetar CSS base quando o módulo for carregado
const style = document.createElement('style');
style.id = 'psiando-base-theme-css';
style.textContent = baseThemeCSS;
document.head.appendChild(style);