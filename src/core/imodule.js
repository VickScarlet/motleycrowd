export class IModule {
    constructor(core, configure, instance) {
        this.#core = core;
        this.#configure = configure || {};
        this.#instance = instance;
    }

    #core;
    #configure;
    #instance;

    get core() { return this.#core; }
    get configure() { return this.#configure; }
    get instance() { return this.#instance; }
    initialize() {
        // empty
    }
}