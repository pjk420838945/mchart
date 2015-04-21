;(function(define, _win) { 'use strict'; define( 'MChart.NotificationNames', [], function() {

	window.MChart || ( window.MChart = {} );

	if( !MChart.NotificationNames ) {

		MChart.NotificationNames = {};

		/* Command */
		MChart.NotificationNames.CALC_DATA_CMD = 'calcDataCmd';
		MChart.NotificationNames.CLEAR_CMD = 'clearCmd';
		MChart.NotificationNames.DRAW_CMD = 'drawCmd';
		MChart.NotificationNames.FILTER_DATA_CMD = 'filterDataCmd';

		/* EventName */
		MChart.NotificationNames.HIDE_TIPS = 'hideTips';
		MChart.NotificationNames.INNER_VIEW_BACK = 'innerViewBack';
		MChart.NotificationNames.INNER_VIEW_DRAG = 'innerViewDrag';
		MChart.NotificationNames.INNER_VIEW_MOUSEDOWN = 'innerViewMousedown';
		MChart.NotificationNames.INNER_VIEW_SLIDE = 'innerViewSlide';
		MChart.NotificationNames.SHOW_CHART = 'showChart';
		MChart.NotificationNames.SHOW_TIPS = 'showTips';
		MChart.NotificationNames.UPDATE_VIEW = 'updateView';

	}

	if( !MChart.NickNames ) {

		MChart.NickNames = {};
		
		/* NickNames */
		MChart.NickNames.CURVEGRAM = 'mchartCurvegram';
		MChart.NickNames.HISTOGRAM = 'mchartHistogram';
	}

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);