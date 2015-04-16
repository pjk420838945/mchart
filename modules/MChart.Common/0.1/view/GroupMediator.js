;(function(define, _win) { 'use strict'; define( [
    'MChart.Common.View.BaseGroupView'
], function( BaseGroupView ) {

    /*
     * 注意： 此处一定保持Mediator别名的唯一性 facade会按照别名区分注册的Mediator，别名相同会直接覆盖之前注册的Mediator
     */
    var MEDIATOR_NAME = 'groupMediator';

    var BaseGroupMediator = Objs(
        "Common.View.Mediator.GroupMediator"
        , Mediator
        , {
            /** 
             * @construct 
             * @override 
             * 初始化Mediator实例 
             * @param {String} _nickName 
             *         图表别名
             * @param {Object} _canvas 
             *         Canvas对象的引用
             */ 
            initialize: function( _nickName, _canvas ) {

                var _viewComponent;

                this.canvas = _canvas;

                switch( _nickName ) {
                    
                    default: {
                        _viewComponent = new BaseGroupView( _canvas );
                        break;
                    }
                }

                BaseGroupMediator.$super.initialize.call( this, MEDIATOR_NAME, _viewComponent );

                this.initEvent();
            }

            /** 
             * @override 
             * 注册时被调用 
             */  
            , onRegister: function() {
                this.getComponent().dispatchEvent( MChart.NotificationNames.UPDATE_VIEW, this.getData() );
            }
            
            /** 
             * @override 
             * 当本Mediator被移除是被调用 
             */  
            , onRemove: function() {}

            /** 
             * 把要监听的事件添加到这个数组里去， 
             * 当sendNotification( notice, data)；时，就会调用handleNotification();方法 
             * @override 
             */  
            , listNotificationInterests: function() {
                return [
                    MChart.NotificationNames.SHOW_CHART
                ];
            }
            
            /** 
             * 在这里处理使用 this.facade.sendNotification( notice, data)；发出来的事件 
             * @override 
             */  
            , handleNotification: function( e ) {

                var _body = e.getBody();

                switch ( e.getName() ) {
                    case MChart.NotificationNames.SHOW_CHART: {
                        /* 触发绘制事件 */
                        this.getComponent().dispatchEvent( MChart.NotificationNames.SHOW_CHART );
                        break;
                    }
                }
            }

            /** 
             * 为初始化的组件进行全局事件绑定 
             * @override 
             */  
            , initEvent: function() {
                var _p = this
                    , _viewComponent = this.getComponent();

                _viewComponent.addEventListener( MChart.NotificationNames.SHOW_TIPS, function( _evt, _data ) {
                    _p.sendNotification( MChart.NotificationNames.SHOW_TIPS, { data: _data } );
                } );

                _viewComponent.addEventListener( MChart.NotificationNames.HIDE_TIPS, function( _evt, _data ) {
                    _p.sendNotification( MChart.NotificationNames.HIDE_TIPS, { data: _data } );
                } );
            }
            
            , getComponent: function() {
                return this.viewComponent;
            }

            , getData: function() {
                if( this.canvas ){
                    return this.canvas.data;
                }
            }
        }
    );

    return BaseGroupMediator;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);