export default {
    "101": {
        "id": 101,
        "name": "九死一生",
        "description": "10人排位赛夺冠",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.10Win",
        "condition": {
            "values": {
                "count": "record.c.10Win"
            },
            "checks": [
                "$ge",
                "?count",
                1
            ]
        }
    },
    "102": {
        "id": 102,
        "name": "天选之人",
        "description": "100人排位赛夺冠",
        "grade": 1,
        "hide": 0,
        "category": "record",
        "watch": "record.c.100Win",
        "condition": {
            "values": {
                "count": "record.c.100Win"
            },
            "checks": [
                "$ge",
                "?count",
                1
            ]
        }
    },
    "103": {
        "id": 103,
        "name": "开黑",
        "description": "好友房夺冠",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.privWin",
        "condition": {
            "values": {
                "count": "record.c.privWin"
            },
            "checks": [
                "$ge",
                "?count",
                1
            ]
        }
    },
    "104": {
        "id": 104,
        "name": "疯狂星期四",
        "description": "10人排位赛夺冠10次",
        "grade": 1,
        "hide": 0,
        "reward": {
            "badge": {
                "101": 1
            }
        },
        "category": "record",
        "watch": "record.c.10Win",
        "condition": {
            "values": {
                "count": "record.c.10Win"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "105": {
        "id": 105,
        "name": "为什么这么熟练",
        "description": "100人排位赛夺冠10次",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "102": 1
            }
        },
        "category": "record",
        "watch": "record.c.100Win",
        "condition": {
            "values": {
                "count": "record.c.100Win"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "106": {
        "id": 106,
        "name": "友尽房",
        "description": "好友房夺冠10次",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.privWin",
        "condition": {
            "values": {
                "count": "record.c.privWin"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "107": {
        "id": 107,
        "name": "精益求精",
        "description": "10人排位赛夺冠30次",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "103": 1
            }
        },
        "category": "record",
        "watch": "record.c.10Win",
        "condition": {
            "values": {
                "count": "record.c.10Win"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "108": {
        "id": 108,
        "name": "信手拈来",
        "description": "100人排位赛夺冠30次",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "104": 1
            }
        },
        "category": "record",
        "watch": "record.c.100Win",
        "condition": {
            "values": {
                "count": "record.c.100Win"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "109": {
        "id": 109,
        "name": "大义灭亲",
        "description": "好友房夺冠30次",
        "grade": 1,
        "hide": 0,
        "reward": {
            "badge": {
                "105": 1
            }
        },
        "category": "record",
        "watch": "record.c.privWin",
        "condition": {
            "values": {
                "count": "record.c.privWin"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "110": {
        "id": 110,
        "name": "百鸟朝凤",
        "description": "10人排位赛夺冠100次",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "106": 1
            }
        },
        "category": "record",
        "watch": "record.c.10Win",
        "condition": {
            "values": {
                "count": "record.c.10Win"
            },
            "checks": [
                "$ge",
                "?count",
                100
            ]
        }
    },
    "111": {
        "id": 111,
        "name": "万人斩",
        "description": "100人排位赛夺冠100次",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "107": 1
            }
        },
        "category": "record",
        "watch": "record.c.100Win",
        "condition": {
            "values": {
                "count": "record.c.100Win"
            },
            "checks": [
                "$ge",
                "?count",
                100
            ]
        }
    },
    "112": {
        "id": 112,
        "name": "大数据杀熟",
        "description": "好友房夺冠100次",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "108": 1
            }
        },
        "category": "record",
        "watch": "record.c.privWin",
        "condition": {
            "values": {
                "count": "record.c.privWin"
            },
            "checks": [
                "$ge",
                "?count",
                100
            ]
        }
    },
    "113": {
        "id": 113,
        "name": "难分高下",
        "description": "并列夺冠",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "ranking": "settlement.ranking",
                "count": "settlement.count.1"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?ranking",
                    1
                ],
                [
                    "$gt",
                    "?count",
                    1
                ]
            ]
        }
    },
    "114": {
        "id": 114,
        "name": "挂机的阿凯",
        "description": "有超时的题并夺冠",
        "grade": 1,
        "hide": 1,
        "reward": {
            "badge": {
                "109": 1
            }
        },
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "ranking": "settlement.ranking",
                "timeout": "settlement.timeout.me"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?ranking",
                    1
                ],
                [
                    "$gt",
                    "?timeout",
                    0
                ]
            ]
        }
    },
    "115": {
        "id": 115,
        "name": "素质三连",
        "description": "连续三场排位赛夺冠",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "110": 1
            }
        },
        "category": "record",
        "watch": "record.s.pairWin",
        "condition": {
            "values": {
                "count": "record.s.pairWin"
            },
            "checks": [
                "$ge",
                "?count",
                3
            ]
        }
    },
    "116": {
        "id": 116,
        "name": "还好我技高一筹",
        "description": "夺冠并与第二分差小于0.1",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "ranking": "settlement.ranking",
                "diff": "settlement.diff.2"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?ranking",
                    1
                ],
                [
                    "$lt",
                    "?diff",
                    0.1
                ]
            ]
        }
    },
    "117": {
        "id": 117,
        "name": "独辟蹊径",
        "description": "100人排位赛无人和你同分",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "type": "settlement.type",
                "count": "settlement.count.me"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?type",
                    100
                ],
                [
                    "$eq",
                    "?count",
                    1
                ]
            ]
        }
    },
    "118": {
        "id": 118,
        "name": "你很勇哦",
        "description": "10人排位赛选勇气得分",
        "grade": 1,
        "hide": 1,
        "reward": {
            "badge": {
                "111": 1
            }
        },
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "type": "settlement.type",
                "select": "settlement.select.1",
                "score": "settlement.subscore.1"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?type",
                    10
                ],
                [
                    "$eq",
                    "?select",
                    "E"
                ],
                [
                    "$gt",
                    "?score",
                    0
                ]
            ]
        }
    },
    "119": {
        "id": 119,
        "name": "我超勇的",
        "description": "100人排位赛选勇气得分",
        "grade": 2,
        "hide": 1,
        "reward": {
            "badge": {
                "112": 1
            }
        },
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "type": "settlement.type",
                "select": "settlement.select.1",
                "score": "settlement.subscore.1"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?type",
                    100
                ],
                [
                    "$eq",
                    "?select",
                    "E"
                ],
                [
                    "$gt",
                    "?score",
                    0
                ]
            ]
        }
    },
    "120": {
        "id": 120,
        "name": "显灵",
        "description": "选信仰并+2分",
        "grade": 0,
        "hide": 0,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "select": "settlement.select.1",
                "score": "settlement.subscore.1"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?select",
                    "F"
                ],
                [
                    "$eq",
                    "?score",
                    2
                ]
            ]
        }
    },
    "121": {
        "id": 121,
        "name": "人类荣光",
        "description": "选人类并得分",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.2",
                "select": "settlement.select.2",
                "score": "settlement.subscore.2"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?select",
                    "C"
                ],
                [
                    "$gt",
                    "?score",
                    0
                ],
                [
                    "$in",
                    "?question",
                    [
                        "q2004",
                        "qs2004"
                    ]
                ]
            ]
        }
    },
    "122": {
        "id": 122,
        "name": "不择手段",
        "description": "选背叛并夺冠",
        "grade": 1,
        "hide": 1,
        "reward": {
            "badge": {
                "113": 1
            }
        },
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "ranking": "settlement.ranking",
                "question": "settlement.question.3",
                "select": "settlement.select.3"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?ranking",
                    1
                ],
                [
                    "$eq",
                    "?select",
                    "C"
                ],
                [
                    "$in",
                    "?question",
                    [
                        "q3001",
                        "qs3001"
                    ]
                ]
            ]
        }
    },
    "123": {
        "id": 123,
        "name": "两极反转",
        "description": "选反思并夺冠",
        "grade": 1,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "ranking": "settlement.ranking",
                "question": "settlement.question.1",
                "select": "settlement.select.1"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?ranking",
                    1
                ],
                [
                    "$or",
                    [
                        "$and",
                        [
                            "$eq",
                            "?question",
                            "q1001"
                        ],
                        [
                            "$eq",
                            "?select",
                            "J"
                        ]
                    ],
                    [
                        "$and",
                        [
                            "$eq",
                            "?question",
                            "qs1001"
                        ],
                        [
                            "$eq",
                            "?select",
                            "H"
                        ]
                    ]
                ]
            ]
        }
    },
    "124": {
        "id": 124,
        "name": "蜀道难",
        "description": "加入蜀军并胜利",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.4",
                "select": "settlement.select.4",
                "score": "settlement.subscore.4"
            },
            "checks": [
                "$and",
                [
                    "$gt",
                    "?score",
                    0
                ],
                [
                    "$in",
                    "?question",
                    [
                        "q4002",
                        "qs4002"
                    ]
                ],
                [
                    "$in",
                    "?select",
                    [
                        "C",
                        "D"
                    ]
                ]
            ]
        }
    },
    "125": {
        "id": 125,
        "name": "单抽出奇迹",
        "description": "抽中SSR",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.5",
                "select": "settlement.select.5",
                "score": "settlement.subscore.5"
            },
            "checks": [
                "$and",
                [
                    "$gt",
                    "?score",
                    0
                ],
                [
                    "$eq",
                    "?select",
                    "A"
                ],
                [
                    "$in",
                    "?question",
                    [
                        "q5001",
                        "qs5001"
                    ]
                ]
            ]
        }
    },
    "126": {
        "id": 126,
        "name": "历史再现",
        "description": "选田忌并+4分",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.5",
                "select": "settlement.select.5",
                "score": "settlement.subscore.5"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?question",
                    "q5008"
                ],
                [
                    "$ge",
                    "?score",
                    4
                ],
                [
                    "$in",
                    "?select",
                    [
                        "D",
                        "E",
                        "F"
                    ]
                ]
            ]
        }
    },
    "127": {
        "id": 127,
        "name": "登基",
        "description": "选国王并得分",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.6",
                "select": "settlement.select.6",
                "score": "settlement.subscore.6"
            },
            "checks": [
                "$and",
                [
                    "$gt",
                    "?score",
                    0
                ],
                [
                    "$eq",
                    "?select",
                    "A"
                ],
                [
                    "$in",
                    "?question",
                    [
                        "q6003",
                        "qs6003"
                    ]
                ]
            ]
        }
    },
    "128": {
        "id": 128,
        "name": "上班偷偷玩这个",
        "description": "选摸鱼被优化",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.6",
                "select": "settlement.select.6",
                "score": "settlement.subscore.6"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?score",
                    0
                ],
                [
                    "$eq",
                    "?select",
                    "B"
                ],
                [
                    "$eq",
                    "?question",
                    "q6002"
                ]
            ]
        }
    },
    "129": {
        "id": 129,
        "name": "加班过度",
        "description": "选卷王过劳死",
        "grade": 0,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "question": "settlement.question.6",
                "select": "settlement.select.6",
                "score": "settlement.subscore.6"
            },
            "checks": [
                "$and",
                [
                    "$eq",
                    "?score",
                    0
                ],
                [
                    "$or",
                    [
                        "$and",
                        [
                            "$eq",
                            "?question",
                            "q6002"
                        ],
                        [
                            "$eq",
                            "?select",
                            "C"
                        ]
                    ],
                    [
                        "$and",
                        [
                            "$eq",
                            "?question",
                            "qs6002"
                        ],
                        [
                            "$eq",
                            "?select",
                            "B"
                        ]
                    ]
                ]
            ]
        }
    },
    "130": {
        "id": 130,
        "name": "积少成多",
        "description": "累计获得1000金币",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.m0",
        "condition": {
            "values": {
                "count": "record.c.m0"
            },
            "checks": [
                "$ge",
                "?count",
                1000
            ]
        }
    },
    "131": {
        "id": 131,
        "name": "月入过万",
        "description": "累计获得10000金币",
        "grade": 1,
        "hide": 0,
        "category": "record",
        "watch": "record.c.m0",
        "condition": {
            "values": {
                "count": "record.c.m0"
            },
            "checks": [
                "$ge",
                "?count",
                10000
            ]
        }
    },
    "132": {
        "id": 132,
        "name": "土块",
        "description": "累计获得100000金币",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "114": 1
            }
        },
        "category": "record",
        "watch": "record.c.m0",
        "condition": {
            "values": {
                "count": "record.c.m0"
            },
            "checks": [
                "$ge",
                "?count",
                100000
            ]
        }
    },
    "133": {
        "id": 133,
        "name": "与众不同",
        "description": "拥有1个头衔",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.badge",
        "condition": {
            "values": {
                "count": "record.c.badge"
            },
            "checks": [
                "$ge",
                "?count",
                1
            ]
        }
    },
    "134": {
        "id": 134,
        "name": "刻耳柏洛斯",
        "description": "拥有3个头衔",
        "grade": 1,
        "hide": 0,
        "category": "record",
        "watch": "record.c.badge",
        "condition": {
            "values": {
                "count": "record.c.badge"
            },
            "checks": [
                "$ge",
                "?count",
                3
            ]
        }
    },
    "135": {
        "id": 135,
        "name": "知名人士",
        "description": "拥有10个头衔",
        "grade": 2,
        "hide": 0,
        "category": "record",
        "watch": "record.c.badge",
        "condition": {
            "values": {
                "count": "record.c.badge"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "136": {
        "id": 136,
        "name": "低调",
        "description": "拥有30个头衔",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "115": 1
            }
        },
        "category": "record",
        "watch": "record.c.badge",
        "condition": {
            "values": {
                "count": "record.c.badge"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "137": {
        "id": 137,
        "name": "三原色",
        "description": "拥有3个名片背景",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.card",
        "condition": {
            "values": {
                "count": "record.c.card"
            },
            "checks": [
                "$ge",
                "?count",
                3
            ]
        }
    },
    "138": {
        "id": 138,
        "name": "五彩斑斓的黑",
        "description": "拥有10个名片背景",
        "grade": 1,
        "hide": 0,
        "category": "record",
        "watch": "record.c.card",
        "condition": {
            "values": {
                "count": "record.c.card"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "139": {
        "id": 139,
        "name": "选择困难症",
        "description": "拥有30个名片背景",
        "grade": 2,
        "hide": 0,
        "category": "record",
        "watch": "record.c.card",
        "condition": {
            "values": {
                "count": "record.c.card"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "140": {
        "id": 140,
        "name": "社交达人",
        "description": "拥有100个名片背景",
        "grade": 3,
        "hide": 0,
        "reward": {
            "card": {
                "204": 1
            }
        },
        "category": "record",
        "watch": "record.c.card",
        "condition": {
            "values": {
                "count": "record.c.card"
            },
            "checks": [
                "$ge",
                "?count",
                100
            ]
        }
    },
    "141": {
        "id": 141,
        "name": "鹤立鸡群",
        "description": "10人世界排名前10%",
        "grade": 1,
        "hide": 0,
        "category": "rank",
        "watch": "rank.ten",
        "condition": {
            "values": {
                "ranking": "rank.ten.ranking",
                "size": "rank.ten.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.1
            ]
        }
    },
    "142": {
        "id": 142,
        "name": "独孤求败",
        "description": "10人世界排名前1%",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "117": 1
            }
        },
        "category": "rank",
        "watch": "rank.ten",
        "condition": {
            "values": {
                "ranking": "rank.ten.ranking",
                "size": "rank.ten.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.01
            ]
        }
    },
    "143": {
        "id": 143,
        "name": "得道",
        "description": "10人世界排名前0.1%",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "118": 1
            }
        },
        "category": "rank",
        "watch": "rank.ten",
        "condition": {
            "values": {
                "ranking": "rank.ten.ranking",
                "size": "rank.ten.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.001
            ]
        }
    },
    "144": {
        "id": 144,
        "name": "卓尔不群",
        "description": "100人世界排名前10%",
        "grade": 1,
        "hide": 0,
        "category": "rank",
        "watch": "rank.hundred",
        "condition": {
            "values": {
                "ranking": "rank.hundred.ranking",
                "size": "rank.hundred.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.1
            ]
        }
    },
    "145": {
        "id": 145,
        "name": "超凡入圣",
        "description": "100人世界排名前1%",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "119": 1
            }
        },
        "category": "rank",
        "watch": "rank.hundred",
        "condition": {
            "values": {
                "ranking": "rank.hundred.ranking",
                "size": "rank.hundred.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.01
            ]
        }
    },
    "146": {
        "id": 146,
        "name": "飞升",
        "description": "100人世界排名前0.1%",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "120": 1
            }
        },
        "category": "rank",
        "watch": "rank.hundred",
        "condition": {
            "values": {
                "ranking": "rank.hundred.ranking",
                "size": "rank.hundred.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.001
            ]
        }
    },
    "147": {
        "id": 147,
        "name": "专家",
        "description": "世界总排名前10%",
        "grade": 1,
        "hide": 0,
        "reward": {
            "card": {
                "201": 1
            }
        },
        "category": "rank",
        "watch": "rank.main",
        "condition": {
            "values": {
                "ranking": "rank.main.ranking",
                "size": "rank.main.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.1
            ]
        }
    },
    "148": {
        "id": 148,
        "name": "罕见",
        "description": "世界总排名前1%",
        "grade": 2,
        "hide": 0,
        "reward": {
            "card": {
                "202": 1
            }
        },
        "category": "rank",
        "watch": "rank.main",
        "condition": {
            "values": {
                "ranking": "rank.main.ranking",
                "size": "rank.main.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.01
            ]
        }
    },
    "149": {
        "id": 149,
        "name": "传说",
        "description": "世界总排名前0.1%",
        "grade": 3,
        "hide": 0,
        "reward": {
            "card": {
                "203": 1
            }
        },
        "category": "rank",
        "watch": "rank.main",
        "condition": {
            "values": {
                "ranking": "rank.main.ranking",
                "size": "rank.main.size"
            },
            "checks": [
                "$le",
                [
                    "$div",
                    "?ranking",
                    "?size"
                ],
                0.001
            ]
        }
    },
    "150": {
        "id": 150,
        "name": "VIP",
        "description": "成功使用兑换码",
        "grade": 1,
        "hide": 1,
        "category": "record",
        "watch": "record.c.reddem",
        "condition": {
            "values": {
                "count": "record.c.reddem"
            },
            "checks": [
                "$ge",
                "?count",
                1
            ]
        }
    },
    "151": {
        "id": 151,
        "name": "薅羊毛",
        "description": "购买10件打折装扮",
        "grade": 1,
        "hide": 1,
        "reward": {
            "badge": {
                "116": 1
            }
        },
        "category": "record",
        "watch": "record.c.discount",
        "condition": {
            "values": {
                "count": "record.c.discount"
            },
            "checks": [
                "$ge",
                "?count",
                10
            ]
        }
    },
    "152": {
        "id": 152,
        "name": "劳逸结合",
        "description": "进行30场排位赛",
        "grade": 0,
        "hide": 0,
        "category": "record",
        "watch": "record.c.pair",
        "condition": {
            "values": {
                "count": "record.c.pair"
            },
            "checks": [
                "$ge",
                "?count",
                30
            ]
        }
    },
    "153": {
        "id": 153,
        "name": "社会调查样本",
        "description": "进行100场排位赛",
        "grade": 1,
        "hide": 0,
        "reward": {
            "badge": {
                "121": 1
            }
        },
        "category": "record",
        "watch": "record.c.pair",
        "condition": {
            "values": {
                "count": "record.c.pair"
            },
            "checks": [
                "$ge",
                "?count",
                100
            ]
        }
    },
    "154": {
        "id": 154,
        "name": "乌合之王",
        "description": "进行300场排位赛",
        "grade": 2,
        "hide": 0,
        "reward": {
            "badge": {
                "122": 1
            }
        },
        "category": "record",
        "watch": "record.c.pair",
        "condition": {
            "values": {
                "count": "record.c.pair"
            },
            "checks": [
                "$ge",
                "?count",
                300
            ]
        }
    },
    "155": {
        "id": 155,
        "name": "不会真有人玩这么多吧",
        "description": "进行1000场排位赛",
        "grade": 3,
        "hide": 0,
        "reward": {
            "badge": {
                "123": 1
            }
        },
        "category": "record",
        "watch": "record.c.pair",
        "condition": {
            "values": {
                "count": "record.c.pair"
            },
            "checks": [
                "$ge",
                "?count",
                1000
            ]
        }
    },
    "156": {
        "id": 156,
        "name": "赚麻了",
        "description": "在一题中+5分或更多",
        "grade": 1,
        "hide": 1,
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "s1": "settlement.subscore.1",
                "s2": "settlement.subscore.2",
                "s3": "settlement.subscore.3",
                "s4": "settlement.subscore.4",
                "s5": "settlement.subscore.5",
                "s6": "settlement.subscore.6",
                "s7": "settlement.subscore.7"
            },
            "checks": [
                "$ge",
                [
                    "$max",
                    "?s1",
                    "?s2",
                    "?s3",
                    "?s4",
                    "?s5",
                    "?s6",
                    "?s7"
                ],
                5
            ]
        }
    },
    "157": {
        "id": 157,
        "name": "神之一手",
        "description": "在一题中+10分或更多",
        "grade": 3,
        "hide": 1,
        "reward": {
            "badge": {
                "124": 1
            }
        },
        "category": "settlement",
        "watch": "settlement",
        "condition": {
            "values": {
                "s1": "settlement.subscore.1",
                "s2": "settlement.subscore.2",
                "s3": "settlement.subscore.3",
                "s4": "settlement.subscore.4",
                "s5": "settlement.subscore.5",
                "s6": "settlement.subscore.6",
                "s7": "settlement.subscore.7"
            },
            "checks": [
                "$ge",
                [
                    "$max",
                    "?s1",
                    "?s2",
                    "?s3",
                    "?s4",
                    "?s5",
                    "?s6",
                    "?s7"
                ],
                10
            ]
        }
    }
}