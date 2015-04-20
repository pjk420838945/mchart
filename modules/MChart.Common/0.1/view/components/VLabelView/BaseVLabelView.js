;(function(define, _win) { 'use strict'; define( 'MChart.Common.View.BaseVLabelView', [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseVLabelView = Objs(
		"Common.view.components.BaseVLabelView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseVLabelView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _option = $.extend( true, MChart.DefaultOptions.yAxis, _data.yAxis || {} );

		    	if( !this.enbaledCheck( _option ) ) {
		    		return;
		    	}

                var _p = this
                	, _tmpLabel
                	, _tmpArraw
                	, _labelArray = []
                	, _arrawArray = []

                	, _labelStyle = _option.labels.style
                	, _lineStyle = _option.line.style
                	, _rateInfo = this.coordinate().rateInfo
                	, _tmpGraphics = new createjs.Graphics()
                		.setStrokeStyle( _lineStyle.lineWidth, 'round', 'round' )
                		.beginStroke( _lineStyle.color );

                _rateInfo.realRate && 
                	$.each( _rateInfo.realRate, function( _idx, _rateText ) {

                	_tmpLabel = new createjs.Text( 
	                    _rateText
	                    , _labelStyle.font
	                    , _labelStyle.color
	                );

	                _tmpLabel.mouseEnabled = false;

	                _tmpLabel.textAlign = _labelStyle.align;

                	_labelArray.push( _tmpLabel );
	                _p.stage().addChild( _tmpLabel );

	                _tmpArraw = new createjs.Shape( _tmpGraphics.clone() );

	                _arrawArray.push( _tmpArraw );
	                _p.stage().addChild( _tmpArraw );

                } );

                this.displayObj = _labelArray;
                this.arrawArray = _arrawArray;
		    }

		    , draw: function() {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _label
		    		, _arraw
		    		, _arrawData;

		    	if( _c.vlabels && _c.vlabels.length ) {

		    		$.each( _c.vlabels, function( _idx, _labelData ) {
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

		    , enbaledCheck: function( _option ) {
		    	return _option.enabled ? _option.labels.enabled : false;
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

		    , getArraws: function() {
		    	return this.arrawArray;
		    }
    	}
    );

	return BaseVLabelView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);