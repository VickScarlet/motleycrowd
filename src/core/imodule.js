export class IModule {
    constructor(core, configure, instance) {
        this.#core = core;
        this.#configure = configure || {};
    }

    #core;
    #configure;

    get $core() { return this.#core; }
    get $configure() { return this.#configure; }
    initialize() {
        // empty
    }
}