;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var GraphicView = Objs(
		"Base.view.components.GraphicView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        GraphicView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.drawControl );
		    }

		    , update: function( e, _data ) {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _innerView = _p.canvas.innerView
		    		, _displaySeriesIndexMap = _p.canvas.displaySeriesIndexMap
		    		, _tmpArray = []
		    		, _tmpColor
		    		, _tmpRect;

		    	if( _c.displaySeries ) {
		    		
		    		var _colors = _p.merge( MChart.DefaultOptions.colors, _data.colors || {} );

		    		this.setAnimationEnabled( _data );

		    		$.each( _c.displaySeries, function( _i, _seriesObj ) {
		    			
		    			_tmpArray[ _i ] = [];
		    			_tmpColor = _seriesObj.color || 
		    				_colors[ _displaySeriesIndexMap[ _i ] % _colors.length ];

		    			$.each( _seriesObj.data, function( _idx, _dataNum ) {
		    				_tmpRect = new createjs.Shape();

		    				_tmpRect.mouseEnabled = false;

		    				_tmpRect.data = parseFloat( _dataNum );

		    				_tmpRect.fillColor = _tmpColor;

		    				_innerView.addChild( _tmpRect );

		    				_tmpArray[ _i ].push( _tmpRect );
		    			} );
		    		} );

		    		this.displayObj = _tmpArray;
		    	}
		    }

		    , drawControl: function() {
		    	if( this.coordinate().rects ) {
		    		if( this.getAnimationEnabled() ) {
		    			this.animationDraw();
		    		} else {
		    			this.draw();
		    		}
		    	}
		    }

		    , animationDraw: function() {
		    	var _p = this
		    		, _c = this.coordinate();

		    	$.each( _c.rects, function( _i, _rectList ) {
		    		$.each( _rectList, function( _idx, _rect ) {
		    			var _tmpRect = _rect.ele;

		    			_tmpRect.count = 0;

		    			var _teenObj = createjs.Tween.get( _tmpRect );

		    			_tmpRect.set( { x: _rect.x , y: _rect.y } );

		    			var _tmpGraphic = _tmpRect.graphics;

		    			_teenObj.to( { count: _rect.height }, 1000, createjs.Ease.elasticOut ).addEventListener( 'change', function() {//quintIn
		    				_tmpGraphic.clear();

		    				if( _rect.data >= 0 ) {
		    					_tmpGraphic.beginFill( _tmpRect.fillColor ).drawRect(
			    					0
			    					, _rect.height - _tmpRect.count
			    					, _rect.width
			    					, _tmpRect.count
			    				);
		    				} else {
		    					_tmpGraphic.beginFill( _tmpRect.fillColor ).drawRect(
			    					0
			    					, 0
			    					, _rect.width
			    					, _tmpRect.count
			    				);
		    				}
		    			} );

		    		} );
		    	} );
		    }

		    , draw: function() {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _tmpRect;

		    	$.each( _c.rects, function( _i, _rectList ) {
		    		$.each( _rectList, function( _idx, _rect ) {
		    			_tmpRect = _rect.ele;

		    			_tmpRect.graphics.beginFill( _tmpRect.fillColor ).drawRect(
		    				_rect.x
		    				, _rect.y
		    				, _rect.width
		    				, _rect.height
		    			);
		    		} );
		    	} );
		    }

		    , setAnimationEnabled: function( data ) {
		    	this.animationEnabled = data.animation && data.animation.enabled;
		    }

		    , getAnimationEnabled: function() {
		    	return this.animationEnabled;
		    }
    	}
    );

	return GraphicView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);