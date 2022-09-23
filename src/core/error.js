/**
 * 错误码
 * @readonly
 * @enum {number}
 */
const ErrorCode = {
    /** @readonly 通常错误 */
    COMMON_ERR: 1,
    /** @readonly 没有命令 */
    NO_CMD: 1001,
    /** @readonly 参数错误 */
    PARAM_ERROR: 1002,

    /** @readonly 没有认证 */
    NO_AUTH: 2000,
    /** @readonly 认证失败 */
    AUTH_FAILED: 2001,
    /** @readonly 用户名错误 */
    USERNAME_ERROR: 2002,
    /** @readonly 认证限制 */
    AUTH_LIMIT: 2003,

    /** @readonly 没有游戏类型 */
    NO_GAME_TYPE: 3000,
    /** @readonly 已经在游戏中了 */
    GAME_IN_ROOM: 3001,
};

/**
 * 错误码
 * @readonly
 * @enum {string}
 */
const ErrorMessage = {
    1: '通常错误',
    1001: '没有命令',
    1002: '参数错误',

    2000: '没有认证',
    2001: '认证失败',
    2002: '用户名错误',
    2003: '认证限制',

    3000: '没有游戏类型',
    3001: '已经在游戏中了',
};

export { ErrorCode, ErrorMessage };