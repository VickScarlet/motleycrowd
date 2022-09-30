import * as iutils from './functions/index.js';
import * as ilogic from './functions/logic.js';
import * as inormalize from './functions/normalize.js';
import {on, off, emit} from './event/index.js';
import iLog4js from 'log4js';
import Lang from './i18n/index.js';
import Core from './core/index.js';
import App from './app/index.js';

let category: string;
declare global {
    let $debug: boolean;
    let $utils = iutils;
    let $u = iutils;
    let $logic = ilogic;
    let $normalize = inormalize;
    let $norml = inormalize;
    let $on = on;
    let $off = off;
    let $emit = emit;
    let $event = {on, off, emit};

    let $Log4js = iLog4js;
    let $lang = new Lang();
    let $core = new Core();
    let $app = new App();
    let $$ = core;
    let $logger = new Proxy({
        [category]: Log4js.getLogger(category)
    });
    let $l = $logger;
    let $ = {
        debug: $debug,
        utils: $utils,
        logic: $logic,
        normalize: $normalize,
        event: $event,
        Log4js: $Log4js,
        logger: $logger,
        lang: $lang,
        core: $core,
        app: $app,
    };
}