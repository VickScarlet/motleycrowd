export default class IModule {
    /**
     *
     * @param {import('.').default} core
     * @param {*} configure
     */
    constructor(core, configure) {
        this.#core = core;
        this.#configure = configure || {};
    }

    #core;
    #configure;

    /** @readonly */
    get $core() { return this.#core; }
    /** @readonly */
    get $configure() { return this.#configure; }
    /** @readonly */
    get $sheet() { return this.#core.sheet; }
    /** @readonly */
    get $db() { return this.#core.database; }
    /** @readonly */
    get $user() { return this.#core.user; }
    /** @readonly */
    get $game() { return this.#core.game; }
    /** @readonly */
    get $rank() { return this.#core.rank; }
    /** @readonly */
    get $question() { return this.#core.question; }
    /** @readonly */
    get $session() { return this.#core.session; }
    /** @readonly */
    get $achiv() { return this.#core.achievement; }
    /** @readonly */
    get $err() { return this.#core.err; }

    async initialize() {
        // empty
    }

    proxy() { return null; }

    $i(configure) {
        //empty
    }
}