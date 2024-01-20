/* ===========================================================

	Title:				rate.js
	Created:			2016-10-25
	Last Created:		2016-10-28
	
=========================================================== */
$(function() {
	//初期表示
	var term = $("#rate_term a:eq(0)").attr("term");
	$("#rate_term a:eq(0)").closest("li").addClass("active");
	Rate.filter(term);
	//データ切り替えイベント設置
	$("#rate_term").on("click", "a", function() {
		//現在期の場合は何もしない
		if ($(this).closest("li").hasClass("active")) {return false;}
		//期の取得
		var term = $(this).attr("term");
		//データ切り換え
		Rate.filter(term);
		//カレント設置
		$("li", "#rate_term").removeClass("active");
		$(this).closest("li").addClass("active");
		
		return false;
	});
});
//データ制御オブジェクト
var Rate = (function() {
	//データURL
	var data_url = ["rate_data.xml", "rate_settings.xml", "rate_notes.xml"];
	var graph_url = "rate_graph.xml";
	//表示エリア
	var dataTable = "#rate_data";
	var chartArea = "#rate_chart";
	var noteTable = "#rate_notes";
	//稼働率データ格納用
	var rateData;
	var rateSettings;
	var rateNotes;
	//データ挿入用の空行
	var $dataRow;
	var $noteRow;

	//期の切り替え
	var filter = function(term) {
		//稼働率データの有無確認
		if (rateData && rateSettings && rateNotes) {
			//ページ書き換え
			writeTable(term);
			writeNotes(term);
			writeChart(term);
		} else {
			//稼働率データがなければ取りにいく
			getRateData().done(function(data) {
				//ページ書き換え
				writeTable(term);
				writeNotes(term);
				writeChart(term);
			});
		}
	};
	//データ書き換え
	var writeTable = function(term) {
		var $dataTable = $(dataTable);
		//データ挿入用の空行取得
		if (!$dataRow) {
			$dataRow = $($("tbody", $dataTable).html()).clone();
		}
		//データクリア
		$("tbody", $dataTable).empty();
		//該当期のデータがあれば挿入
		if(rateData[term]) {
			$dataTable.show();
			//月のループ
			for (var month in rateData[term]) {if (rateData[term].hasOwnProperty(month)) {
				//行のフォーマットをコピー
				var $row = $dataRow.clone();
				//データ名⇔クラス名の対応付けでデータ設置
				for (var dataName in rateData[term][month]) {if (rateData[term][month].hasOwnProperty(dataName)) {
					$("." + dataName, $row).html(rateData[term][month][dataName]);
				}}
				//個別調整
				if (!rateData[term][month]["note"]) {
					$(".note", $row).hide();
				}
				//行挿入
				if (rateData[term][month]["total_value3"]) {
					$("tbody", $dataTable).prepend($row);
				}
			}}
		} else {
			$dataTable.hide();
		}
	};
	//注釈書き換え
	var writeNotes = function(term) {
		var $noteTable = $(noteTable);
		//データ挿入用の空行取得
		if (!$noteRow) {
			$noteRow = $($("tbody", $noteTable).html()).clone();
		}
		//データクリア
		$("tbody", $noteTable).empty();
		//全ての注釈をループ
		for (var key in rateNotes) {if (rateNotes.hasOwnProperty(key)) {
			//該当する期のデータをテーブルに挿入
			if (rateNotes[key].term == term) {
				//行のフォーマットをコピー
				var $row = $noteRow.clone();
				//データ設置
				$(".number", $row).html(rateNotes[key].number);
				$(".text", $row).html(rateNotes[key].text);
				//行挿入
				$("tbody", $noteTable).append($row);
			}
		}}

		return;
	};
	//グラフ書き換え
	var writeChart = function(term) {
		settings = rateSettings[term];
		//グラフ書換え
		var option = "filter[term,=," + term + "]";
		var aw = new AmchartWriter.SingleWriter(chartArea, graph_url, option);
		//各期の最大最小値を無理やりつっこむ
		aw.beforeWrite = function(chartData) {
			//稼働率
			chartData.valueAxis["valueAxis1"].maximum = parseFloat(settings.graph1_max.replace(/,/g,""));
			chartData.valueAxis["valueAxis1"].minimum = parseFloat(settings.graph1_min.replace(/,/g,""));
			chartData.valueAxis["valueAxis1"].gridCount = parseFloat(settings.graph1_grid.replace(/,/g,""));
			//賃貸可能面積
			chartData.valueAxis["valueAxis2"].maximum = parseFloat(settings.graph2_max.replace(/,/g,""));
			chartData.valueAxis["valueAxis2"].minimum = parseFloat(settings.graph2_min.replace(/,/g,""));
			chartData.valueAxis["valueAxis2"].gridCount = parseFloat(settings.graph2_grid.replace(/,/g,""));
		};
		aw.write();
	};
	//稼働率データ取得
	var getRateData = function() {
		var dfd = new $.Deferred();
		MultiAjax.getData(data_url, "xml")
			.done(function(data) {
				rateData = xmlToRateData(data["rate_data.xml"])
				rateSettings = xmlToRateData(data["rate_settings.xml"])
				rateNotes = xmlToRateData(data["rate_notes.xml"])
				dfd.resolve();
			})
			.fail(function(x) {}
				//dfd.reject();
			);
		return dfd.promise();
	};
	//データ変換
	var xmlToRateData = function(xml) {
		$xml = $(xml);
		//データ取得
		//dataWrap:xml直下の要素
		var getDataWrap = function($xml) {
			$dataWraps = $xml.find("dataWrap");
			var obj = {};
			if ($dataWraps.length == 0) {
				obj = null;
			} else if ($dataWraps.length == 1) {
				obj = getDataSet($($dataWraps[0]));
			} else {
				$dataWraps.each(function(i) {
					var wrapName = $(this).attr("name");
					obj[wrapName] = getDataSet($(this));
				});
			}
			return obj;
		};
		//dataSet:data又はdataSetのグループ
		var getDataSet = function($dataSet) {
			var data = {};
			$dataSets = $dataSet.children("dataSet");
			if ($dataSets.length > 0) {
				$dataSets.each(function(i) {
					var dataName = $(this).attr("name") || i;
					if (data[dataName]) {
						$.extend(data[dataName], getDataSet($(this)));
					} else {
						data[dataName] = getDataSet($(this));
					}
				});
			} else {
				data = getData($dataSet);
			}
			return data;
		};
		//data:値を保持
		var getData = function($dataSet) {
			var data = {};
			$dataSet.find("data").each(function(i) {
				var dataName = $(this).attr("name") || i;
				data[dataName] = $(this).text().replace(/\n/g,"<br />");
			});
			return data;
		};

		return getDataWrap($xml);
	};
	//使用する関数を返す
	return {
		filter: filter,
		getRateData: getRateData
	};
}());
