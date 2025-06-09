// src/contexts/AuthContext.js - Contexto de autenticação da Psiando Global

import { themeProvider } from '../themes/ThemeProvider.js';

/**
 * Estados possíveis de autenticação
 */
export const AuthStates = {
    LOADING: 'loading',
    AUTHENTICATED: 'authenticated', 
    UNAUTHENTICATED: 'unauthenticated',
    ERROR: 'error'
};

/**
 * Tipos de usuário na plataforma
 */
export const UserRoles = {
    SUPERVISIONADO: 'supervisionado',
    SUPERVISOR: 'supervisor', 
    ADMIN: 'admin',
    SUPERADMIN: 'superadmin'
};

/**
 * Provider de autenticação global
 * Gerencia estado de autenticação, login, logout e permissões
 */
export class AuthProvider {
    constructor() {
        this.state = {
            status: AuthStates.LOADING,
            user: null,
            token: null,
            refreshToken: null,
            permissions: [],
            lastActivity: null
        };
        
        this.listeners = [];
        this.sessionCheckInterval = null;
        this.init();
    }

    /**
     * Inicialização do provider
     */
    async init() {
        try {
            // Verificar se há sessão salva
            await this.restoreSession();
            
            // Configurar verificação automática de sessão
            this.setupSessionCheck();
            
            // Configurar listeners de atividade
            this.setupActivityTracking();
            
        } catch (error) {
            console.error('Erro na inicialização do AuthProvider:', error);
            this.setState({ status: AuthStates.UNAUTHENTICATED });
        }
    }

    /**
     * Restaura sessão do localStorage
     */
    async restoreSession() {
        const savedAuth = localStorage.getItem('psiando-auth');
        
        if (!savedAuth) {
            this.setState({ status: AuthStates.UNAUTHENTICATED });
            return;
        }

        try {
            const authData = JSON.parse(savedAuth);
            
            // Verificar se token ainda é válido
            if (this.isTokenExpired(authData.token)) {
                // Tentar renovar com refresh token
                if (authData.refreshToken) {
                    await this.refreshAuthToken(authData.refreshToken);
                } else {
                    this.logout();
                }
                return;
            }

            // Restaurar estado
            this.setState({
                status: AuthStates.AUTHENTICATED,
                user: authData.user,
                token: authData.token,
                refreshToken: authData.refreshToken,
                permissions: authData.permissions || [],
                lastActivity: Date.now()
            });

            // Aplicar tema baseado no perfil do usuário
            themeProvider.setThemeFromUserRole(authData.user);
            
            console.log(`✅ Sessão restaurada: ${authData.user.name} (${authData.user.role})`);
            
        } catch (error) {
            console.error('Erro ao restaurar sessão:', error);
            localStorage.removeItem('psiando-auth');
            this.setState({ status: AuthStates.UNAUTHENTICATED });
        }
    }

    /**
     * Realiza login do usuário
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @param {boolean} rememberMe - Se deve lembrar da sessão
     * @returns {Promise<object>} - Resultado do login
     */
    async login(email, password, rememberMe = false) {
        this.setState({ status: AuthStates.LOADING });

        try {
            // Simular chamada de API (substituir pela API real)
            const response = await this.mockLoginAPI(email, password);
            
            if (response.success) {
                const authData = {
                    user: response.user,
                    token: response.token,
                    refreshToken: response.refreshToken,
                    permissions: response.permissions || [],
                    lastActivity: Date.now()
                };

                // Salvar sessão se solicitado
                if (rememberMe) {
                    localStorage.setItem('psiando-auth', JSON.stringify(authData));
                }

                // Atualizar estado
                this.setState({
                    status: AuthStates.AUTHENTICATED,
                    ...authData
                });

                // Aplicar tema do usuário
                themeProvider.setThemeFromUserRole(response.user);

                console.log(`✅ Login realizado: ${response.user.name} (${response.user.role})`);
                
                return { success: true, user: response.user };
            } else {
                this.setState({ status: AuthStates.UNAUTHENTICATED });
                return { success: false, error: response.error };
            }
            
        } catch (error) {
            console.error('Erro no login:', error);
            this.setState({ 
                status: AuthStates.ERROR,
                error: error.message 
            });
            return { success: false, error: error.message };
        }
    }

    /**
     * Realiza logout do usuário
     */
    async logout() {
        try {
            // Chamar API de logout (se necessário)
            await this.callLogoutAPI();
            
            // Limpar dados locais
            localStorage.removeItem('psiando-auth');
            
            // Limpar interval de verificação
            if (this.sessionCheckInterval) {
                clearInterval(this.sessionCheckInterval);
            }
            
            // Resetar estado
            this.setState({
                status: AuthStates.UNAUTHENTICATED,
                user: null,
                token: null,
                refreshToken: null,
                permissions: [],
                lastActivity: null
            });

            // Resetar tema para padrão
            themeProvider.setTheme('default');
            
            console.log('✅ Logout realizado com sucesso');
            
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    }

    /**
     * Registra novo usuário
     * @param {object} userData - Dados do usuário
     * @returns {Promise<object>} - Resultado do registro
     */
    async register(userData) {
        this.setState({ status: AuthStates.LOADING });

        try {
            // Simular chamada de API (substituir pela API real)
            const response = await this.mockRegisterAPI(userData);
            
            if (response.success) {
                // Fazer login automático após registro
                return await this.login(userData.email, userData.password, true);
            } else {
                this.setState({ status: AuthStates.UNAUTHENTICATED });
                return { success: false, error: response.error };
            }
            
        } catch (error) {
            console.error('Erro no registro:', error);
            this.setState({ 
                status: AuthStates.ERROR,
                error: error.message 
            });
            return { success: false, error: error.message };
        }
    }

    /**
     * Renova token de autenticação
     * @param {string} refreshToken - Token de renovação
     */
    async refreshAuthToken(refreshToken) {
        try {
            const response = await this.mockRefreshTokenAPI(refreshToken);
            
            if (response.success) {
                const authData = {
                    ...this.state,
                    token: response.token,
                    refreshToken: response.refreshToken || refreshToken,
                    lastActivity: Date.now()
                };

                // Atualizar localStorage
                localStorage.setItem('psiando-auth', JSON.stringify(authData));
                
                // Atualizar estado
                this.setState(authData);
                
                console.log('✅ Token renovado com sucesso');
            } else {
                this.logout();
            }
            
        } catch (error) {
            console.error('Erro ao renovar token:', error);
            this.logout();
        }
    }

    /**
     * Verifica se usuário tem permissão específica
     * @param {string} permission - Permissão a verificar
     * @returns {boolean} - Se tem a permissão
     */
    hasPermission(permission) {
        if (!this.isAuthenticated()) return false;
        return this.state.permissions.includes(permission) || this.state.user.role === UserRoles.SUPERADMIN;
    }

    /**
     * Verifica se usuário tem um dos roles especificados
     * @param {array} roles - Array de roles aceitos
     * @returns {boolean} - Se tem algum dos roles
     */
    hasRole(roles) {
        if (!this.isAuthenticated()) return false;
        return roles.includes(this.state.user.role);
    }

    /**
     * Verifica se usuário está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.state.status === AuthStates.AUTHENTICATED && this.state.user && this.state.token;
    }

    /**
     * Verifica se token está expirado
     * @param {string} token - Token JWT
     * @returns {boolean}
     */
    isTokenExpired(token) {
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    /**
     * Obtém dados do usuário atual
     * @returns {object|null}
     */
    getCurrentUser() {
        return this.state.user;
    }

    /**
     * Obtém token de autenticação
     * @returns {string|null}
     */
    getAuthToken() {
        return this.state.token;
    }

    /**
     * Obtém headers de autenticação para APIs
     * @returns {object}
     */
    getAuthHeaders() {
        if (!this.state.token) return {};
        
        return {
            'Authorization': `Bearer ${this.state.token}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Atualiza dados do usuário
     * @param {object} userData - Novos dados do usuário
     */
    updateUser(userData) {
        const updatedUser = { ...this.state.user, ...userData };
        
        this.setState({ user: updatedUser });
        
        // Atualizar localStorage
        const authData = JSON.parse(localStorage.getItem('psiando-auth') || '{}');
        authData.user = updatedUser;
        localStorage.setItem('psiando-auth', JSON.stringify(authData));
        
        // Atualizar tema se role mudou
        if (userData.role) {
            themeProvider.setThemeFromUserRole(updatedUser);
        }
    }

    /**
     * Configura verificação automática de sessão
     */
    setupSessionCheck() {
        this.sessionCheckInterval = setInterval(() => {
            if (this.isAuthenticated()) {
                // Verificar se token está próximo do vencimento
                const tokenData = JSON.parse(atob(this.state.token.split('.')[1]));
                const timeUntilExpiry = (tokenData.exp * 1000) - Date.now();
                
                // Renovar se restam menos de 10 minutos
                if (timeUntilExpiry < 10 * 60 * 1000 && this.state.refreshToken) {
                    this.refreshAuthToken(this.state.refreshToken);
                }
                
                // Verificar inatividade (logout após 2 horas)
                const timeSinceActivity = Date.now() - this.state.lastActivity;
                if (timeSinceActivity > 2 * 60 * 60 * 1000) {
                    console.log('⏰ Sessão expirada por inatividade');
                    this.logout();
                }
            }
        }, 60 * 1000); // Verificar a cada minuto
    }

    /**
     * Configura rastreamento de atividade do usuário
     */
    setupActivityTracking() {
        const events = ['click', 'keypress', 'scroll', 'mousemove'];
        
        const updateActivity = () => {
            if (this.isAuthenticated()) {
                this.setState({ lastActivity: Date.now() });
            }
        };

        // Debounce para evitar muitas atualizações
        let timeout;
        const debouncedUpdate = () => {
            clearTimeout(timeout);
            timeout = setTimeout(updateActivity, 1000);
        };

        events.forEach(event => {
            document.addEventListener(event, debouncedUpdate, { passive: true });
        });
    }

    /**
     * Adiciona listener para mudanças de estado
     * @param {function} callback - Função chamada quando estado muda
     */
    addStateChangeListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Remove listener de mudanças de estado
     * @param {function} callback - Função a ser removida
     */
    removeStateChangeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    /**
     * Atualiza estado e notifica listeners
     * @param {object} newState - Novo estado
     */
    setState(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };

        // Notificar listeners
        this.listeners.forEach(callback => {
            try {
                callback(this.state, oldState);
            } catch (error) {
                console.error('Erro em listener de auth:', error);
            }
        });
    }

    // =============================================
    // MÉTODOS MOCK PARA DESENVOLVIMENTO
    // Substituir por chamadas reais de API
    // =============================================

    /**
     * Mock da API de login
     */
    async mockLoginAPI(email, password) {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Usuários de teste
        const testUsers = {
            'supervisionado@test.com': {
                id: '1',
                name: 'Maria Silva',
                email: 'supervisionado@test.com',
                role: UserRoles.SUPERVISIONADO,
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332a387?w=150',
                specialties: ['Terapia Cognitivo-Comportamental', 'Ansiedade'],
                registrationNumber: 'CRP 06/123456',
                joinedAt: '2024-01-15'
            },
            'supervisor@test.com': {
                id: '2', 
                name: 'Dr. Carlos Rodriguez',
                email: 'supervisor@test.com',
                role: UserRoles.SUPERVISOR,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                specialties: ['Supervisão Clínica', 'Psicanálise', 'TCC'],
                registrationNumber: 'CRP 06/789012',
                yearsExperience: 15,
                certifications: ['Especialista em TCC', 'Supervisor Clínico Certificado']
            },
            'admin@test.com': {
                id: '3',
                name: 'Ana Santos',
                email: 'admin@test.com', 
                role: UserRoles.ADMIN,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                department: 'Administração'
            }
        };

        const user = testUsers[email];
        
        if (user && password === '123456') {
            return {
                success: true,
                user,
                token: this.generateMockJWT(user),
                refreshToken: this.generateMockRefreshToken(),
                permissions: this.getRolePermissions(user.role)
            };
        }

        return {
            success: false,
            error: 'Email ou senha inválidos'
        };
    }

    /**
     * Mock da API de registro
     */
    async mockRegisterAPI(userData) {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simular validações
        if (!userData.email || !userData.password) {
            return {
                success: false,
                error: 'Email e senha são obrigatórios'
            };
        }

        if (userData.password.length < 6) {
            return {
                success: false,
                error: 'Senha deve ter pelo menos 6 caracteres'
            };
        }

        // Simular sucesso
        return {
            success: true,
            message: 'Usuário registrado com sucesso'
        };
    }

    /**
     * Mock da API de refresh token
     */
    async mockRefreshTokenAPI(refreshToken) {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simular renovação bem-sucedida
        return {
            success: true,
            token: this.generateMockJWT(this.state.user),
            refreshToken: this.generateMockRefreshToken()
        };
    }

    /**
     * Mock da API de logout
     */
    async callLogoutAPI() {
        // Simular chamada de logout no servidor
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
    }

    /**
     * Gera JWT mock para desenvolvimento
     */
    generateMockJWT(user) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: user.id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
        }));
        const signature = btoa('mock-signature');
        
        return `${header}.${payload}.${signature}`;
    }

    /**
     * Gera refresh token mock
     */
    generateMockRefreshToken() {
        return btoa(`refresh-${Date.now()}-${Math.random()}`);
    }

    /**
     * Obtém permissões baseadas no role
     */
    getRolePermissions(role) {
        const permissions = {
            [UserRoles.SUPERVISIONADO]: [
                'view_profile',
                'edit_profile', 
                'schedule_sessions',
                'view_sessions',
                'access_community'
            ],
            [UserRoles.SUPERVISOR]: [
                'view_profile',
                'edit_profile',
                'manage_sessions',
                'view_supervisees',
                'access_supervisor_tools',
                'access_community',
                'view_analytics'
            ],
            [UserRoles.ADMIN]: [
                'view_profile',
                'edit_profile',
                'manage_users',
                'view_analytics',
                'access_admin_panel',
                'manage_content'
            ],
            [UserRoles.SUPERADMIN]: [
                '*' // Todas as permissões
            ]
        };

        return permissions[role] || [];
    }

    /**
     * Obtém informações de debug
     */
    getDebugInfo() {
        return {
            state: this.state,
            isAuthenticated: this.isAuthenticated(),
            tokenExpired: this.state.token ? this.isTokenExpired(this.state.token) : null,
            listeners: this.listeners.length,
            lastActivity: this.state.lastActivity ? new Date(this.state.lastActivity).toISOString() : null
        };
    }
}

// Instância global do provider de autenticação
export const authProvider = new AuthProvider();

// Disponibilizar globalmente para debug
window.authProvider = authProvider;

// Hook para uso em componentes (se necessário)
export const useAuth = () => {
    return {
        state: authProvider.state,
        login: (email, password, remember) => authProvider.login(email, password, remember),
        logout: () => authProvider.logout(),
        register: (userData) => authProvider.register(userData),
        isAuthenticated: () => authProvider.isAuthenticated(),
        getCurrentUser: () => authProvider.getCurrentUser(),
        hasPermission: (permission) => authProvider.hasPermission(permission),
        hasRole: (roles) => authProvider.hasRole(roles),
        getAuthHeaders: () => authProvider.getAuthHeaders(),
        addListener: (callback) => authProvider.addStateChangeListener(callback),
        removeListener: (callback) => authProvider.removeStateChangeListener(callback)
    };
};

// Constantes para facilitar o uso
export const DEMO_ACCOUNTS = {
    SUPERVISIONADO: {
        email: 'supervisionado@test.com',
        password: '123456',
        description: 'Conta de supervisionado para testes'
    },
    SUPERVISOR: {
        email: 'supervisor@test.com', 
        password: '123456',
        description: 'Conta de supervisor para testes'
    },
    ADMIN: {
        email: 'admin@test.com',
        password: '123456', 
        description: 'Conta de administrador para testes'
    }
};

console.log('🔐 AuthProvider inicializado');
console.log('📋 Contas de demonstração disponíveis:', DEMO_ACCOUNTS);