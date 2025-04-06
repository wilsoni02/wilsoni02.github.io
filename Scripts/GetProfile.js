export class ConfigSingleton {
    static #instance = null;
    static #dataLoaded = false;

    constructor() {
        if (ConfigSingleton.#instance) {
            throw new Error("Use ConfigSingleton.getInstance()");
        }
    }

    static async getInstance() {
        if (!this.#instance) {
            this.#instance = new ConfigSingleton();
            await this.#instance.loadConfig();
        }
        return this.#instance;
    }

    async loadConfig() {
        if (!ConfigSingleton.#dataLoaded) {
            try {
                const response = await fetch('./Content/profile.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch the configuration file');
                }
                ConfigSingleton.#dataLoaded = true;
                this.config = await response.json();
            } catch (error) {
                console.error('Error loading configuration:', error);
                ConfigSingleton.#instance = null;
                throw error;
            }
        }
    }

    getConfig() {
        if (!ConfigSingleton.#dataLoaded) {
            throw new Error("Configuration is not loaded yet.");
        }
        return this.config;
    }
}
