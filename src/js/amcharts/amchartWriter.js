/* ===========================================================

	Title:	amchartWriter.js
	version: 2.0
	Created:	2017-8-2
	Last Created:	2017-8-2

=========================================================== */
var AmchartWriter = (function($) {
	/**********基本設定**********/
	//デフォルト設定
	var defaultProperty = {};
	//デフォルトオプション
	var defaultOption = {};
	//個別プロパティの追加
	var setDefaultProperty = function(obj) {
		if ($.isPlainObject(obj)) {
			$.extend(true, defaultProperty, obj);
		}
		return this;
	};
	//オプションの追加
	var setDefaultOption = function(obj) {
		if ($.isPlainObject(obj)) {
			$.extend(true, defaultOption, obj);
		}
		return this;
	};
	//デフォルト設定の取得
	var getDefaults = function() {
		return {
			property: $.extend(true, {}, defaultProperty),
			option: $.extend(true, {}, defaultOption)
		};
	};

	/**********グラフ描画実行関数**********/
	//グラフ描画関数
	var writeChart = function(target) {
		//対象エリアの指定がない場合
		target = target || '*[chartData]';
		//グラフ描画エリアを取得して各エリアにグラフを描画する
		$(target).each(function(i) {
			//描画実行
			var sw = new SingleWriter(this);
			sw.getChartData().done(function() {
				sw.write();
			});
		});
		return;
	}
	//グラフ削除関数
	var removeChart = function(target) {
		//対象エリアの指定がない場合
		target = target || '*[chartData]';
		//グラフ描画エリアを取得して中身を削除
		$(target).each(function(i) {
			$(this).unwrap().empty().width('');
		});
		return;
	}

	/**********グラフ描画オブジェクト**********/
	//描画エリアID用連番
	var ChartId = (function(num, str) {
		var cnt = parseInt(num, 10) || 0;
		var prefix = str ? str + '' : '';
		return {
			next: function() {
				return prefix ? prefix + cnt++ : cnt++;
			}
		};
	}(0, 'chart_'));
	//グラフ描画オブジェクト
	var SingleWriter = function(chartArea, url) {
		/*
		this.$chartArea;
		this.chartAreaId;
		this.url;
		this.$wrapper;
		*/
		this.defaultProperty = {};
		//this.chartData = [];
		this.chartSettings = {};
		this.chartOptions = {};
		this.xmlData = {};
		this.callbacks = {
			beforeWrite: null,
			afterWrite: null
		};

		//初期化
		this.init(chartArea, url);

		return this;
	};
	SingleWriter.prototype = {
		//初期化
		init: function(chartArea, url) {
			//デフォルト設定を取得
			var defaults = getDefaults();
			this.defaultProperty = defaults.property;
			this.chartOptions = defaults.option;
			//描画エリア取得
			this.$chartArea = $(chartArea);
			//ID取得
			if (this.$chartArea.attr('id')) {
				this.chartAreaId = this.$chartArea.attr('id');
			} else {
				this.chartAreaId = ChartId.next();
				this.$chartArea.attr('id', this.chartAreaId);
			}
			//データURL取得
			//描画エリアのタグにchartData='url'の形式で記述
			this.url = url || this.$chartArea.attr('chartdata');
			//オプション取得
			//描画エリアのタグにchartOption='option1[param1,param2,..],option2[param..]'の形式で記述
			option = this.$chartArea.attr('chartoption');
			if (option) {
				//this.chartOption = option || this.chartOption || {};
				var options = option.match(/([^\[\],]+\[[^\[\]]*\])/g);
				if (options) {
					for (var i = 0, len = options.length; i < len; i++) {
						var chartOption = options[i].replace(/\s/g, '').match(/([^,\[\]]+)/g);
						this.chartOptions[chartOption[0]] = chartOption.slice(1);
					}
				}
			}
			//描画エリアの外側にdiv作成
			if (!this.$chartArea.parent('.chartWrapper')[0]) {
				$wrapper = $('<div />')
					.addClass('chartWrapper')
					.css({
						'margin': '0',
						'padding': '0',
					})
					.width(this.$chartArea.outerWidth());
				this.$chartArea.wrap($wrapper);
			}
			this.$wrapper = this.$chartArea.parent('.chartWrapper');
			//個別設定したスタイルの削除
			this.$chartArea.width('');
			this.$wrapper.css({'overflow-x': ''});

			return this;
		},
		/***グラフ設定***/
		//amchart用データ取得
		getChartData: function(url, cache) {
			var self = this;
			self.url = url || self.url;
			cache = typeof cache === 'undefined' ? true : cache;
			var dfd = new $.Deferred();
			if (!self.url) {
				//urlがない場合
				dfd.resolve(null);
			} else if (cache && self.xmlData[self.url]) {
				//取得済みのxmlがある場合
				var obj = xmlToChartData(self.xmlData[self.url]);
				self.chartData = obj.data;
				self.chartSettings = obj.settings;
				dfd.resolve(self.xmlData[self.url]);
			} else {
				//function.js: MultiAjaxが読み込まれていれば使用する
				if (MultiAjax) {
					MultiAjax.getData(self.url, 'xml')
					.done(function(data) {
						var obj = xmlToChartData(data[self.url]);
						self.chartData = obj.data;
						self.chartSettings = obj.settings;
						//一応生のxmlを保持する　※カスタム処理用
						self.xmlData[self.url] = data[self.url];
						dfd.resolve(data[self.url]);
					});
				} else {
					//MultiAjaxを使わない場合は直接リクエスト
					$.ajax({
						url: self.url,
						type:'GET',
						dataType:'xml',
						cache: false,
						timeout:5000,
					})
					.done(function(xml) {
						var obj = xmlToChartData(xml).chartData;
						self.chartData = obj.data;
						self.chartSettings = obj.settings;
						//一応生のxmlを保持する　※カスタム処理用
						self.xmlData[self.url] = xml;
						dfd.resolve(xml);
					});
				}
			}
			return dfd.promise();
		},
		//チャート用データの追加
		setChartData: function(chartData, replace) {
			if(!$.isArray(chartData)) {return this;}
			if (replace) {
				this.chartData = chartData;
			} else {
				$.merge(this.chartData, chartData);
			}
			return this;
		},
		//チャート設定の追加
		setChartSetting: function(chartSettings, replace) {
			if(!$.isPlainObject(chartSettings)) {return this;}
			if (replace) {
				this.chartSettings = chartSettings;
			} else {
				$.extend(true, this.chartSettings, chartSettings);
			}
			return this;
		},
		//チャートオプションの追加
		setChartOption: function(chartOptions, replace) {
			if(!$.isPlainObject(chartOptions)) {return this;}
			if (replace) {
				this.chartOptions = chartOptions;
			} else {
				$.extend(true, this.chartOptions, chartOptions);
			}
			return this;
		}, 
		//コールバック関数の追加
		setCallback: function(callbacks) {
			var self = this;
			if ($.isPlainObject(callbacks)) {
				$.each(callbacks, function(key, func) {
					if (key in self.callbacks && $.isFunction(func)) {
						self.callbacks[key] = func;
					}
				});
			}
			return self;
		},
		/***グラフ描画共通処理***/
		//グラフ描画実行
		write: function(customChartFunc, data) {
			//グラフ種類の取得
			var chartType = this.chartSettings.type;
			//グラフ種類に応じた描画処理の実行
			if (this[chartType] && this.chartData) {
				//描画エリアを空に
				this.$chartArea.empty();
				//callback: beforeWrite
				if (this.callbacks.beforeWrite && $.isFunction(this.callbacks.beforeWrite)) {
					this.callbacks.beforeWrite(this);
				}
				//オプション適用
				var filtered = this.applyChartOpptions();
				//汎用グラフ描画処理
				this[chartType](filtered.data, filtered.settings);
				//描画エリア調整
				if (this.$chartArea.width() > this.$wrapper.width()) {
					this.$wrapper.css({'overflow-x': 'scroll'});
				}
				this.$wrapper.css({'width': ''});
				//凡例をグラフエリア外に出力した場合
				if (this.legendDivId) {
					$('#' + this.legendDivId).css({position: 'relative', overflow: 'hidden'});
					$('#' + this.legendDivId + ' svg').css('height', 'auto');
				}
				//callback: afterWrite
				if (this.callbacks.afterWrite && $.isFunction(this.callbacks.afterWrite)) {
					this.callbacks.afterWrite(this);
				}
			} else if (customChartFunc) {
				//独自関数が渡されている場合（汎用グラフ描画で対応できない場合に使用する）
				try {
					customChartFunc(data, this);
				} catch (e) {
					//console.log(e);
				}
			}

			return this;
		},
		//グラフ描画オプションの適用
		applyChartOpptions: function() {
			var data = $.merge([], this.chartData);
			var settings = $.extend(true, {}, this.chartSettings);
			
			//filter:データの値でフィルタリング
			//filter[dataField,operator,value,dataType]
			var filter = this.chartOptions.filter;
			if (filter && filter.length >= 3) {
				var filtered = [];
				var dataField = filter[0];
				var operator = filter[1];
				//データ型の指定あれば変換
				var dataType = filter[3] || 'string';
				var value = formatData(filter[2], dataType);
				for (var i = 0, len = data.length; i < len; i++) {
					//フィルタリング上無効っぽい値はスルーする
					if (data[i][dataField] == null) {continue;}
					//比較演算子に応じて値を判定
					//比較時の型に不都合でたら修正要
					if (operator == '=') {
						if (data[i][dataField] == value) {
							filtered.push(data[i]);
						}
					} else if (operator == '!=') {
						if (data[i][dataField] != value) {
							filtered.push(data[i]);
						}
					} else if (operator == '>') {
						if (data[i][dataField] > value) {
							filtered.push(data[i]);
						}
					} else if (operator == '<') {
						if (data[i][dataField] < value) {
							filtered.push(data[i]);
						}
					} else if (operator == '>=') {
						if (data[i][dataField] >= value) {
							filtered.push(data[i]);
						}
					} else if (operator == '<=') {
						if (data[i][dataField] <= value) {
							filtered.push(data[i]);
						}
					} else if (operator == 'like') {
						if (data[i][dataField].indexOf(value) > 0) {
							filtered.push(data[i]);
						}
					}
				}
				data = filtered;
			}
			
			//limit:データ数の制限
			//limit[count,forward|backward]
			var limit = this.chartOptions.limit;
			if (limit) {
				limit[0] = formatData(limit[0], 'number');
				if (data.length > limit[0]) {
					if (limit[1] == 'forward') {
						//前方抽出
						data = data.slice(0, limit[0]);
					} else {
						//後方抽出:デフォルト
						data = data.slice(data.length - limit[0]);
					}
				}
			}
			
			//columnWidth：カラム幅の指定（描画エリアの拡張）
			//columnWidth[widthPerColumn]
			var columnWidth = this.chartOptions.columnWidth;
			if (columnWidth && settings.type == 'serialChart') {
				var width = parseInt(columnWidth[0], 10);
				var column = data.length;
				if (this.$wrapper.width() < width * column) {
					this.$chartArea.width(width * column);
				}
			}

			//removeBlankValueGraph：データが存在しないデータ系列を削除する
			//removeBlankValueGraph
			var removeBlankValueGraph = this.chartOptions.removeBlankValueGraph;
			if (removeBlankValueGraph) {
				for (var i = 0; i < settings.graph.length; i++) {
					var field = settings.graph[i].valueField;
					var valueExists = false;
					for (var j = 0, len = data.length; j < len; j++) {
						if (data[j][field]) {
							valueExists = true;
							break;
						}
					}
					if (!valueExists) {
						settings.graph.splice(i--, 1);
					}
				}
			}

			//legendDiv：legendを指定のエリアに出力する
			//legendDiv[(divId)]
			var legendDiv = this.chartOptions.legendDiv;
			if (legendDiv) {
				if (legendDiv[0]) {
					this.legendDivId = legendDiv[0];
				} else {
					this.legendDivId = this.chartAreaId + '_legend'
					if ($('#' + this.legendDivId).length == 0) {
						$('<div />').attr('id', this.legendDivId)
							.insertAfter(this.$chartArea);
					}
				}
			}

			//changeBalloonLightness：バルーンの明度を雑に変更する
			//changeBalloonLightness[num]
			var self = this;
			var changeBalloonLightness = this.chartOptions.changeBalloonLightness;
			if (changeBalloonLightness && changeBalloonLightness[0]) {
				this.changeBalloonLightness = function() {
					$('#balloons g rect[fill]', self.$chartArea).each(function() {
						if (!$(this).attr('colorchanged')) {
							var fill = $(this).attr('fill');
							$(this).attr('fill', changeLightness(fill, changeBalloonLightness[0]));
							$(this).attr('colorchanged', 'done');
						}
					});
					return;
				}
			}

			return {
				data: data,
				settings: settings
			};

		},
		/***汎用グラフ描画処理***/
		//円グラフ
		pieChart: function(data, settings) {
			if (!data || !settings) {return this;}

			//デフォルト設定の取得
			var defaultProperty = this.defaultProperty.pieChart || {}; 
			
			//pieChart
			var chart = new AmCharts.AmPieChart();
			//データセット
			chart.dataProvider = data;
			//プロパティセット：デフォルト→個別の順
			setChartProperty(chart, defaultProperty.pieChart, settings.pieChart);
			
			//balloon
			var balloon = chart.balloon;
			//プロパティセット：デフォルト→個別の順
			setChartProperty(balloon, defaultProperty.balloon, settings.balloon);
			
			//legend
			//設定が存在する場合のみ作成
			if (settings.legend) {
				var legend = new AmCharts.AmLegend(); 
				//プロパティセット：デフォルト→個別の順
				setChartProperty(legend, defaultProperty.legend, settings.legend);
				chart.addLegend(legend, this.legendDivId || '');
			}
			
			//グラフ描画
			chart.write(this.chartAreaId);
		},
		//棒グラフ、折れ線グラフ
		serialChart: function(data, settings) {
			if (!data || !settings) {return this;}

			//デフォルト設定の取得
			var defaultProperty = this.defaultProperty.serialChart || {}; 
			
			//serialChart
			var chart = new AmCharts.AmSerialChart();
			//データセット
			chart.dataProvider = data;
			//プロパティセット：デフォルト→個別の順
			setChartProperty(chart, defaultProperty.serialChart, settings.serialChart);
			
			//balloon
			var balloon = chart.balloon;
			//プロパティセット：デフォルト→個別の順
			setChartProperty(balloon, defaultProperty.balloon, settings.balloon);
			
			//categoryAxis
			var categoryAxis = chart.categoryAxis;
			//プロパティセット：デフォルト→個別の順
			setChartProperty(categoryAxis, defaultProperty.categoryAxis, settings.categoryAxis);
			
			//valueAxis
			var valueAxis = {};
			$.each(settings.valueAxis, function(key, obj) {
				valueAxis[key] = new AmCharts.ValueAxis();
				//プロパティセット：デフォルト→個別の順
				setChartProperty(valueAxis[key], defaultProperty.valueAxis, obj);
				chart.addValueAxis(valueAxis[key]);
			});
				
			//graph
			for (var i = 0, len = settings.graph.length; i < len; i++) {
				var graph = new AmCharts.AmGraph();
				//グラフ種類の取得:指定なければ棒で
				var grapType = 'column';
				if (settings.graph[i].type) {
					grapType = settings.graph[i].type;
				} else {
					graph.type = grapType;
				}
				//デフォルトプロパティ
				if (defaultProperty.graph) {
					//グラフ共通
					setChartProperty(graph, defaultProperty.graph.common);
					//グラフ種類別
					if (grapType == 'column' && defaultProperty.graph.column) {
						//棒
						setChartProperty(graph, defaultProperty.graph.column);
					} else if (grapType == 'line' && defaultProperty.graph.line) {
						//折れ線
						setChartProperty(graph, defaultProperty.graph.line);
					}
				}
				//個別プロパティ
				setChartProperty(graph, settings.graph[i]);
				//valueAxisの指定※ここだけsetChartPropertyの外で設定している→修正したいところ
				graph.valueAxis = valueAxis[settings.graph[i].valueAxis];
				//バルーンの色調整：オプションの指定がある場合
				if (this.changeBalloonLightness) {
					chart.addListener('changed', this.changeBalloonLightness);
				}
				chart.addGraph(graph);
			}

			//chartCursor
			//設定が存在する場合のみ作成
			if (settings.chartCursor) {
				var chartCursor = new AmCharts.ChartCursor();
				//プロパティセット：デフォルト→個別の順
				setChartProperty(chartCursor, defaultProperty.chartCursor, settings.chartCursor);
				chart.addChartCursor(chartCursor);
			}

			//legend
			//設定が存在する場合のみ作成
			if (settings.legend) {
				var legend = new AmCharts.AmLegend();
				//プロパティセット：デフォルト→個別の順
				setChartProperty(legend, defaultProperty.legend, settings.legend);
				chart.addLegend(legend, this.legendDivId || '');
			}
			
			//グラフ描画
			chart.write(this.chartAreaId);
		},
	};

	/**********汎用系処理関数はこちらに**********/
	/***共通設定***/
	//amChartプロパティの型定義
	var propType = {
		//文字列
		//property: {type: 'string'},
		//数値
		//property: {type: 'number'},
		plotAreaBorderAlpha: {type: 'number'},
		gridAlpha: {type: 'number'},
		axisAlpha: {type: 'number'},
		maximum: {type: 'number'},
		minimum: {type: 'number'},
		fontSize: {type: 'number'},
		cursorAlpha: {type: 'number'},
		spacing: {type: 'number'},
		valueWidth: {type: 'number'},
		precision: {type: 'number'},
		marginTop: {type: 'number'},
		marginBottom: {type: 'number'},
		marginLeft: {type: 'number'},
		marginRight: {type: 'number'},
		//真偽値
		//property: {type: 'boolean'},
		enabled: {type: 'boolean'},
		valueBalloonsEnabled: {type: 'boolean'},
		categoryBalloonEnabled: {type: 'boolean'},
		autoGridCount: {type: 'boolean'},
		labelsEnabled: {type: 'boolean'},
		reversed: {type: 'boolean'},
		equalSpacing: {type: 'boolean'},
		showAllValueLabels: {type: 'boolean'},
		showBalloon: {type: 'boolean'},
		stackable: {type: 'boolean'},
		visibleInLegend: {type: 'boolean'},
		rotate: {type: 'boolean'},
		autoMargins: {type: 'boolean'},
		equalWidths: {type: 'boolean'},
		reversedOrder: {type: 'boolean'},
		switchable: {type: 'boolean'},
		textClickEnabled: {type: 'boolean'},
		bulletsEnabled: {type: 'boolean'},
		categoryBalloonEnabled: {type: 'boolean'},
		enabled: {type: 'boolean'},
		oneBalloonOnly: {type: 'boolean'},
		valueBalloonsEnabled: {type: 'boolean'},
		zoomable: {type: 'boolean'},
		//配列
		//property: {type: 'array', dataType: 'number|string|boolean'},
		//オブジェクト
		//property: {type: 'object', toObject: function(value) {データ整形}},
		numberFormatter: {
			type: 'object',
			toObject: function(value) {
				var property = value.split(',');
				return {
					precision: property[0] || 0,
					decimalSeparator: property[1] || '.',
					thousandsSeparator: property[2] || ','
				};
			}
		},
		//独自定義プロパティ
		//property: {type,dataType,toObject, custom: true, setCustomProperty: function(amchartObject, value) {/*独自処理*/}}, 
		name: {type: 'string', custom: true},
		valueAxis: {type: 'string', custom: true},
		textSuffix: {
			type: 'string',
			custom: true,
			setCustomProperty: function(amchartObject, value) {
				//テキストっぽいプロパティの末尾に付記する（無理やり）
				if (amchartObject.balloonText) {amchartObject.balloonText += value;}
				if (amchartObject.legendValueText) {amchartObject.legendValueText += value;}
				if (amchartObject.valueText) {amchartObject.valueText += value;}
			}
		}
	};
	/***処理関数***/
	//xmlをamchart用データに変換
	var xmlToChartData = function(xml) {
		$xml = $(xml);
		var data = [];
		var settings = {
			type: '',
			//pieChart: {},
			//serialChart: {},
			//balloon: {},
			categoryAxis: {},
			valueAxis: {},
			graph: [],
			//chartCursor: {},
			//legend: {},
		};
		//xmlからチャート用のデータとプロパティを取得する
		//グラフ種類
		$xml.find('chartData').each(function() {
			settings.type = $(this).attr('type');
		});
		//データ
		$xml.find('dataField').each(function() {
			//フィールド名とデータ型の取得
			var fieldName = $(this).attr('name');
			var dataType = $(this).attr('type');
			var fieldCnt = {};
			$(this).find('data').each(function(i) {
				var idx = i;
				//データに直接フィールド名、データ型が定義されていたらそちらを優先 ※shift対応
				if ($(this).attr('fieldName')) {
					fieldName = $(this).attr('fieldName');
					if (!$.isNumeric(fieldCnt[fieldName])) {
						fieldCnt[fieldName] = 0;
					} else {
						fieldCnt[fieldName]++;
					}
					idx = fieldCnt[fieldName];
				}
				if ($(this).attr('dataType')) {
					dataType = $(this).attr('dataType');
				}
				//値の取得と整形
				var val = formatData($(this).text(), dataType);
				var flg = dataType == 'number' ? $.isNumeric(val) : !!val;
				//data追加
				if (data[idx] && flg) {
					data[idx][fieldName] = val;
				} else if (flg) {
					data.push({});
					data[idx][fieldName] = val;
				}
			});
		});

		//valueAxis
		$xml.find('valueAxis').each(function() {
			var property = getProperty(this);
			settings.valueAxis[property.name] = property;
		});
		//graph
		$xml.find('graph').each(function(i) {
			settings.graph[i] = getProperty(this);
		});

		//その他一括取得
		var amchartObject = ['pieChart', 'serialChart', 'balloon', 'categoryAxis', 'chartCursor', 'legend'];
		for (var i = 0, len = amchartObject.length; i < len; i++) {
			$xml.find(amchartObject[i]).each(function() {
				settings[amchartObject[i]] = getProperty(this);
			});
		}
		
		return {
			data: data,
			settings: settings
		};
	};
	//要素に設定されている属性をamChart用の「プロパティ:値」の形で全取得する
	var getProperty = function(elm) {
		var attrs = $(elm).get(0).attributes;
		var data = {};
		for (var i = 0, len = attrs.length; i < len; i++) {
			var property = attrs[i].name;
			var value = attrs[i].nodeValue;
			//値をamChart用に整形して格納
			data[property] = formatProperty(value, property);
		}
		return data;
	};
	//テキストデータをamChart用の型に整形
	var formatProperty = function(value, property) {
		//無効な値はそのまま返す
		if (value == null) {return value;}
		//プロパティの型を取得:指定ない場合は文字列
		var type = 'string';
		if (propType[property]) {
			type = propType[property].type;
		}
		var retVal;
		//プロパティの型に応じて整形
		if (type == 'array') {
			//配列
			retVal = value.split(',');
			var dataType = propType[property].dataType;
			for (var i = 0, len = retVal.length; i < len; i++) {
				retVal[i] = formatData(retVal[i], dataType);
			}
		} else if (type == 'object') {
			//オブジェクト
			retVal = propType[property].toObject(value);
		} else {
			//文字列、数値、真偽値
			retVal = formatData(value, type);
		}		
		return retVal;
	};
	//テキストデータを指定した型に応じて整形（グラフ描画に支障が出ない程度に）
	var formatData = function(data, type) {
		if (type == 'string') {
			//文字列
			data = data.replace(/\\n/g,'\n');
		} else if (type == 'number') {
			//数値
			data = parseFloat(data.replace(/,/g,''));
		} else if (type == 'boolean') {
			//真偽値
			data = data === 'true';
		}
		return data;
	};
	//amChartオブジェクトにプロパティを設置する
	var setChartProperty = function(amchartObject, propertyObject /*[, ppropertyObject2, ..]*/) {
		var propertys = Array.prototype.slice.call(arguments, 1);
		if (propertys.length == 0) {return amchartObject;}
		//プロパティをマージ
		var margedProperty = propertys.reduce(function(merged, current) {
			//オブジェクト判定
			if ($.isPlainObject(current)) {
				return $.extend(true, merged, current);
			} else {
				return merged;
			}
		}, {}); 
		//amChartオブジェクトに設定を追加
		$.each(margedProperty, function(key, val) {
			//独自定義プロパティの別を取得
			var custom;
			if (propType[key]) {
				custom = propType[key].custom;
			}
			//独自定義プロパティ以外はそのまま設置
			if (!custom) {
				amchartObject[key] = val;
			} else if (propType[key].setCustomProperty) {
				//独自定義プロパティの処理
				propType[key].setCustomProperty(amchartObject, val);
			}
		});

		return amchartObject;
	};

	//ゼロパディング
	function zeroPad(number, digit, char) {
		digit = digit || 4;	//デフォルト桁数
		char = char || '0';	//デフォルト文字
		var numberLength = String(number).length;
		if (digit > numberLength) {
			return (new Array((digit - numberLength) + 1).join(char)) + number;
		} else {
			return number;
		}
	}
	//色変換
	function changeLightness(hexColor, num) {
		num = $.isNumeric(num) ? parseInt(num, 10) : 0;
		hexColor = hexColor + '';
		if (!hexColor.match(/^#?[\da-fA-F]{6}$/)) {
			if (hexColor.match(/^#?[\da-fA-F]{3}$/)) {
				hexColor = hexColor.replace(/[^#]/g, '$&$&');
			} else {
				return hexColor;
			}
		}
		var hexRGB = hexColor.match(/[^#]{2}/g);
		var changedColor = hexRGB.reduce(function(tmp, val) {
			var n = parseInt(val, 16) + num;
			n = n < 0 ? 0 : n;
			n = n > 255 ? 255 : n;
			return tmp + zeroPad(n.toString(16), 2);
		}, '#');
		return changedColor;
	}

	/***実行関数を返す***/
	return {
		setDefaultProperty: setDefaultProperty,
		setDefaultOption: setDefaultOption,
		writeChart: writeChart,
		removeChart: removeChart,
		SingleWriter: SingleWriter
	};
}(jQuery));
