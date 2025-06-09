export class SupervisionPage {
    constructor(props = {}) {
        this.props = props;
    }

    render() {
        return `
            <div class="supervision-page min-h-screen bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-8">
                        Minhas Supervisões
                    </h1>
                    <div class="bg-white rounded-lg shadow p-6">
                        <p class="text-gray-600">
                            Página de supervisões em desenvolvimento...
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        console.log('SupervisionPage montada');
    }
}
