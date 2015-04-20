;(function(define, _win) { 'use strict'; define( 'MChart.Common.View.BaseTipsView', [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var TIPS_BG_NAME = 'tipsBg'
		, TIPS_TITLE = 'tipsTitle'
		, DEFAULT_ANIMATE_TIME = 150;

	var BaseTipsView = Objs(
		"Common.view.components.BaseTipsView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {
		        //调用父类中的initialize函数 
		        BaseTipsView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		        this.addEventListener( MChart.NotificationNames.SHOW_TIPS, this.showTips );
		        this.addEventListener( MChart.NotificationNames.HIDE_TIPS, this.hideTips );
		    }

		    , update: function( e, _data ) {

		    	var _option = $.extend( true, MChart.DefaultOptions.tips, _data.tips || {} );

		    	if( !this.enbaledCheck( _option ) ) {
		    		return;
		    	}

		    	var _p = this
		    		, _tipsTitle
		    	 	, _tmpTips
		    	 	, _tmpDataText
                	, _tmpDataLabel
                	, _labelMaxWidth
                	, _labelWidthArray = []
		    	 	, _tipsView = new createjs.Container()
                	, _titleStyle = _option.title.style
                	, _bgStyle = _option.background.style
                	, _colos = _p.merge( MChart.DefaultOptions.colors, _data.colors || {} )
            		, _itemStyle = _option.item.style;

                _tipsView.visible = false;

	    		_tipsView.addChild( new createjs.Shape() )
                	.set( { name: TIPS_BG_NAME } ).style = _bgStyle;

                _tipsTitle = new createjs.Text( '', _titleStyle.font, _titleStyle.color );

                _tipsView.addChild( _tipsTitle )
                	.set( { name: TIPS_TITLE, x: _bgStyle.padding, y: _bgStyle.padding } );

                var _textHeight = new createjs.Text( '', _itemStyle.font, '#fff' ).getMeasuredHeight()
                	, _textRealY = ( _itemStyle.lineHeight - _textHeight ) / 2 + _textHeight
                	, _textRealX = _bgStyle.padding + _itemStyle.marginLeft
                	, _baseY = _bgStyle.padding + _tipsTitle.getMeasuredHeight() + _titleStyle.marginBottom;

                this.dataText = [];

                this.dataLabel = [];

            	$.each( _data.series, function( _idx, _item ) {

            		_tmpDataLabel = new createjs.Text( ( _item.name || '' ) + ':', _itemStyle.font, _colos[ _idx ] );
            		_tmpDataLabel.set( { x: 0, baseY: _baseY, realY: _textRealY } );
            		_tmpDataLabel.textAlign = 'right';
            		_tipsView.addChild( _tmpDataLabel );
            		_p.dataLabel.push( _tmpDataLabel );

            		_tmpDataText = new createjs.Text( '', _itemStyle.font, _colos[ _idx ] );
            		_tmpDataText.set( { x: 0, y: _tmpDataLabel.y } );
            		_tmpDataText.textAlign = 'right';
            		_tipsView.addChild( _tmpDataText );
            		_p.dataText.push( _tmpDataText );

            		_labelWidthArray.push( _tmpDataLabel.getMeasuredWidth() );
            	} );

            	_labelMaxWidth = Math.max.apply( null, _labelWidthArray );

            	$.each( _p.dataLabel, function( _idx, _label ) {
            		_label.set( { x: _textRealX + _labelMaxWidth } );

            		_p.dataText[ _idx ].set( { x: _label.x } );
            	} );

	    		this.displayObj = _tipsView;

	    		this.stage().addChild( _tipsView.set( { 'name': 'tipsView' } ) );

		    }

		    , draw: function() {
			    var _c = this.coordinate();
		    	
		    	if( _c.tips ) {
		    		
			    		var _innerViewData = _c.innerView
			    		, _tipsDisplayData = {
			    			minX: _innerViewData.x
			    			, minY: _innerViewData.y
			    			, maxX: _innerViewData.x + _innerViewData.width
			    			, maxY: _innerViewData.y + _innerViewData.height
			    			, maxWidth: _innerViewData.width * 0.3
			    			, middleX: _innerViewData.x + _innerViewData.width / 2
			    			, middleY: _innerViewData.y + _innerViewData.height / 2
			    		};

		    		this.tipsDisplayData = _tipsDisplayData;
		    	}
		    }

		    , enbaledCheck: function( _option ) {
		    	return _option.enabled;
		    }

		    , showTips: function( _evt, _data ) {

		    	var _p = this
		    		, _tipsView = this.getDisplayObj()
		    		, _viewTweenObj = createjs.Tween.get( _tipsView );

		    	if( _tipsView.isVisible() ) {
	    			_viewTweenObj.to( { alpha: 0 }, DEFAULT_ANIMATE_TIME ).call( function(){
	    				_p.updateTips( _evt, _data );
	    			} );
	    		} else {
	    			_p.updateTips( _evt, _data );
	    		}
		    }

		    , updateTips: function( _evt, _data ) {

		    	var _p = this
		    		, _displaySeries = this.canvas.displaySeries
		    		, _displaySeriesIndexMap = this.canvas.displaySeriesIndexMap
		    		, _index = _data.index
		    		, _tmpText
		    		, _tmpArray
		    		, _displayIndex
		    		, _textMaxWidth
		    		, _dataText = this.dataText
		    		, _displayTextArray
		    		, _lastDataText
		    		, _tipsView = this.getDisplayObj()
		    		, _tipsViewWidth
		    		, _tipsViewHeight
		    		, _tipsViewBg = _tipsView.getChildByName( TIPS_BG_NAME )
		    		, _tipsViewBgStyle = _tipsViewBg.style
		    		, tmpCount

		    		, tipsMargin = 10;

		    	if( !_displaySeries || _displaySeries.length == 0 ) {
		    		return;
		    	}

		    	_tipsView.getChildByName( TIPS_TITLE ).text 
		    		= this.canvas.data.xAxis.categories[ _index ];

		    	_tmpArray = [];
		    	_displayTextArray = [];
		    	$.each( _displaySeries, function( _idx, _dataList ) {

		    		_displayIndex = _displaySeriesIndexMap[ _idx ];

		    		_tmpText = _dataText[ _displayIndex ];

		    		_tmpText.text = _dataList.data[ _index ] || 0

		    		_tmpText.displayIndex = _displayIndex

		    		_displayTextArray.push( _tmpText );

		    		_tmpArray.push( _tmpText.getMeasuredWidth() );
		    	} );

		    	tmpCount = 0;
		    	$.each( this.dataLabel, function( _idx, _text ) {
		    		if( _displaySeriesIndexMap.indexOf( _idx ) < 0 ) {
		    			_text.visible = false;
		    		} else {
		    			_text.set( {
		    				y: _text.baseY + tmpCount * _text.realY
		    				, visible: true
		    			} );
		    			tmpCount++;
		    		}
		    	} );

		    	_textMaxWidth = Math.max.apply( null, _tmpArray );
		    	$.each( _displayTextArray, function( _idx, _text ) {
		    		_text.set( { 
		    			x: _p.dataLabel[ _text.displayIndex ].x + _textMaxWidth + 10
		    			, y: _p.dataLabel[ _text.displayIndex ].y
		    		} );
		    	} );

		    	_lastDataText = _displayTextArray[ _displayTextArray.length - 1 ];

		    	_tipsViewWidth = _lastDataText.x + _tipsViewBgStyle.padding;
		    	_tipsViewHeight = _lastDataText.y + _lastDataText.getMeasuredHeight() + _tipsViewBgStyle.padding

		    	_tipsViewBg.graphics.clear()
		    		.beginFill( _tipsViewBgStyle.color ).drawRoundRect( 
		    			0
		    			, 0
		    			, _tipsViewWidth
		    			, _tipsViewHeight
		    			, _tipsViewBg.style.radius
		    	).setStrokeStyle( .75 ).beginStroke( '#999' ).drawRoundRect(
    				0
    				, 0
    				, _tipsViewWidth
    				, _tipsViewHeight
    				, _tipsViewBg.style.radius
    			);

	    		if( _data.clickPoint.x / _p.canvas.devicePixelRatio > this.tipsDisplayData.middleX ) {
	    			_tipsView.set( { 
	    				x: this.tipsDisplayData.minX + tipsMargin
	    				, y: this.tipsDisplayData.minY + tipsMargin
	    			} );
	    		} else {
	    			_tipsView.set( { 
	    				x: this.tipsDisplayData.maxX - _tipsViewWidth - tipsMargin
	    				, y: this.tipsDisplayData.minY + tipsMargin
	    			} );
	    		}
	    		
	    		_tipsView.visible = true;
	    		_tipsView.set( { alpha: 0 } );
		    	createjs.Tween.get( _tipsView ).to( { alpha: 1 }, DEFAULT_ANIMATE_TIME );
		    }

		    , hideTips: function( _data ) {
		    	//do hide
		    	var _tipsView = this.getDisplayObj()
		    		, _viewTweenObj = createjs.Tween.get( _tipsView );


		    	_viewTweenObj.to( { alpha: 0 }, DEFAULT_ANIMATE_TIME ).call( function() {
		    		_tipsView.visible = false;
		    	} );
		    }
    	}
    );

	return BaseTipsView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);