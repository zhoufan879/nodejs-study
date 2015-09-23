
exports.getJson = function(json_path){
	try{
		var json = require(json_path);
		return json;
	}catch(e){
		console.error("获取JSON文件失败", e);
		return undefined;
	}
	return undefined;
}
