/**********amchartデフォルト設定**********/
//サイト全体の共通設定はここに書いておく
try {
	var chartFont = {
		ja: '"游ゴシック", "YuGothic", "メイリオ", Meiryo, sans-serif',
		en: '"游ゴシック", "YuGothic", "メイリオ", Meiryo, sans-serif'
	}[getLang()];
  var chartFontSize = 13;
	//var chartColors = [];
	AmchartWriter
		//グラフ種類ごとのデフォルト設定
		.setDefaultProperty({
			//円グラフ
			pieChart: {
				pieChart: {
					titleField: "title",
					valueField: "value",
					colorField: "color",
					outlineColor: "#FFFFFF",
					outlineAlpha: 0.8,
					outlineThickness: 1,
					balloonText: "[[title]]: [[value]]",
					labelRadius: -30,
					labelText: "",
					innerRadius: "50%",
					marginTop: 10,
					marginBottom: 20,
					pullOutRadius: "0",
					fontFamily: chartFont,
					fontSize: chartFontSize,
					startEffect: ">",
					startDuration: 0.5,
					numberFormatter: {precision: 1, decimalSeparator: ".", thousandsSeparator: ","},
					textSuffix: "%"
				},
				balloon: {
					
				},
				legend: {
					align: "center",
					markerType: "square",
					labelText: "[[title]]",
					valueText: "[[value]]",
					verticalGap: 5,
					//valueWidth: 80,
					textSuffix: "%",
					maxColumns: 1,
					switchable: false
				}
			},
			//棒、折れ線グラフ
			serialChart: {
				serialChart: {
					plotAreaBorderAlpha: 0,
					columnWidth: 0.4,
					rotate: false,
					depth3D: 0,
					angle: 0,
					fontFamily: chartFont,
					startEffect: ">",
					startDuration: 0.4,
					numberFormatter: {precision: 0, decimalSeparator: ".", thousandsSeparator: ","}
				},
				balloon: {
					//adjustBorderColor: true
					//borderAlpha: 0.5
					//fillAlpha: 0.5
				},
				categoryAxis: {
					axisAlpha: 0,
					gridAlpha: 0,
					gridPosition: "start"
				},
				valueAxis: {
					stackType: "regular",
					axisAlpha: 0,
					gridAlpha: 0.2
				},
				graph: {
					//グラフ共通設定
					common: {
						labelText: "[[value]]",
						balloonText: "[[title]]:[[value]]",
						legendValueText: "[[value]]",
						fontSize: chartFontSize,
						fillAlphas: 0.9,
						cursorBulletAlpha: 0
					},
					//グラフ種類別設定
					column: {
						lineThickness: 0,
						markerType: "square"
					},
					line: {
						fillAlphas: 0,
						lineThickness: 3,
						bullet: "square",
						bulletSize: 10,
						bulletBorderThickness: 1,
						bulletBorderColor: "#efefef",
						markerType: "square"
					}
				},
				chartCursor: {
					//valueBalloonsEnabled: false,
					//categoryBalloonEnabled: false,
					zoomable: false,
					cursorColor: "#999999",
					cursorAlpha: 0.5
				},
				legend: {
					spacing: 50,
					markerSize: 16,
					valueWidth: 100,
					color: "#000000",
					switchable: false
				}
			}
		})
		//共通オプション
		.setDefaultOption({
			changeBalloonLightness: [-25]
		});
} catch(e) {
	//console.log(e);
}
