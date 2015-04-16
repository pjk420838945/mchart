;(function(define, _win) { 'use strict'; define( [ 
    'MChart.View.BaseView'
], function( BaseView ) {

    var DEFAULT_TAP_TIME = 500
        , DEFAULT_TAP_RANGE = 20
        , DEFAULT_ANIMATE_TIME = 150;

    var moseDownPoint
        , nowSelectedIdx;

    var BaseGroupView = Objs(
        "Common.view.components.BaseGroupView"
        , BaseView
        , {
            /** 
             * @construct 
             * @override 
             * 初始化UserForm实例. 
             */  
            initialize: function( _canvas ) {
                //调用父类中的initialize函数  
                BaseGroupView.$super.initialize.call( this );

                this.canvas = _canvas;

                nowSelectedIdx = null;
                moseDownPoint = null;

                this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
                this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
            }

            , update: function( e, _data ) {

                var _groupBgArray = []
                    , _bg = _data.group.background
                    , _innerView = this.canvas.innerView
                    , _isLoop = _data.group.isLoop
                    , _nowBgData
                    , _tmpBgData
                    , _nowBgStart
                    , _nowBgIndex
                    , _tmpGroup;

                if( _bg && _bg.length > 0 ) {
                    _nowBgIndex = 0;
                    _nowBgData = _bg[ _nowBgIndex ];
                    _nowBgStart = _nowBgData.startIndex ? _nowBgData.startIndex : 0;
                }

                for( var _idx = 0; _idx < _data.xAxis.categories.length; _idx++ ) {

                    if( _nowBgData ) {
                        if( _idx >= _nowBgStart && _idx < _nowBgStart + ( _nowBgData.num ? _nowBgData.num : 1 ) ) {
                            _tmpBgData = _nowBgData;
                        } else {
                            if( _isLoop ) {
                                _nowBgData = _bg[ _idx % _bg.length ];
                            } else {
                                _nowBgData = _bg[ ++_nowBgIndex ];
                            }
                            
                            if( _nowBgData ) {
                                _nowBgStart = _nowBgData.startIndex ? _tmpBgData.startIndex : _idx;
                                _nowBgStart == _idx && ( _tmpBgData = _nowBgData );
                            } 
                        }
                    } else {
                        _tmpBgData = _nowBgData;//default
                    }

                    _tmpGroup = new createjs.Shape();

                    if( _tmpBgData && _tmpBgData.color ) {
                        _tmpGroup.graphics.beginFill( _tmpBgData.color );
                        _tmpGroup.oriColor = _tmpBgData.color;
                    }

                    _tmpGroup.index = _idx;

                    _innerView.addChild( _tmpGroup );

                    _groupBgArray.push( _tmpGroup );

                    _tmpGroup.addEventListener( 'mousedown', this.mouseDown );

                    //on: type, listener, scope, once, data, useCapture
                    _tmpGroup.on( 
                        'pressup'
                        , this.pressUp
                        , null
                        , false
                        , { 
                            view: this
                            , target: _tmpGroup
                            , index: _idx
                        } 
                    );
                }

                this.displayObj = _groupBgArray;

                if( _data.group.selectedStyle ) {
                    var _selectedBg = new createjs.Shape();
                    _selectedBg.graphics.beginFill( _data.group.selectedStyle.color );
                    _selectedBg.alpha = 0;
                    _selectedBg.mouseEnabled = false;

                    _innerView.addChild( _selectedBg );
                    this.selectedBg = _selectedBg;
                }

            }

            , draw: function() {

                var _c = this.coordinate()
                , _selectedBg
                , _tmpGroup;

                if( _c.group ) {
                    $.each( _c.group, function( _idx, _group ) {
                        _tmpGroup = _group.ele;

                        _tmpGroup.graphics.drawRect(
                            _group.x
                            , _group.y
                            , _group.width
                            , _group.height
                        );
                    } );

                    _selectedBg = this.getSelectedBg();

                    if( _selectedBg ) {
                        _selectedBg.graphics.drawRect( 
                            0
                            , 0
                            , _c.group[ 0 ].width
                            , _c.group[ 0 ].height 
                        );
                    }
                }
            }

            , selectGroupByIndex: function( _idx, _clickPoint ) {

                var _groups = this.getDisplayObj()
                    , _clickGroup = _groups[ _idx ]
                    , _nowGroup = _groups[ nowSelectedIdx ]
                    , _selectedBg = this.getSelectedBg()
                    , _selectedTweenObj = createjs.Tween.get( _selectedBg );

                if( !_selectedBg ) {
                    nowSelectedIdx = _idx;
                    return;
                }

                if( nowSelectedIdx != null && nowSelectedIdx == _idx ) {
                    _selectedTweenObj.to( { alpha: 0 }, DEFAULT_ANIMATE_TIME );
                    nowSelectedIdx = null;

                    this.dispatchEvent( MChart.NotificationNames.HIDE_TIPS );
                } else {
                    if( nowSelectedIdx != null ) {
                        _selectedTweenObj.to( { alpha: 0 }, DEFAULT_ANIMATE_TIME ).call( function() {
                            _selectedBg.set( { x: _clickGroup.graphics.command.x } );
                        } ).to( { alpha: 1 }, 250 );
                    } else {
                        _selectedBg.set( { x: _clickGroup.graphics.command.x } );
                        _selectedTweenObj.to( { alpha: 1 }, DEFAULT_ANIMATE_TIME );
                    }
                    
                    nowSelectedIdx = _idx;

                    this.dispatchEvent( MChart.NotificationNames.SHOW_TIPS, { index: _idx, clickPoint: _clickPoint } );
                }
            }

            , getSelectedBg: function() {
                return this.selectedBg;
            }

            , mouseDown: function( evt ) {
                moseDownPoint = {
                    x: evt.stageX
                    , y: evt.stageY
                    , ele: evt.target
                    , time: new Date().getTime()
                };
            }

            , pressUp: function( evt, data ) {

                var _p = data.view
                    , _index = data.index;

                if( !moseDownPoint ) {
                    return;
                }

                var _deltaX = Math.abs( moseDownPoint.x - evt.stageX )
                    , _deltaY = Math.abs( moseDownPoint.y - evt.stageY );

                if( new Date().getTime() - moseDownPoint.time <= DEFAULT_TAP_TIME 
                    && _deltaX <= DEFAULT_TAP_RANGE && _deltaY <= DEFAULT_TAP_RANGE ) {

                    //change background
                    _p.selectGroupByIndex( 
                        _index
                        , {
                            x: evt.stageX
                            , y: evt.stageY
                        } 
                    );

                }
            }
        }
    );

    return BaseGroupView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);