;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseHLabelView = Objs(
		"Common.view.components.BaseHLabelView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseHLabelView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _p = this
		    		, _c = this.coordinate()
	                , _tmpLabel
	                , _tmpArraw
	                , _labelArray = []
	                , _arrawArray = []
	                , _innerView = _p.canvas.innerView
	                , _tmpGraphics = new createjs.Graphics().setStrokeStyle( 1, 'round', 'round' ).beginStroke( '#999' );

                if( _data && _data.xAxis && _data.xAxis.categories ) {

	                var _style = $.extend( ( _data.xAxis.labels ? _data.xAxis.labels.style || {} : {} ), MChart.DefaultOptions.xAxis.labels.style, true );

	                $.each( _data.xAxis.categories, function( _idx, _text ) {
	                	_tmpLabel = new createjs.Text( 
		                    _text
		                    , _style.font
		                    , _style.color
		                );

		                _tmpLabel.mouseEnabled = false;

		                _tmpLabel.textAlign = 'center';

	                	_labelArray.push( _tmpLabel );
	                	_innerView.addChild( _tmpLabel );

	                	_tmpArraw = new createjs.Shape( _tmpGraphics.clone() );

		                _arrawArray.push( _tmpArraw );
		                _innerView.addChild( _tmpArraw );
	                } );

	                this.displayObj = _labelArray;
	                this.arrawArray = _arrawArray;
	            }
		    }

		    , draw: function() {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _label
		    		, _arraw
		    		, _arrawData;

		    	if( _c.hlabels && _c.hlabels.length ) {

		    		$.each( _c.hlabels, function( _idx, _labelData ) {
		    			_label = _labelData.ele;
		    			_label.x = _labelData.x;
		    			_label.y = _labelData.y;

		    			if( _labelData.arraw ) {
			    			_arrawData = _labelData.arraw;
			    			_arraw = _arrawData.ele;
			    			_arraw.graphics.moveTo( _arrawData.start.x, _arrawData.start.y )
			    						   .lineTo( _arrawData.end.x, _arrawData.end.y );
		    			}
		    		} );
		    		
		    	}
		    }

		    , labelMaxWidth: function() {
		    	
		    	var _maxWidth = 0
		    		, _labels = this.getDisplayObj()
		    		, _width;

		    	if( _labels ) {
		    		$.each( _labels, function( _idx, _label ) {
		    			_width = _label.getMeasuredWidth();
		    			if( _width > _maxWidth ) {
		    				_maxWidth = _width;
		    			}
		    		} );
		    	}

		    	return _maxWidth;
		    }

		    , labelMaxHeight: function() {
		    	var _maxHeight = 0
		    		, _labels = this.getDisplayObj()
		    		, _height;

		    	if( _labels ) {
		    		$.each( _labels, function( _idx, _label ) {
		    			_height = _label.getMeasuredHeight();
		    			if( _height > _maxHeight ) {
		    				_maxHeight = _height;
		    			}
		    		} );
		    	}

		    	return _maxHeight;
		    }

		    , getArraws: function() {
		    	return this.arrawArray;
		    }
    	}
    );

	return BaseHLabelView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);