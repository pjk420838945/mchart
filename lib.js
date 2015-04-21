;void function(){
    /**
     * 取当前脚本标签的 src路径 
     * @author  scuehs@btbtd.org 2013-05-23
     * @return  {string} 脚本所在目录的完整路径
     */
    function scriptPath(){
        var _sc = document.getElementsByTagName('script'), _sc = _sc[ _sc.length - 1 ], _path = _sc.getAttribute('src');
        if( /\//.test( _path ) ){ _path = _path.split('/'); _path.pop(); _path = _path.join('/') + '/'; }
        else if( /\\/.test( _path ) ){ _path = _path.split('\\'); _path.pop(); _path = _path.join('\\') + '/'; }
        return _path;
    }
    var _path = scriptPath();
    
    /* Requirejs */
    document.write( '<script src="'+_path+'require.js" ><\/script>' );

    /* json2 */
    document.write( '<script src="'+_path+'/lib/JSON/2/JSON.js" ><\/script>' );

    /* Zepto */
    document.write( '<script src="'+_path+'/lib/Zepto/src/zepto.js" ><\/script>' );
    document.write( '<script src="'+_path+'/lib/Zepto/src/event.js" ><\/script>' );
    document.write( '<script src="'+_path+'/lib/Zepto/src/selector.js" ><\/script>' );
    document.write( '<script src="'+_path+'/lib/Zepto/src/touch.js" ><\/script>' );
    
    /* pureMVC */
    document.write( '<script src="'+_path+'/lib/PureMVC/objs-2.1.1-min.js" ><\/script>' );
    document.write( '<script src="'+_path+'/lib/PureMVC/puremvc-1.0.1.js" ><\/script>' );
    // document.write( '<script src="'+_path+'/lib/PureMVC/puremvc-objs-2.0-min.js" ><\/script>' );
    
    /* Esaeljs */
    document.write( '<script src="'+_path+'/lib/EaselJS/lib/easeljs-0.8.0.min.js" ><\/script>' );

    /* Tweenjs */
    document.write( '<script src="'+_path+'/lib/TweenJS/lib/tweenjs-0.6.0.min.js" ><\/script>' );
}();
    