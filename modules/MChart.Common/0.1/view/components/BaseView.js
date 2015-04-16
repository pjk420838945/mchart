;(function(define, _win) { 'use strict'; define( [ 
], function(){
    /** 
     * @class 
     * 一个用于程序的UI组件的基类 
     * 它主要添加一个基于BaseView的实现，让UI组件从Mediators监听 
     * 实现者和监听者是负责匿名事件对象的发送和接受 
     */  
    var BaseView = Objs(
        "Base.view.components.BaseView"  
        , {  
            /** 
             * @construct 
             * 初始化一个BaseView实例 
             */  
            initialize: function() {
                this.listenerMap = {};
            }
              
            /** 
             * 一个BaseView.listenerDescriptor的映射对象 
             * @type {Object} 
             * @private 
             */  
            , listenerMap: null
              
            /** 
            * 发送事件到事件流 
            * @param {String} type 
            *       发送的事件类型 
            * @param {Object} properties 
            *       可选的匿名对象，当dispatch时会被发送到事件监听器 
            */  
            , dispatchEvent: function( type, properties ) {  
                if( typeof type == 'undefined' )  
                    return;  
                      
                if( typeof this.listenerMap[BaseView.QUEUE_PATTERN + type] == 'undefined' )  
                    return;  
              
                var queue = this.listenerMap[BaseView.QUEUE_PATTERN + type].slice(0);  
                  
                var props = properties || {};  
                var len = queue.length;  
                for( var i = 0; i < len; i++ ) {  
                    var listenerDescriptor = queue[i];  
              
                    if( typeof listenerDescriptor.listener == 'function' ) {  
                        if( typeof listenerDescriptor.context != "undefined" ) {
                            listenerDescriptor.listener.call( listenerDescriptor.context, props );
                        } else {
                            listenerDescriptor.listener.call( this, event, props );  
                        }
                    }  
                }  
            } 
              
            /** 
             *  添加一个监听器去监听接收事件通知 
             * @param {String} type 
             *      添加的事件类型 
             * @param {Function} listener 
             *      添加事件监听器方法 
             * @param {Object} context 
             *      添加事件监听方法的附加内容 
             */   
            , addEventListener: function( type, listener, context ) {  
                if( typeof type == "undefined" )
                    return;  
              
                if( typeof listener == "undefined" )
                    return;  
                      
                var newListener = new BaseView.ListenerDescriptor( listener, context );  
              
                var queue;  
                if( typeof this.listenerMap[ BaseView.QUEUE_PATTERN + type ] == "undefined" )  
                    queue = this.listenerMap[ BaseView.QUEUE_PATTERN + type ] = [];  
                else  
                    queue = this.listenerMap[ BaseView.QUEUE_PATTERN + type ];  
              
                var len = queue.length;  
                for( var i = 0; i < len; i++ ) {  
                    var listenerDescriptor = queue[i];  
                    if( listenerDescriptor.equals( newListener ) )  
                        return;  
                }  
              
                queue.push( newListener );  
            } 
              
            /** 
             * 删除一个事件监听器以便监听器停止接受notification事件 
             * @param {String} type 
             *      删除的事件类型 
             * @param {Function} listener 
             *      删除的事件监听器方法 
             * @param {Object} context 
             *      删除事件监听方法的附加内容 
             */  
            , removeEventListener: function( type, listener, context ) {
                if( typeof type == "undefined" )  
                    return;  
              
                if( typeof listener == "undefined" )  
                    return;  
              
                if( typeof this.listenerMap[BaseView.QUEUE_PATTERN + type] == "undefined" )  
                    return;  
                      
                var queue = this.listenerMap[ BaseView.QUEUE_PATTERN + type ];  
                var len = queue.length;  
                for( var i = 0; i < len; i++ ) {  
                    var listenerDescriptor = queue[i];  
                    if( listenerDescriptor.equals( new BaseView.ListenerDescriptor( listener, context ) ) ) {  
                        queue.splice(i,1);  
                        return;  
                    }  
                }
            }

            , stage: function() {
                if( this.canvas ) {
                    return this.canvas.stage;
                }
            }

            , coordinate: function() {
                if( this.canvas ) {
                    return this.canvas.coordinate;
                }
            }

            , getDisplayObj: function() {
                return this.displayObj;
            }
        }
    );  
          
    /** 
     * @class 
     * @private 
     * Event对象由BaseView类派发到它的事件监听器 
     */  
    BaseView.Event = Objs(
        "demo.view.components.BaseView.Event"
        , {  
            /** 
             * 事件类型 
             * @type {String} 
             */  
            type: null,  
              
            /** 
             * 随着dispatche event一起发送的属性 
             * @type {Object}    
             */  
            properties: null  
        }
    );  
      
    /** 
     * @private 
     * 使用BaseView.listenerMap描述符对象鉴定各个事件监听器 
     * 这是Javascript的内部类 
     */  
    BaseView.ListenerDescriptor = Objs(
        "demo.view.components.BaseView.Event"
        , {  
            /** 
             * @construct 
             * 初始化实例 
             * @param {Function} listener 
             *      被调用的方法 
             * @param {Function} listener 
             *      被调用方法的内容 
             */   
            initialize: function( listener, context ) {  
                this.listener = listener;  
                this.context = context;  
            }  
          
            /** 
             * @private 
             * 对比两BaseView.ListenerDescriptor 以确定与目标相同的事件监听器。 
             * 
             * @param {BaseView.ListenerDescriptor} compared 
             *      descriptor将与当前的内容做对比 
             * @return {Boolean} 
             *      两个对比监听的的boolean值 
             */  
            , equals: function( compared ) {  
                if( compared.listener == this.listener ) {  
                    if( typeof compared.context != "undefined" ) {  
                        if( compared.context == null && this.context == null )  
                            return true;  
          
                        if( compared.context == this.context )  
                            return true;  
                    }  
                }  
                return false;  
            }

        }
    );
      
    //一个字符前缀，用于防止项目名冲突  
    BaseView.QUEUE_PATTERN = '@_@';  
    
    return BaseView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);