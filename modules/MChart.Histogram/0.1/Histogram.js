;(function(define, _win) { 'use strict'; define( [
    'MChart.Base'
    , 'MChart.Histogram.MainFacad'
], function( Base, MainFacad ) {

    var Histogram = $.extend( Base, {
        
        initChart: function() {

            this.initClassName = 'mchart-histogram';

            this.init();

            this.initCanvasEvent();

            /* 获取facade实例并进行初始化 */
            this.facade = MainFacad.getInstance();

            this.facade.initChart( {
                selector: this.canvas() /* 传入canvas对象进行图表初始化 */
                , nickName: MChart.NickNames.HISTOGRAM /* view会根据传入的图表别名进行区别初始化，图表应该保证别名的唯一性 */
            } );
        }

        , initCanvasEvent: function() {

            var _p = this
                , _isPointerType
                , _moseDownPoint = null
                , _swipeUpOrDown = null
                , _canvas = this.canvas()
                , dragPointList= [];

            _canvas.on( 'touchstart MSPointerDown pointerdown', function( _evt ) {

                if( ( _isPointerType = _p.isPointerEventType( _evt, 'down' ) ) &&
                  !isPrimaryTouch( _evt ) ) return
                var _touch = _isPointerType ? _evt : _evt.touches[ 0 ];

                _moseDownPoint = {
                    x: _touch.pageX
                    , y: _touch.pageY
                }

                _p.facade.sendNotification( 
                    MChart.NotificationNames.INNER_VIEW_MOUSEDOWN
                    , {
                        evt: _evt
                    }
                );
            } );

            /*
            * 说明： 此处事件绑定在canvas上，没有被放大，计算为真实像素
            */
            _canvas.on( 'touchmove MSPointerMove pointermove', function( _evt ) {

                if( !_moseDownPoint ) {
                    return;
                }

                if( ( _isPointerType = _p.isPointerEventType( _evt, 'move' ) ) &&
                  !isPrimaryTouch( _evt ) ) return

                var _touch = _isPointerType ? _evt : _evt.touches[ 0 ]
                    , _beforeDir = true
                    , _slope;

                dragPointList.push( { x: _touch.pageX, y: _touch.pageY } );
                 if( dragPointList.length > 2 ) {
                     dragPointList.shift();
                 }

                 if( _swipeUpOrDown !== null ) {
                    _beforeDir = _swipeUpOrDown;
                 }

                //if( _swipeUpOrDown === null ) {

                _slope = Math.atan( ( _touch.pageY - _moseDownPoint.y ) /
                    ( _touch.pageX - _moseDownPoint.x ) ) / ( 2 * Math.PI / 360 );

                _swipeUpOrDown = _slope < -45 || _slope > 45;
                //}

                if( !_swipeUpOrDown ) {

                    _evt.preventDefault();

                    _p.facade.sendNotification( 
                        MChart.NotificationNames.INNER_VIEW_DRAG
                        , {
                            evt: _evt 
                            , xpath: _touch.pageX - _moseDownPoint.x
                        }
                    );

                    _moseDownPoint = {
                        x: _touch.pageX
                        , y: _touch.pageY
                    }
                } else {
                    if( _beforeDir !== _swipeUpOrDown ) {
                        _p.facade.sendNotification( 
                            MChart.NotificationNames.INNER_VIEW_BACK
                            , {
                                evt: _evt 
                            } 
                        );
                    }
                }
            } );

            _canvas.on( 'touchend MSPointerUp pointerup', function( _evt ) {

                if( ( _isPointerType = _p.isPointerEventType( _evt, 'up' ) ) &&
                    !isPrimaryTouch( _evt ) ) return

                if( dragPointList.length < 2 ) {
                    dragPointList = [];
                    return;
                }

                if( !_swipeUpOrDown ) {
                    _p.facade.sendNotification( 
                        MChart.NotificationNames.INNER_VIEW_SLIDE
                        , {
                            evt: _evt 
                            , xspeed: dragPointList[ 1 ].x - dragPointList[ 0 ].x
                        } 
                    );
                }

                _swipeUpOrDown = null;
                dragPointList = [];
            } );
        }

        , isPointerEventType: function( e, type ) {
            return (e.type == 'pointer'+type ||
            e.type.toLowerCase() == 'mspointer'+type)
        }

    }, true );

	Histogram.initChart();

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);