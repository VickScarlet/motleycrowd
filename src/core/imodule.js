export default class IModule {
    constructor(core, configure) {
        this.#core = core;
        this.#configure = configure || {};
    }

    #core;
    #configure;

    get $core() { return this.#core; }
    get $configure() { return this.#configure; }
    async initialize() {
        // empty
    }
}