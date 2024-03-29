var tmpDown; //导出的二进制对象
function downloadExl(json, type) {
    //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
    var tmpdata = json[0];
    json.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
        //跳过str和type字段
        if(k=='str'||k=='type'){
            continue;
        }
        keyMap.push(k);
        json[0][k] = k;
    }


    var tmpdata = [];
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });

    //设置区域,比如表格从A1到D10
    var outputPos = Object.keys(tmpdata);
    var tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                })
        }
    };

    //创建二进制对象写入转换好的字节流
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
    ))], {
        type: ""
    });

    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("downloadA").href = href; //绑定a标签
    document.getElementById("downloadA").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

//字符串转字符流
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

//将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    let temCol = '',
        s = '',
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}
