export default class IModule {
    constructor(core, configure) {
        this.#core = core;
        this.#configure = configure || {};
    }

    #core;
    #configure;

    get $core() { return this.#core; }
    get $configure() { return this.#configure; }
    get $db() { return this.#core.database; }
    get $user() { return this.#core.user; }
    get $game() { return this.#core.game; }
    get $rank() { return this.#core.rank; }
    get $question() { return this.#core.question; }
    get $session() { return this.#core.session; }

    async initialize() {
        // empty
    }

    proxy() { return null; }
}