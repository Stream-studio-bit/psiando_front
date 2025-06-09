export class CommunityPage {
    constructor(props = {}) {
        this.props = props;
    }

    render() {
        return `
            <div class="community-page min-h-screen bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-8">
                        Comunidade Global
                    </h1>
                    <div class="bg-white rounded-lg shadow p-6">
                        <p class="text-gray-600">
                            Página da comunidade em desenvolvimento...
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        console.log('CommunityPage montada');
    }
}