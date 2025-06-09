export class DashboardPage {
    constructor(props = {}) {
        this.props = props;
    }

    render() {
        return `
            <div class="dashboard-page min-h-screen bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-8">
                        Dashboard
                    </h1>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                Próximas Sessões
                            </h3>
                            <p class="text-gray-600">
                                3 sessões agendadas
                            </p>
                        </div>
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                Progresso
                            </h3>
                            <p class="text-gray-600">
                                75% completo
                            </p>
                        </div>
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                Certificações
                            </h3>
                            <p class="text-gray-600">
                                2 em andamento
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        console.log('DashboardPage montada');
    }
}