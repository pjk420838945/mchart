;(function(define, _win) { 'use strict'; define( 'MChart.Common.Model.RateProxy', [
	'MChart.Common.Model.BaseRateData'
], function( BaseRateData ) {

	/*
     * 注意： 此处一定保持Proxy别名的唯一性 facade会按照别名区分注册的Proxy，别名相同会直接覆盖之前注册的Proxy
     */
    var PROXY_NAME = 'rateProxy';

    var RateProxy = Objs(
    	"Common.Model.Proxy.RateProxy"
        , Proxy
        , {
        	initialize: function( _nickName, _canvas ) {

                var _data;

                this.canvas = _canvas;

                switch( _nickName ) {
                    
                    default: {
                        _data = new BaseRateData( _canvas );
                        break;
                    }
                }

                RateProxy.$super.initialize.call( this, PROXY_NAME, _data );
            }
        }
    );

    return RateProxy;
});}( typeof define === 'function' && define.amd ? define : 
	    function ( _name, _require, _cb ) { 
	        typeof _name == 'function' && ( _cb = _name );
	        typeof _require == 'function' && ( _cb = _require ); 
	        _cb && _cb(); 
	    }
	    , window
	)
);