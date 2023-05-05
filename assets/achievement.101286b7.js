const e={101:{id:101,name:"\u4E5D\u6B7B\u4E00\u751F",description:"10\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A0",grade:0,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.10Win"},checks:["$ge","?count",1]}},102:{id:102,name:"\u5929\u9009\u4E4B\u4EBA",description:"100\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A0",grade:1,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.100Win"},checks:["$ge","?count",1]}},103:{id:103,name:"\u5F00\u9ED1",description:"\u597D\u53CB\u623F\u593A\u51A0",grade:0,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.privWin"},checks:["$ge","?count",1]}},104:{id:104,name:"\u75AF\u72C2\u661F\u671F\u56DB",description:"10\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A010\u6B21",grade:1,hide:0,reward:{badge:{101:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.10Win"},checks:["$ge","?count",10]}},105:{id:105,name:"\u4E3A\u4EC0\u4E48\u8FD9\u4E48\u719F\u7EC3",description:"100\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A010\u6B21",grade:2,hide:0,reward:{badge:{102:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.100Win"},checks:["$ge","?count",10]}},106:{id:106,name:"\u53CB\u5C3D\u623F",description:"\u597D\u53CB\u623F\u593A\u51A010\u6B21",grade:0,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.privWin"},checks:["$ge","?count",10]}},107:{id:107,name:"\u7CBE\u76CA\u6C42\u7CBE",description:"10\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A030\u6B21",grade:2,hide:0,reward:{badge:{103:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.10Win"},checks:["$ge","?count",30]}},108:{id:108,name:"\u4FE1\u624B\u62C8\u6765",description:"100\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A030\u6B21",grade:3,hide:0,reward:{badge:{104:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.100Win"},checks:["$ge","?count",30]}},109:{id:109,name:"\u5927\u4E49\u706D\u4EB2",description:"\u597D\u53CB\u623F\u593A\u51A030\u6B21",grade:1,hide:0,reward:{badge:{105:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.privWin"},checks:["$ge","?count",30]}},110:{id:110,name:"\u767E\u9E1F\u671D\u51E4",description:"10\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A0100\u6B21",grade:3,hide:0,reward:{badge:{106:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.10Win"},checks:["$ge","?count",100]}},111:{id:111,name:"\u4E07\u4EBA\u65A9",description:"100\u4EBA\u6392\u4F4D\u8D5B\u593A\u51A0100\u6B21",grade:3,hide:0,reward:{badge:{107:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.100Win"},checks:["$ge","?count",100]}},112:{id:112,name:"\u5927\u6570\u636E\u6740\u719F",description:"\u597D\u53CB\u623F\u593A\u51A0100\u6B21",grade:2,hide:0,reward:{badge:{108:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.privWin"},checks:["$ge","?count",100]}},113:{id:113,name:"\u96BE\u5206\u9AD8\u4E0B",description:"\u5E76\u5217\u593A\u51A0",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{ranking:"settlement.ranking",count:"settlement.count.1"},checks:["$and",["$eq","?ranking",1],["$gt","?count",1]]}},114:{id:114,name:"\u6302\u673A\u7684\u963F\u51EF",description:"\u6709\u8D85\u65F6\u7684\u9898\u5E76\u593A\u51A0",grade:1,hide:1,reward:{badge:{109:1}},category:"settlement",watch:"$settlement",condition:{values:{ranking:"settlement.ranking",timeout:"settlement.timeout.me"},checks:["$and",["$eq","?ranking",1],["$gt","?timeout",0]]}},115:{id:115,name:"\u7D20\u8D28\u4E09\u8FDE",description:"\u8FDE\u7EED\u4E09\u573A\u6392\u4F4D\u8D5B\u593A\u51A0",grade:2,hide:0,reward:{badge:{110:1}},category:"record",watch:"$record",condition:{values:{count:"record.s.pairWin"},checks:["$ge","?count",3]}},116:{id:116,name:"\u8FD8\u597D\u6211\u6280\u9AD8\u4E00\u7B79",description:"\u593A\u51A0\u5E76\u4E0E\u7B2C\u4E8C\u5206\u5DEE\u5C0F\u4E8E0.1",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{ranking:"settlement.ranking",diff:"settlement.diff.2"},checks:["$and",["$eq","?ranking",1],["$lt","?diff",.1]]}},117:{id:117,name:"\u72EC\u8F9F\u8E4A\u5F84",description:"100\u4EBA\u6392\u4F4D\u8D5B\u65E0\u4EBA\u548C\u4F60\u540C\u5206",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{type:"settlement.type",count:"settlement.count.me"},checks:["$and",["$eq","?type",100],["$eq","?count",1]]}},118:{id:118,name:"\u4F60\u5F88\u52C7\u54E6",description:"10\u4EBA\u6392\u4F4D\u8D5B\u9009\u52C7\u6C14\u5F97\u5206",grade:1,hide:1,reward:{badge:{111:1}},category:"settlement",watch:"$settlement",condition:{values:{type:"settlement.type",select:"settlement.select.1",score:"settlement.subscore.1"},checks:["$and",["$eq","?type",10],["$eq","?select","E"],["$gt","?score",0]]}},119:{id:119,name:"\u6211\u8D85\u52C7\u7684",description:"100\u4EBA\u6392\u4F4D\u8D5B\u9009\u52C7\u6C14\u5F97\u5206",grade:2,hide:1,reward:{badge:{112:1}},category:"settlement",watch:"$settlement",condition:{values:{type:"settlement.type",select:"settlement.select.1",score:"settlement.subscore.1"},checks:["$and",["$eq","?type",100],["$eq","?select","E"],["$gt","?score",0]]}},120:{id:120,name:"\u663E\u7075",description:"\u9009\u4FE1\u4EF0\u5E76+2\u5206",grade:0,hide:0,category:"settlement",watch:"$settlement",condition:{values:{select:"settlement.select.1",score:"settlement.subscore.1"},checks:["$and",["$eq","?select","F"],["$eq","?score",2]]}},121:{id:121,name:"\u4EBA\u7C7B\u8363\u5149",description:"\u9009\u4EBA\u7C7B\u5E76\u5F97\u5206",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.2",select:"settlement.select.2",score:"settlement.subscore.2"},checks:["$and",["$eq","?select","C"],["$gt","?score",0],["$in","?question",["q2004","qs2004"]]]}},122:{id:122,name:"\u4E0D\u62E9\u624B\u6BB5",description:"\u9009\u80CC\u53DB\u5E76\u593A\u51A0",grade:1,hide:1,reward:{badge:{113:1}},category:"settlement",watch:"$settlement",condition:{values:{ranking:"settlement.ranking",question:"settlement.question.3",select:"settlement.select.3"},checks:["$and",["$eq","?ranking",1],["$eq","?select","C"],["$in","?question",["q3001","qs3001"]]]}},123:{id:123,name:"\u4E24\u6781\u53CD\u8F6C",description:"\u9009\u53CD\u601D\u5E76\u593A\u51A0",grade:1,hide:1,category:"settlement",watch:"$settlement",condition:{values:{ranking:"settlement.ranking",question:"settlement.question.1",select:"settlement.select.1"},checks:["$and",["$eq","?ranking",1],["$or",["$and",["$eq","?question","q1001"],["$eq","?select","J"]],["$and",["$eq","?question","qs1001"],["$eq","?select","H"]]]]}},124:{id:124,name:"\u8700\u9053\u96BE",description:"\u52A0\u5165\u8700\u519B\u5E76\u80DC\u5229",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.4",select:"settlement.select.4",score:"settlement.subscore.4"},checks:["$and",["$gt","?score",0],["$in","?question",["q4002","qs4002"]],["$in","?select",["C","D"]]]}},125:{id:125,name:"\u5355\u62BD\u51FA\u5947\u8FF9",description:"\u62BD\u4E2DSSR",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.5",select:"settlement.select.5",score:"settlement.subscore.5"},checks:["$and",["$gt","?score",0],["$eq","?select","A"],["$in","?question",["q5001","qs5001"]]]}},126:{id:126,name:"\u5386\u53F2\u518D\u73B0",description:"\u9009\u7530\u5FCC\u5E76+4\u5206",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.5",select:"settlement.select.5",score:"settlement.subscore.5"},checks:["$and",["$eq","?question","q5008"],["$ge","?score",4],["$in","?select",["D","E","F"]]]}},127:{id:127,name:"\u767B\u57FA",description:"\u9009\u56FD\u738B\u5E76\u5F97\u5206",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.6",select:"settlement.select.6",score:"settlement.subscore.6"},checks:["$and",["$gt","?score",0],["$eq","?select","A"],["$in","?question",["q6003","qs6003"]]]}},128:{id:128,name:"\u4E0A\u73ED\u5077\u5077\u73A9\u8FD9\u4E2A",description:"\u9009\u6478\u9C7C\u88AB\u4F18\u5316",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.6",select:"settlement.select.6",score:"settlement.subscore.6"},checks:["$and",["$eq","?score",0],["$eq","?select","B"],["$eq","?question","q6002"]]}},129:{id:129,name:"\u52A0\u73ED\u8FC7\u5EA6",description:"\u9009\u5377\u738B\u8FC7\u52B3\u6B7B",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{question:"settlement.question.6",select:"settlement.select.6",score:"settlement.subscore.6"},checks:["$and",["$eq","?score",0],["$or",["$and",["$eq","?question","q6002"],["$eq","?select","C"]],["$and",["$eq","?question","qs6002"],["$eq","?select","B"]]]]}},130:{id:130,name:"\u79EF\u5C11\u6210\u591A",description:"\u7D2F\u8BA1\u83B7\u5F971000\u94F6\u5E01",grade:0,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.m1"},checks:["$ge","?count",1e3]}},131:{id:131,name:"\u6708\u5165\u8FC7\u4E07",description:"\u7D2F\u8BA1\u83B7\u5F9710000\u94F6\u5E01",grade:1,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.m1"},checks:["$ge","?count",1e4]}},132:{id:132,name:"\u571F\u5757",description:"\u7D2F\u8BA1\u83B7\u5F97100000\u94F6\u5E01",grade:2,hide:0,reward:{badge:{114:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.m1"},checks:["$ge","?count",1e5]}},133:{id:133,name:"\u4E0E\u4F17\u4E0D\u540C",description:"\u62E5\u67091\u4E2A\u5934\u8854",grade:0,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.badge"},checks:["$ge","?count",1]}},134:{id:134,name:"\u523B\u8033\u67CF\u6D1B\u65AF",description:"\u62E5\u67093\u4E2A\u5934\u8854",grade:1,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.badge"},checks:["$ge","?count",3]}},135:{id:135,name:"\u77E5\u540D\u4EBA\u58EB",description:"\u62E5\u670910\u4E2A\u5934\u8854",grade:2,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.badge"},checks:["$ge","?count",10]}},136:{id:136,name:"\u4F4E\u8C03",description:"\u62E5\u670930\u4E2A\u5934\u8854",grade:3,hide:0,reward:{badge:{115:1}},category:"asset",watch:"$asset",condition:{values:{count:"asset.count.badge"},checks:["$ge","?count",30]}},137:{id:137,name:"\u8EAB\u4EFD\u8BC1\u660E",description:"\u62E5\u67091\u4E2A\u540D\u7247\u80CC\u666F",grade:0,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.card"},checks:["$ge","?count",1]}},138:{id:138,name:"\u4E09\u539F\u8272",description:"\u62E5\u67093\u4E2A\u540D\u7247\u80CC\u666F",grade:1,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.card"},checks:["$ge","?count",3]}},139:{id:139,name:"\u9009\u62E9\u56F0\u96BE\u75C7",description:"\u62E5\u670910\u4E2A\u540D\u7247\u80CC\u666F",grade:2,hide:0,category:"asset",watch:"$asset",condition:{values:{count:"asset.count.card"},checks:["$ge","?count",10]}},140:{id:140,name:"\u793E\u4EA4\u8FBE\u4EBA",description:"\u62E5\u670930\u4E2A\u540D\u7247\u80CC\u666F",grade:3,hide:0,reward:{card:{204:1}},category:"asset",watch:"$asset",condition:{values:{count:"asset.count.card"},checks:["$ge","?count",30]}},141:{id:141,name:"\u9E64\u7ACB\u9E21\u7FA4",description:"10\u4EBA\u4E16\u754C\u6392\u540D\u524D10%",grade:1,hide:0,category:"rank",watch:"$rank",condition:{values:{ranking:"rank.ten.ranking",size:"rank.ten.size"},checks:["$le",["$div","?ranking","?size"],.1]}},142:{id:142,name:"\u72EC\u5B64\u6C42\u8D25",description:"10\u4EBA\u4E16\u754C\u6392\u540D\u524D1%",grade:2,hide:0,reward:{badge:{117:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.ten.ranking",size:"rank.ten.size"},checks:["$le",["$div","?ranking","?size"],.01]}},143:{id:143,name:"\u5F97\u9053",description:"10\u4EBA\u4E16\u754C\u6392\u540D\u524D0.1%",grade:3,hide:0,reward:{badge:{118:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.ten.ranking",size:"rank.ten.size"},checks:["$le",["$div","?ranking","?size"],.001]}},144:{id:144,name:"\u5353\u5C14\u4E0D\u7FA4",description:"100\u4EBA\u4E16\u754C\u6392\u540D\u524D10%",grade:1,hide:0,category:"rank",watch:"$rank",condition:{values:{ranking:"rank.hundred.ranking",size:"rank.hundred.size"},checks:["$le",["$div","?ranking","?size"],.1]}},145:{id:145,name:"\u8D85\u51E1\u5165\u5723",description:"100\u4EBA\u4E16\u754C\u6392\u540D\u524D1%",grade:2,hide:0,reward:{badge:{119:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.hundred.ranking",size:"rank.hundred.size"},checks:["$le",["$div","?ranking","?size"],.01]}},146:{id:146,name:"\u98DE\u5347",description:"100\u4EBA\u4E16\u754C\u6392\u540D\u524D0.1%",grade:3,hide:0,reward:{badge:{120:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.hundred.ranking",size:"rank.hundred.size"},checks:["$le",["$div","?ranking","?size"],.001]}},147:{id:147,name:"\u4E13\u5BB6",description:"\u4E16\u754C\u603B\u6392\u540D\u524D10%",grade:1,hide:0,reward:{card:{201:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.main.ranking",size:"rank.main.size"},checks:["$le",["$div","?ranking","?size"],.1]}},148:{id:148,name:"\u7F55\u89C1",description:"\u4E16\u754C\u603B\u6392\u540D\u524D1%",grade:2,hide:0,reward:{card:{202:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.main.ranking",size:"rank.main.size"},checks:["$le",["$div","?ranking","?size"],.01]}},149:{id:149,name:"\u4F20\u8BF4",description:"\u4E16\u754C\u603B\u6392\u540D\u524D0.1%",grade:3,hide:0,reward:{card:{203:1}},category:"rank",watch:"$rank",condition:{values:{ranking:"rank.main.ranking",size:"rank.main.size"},checks:["$le",["$div","?ranking","?size"],.001]}},150:{id:150,name:"VIP",description:"\u6210\u529F\u4F7F\u7528\u5151\u6362\u7801",grade:1,hide:1,category:"record",watch:"$record",condition:{values:{count:"record.c.reddem"},checks:["$ge","?count",1]}},151:{id:151,name:"\u8585\u7F8A\u6BDB",description:"\u8D2D\u4E7010\u4EF6\u6253\u6298\u88C5\u626E",grade:1,hide:1,reward:{badge:{116:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.discount"},checks:["$ge","?count",10]}},152:{id:152,name:"\u52B3\u9038\u7ED3\u5408",description:"\u8FDB\u884C30\u573A\u6392\u4F4D\u8D5B",grade:0,hide:0,category:"record",watch:"$record",condition:{values:{count:"record.c.pair"},checks:["$ge","?count",30]}},153:{id:153,name:"\u793E\u4F1A\u8C03\u67E5\u6837\u672C",description:"\u8FDB\u884C100\u573A\u6392\u4F4D\u8D5B",grade:1,hide:0,reward:{badge:{121:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.pair"},checks:["$ge","?count",100]}},154:{id:154,name:"\u4E4C\u5408\u4E4B\u738B",description:"\u8FDB\u884C300\u573A\u6392\u4F4D\u8D5B",grade:2,hide:0,reward:{badge:{122:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.pair"},checks:["$ge","?count",300]}},155:{id:155,name:"\u4E0D\u4F1A\u771F\u6709\u4EBA\u73A9\u8FD9\u4E48\u591A\u5427",description:"\u8FDB\u884C1000\u573A\u6392\u4F4D\u8D5B",grade:3,hide:0,reward:{badge:{123:1}},category:"record",watch:"$record",condition:{values:{count:"record.c.pair"},checks:["$ge","?count",1e3]}},156:{id:156,name:"\u8D5A\u9EBB\u4E86",description:"\u5728\u4E00\u9898\u4E2D+5\u5206\u6216\u66F4\u591A",grade:0,hide:1,category:"settlement",watch:"$settlement",condition:{values:{s1:"settlement.subscore.1",s2:"settlement.subscore.2",s3:"settlement.subscore.3",s4:"settlement.subscore.4",s5:"settlement.subscore.5",s6:"settlement.subscore.6",s7:"settlement.subscore.7"},checks:["$ge",["$max","?s1","?s2","?s3","?s4","?s5","?s6","?s7"],5]}},157:{id:157,name:"\u795E\u4E4B\u4E00\u624B",description:"\u5728\u4E00\u9898\u4E2D+10\u5206\u6216\u66F4\u591A",grade:1,hide:1,reward:{badge:{124:1}},category:"settlement",watch:"$settlement",condition:{values:{s1:"settlement.subscore.1",s2:"settlement.subscore.2",s3:"settlement.subscore.3",s4:"settlement.subscore.4",s5:"settlement.subscore.5",s6:"settlement.subscore.6",s7:"settlement.subscore.7"},checks:["$ge",["$max","?s1","?s2","?s3","?s4","?s5","?s6","?s7"],10]}}};export{e as default};
//# sourceMappingURL=achievement.101286b7.js.map
