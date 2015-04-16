;(function(define, _win) { 'use strict'; define( [ 
], function(){

    var GraphicMediator = Objs(
        "Curvegram.View.GraphicMediator"
        , Mediator
        , {
            /** 
             * @construct 
             * @override 
             * 初始化UserFormMediator实例 
             * @param {String} name 
             *         Mediator的名称 
             * @param {UserForm} viewComponent 
             *         Mediator所管理的UserForm视图组件 
             */  
            initialize: function( name, viewComponent ) {  
                UserFormMediator.$super.initialize.call( this, name, viewComponent );
              
                var userForm = this.getUserForm();
                //注册监听事件userForm.ADD，当触发时会调用onAdd方法，即监听submit按钮是否按下
                userForm.addEventListener( UserForm.ADD, this.onAdd, this );
                  
                var user = new UserVO();
                user.firstName='pat';
                user.lastName='chen';
                  
                userForm.setUser(user);
            }
          
            /** 
             * @private 
             * 当用户按submit时调用 
             * @param {UiComponent.Event} event 
             *         The dispatched event object. 
             */  
            , onAdd: function( event ) {  
                var user = this.getUserForm().getUser();
                //使用PureMVC发送notification消息
                //在这里你需要在上次如何使用javascript的PureMVC框架 - Command/controller层提到的NotificationNames.js文件里添加
                //NotificationNames.USER_LISTS_ADD_ITEM = "user_lists_add_item";内容
                this.sendNotification( NotificationNames.USER_LISTS_ADD_ITEM, user );
                var userForm = this.getUserForm();
                userForm.clearForm();
                userForm.setEnabled(true);
            }  
              
            /** 
             * @override 
             * 注册时被调用 
             */  
            , onRegister: function() {}
              
            /** 
             * @override 
             * 当本Mediator被移除是被调用 
             */  
            , onRemove: function() {}
            /** 
             * 把要监听的事件添加到这个数组里去， 
             * 当this.facade.sendNotification( notice, data)；时，就会调用handleNotification();方法 
             * @override 
             */  
            , listNotificationInterests: function() {
                return [  
                ];
            }
              
            /** 
             * 在这里处理使用 this.facade.sendNotification( notice, data)；发出来的事件 
             * @override 
             */  
            , handleNotification: function( e ) {  
                
                var data = e.getBody();

                switch ( e.getName() ) {  
                      
                }
            }
        }
    );

    return GraphicMediator;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);