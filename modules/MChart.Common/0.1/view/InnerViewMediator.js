;(function(define, _win) { 'use strict'; define( 'MChart.Common.View.InnerViewMediator', [
    'MChart.Common.View.BaseInnerView'
], function( BaseInnerView ) {

    /*
     * 注意： 此处一定保持Mediator别名的唯一性 facade会按照别名区分注册的Mediator，别名相同会直接覆盖之前注册的Mediator
     */
    var MEDIATOR_NAME = 'innerViewMediator';

    var InnerViewMediator = Objs(
        "Common.View.Mediator.InnerViewMediator"
        , puremvc.Mediator
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
                        _viewComponent = new BaseInnerView( _canvas );
                        break;
                    }
                }
                
                InnerViewMediator.$super.constructor.call( this, MEDIATOR_NAME, _viewComponent );

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
                    , MChart.NotificationNames.INNER_VIEW_BACK
                    , MChart.NotificationNames.INNER_VIEW_MOUSEDOWN
                    , MChart.NotificationNames.INNER_VIEW_SLIDE
                    , MChart.NotificationNames.INNER_VIEW_DRAG
                ];
            }
            
            /** 
             * 在这里处理使用 this.facade.sendNotification( notice, data)；发出来的事件 
             * @override 
             */  
            , handleNotification: function( e ) {

                var _body = e.getBody()
                    , _view = this.getComponent();

                switch ( e.getName() ) {
                    case MChart.NotificationNames.SHOW_CHART: {
                        /* 触发绘制事件 */
                        _view.dispatchEvent( MChart.NotificationNames.SHOW_CHART );
                        break;
                    }
                    case MChart.NotificationNames.INNER_VIEW_DRAG: {
                        _view.dispatchEvent( MChart.NotificationNames.INNER_VIEW_DRAG, _body );
                        break;
                    }
                    case MChart.NotificationNames.INNER_VIEW_MOUSEDOWN: {
                        _view.dispatchEvent( MChart.NotificationNames.INNER_VIEW_MOUSEDOWN, _body );
                        break;
                    }
                    case MChart.NotificationNames.INNER_VIEW_SLIDE: {
                        _view.dispatchEvent( MChart.NotificationNames.INNER_VIEW_SLIDE, _body );
                        break;
                    }
                    case MChart.NotificationNames.INNER_VIEW_BACK: {
                        _view.dispatchEvent( MChart.NotificationNames.INNER_VIEW_BACK, _body );
                        break;
                    }
                }
            }

            , initEvent: function() {}
            
            , getComponent : function() {  
                return this.viewComponent;  
            }

            , getData: function() {
                if( this.canvas ){
                    return this.canvas.data;
                }
            }
        }
    );

    return InnerViewMediator;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);