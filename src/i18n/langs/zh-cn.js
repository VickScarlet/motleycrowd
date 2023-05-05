export const general = {
    title: '乌合之众',
    subtitle: '群体博弈研究',

    yes: '是',
    no: '否',
    back: '返回',
    ok: '确定',
    review: '复盘',
    buy: '购买',

    delay_as: '当前延迟: {}ms',
    online_as: '在线人数: {}',

    auth_regi: '登录/注册',
    authenticate: '登录',
    register: '注册',
    logout: '登出',
    guestmode: '游客模式',
    guestname: '游客{}',
    achievement: '成就',
    accessory: '饰品',
    history: '历史对局',
    shop: '商店',

    username: '用户名',
    password: '密码',
    password_check: '重复密码',
    autologin: '自动登录',
    autologin_open: '自动登录(已开启)',
    autologin_close: '自动登录(已关闭)',
    no_account: '没有账号？ 立即注册.',
    has_account: '已有账号? 马上登录.',

    pair_mode: '{}人排位',
    priv_mode: '好友房',
    exit_room: '退出房间',
    exit_check: '真的要退出吗?',
    submit: '提交',
    submit_as: '您已提交选项【{}】',
    input_roomcode: '输入房间号',

    mimestate: '我的状态',
    ranking_as: '排名: {}',
    score_as: '得分: {}',
    no_answer: '未选',
    people_count: '{}人',
    collapse: '收起',
    expand: '显示全部',
    rank: '排行榜',

    option_people: '{option}: {people}人',

    fullscreen: '全屏',
    window: '窗口',

    auth_first: '请先登录',
    regi_first: '请先注册',
    only_member: '游客没有该功能',

    rank_main: '总榜',
    rank_ten: '十人',
    rank_hundred: '百人',
    next_refresh: '距离下次刷新还有 {}',
    not_in_rank: '未上榜',
    my_ranking_as: '我的排位: {}',
    rank_size: '总人数 {}',

    no_card: '没有卡片背景',
    no_badge: '没有头衔',
    apply_accessory: '应用装饰',

    private_10: '十人好友',
    private_100: '百人好友',
    pair_10: '十人排位',
    pair_100: '百人排位',

    room_info_private: '好友房 {}/{} 房间号 {}',
    room_info_pair: '排位房 {}/{}',

    next_restocking: '下次补货在{}',
    good_card: '背景',
    good_badge: '头衔',
    asset_not_enough: '钱不够',
    already_owned: '已拥有',

    grade_0: '普通',
    grade_1: '稀有',
    grade_2: '罕见',
    grade_3: '传说',
};

export const tips = {
    banned: '服务器拒绝为你工作',
    init_err: '连接服务器失败, 请检查网络连接, 或者过会再试一次',
    autologin_success: '自动登录成功',
    autologin_failed: '自动登录失败',
    welcome: '欢迎来到 [乌合之众]',
    unsupport_fullscreen: '您的浏览器不支持全屏模式',
    net_error: '当前网络有点小问题，尝试重连中~',
    net_kick: '你被踢了',
    net_resume: '重连成功',
    net_resume_failed: '掉线太久，已经被踢了, 请尝试重新登录',
    net_resume_auto: '自动重新登录成功',
    achievement_unlock: '解锁成就: {}',
};

export const error = {
    unknow: '未知错误',

    1: '通常错误',
    1001: '没有命令',
    1002: '参数错误',
    1003: '数据库错误',

    2000: '没有认证',
    2001: '用户名或密码错误',
    2002: '用户名不符合规范',
    2003: '请5秒后再试',

    3000: '没有游戏类型',
    3001: '已经在游戏中了',
    3002: '没找到游戏记录',

    4000: '已经解锁了成就',

    5000: '资产不足',
};

export {default as moment} from 'moment/dist/locale/zh-cn';