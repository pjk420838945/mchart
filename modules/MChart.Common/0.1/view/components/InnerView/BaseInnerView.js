;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var INNER_BG_NAME = 'innerBg'
		, DEFAULT_FRICTION = .15//摩擦力
		, DEFAULT_ANIMATE_TIME = 300
		, DEFAULT_PRESS_REMOTEX = 30;
	
	var moseDownPoint
		, dragPointList;

	var BaseInnerView = Objs(
		"Common.view.components.BaseInnerView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseInnerView.$super.initialize.call( this );

		        var _p = this;

		        this.canvas = _canvas;

		        moseDownPoint = null;
		        dragPointList = [];

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );

		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_DRAG, function( evt, data ) {
		    		this.drag( _p, data );
		    	} );

		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_MOUSEDOWN, function( evt, data ) {
		    		this.mouseDown( _p, data );
		    	} );

		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_SLIDE, function( evt, data ) {
		    		this.slide( _p, data );
		    	} );

		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_BACK, function( evt, data ) {
		    		this.changeDragDir( _p );
		    	} );
		    }

		    , update: function( e, _data ) {

		    	var _innerView = new createjs.Container()
		    		, _viewMask = this.getMask();

                _innerView.addChild( new createjs.Shape() )
                	.set( { name: INNER_BG_NAME, x: 0, y: 0, alpha: 0.01 } )
                	.graphics.beginFill( '#fff' );

                _innerView.mask = _viewMask;

                this.canvas.innerView = this.displayObj = _innerView;

                this.stage().addChild( _innerView.set( { 'name': 'innerView' } ) );
		    }

		    , draw: function() {

		    	var _c = this.coordinate()
		    		, _xAxis = this.canvas.data.xAxis
		    		, _displayObj = this.getDisplayObj()
		    		, _innerView = this.canvas.innerView
		    		, _innerBg = _innerView.getChildByName( INNER_BG_NAME )
		    		, _viewMask = _innerView.mask
		    		, _viewData = _c.innerView;

		    	if( _viewData ) {

	                _innerView.set( {
	                	x: _viewData.x
	                	, y: _viewData.y
	                	, width: _viewData.scrollWidth
	                	, height: _viewData.height
	                } );

	                _innerBg.graphics.drawRect( 
		                0
		                , 0
		                , _innerView.width
		                , _innerView.height
		            );

					_viewMask.set( {
						x: _innerView.x
						, y: _innerView.y
						, width: _viewData.width
						, height: _viewData.height
					} ).graphics.drawRect( 
		                0
		                , 0
		                , _viewData.width
		                , _viewData.height
		            );
	            }
		    }

		    , getDevicePixelRatio: function() {
		    	if( typeof this.devicePixelRatio == 'undefined' ) {
		    		this.devicePixelRatio = this.canvas.devicePixelRatio;
		    	}
		    	return this.devicePixelRatio;
		    }

		    , getMask: function() {
		    	if( !this.viewMask ) {
		    		this.viewMask = new createjs.Shape().set( { x: 0, y: 0 } );
		    	}
		    	return this.viewMask;
		    }

		    , mouseDown: function( view, data ) {
		    	if( !data ) {
		    		return;
		    	}

		    	createjs.Tween.removeTweens( view.getDisplayObj() );
		    }

		    , drag: function( view, data ) {

		    	if( !data ) {
		    		return;
		    	}

		    	var _innerView = view.getDisplayObj()
		    		, _innerViewX = _innerView.x
		    		, _mask = _innerView.mask
		    		, _maskX = _mask.x
		    		, _isMoveLeft = data.xpath < 0;

	    		if( _innerViewX >= _maskX + DEFAULT_PRESS_REMOTEX && !_isMoveLeft ) {
		    		_innerView.x = _maskX + DEFAULT_PRESS_REMOTEX;
		    		return;
		    	} else if ( ( _innerViewX + _innerView.width <= _maskX + _mask.width - DEFAULT_PRESS_REMOTEX ) && _isMoveLeft  ) {
		    		_innerView.x = _maskX + _mask.width - _innerView.width - DEFAULT_PRESS_REMOTEX;
		    		return;
		    	}

		    	_innerView.set( {
		    		x: _innerView.x + data.xpath
		    	} );
		    }

		    , slide: function( view, data ) {
		    	if( !data ) {
		    		return;
		    	}

		    	var _speedX = data.xspeed
		    		, _innerView = view.getDisplayObj()
		    		, _tweenObj = createjs.Tween.get( _innerView )
		    		, _mask = _innerView.mask
			    	, _maskX = _mask.x;

		    	_innerView.set( { count: _innerView.x } );

		    	createjs.Tween.get( _innerView ).to( 
		    		{ count: _innerView.x + _speedX / DEFAULT_FRICTION }
		    		, DEFAULT_ANIMATE_TIME
		    		, createjs.Ease.getPowOut( 2.5 ) 
		    	).addEventListener( 'change', function( _evt ) {

		    		if( _innerView.count >= _maskX ) {
		    			
		    			view.back( view, _maskX );
		    		} else if ( _innerView.count + _innerView.width <= _maskX + _mask.width ) {
		    			
		    			view.back( view, _maskX + _mask.width - _innerView.width );
		    		} else {
		    			_innerView.x = _innerView.count;
		    		}
		    	} );
		    }

		    , back: function( view, defaultX ) {

		    	createjs.Tween.get( view.getDisplayObj() ).to( 
    				{ x: defaultX }
    				, DEFAULT_ANIMATE_TIME
    				, createjs.Ease.bounceOut 
    			);
		    }

		    , changeDragDir: function( view ) {
		    	var _innerView = view.getDisplayObj()
		    		, _tweenObj = createjs.Tween.get( _innerView )
		    		, _mask = _innerView.mask
			    	, _maskX = _mask.x;

		    	if( _innerView.x >= _maskX ) {

		    		view.back( view, _maskX );
		    	}  else if ( _innerView.x + _innerView.width <= _maskX + _mask.width ) {
		    	
	    			view.back( view, _maskX + _mask.width - _innerView.width );
	    		}
		    }
    	}
    );
    return BaseInnerView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);