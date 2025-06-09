export class AuthPage {
    constructor(props = {}) {
        this.props = props;
        this.mode = props.mode || 'login'; // 'login' ou 'register'
    }

    render() {
        return `
            <div class="auth-page min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div class="max-w-md w-full mx-4">
                    <div class="bg-white rounded-lg shadow-xl p-8">
                        <div class="text-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span class="text-white font-bold text-lg">P</span>
                            </div>
                            <h1 class="text-2xl font-bold text-gray-900">
                                ${this.mode === 'login' ? 'Entrar' : 'Criar Conta'}
                            </h1>
                            <p class="text-gray-600 mt-2">
                                ${this.mode === 'login' 
                                    ? 'Acesse sua conta na Psiando Global' 
                                    : 'Junte-se à nossa comunidade global'
                                }
                            </p>
                        </div>

                        ${this.mode === 'login' ? this.renderLoginForm() : this.renderRegisterForm()}
                        
                        <div class="mt-6 text-center">
                            <p class="text-gray-600">
                                ${this.mode === 'login' 
                                    ? 'Não tem uma conta?' 
                                    : 'Já tem uma conta?'
                                }
                                <button 
                                    onclick="router.navigate('${this.mode === 'login' ? '/auth/register' : '/auth/login'}')"
                                    class="text-blue-600 hover:text-blue-700 font-medium ml-1"
                                >
                                    ${this.mode === 'login' ? 'Criar conta' : 'Fazer login'}
                                </button>
                            </p>
                        </div>

                        <!-- Contas Demo -->
                        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm font-medium text-gray-700 mb-2">Contas de demonstração:</p>
                            <div class="space-y-1 text-xs text-gray-600">
                                <p><strong>Supervisionado:</strong> supervisionado@test.com / 123456</p>
                                <p><strong>Supervisor:</strong> supervisor@test.com / 123456</p>
                                <p><strong>Admin:</strong> admin@test.com / 123456</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderLoginForm() {
        return `
            <form onsubmit="this.handleLogin(event)">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Email
                    </label>
                    <input 
                        type="email" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="seu@email.com"
                    >
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Senha
                    </label>
                    <input 
                        type="password" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                    >
                </div>
                <div class="flex items-center justify-between mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-sm text-gray-600">Lembrar de mim</span>
                    </label>
                    <a href="#" class="text-sm text-blue-600 hover:text-blue-700">
                        Esqueceu a senha?
                    </a>
                </div>
                <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    Entrar
                </button>
            </form>
        `;
    }

    renderRegisterForm() {
        return `
            <form onsubmit="this.handleRegister(event)">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Nome Completo
                    </label>
                    <input 
                        type="text" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Seu nome completo"
                    >
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Email
                    </label>
                    <input 
                        type="email" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="seu@email.com"
                    >
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Perfil
                    </label>
                    <select 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Selecione seu perfil</option>
                        <option value="supervisionado">Supervisionado</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-medium mb-2">
                        Senha
                    </label>
                    <input 
                        type="password" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mínimo 6 caracteres"
                    >
                </div>
                <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    Criar Conta
                </button>
            </form>
        `;
    }

    handleLogin(event) {
        event.preventDefault();
        // Implementar lógica de login
        console.log('Login form submitted');
    }

    handleRegister(event) {
        event.preventDefault();
        // Implementar lógica de registro
        console.log('Register form submitted');
    }

    mount() {
        console.log('AuthPage montada - modo:', this.mode);
    }
}
