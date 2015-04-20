;(function(define, _win) { 'use strict'; define( 'MChart.Common.Controller.ClearCmd', [
	'MChart.Common.Model.RateProxy'
	, 'MChart.Common.Model.SeriesProxy'

	, 'MChart.Common.View.BgMediator'
	, 'MChart.Common.View.CreditsMediator'
	, 'MChart.Common.View.LegendMediator'
	, 'MChart.Common.View.TitleMediator'
	, 'MChart.Common.View.SubtitleMediator'
	, 'MChart.Common.View.VTitleMediator'
	, 'MChart.Common.View.VLabelMediator'
	, 'MChart.Common.View.InnerViewMediator'
	, 'MChart.Common.View.GroupMediator'
	, 'MChart.Common.View.HLabelMediator'
	, 'MChart.Common.View.HLineMediator'
	, 'MChart.Common.View.VLineMediator'
	, 'MChart.Common.View.TipsMediator'
	, 'MChart.Histogram.View.GraphicMediator'
], function( 
	RateProxy
	, SeriesProxy

	, BgMediator
	, CreditsMediator
	, LegendMediator
	, TitleMediator
	, SubtitleMediator
	, VTitleMediator
	, VLabelMediator
	, InnerViewMediator
	, GroupMediator
	, HLabelMediator
	, HLineMediator
	, VLineMediator
	, TipsMediator
	, GraphicMediator
) {

	var ClearCmd = Objs(
		"Common.Controller.ClearCmd"
	    , MacroCommand
		, {

		    initializeMacroCommand: function( note ) {}

		    , execute: function( e ) {

				var _canvas = e.getBody().selector
					, _facade = this.facade

					, _mediatorArray = [
						new BgMediator()
						, new CreditsMediator()
						, new LegendMediator()
						, new TitleMediator()
						, new SubtitleMediator()
						, new VTitleMediator()
						, new VLabelMediator()
						, new InnerViewMediator()
						, new GroupMediator()
						, new HLabelMediator()
						, new HLineMediator()
						, new VLineMediator()
						, new TipsMediator()
						, new GraphicMediator()
					]

					, _proxyArray = [
						new RateProxy()
						, new SeriesProxy()
					];

				//清除mediator
				$.each( _mediatorArray, function( _idx, _mediator ) {
					_facade.hasMediator( _mediator.mediatorName ) 
						&& _facade.removeMediator( _mediator.mediatorName );
				} );

				//清除proxy
				$.each( _proxyArray, function( _idx, _proxy ) {
					_facade.hasMediator( _proxy.proxyName ) 
						&& _facade.removeMediator( _proxy.proxyName );
				} );

				//初始化stage
				_canvas.stage.removeAllEventListeners();
				_canvas.stage.removeAllChildren();
		    }
		}
	);

	return ClearCmd;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _mediatorName, _require, _cb ) { 
            typeof _mediatorName == 'function' && ( _cb = _mediatorName );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);