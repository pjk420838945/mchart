;(function(){
window.JC = window.JC|| {log:function(){}};
JC.PATH = JC.PATH || scriptPath();
/**
 * requirejs config.js for JC Chart Project
 */
window.requirejs && 
requirejs.config( {
    baseUrl: JC.PATH
    , urlArgs: 'v=20140212&nocache=' + new Date().getTime()
    , paths: {
        /* JC Files */
        'JC.Common': 'modules/JC.Common/0.2/Common'

        /* Base */
        , 'MChart.Base': 'modules/MChart.Base/0.1/Base'
        , 'MChart.Common': 'modules/MChart.common/0.1/Common'
        , 'MChart.DefaultOptions': 'modules/MChart.Common/0.1/config/DefaultOptions'
        , 'MChart.NotificationNames': 'modules/MChart.Common/0.1/event/NotificationNames'
        , 'MChart.View.BaseView': 'modules/MChart.Common/0.1/view/components/BaseView'
        , 'MChart.model.BaseData': 'modules/MChart.Common/0.1/model/data/BaseData'

        /* Controller -- command */
        , 'MChart.Common.Controller.FilterDataCmd': 'modules/MChart.Common/0.1/controller/FilterDataCmd'
        , 'MChart.Common.Controller.ClearCmd': 'modules/MChart.Common/0.1/controller/ClearCmd'
        , 'MChart.Common.Controller.DrawCmd': 'modules/MChart.Common/0.1/controller/DrawCmd'

        /* Model -- Proxy and Data */
        , 'MChart.Common.Model.RateProxy': 'modules/MChart.Common/0.1/model/rateProxy'
        , 'MChart.Common.Model.BaseRateData': 'modules/MChart.Common/0.1/model/data/rateData/BaseRateData'

        , 'MChart.Common.Model.SeriesProxy': 'modules/MChart.Common/0.1/model/seriesProxy'
        , 'MChart.Common.Model.BaseSeriesData': 'modules/MChart.Common/0.1/model/data/seriesData/BaseSeriesData'

        /* View -- Mediator and View */

        , 'MChart.Common.View.BgMediator': 'modules/MChart.Common/0.1/view/BgMediator'
        , 'MChart.Common.View.BaseBgView': 'modules/MChart.Common/0.1/view/components/BgView/BaseBgView'

        , 'MChart.Common.View.CreditsMediator': 'modules/MChart.Common/0.1/view/CreditsMediator'
        , 'MChart.Common.View.BaseCreditsView': 'modules/MChart.Common/0.1/view/components/CreditsView/BaseCreditsView'

        , 'MChart.Common.View.LegendMediator': 'modules/MChart.Common/0.1/view/LegendMediator'
        , 'MChart.Common.View.BaseLegendView': 'modules/MChart.Common/0.1/view/components/LegendView/BaseLegendView'

        , 'MChart.Common.View.TitleMediator': 'modules/MChart.Common/0.1/view/TitleMediator'
        , 'MChart.Common.View.BaseTitleView': 'modules/MChart.Common/0.1/view/components/TitleView/BaseTitleView'

        , 'MChart.Common.View.SubtitleMediator': 'modules/MChart.Common/0.1/view/SubtitleMediator'
        , 'MChart.Common.View.BaseSubtitleView': 'modules/MChart.Common/0.1/view/components/SubtitleView/BaseSubtitleView'

        , 'MChart.Common.View.VTitleMediator': 'modules/MChart.Common/0.1/view/VTitleMediator'
        , 'MChart.Common.View.BaseVTitleView': 'modules/MChart.Common/0.1/view/components/VTitleView/BaseVTitleView'

        , 'MChart.Common.View.VLabelMediator': 'modules/MChart.Common/0.1/view/VLabelMediator'
        , 'MChart.Common.View.BaseVLabelView': 'modules/MChart.Common/0.1/view/components/VLabelView/BaseVLabelView'

        , 'MChart.Common.View.InnerViewMediator': 'modules/MChart.Common/0.1/view/InnerViewMediator'
        , 'MChart.Common.View.BaseInnerView': 'modules/MChart.Common/0.1/view/components/InnerView/BaseInnerView'

        , 'MChart.Common.View.GroupMediator': 'modules/MChart.Common/0.1/view/GroupMediator'
        , 'MChart.Common.View.BaseGroupView': 'modules/MChart.Common/0.1/view/components/GroupView/BaseGroupView'

        , 'MChart.Common.View.HLabelMediator': 'modules/MChart.Common/0.1/view/HLabelMediator'
        , 'MChart.Common.View.BaseHLabelView': 'modules/MChart.Common/0.1/view/components/HLabelView/BaseHLabelView'

        , 'MChart.Common.View.HLineMediator': 'modules/MChart.Common/0.1/view/HLineMediator'
        , 'MChart.Common.View.BaseHLineView': 'modules/MChart.Common/0.1/view/components/HLineView/BaseHLineView'

        , 'MChart.Common.View.VLineMediator': 'modules/MChart.Common/0.1/view/VLineMediator'
        , 'MChart.Common.View.BaseVLineView': 'modules/MChart.Common/0.1/view/components/VLineView/BaseVLineView'

        , 'MChart.Common.View.TipsMediator': 'modules/MChart.Common/0.1/view/TipsMediator'
        , 'MChart.Common.View.BaseTipsView': 'modules/MChart.Common/0.1/view/components/TipsView/BaseTipsView'
        
        /* MChart UI */

        /* MChart Curvegram */
        , 'MChart.Curvegram': 'modules/MChart.Curvegram/0.1/Curvegram'
        , 'MChart.Curvegram.MainFacad': 'modules/MChart.Curvegram/0.1/_code/MainFacad'
        , 'MChart.Curvegram.Controller.CalcCoordinateCmd': 'modules/MChart.Curvegram/0.1/_code/controller/CalcCoordinateCmd'


        /* MChart Histogram */
        , 'MChart.Histogram': 'modules/MChart.Histogram/0.1/Histogram'
        , 'MChart.Histogram.MainFacad': 'modules/MChart.Histogram/0.1/_code/MainFacad'
        , 'MChart.Histogram.Controller.CalcCoordinateCmd': 'modules/MChart.Histogram/0.1/_code/controller/CalcCoordinateCmd'

        , 'MChart.Histogram.View.GraphicMediator': 'modules/MChart.Histogram/0.1/_code/view/GraphicMediator'
        , 'MChart.Histogram.View.GraphicView': 'modules/MChart.Histogram/0.1/_code/view/components/GraphicView'

        /* lib Files */
        , 'Json2': 'lib/JSON/2/JSON'
    }
});
/**
 * 取当前脚本标签的 src路径 
 * @static
 * @return  {string} 脚本所在目录的完整路径
 */
function scriptPath(){
    var _sc = document.getElementsByTagName('script'), _sc = _sc[ _sc.length - 1 ], _path = _sc.getAttribute('src');
    if( /\//.test( _path ) ){ _path = _path.split('/'); _path.pop(); _path = _path.join('/') + '/'; }
    else if( /\\/.test( _path ) ){ _path = _path.split('\\'); _path.pop(); _path = _path.join('\\') + '/'; }
    return _path;
}
}());
