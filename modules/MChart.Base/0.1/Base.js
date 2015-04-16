;(function(define, _win) { 'use strict'; define( [ 
    , 'Json2'
    , 'JC.Common'
    , 'MChart.NotificationNames'
    , 'MChart.DefaultOptions'
], function(){

	var _jdoc = $( document ), _jwin = $( window );
	
	var Base = {

        init: function(){
            var _p = this;

			_p.initSelector();

            _p._initData();

            var _p = this
                , _isPointerType
                , _canvas = this.canvas();

            _canvas.data = this.data;
            _canvas.stage = this.stage;
            _canvas.devicePixelRatio = this.devicePixelRatio();
        }

        , initSelector: function() {
            this.selector = $( '.' + this.initClassName );

            if( this.selector && this.selector.length > 0 ) {
                this.initStage( this.selector );
            }

        }

        , initStage: function( _selector ) {

        	if( !this.selector ) {
        		this.selector = _selector;
        	}
            var _ratio = this.devicePixelRatio()
                , _stage;

            _stage = new createjs.Stage( this.canvas()[ 0 ] );

            _stage.scaleX = _ratio;
            _stage.scaleY = _ratio;

            _stage.enableMouseOver( 20 );

            _stage.mouseMoveOutside = true;
            
            // createjs.Touch.enable( _stage, false, true );

            createjs.Ticker.addEventListener( "tick", _stage );

            this.stage = _stage;
        }

        , canvas: function(){

            if( !this._canvas ){

            	var _selector = this.getSelector()
                    , _ratio = this.devicePixelRatio()
                    , _width = this.width() * _ratio
                    , _height = this.height() * _ratio;

            	if( _selector.is('canvas') ) {

            		this._canvas = _selector;

            		this._canvas.attr( {
            			width: _selector.width() * _ratio
            			, height: _selector.height() * _ratio
            		} );

            	} else {

                    var _canvas = $( '<canvas></canvas>' );

                    _selector.append( _canvas );

                    _canvas.attr( {
                        width: _canvas.width() * _ratio
                        , height: _canvas.height() * _ratio
                    } );

                    this._canvas = _canvas;
            	}
            }
            return this._canvas;
        }

        , getSelector: function() {
        	return this.selector;
        }

        /**
         * 图表宽度
         */
        , width: function(){
            if( typeof this._width == 'undefined' ){
                this._width = this.getSelector().prop( 'offsetWidth' );
                this.is( '[chartWidth]' ) && ( this._width = this.intProp( 'chartWidth' ) || this._width );
            }
            return this._width
        }

        /**
         * 图表高度
         */
        , height: function(){
            if( typeof this._height == 'undefined' ){
                this._height = this.getSelector().prop( 'offsetHeight' )||400;
                this.is( '[chartHeight]' ) && ( this._height = this.intProp( 'chartHeight' ) || this._height );
            }
            return this._height;
        }

        , devicePixelRatio: function() {
            if( typeof this._devicePixelRatio == 'undefined' ) {
                this._devicePixelRatio = window.devicePixelRatio || 1;
            }
            return this._devicePixelRatio;
        }

        /**
         * 初始化数据
         */
        , _initData: function() {

            var _p = this, _data;
            if( this.getSelector().attr( 'chartScriptData' ) ) {
                _data = this.selectorProp( 'chartScriptData' ).html();
                _data = _data.replace( /^[\s]*?\/\/[\s\S]*?[\r\n]/gm, '' );
                _data = _data.replace( /[\r\n]/g, '' );
                _data = _data.replace( /\}[\s]*?,[\s]*?\}$/g, '}}');
                _data = eval( '(' + _data + ')' );
            }

            this.data = _data;
        }

        /**
         * 更新数据
         * @method update
         * @param   object  _data
         */
        , update: function( _data ) {
            this.trigger( Base.Model.RESET_DISPLAY_SERIES, [ _data ] );
            this.trigger( Base.Model.UPDATE_CHART_DATA, _data );

            return this;
        }

        , is: function( _selector, _key ){
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }

            return _selector && _selector.is( _key );
        }

        , intProp: function( _selector, _key ){
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }
            var _r = 0;
            _selector 
                && _selector.is( '[' + _key + ']' ) 
                && ( _r = parseInt( _selector.attr( _key ).trim(), 10 ) || _r );
            return _r;
        }

        , selectorProp: function( _selector, _key ){
            var _r;
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }

            _selector
                && _selector.is( '[' + _key + ']' ) 
                && ( _r = JC.f.parentSelector( _selector, _selector.attr( _key ) ) );

            return _r;
        }

        // , isPointerEventType: function( e, type ) {
        //     return (e.type == 'pointer'+type ||
        //     e.type.toLowerCase() == 'mspointer'+type)
        // }

    };

	_jwin.on( 'resize', function() {
        JC.f.safeTimeout( function() {
            _jwin.trigger( Base.RESIZE_UPDATE );
        }, null, 'MCHART_RESIZE_asdfaewfaes', 200 );
    } );

    return Base;

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);