;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var moseDownPoint;

	var BaseBgView = Objs(
		"Common.view.components.BaseBgView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {
		        //调用父类中的initialize函数  
		        BaseBgView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        moseDownPoint = null;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _c = this.coordinate();

		    	var container = new createjs.Container();

		    	this.stage().addChild( container );

                container.addChild( new createjs.Shape() )
                	.set( { name: 'background' } )
                	.graphics.beginFill( '#eaebee' );

                this.displayObj = container;
		    }

		    , draw: function() {

		    	var _c = this.coordinate();

		    	this.getDisplayObj()
		    		.getChildByName( 'background' )
		    		.graphics
		    		.drawRect( 
		                _c.stage.x
		                , _c.stage.y
		                , _c.stage.width
		                , _c.stage.height
		            );
		    }
    	}
    );

	return BaseBgView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);