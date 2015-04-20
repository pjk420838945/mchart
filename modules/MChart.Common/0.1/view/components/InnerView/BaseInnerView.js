;(function(define, _win) { 'use strict'; define( 'MChart.Common.View.BaseInnerView', [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var INNER_BG_NAME = 'innerBg'
		, INNER_VIEW_NAME = 'innerView'
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

		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_DRAG, this.drag );
		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_MOUSEDOWN, this.mouseDown );
		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_SLIDE, this.slide );
		    	this.addEventListener( MChart.NotificationNames.INNER_VIEW_BACK, this.changeDragDir );
		    }

		    , update: function( _evt, _data ) {

		    	var _innerView = new createjs.Container()
		    		, _viewMask = this.getMask();

                _innerView.addChild( new createjs.Shape() )
                	.set( { name: INNER_BG_NAME, x: 0, y: 0, alpha: 0.01 } )
                	.graphics.beginFill( '#fff' );

                _innerView.mask = _viewMask;

                this.canvas.innerView = this.displayObj = _innerView;

                this.stage().addChild( _innerView.set( { 'name': INNER_VIEW_NAME } ) );
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

		    , mouseDown: function( _evt ) {
		    	createjs.Tween.removeTweens( this.getDisplayObj() );
		    }

		    , drag: function( _evt, _data ) {

		    	if( !_data ) {
		    		return;
		    	}

		    	var _innerView = this.getDisplayObj()
		    		, _innerViewX = _innerView.x
		    		, _mask = _innerView.mask
		    		, _maskX = _mask.x
		    		, _isMoveLeft = _data.xpath < 0;

	    		if( _innerViewX >= _maskX + DEFAULT_PRESS_REMOTEX && !_isMoveLeft ) {
		    		_innerView.x = _maskX + DEFAULT_PRESS_REMOTEX;
		    		return;
		    	} else if ( ( _innerViewX + _innerView.width <= _maskX + _mask.width - DEFAULT_PRESS_REMOTEX ) && _isMoveLeft  ) {
		    		_innerView.x = _maskX + _mask.width - _innerView.width - DEFAULT_PRESS_REMOTEX;
		    		return;
		    	}

		    	_innerView.set( {
		    		x: _innerView.x + _data.xpath
		    	} );
		    }

		    , slide: function( _evt, _data ) {
		    	if( !_data ) {
		    		return;
		    	}

		    	var _p = this
		    		, _speedX = _data.xspeed
		    		, _innerView = this.getDisplayObj()
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
		    			
		    			_p.back( _maskX );
		    		} else if ( _innerView.count + _innerView.width <= _maskX + _mask.width ) {
		    			
		    			_p.back( _maskX + _mask.width - _innerView.width );
		    		} else {
		    			_innerView.x = _innerView.count;
		    		}
		    	} );
		    }

		    , back: function( defaultX ) {

		    	createjs.Tween.get( this.getDisplayObj() ).to( 
    				{ x: defaultX }
    				, DEFAULT_ANIMATE_TIME
    				, createjs.Ease.bounceOut 
    			);
		    }

		    , changeDragDir: function( _evt ) {
		    	var _innerView = this.getDisplayObj()
		    		, _tweenObj = createjs.Tween.get( _innerView )
		    		, _mask = _innerView.mask
			    	, _maskX = _mask.x;

		    	if( _innerView.x >= _maskX ) {

		    		this.back( _maskX );
		    	}  else if ( _innerView.x + _innerView.width <= _maskX + _mask.width ) {
		    	
	    			this.back( _maskX + _mask.width - _innerView.width );
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