#study nodejs

---

##usage
- nodejs
- express
- bower
- bootstrap
- jquery
- jade

##features
.结合bootstrap写了一个 `微型` 验证框架
```javascript
var Validator = {};
Validator["required"] = function(e){
    if(jQuery.isEmptyObject(e.value)) return true; return false;
};
Validator["isChinese"] = function(e){
    var rname=/[\u4E00-\u9FA5]/;  //u4E00-u9FA5 这是汉字编码范围，首先检测str是否在这个范围之内，是的话，返回true 否则false   
    if(!rname.test(e.value)) return true; return false;
};
Validator.work = function(e){
    var pass = true;
    var validator = $(e).attr("validator");
    if(validator){
        var v_arrays = validator.split("|");
        
        for(var v in v_arrays) {
            pass = Validator[v_arrays[v]](e);

            if(pass){
                $(e).addClass("form-control-error").parent().addClass("has-error");
            } else {
                $(e).removeClass("form-control-error").parent().removeClass("has-error");
                $(e).addClass("form-control-success").parent().addClass("has-success");
            }
        }
    }
    return !pass;
}

/**
 - 验证
 - 
 - @param  elements 表单输入框； 缺省意为所有输入框
 - @return object 表单验证结果 + 表单所有输入框
 */
function doValidate(elements){
    var _pass = true;
    var $inputs = undefined;
    if(elements){
        $inputs = $(elements);
    } else {
        $inputs = $(".l-input");
    }
    
    var _fields = [];
    $inputs.each(function(i,e){
        _fields[i] = e;             
        _pass = Validator.work(e);
    });

    return {
        pass : _pass,
        fields : _fields
    };
}
```
.