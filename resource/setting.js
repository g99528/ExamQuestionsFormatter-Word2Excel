$(document).ready(function () {
    leftChar = localStorage.getItem("string-qid-left");
    rightChar = localStorage.getItem("string-qid-right");
    if(leftChar==null||rightChar==null){
        leftChar = '#';
        rightChar = '#';
    }
        //更新题号匹配器
        qidExp = new RegExp("("+leftChar+")\\d+("+rightChar+")","mg");
        qidExtractExp = new RegExp("(?<="+leftChar+")\\d+(?="+rightChar+")","gm");
        console.log("("+leftChar+")\\d+("+rightChar+")");
        console.log("(?<="+leftChar+")\\d+(?="+rightChar+")")

});
$(".setting").click(function () {
    $.showModal({
        title: '转换设置',
        body:
            '<form  style="padding: 40px"><div class="form-group row">' +
            '<div class="row"><label for="text" class="col-form-label">题号分隔</label></div>' +
            '<div class="col-3" style="display: inline-block"><input type="text" class="form-control" id="string-qid-left" value="'+leftChar+'"/></div>' +
            '<div  class="col-3" style="display: inline-block"> <span>题号</span> </div>' +
            '<div class="col-3" style="display: inline-block"><input type="text" class="form-control" id="string-qid-right" value="'+rightChar+'"/></div>' +
            '</div></form>',
        footer: '<button type="submit" class="btn btn-primary">保存</button>',
        onCreate: function (modal) {
                // create event handler for form submit and handle values
            $(modal.element).on("click", "button[type='submit']", function (event) {
                event.preventDefault();
                var $form = $(modal.element).find("form");
                leftChar =  $form.find("#string-qid-left").val();
                rightChar =  $form.find("#string-qid-right").val();
                if(leftChar.length<=0||rightChar.length<=0){
                    $.showAlert({
                        title: "提示",
                        body:
                            "<a>请输入题号前和题号后的分隔符</a>"
                    })
                }else {
                    localStorage.setItem('string-qid-left', leftChar);
                    localStorage.setItem('string-qid-right', rightChar);
                    modal.hide();
                }
            })
        }
    });
});
