<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>台灣能源流向桑基圖 - 時間軸版</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Microsoft JhengHei', 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%);
            min-height: 100vh;
            padding: 20px;
            color: white;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 3em;
            background: linear-gradient(to right, #60a5fa, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }

        .header p {
            color: #cbd5e1;
            font-size: 1.2em;
        }

        .upload-area {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 2px dashed rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 60px;
            text-align: center;
            margin-bottom: 30px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .upload-area:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
        }

        .upload-area svg {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
            stroke: #60a5fa;
        }

        .control-panel {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
        }

        .controls-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .controls-left {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
        }

        .btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }

        .btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        .btn-success {
            background: #10b981;
        }

        .btn-success:hover {
            background: #059669;
        }

        .year-display {
            font-size: 2.5em;
            font-weight: bold;
        }

        .timeline {
            margin-bottom: 20px;
        }

        .timeline input[type="range"] {
            width: 100%;
            height: 12px;
            border-radius: 6px;
            outline: none;
            -webkit-appearance: none;
            cursor: pointer;
        }

        .timeline input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .year-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
        }

        .year-label {
            cursor: pointer;
            transition: color 0.3s;
        }

        .year-label:hover {
            color: #60a5fa;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            padding: 20px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .stat-card.blue {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .stat-card.green {
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .stat-card.purple {
            background: rgba(168, 85, 247, 0.2);
            border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .stat-card.amber {
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .stat-label {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 8px;
        }

        .stat-value {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-unit {
            font-size: 12px;
            opacity: 0.7;
        }

        .chart-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 30px;
        }

        #sankeyChart {
            width: 100%;
            height: 700px;
        }

        .info-box {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
        }

        .info-box ul {
            margin-left: 20px;
            margin-top: 10px;
        }

        .info-box li {
            margin: 8px 0;
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }

        .checkbox-label input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .hidden {
            display: none;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2em;
            }

            .controls-row {
                flex-direction: column;
                align-items: stretch;
            }

            .year-display {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 台灣能源流向桑基圖</h1>
            <p>互動式時間軸探索能源流動</p>
        </div>

        <div class="upload-area" id="uploadArea">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <h2>上傳能源資料檔案</h2>
            <p>支援 template*.csv 格式（可多選）</p>
            <input type="file" id="fileInput" multiple accept=".csv" style="display: none;">
        </div>

        <div class="control-panel hidden" id="controlPanel">
            <div class="controls-row">
                <div class="controls-left">
                    <button class="btn" id="playBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        播放
                    </button>

                    <label class="checkbox-label">
                        <input type="checkbox" id="departmentOnly">
                        <span>僅顯示部門層級</span>
                    </label>

                    <label class="btn btn-success" for="addFiles">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        新增年份
                    </label>
                    <input type="file" id="addFiles" multiple accept=".csv" style="display: none;">
                </div>

                <div class="year-display" id="yearDisplay">2023年</div>
            </div>

            <div class="timeline">
                <input type="range" id="timelineSlider" min="0" max="0" value="0">
                <div class="year-labels" id="yearLabels"></div>
            </div>
        </div>

        <div class="stats-grid hidden" id="statsGrid">
            <div class="stat-card blue">
                <div class="stat-label">總能源流量</div>
                <div class="stat-value" id="totalEnergy">0</div>
                <div class="stat-unit">千公噸油當量</div>
            </div>
            <div class="stat-card green">
                <div class="stat-label">能源來源</div>
                <div class="stat-value" id="sourceCount">0</div>
                <div class="stat-unit">種類</div>
            </div>
            <div class="stat-card purple">
                <div class="stat-label">能源去向</div>
                <div class="stat-value" id="targetCount">0</div>
                <div class="stat-unit">種類</div>
            </div>
            <div class="stat-card amber">
                <div class="stat-label">最大流向</div>
                <div class="stat-value" id="topFlow" style="font-size: 1.2em;">--</div>
                <div class="stat-unit" id="topFlowTarget">--</div>
            </div>
        </div>

        <div class="chart-container hidden" id="chartContainer">
            <div id="sankeyChart"></div>
        </div>

        <div class="info-box hidden" id="infoBox">
            <strong>📖 使用說明：</strong>
            <ul>
                <li>拖動時間軸或點擊年份切換不同年度資料</li>
                <li>點擊「播放」按鈕自動循環播放所有年份</li>
                <li>勾選「僅顯示部門層級」隱藏子分類</li>
                <li>滑鼠懸停在連結和節點上查看詳細數值</li>
            </ul>
        </div>
    </div>

    <script>
        var state = {
            files: {},
            years: [],
            currentYear: null,
            isPlaying: false,
            showDepartmentOnly: false,
            chart: null
        };

        var departmentLevel = new Set([
            '工業部門', '運輸部門', '農業部門', '服務業部門',
            '住宅部門', '轉換效率損失', '商業部門'
        ]);

        var uploadArea = document.getElementById('uploadArea');
        var fileInput = document.getElementById('fileInput');
        var addFiles = document.getElementById('addFiles');
        var controlPanel = document.getElementById('controlPanel');
        var playBtn = document.getElementById('playBtn');
        var departmentOnly = document.getElementById('departmentOnly');
        var timelineSlider = document.getElementById('timelineSlider');
        var yearLabels = document.getElementById('yearLabels');
        var yearDisplay = document.getElementById('yearDisplay');
        var statsGrid = document.getElementById('statsGrid');
        var chartContainer = document.getElementById('chartContainer');
        var infoBox = document.getElementById('infoBox');

        state.chart = echarts.init(document.getElementById('sankeyChart'));

        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', handleFileUpload);
        addFiles.addEventListener('change', handleFileUpload);

        function handleFileUpload(e) {
            var files = Array.from(e.target.files);
            
            files.forEach(function(file) {
                var yearMatch = file.name.match(/template(\d{2,4})/);
                if (yearMatch) {
                    var year = yearMatch[1];
                    if (year.length === 2) {
                        var yearInt = parseInt(year);
                        year = yearInt >= 50 ? String(1911 + yearInt) : String(2011 + yearInt);
                    } else if (year.length === 3) {
                        year = String(1911 + parseInt(year));
                    }
                    
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        state.files[year] = event.target.result;
                        state.years = Object.keys(state.files).sort();
                        if (state.years.length > 0) {
                            if (!state.currentYear) {
                                state.currentYear = state.years[0];
                            }
                            updateUI();
                            updateChart();
                        }
                    };
                    reader.readAsText(file);
                }
            });
        }

        function updateUI() {
            uploadArea.classList.add('hidden');
            controlPanel.classList.remove('hidden');
            statsGrid.classList.remove('hidden');
            chartContainer.classList.remove('hidden');
            infoBox.classList.remove('hidden');

            timelineSlider.max = state.years.length - 1;
            timelineSlider.value = state.years.indexOf(state.currentYear);
            
            yearLabels.innerHTML = state.years.map(function(year) {
                return '<span class="year-label" data-year="' + year + '">' + year + '</span>';
            }).join('');

            document.querySelectorAll('.year-label').forEach(function(label) {
                label.addEventListener('click', function() {
                    state.currentYear = label.dataset.year;
                    updateUI();
                    updateChart();
                });
            });

            yearDisplay.textContent = state.currentYear + '年';

            var percent = (state.years.indexOf(state.currentYear) / (state.years.length - 1)) * 100;
            timelineSlider.style.background = 'linear-gradient(to right, #3b82f6 0%, #3b82f6 ' + percent + '%, rgba(255,255,255,0.2) ' + percent + '%, rgba(255,255,255,0.2) 100%)';
        }

        function parseCSV(text) {
            var lines = text.trim().split('\n');
            var headers = lines[0].split(',').map(function(h) { return h.trim(); });
            var data = [];

            for (var i = 1; i < lines.length; i++) {
                var values = lines[i].split(',');
                if (values.length >= 3) {
                    var row = {};
                    headers.forEach(function(header, index) {
                        row[header] = values[index] ? values[index].trim() : '';
                    });
                    data.push(row);
                }
            }

            return data;
        }

        function filterToDepartmentLevel(data) {
            return data.filter(function(row) {
                var source = row.Source;
                var target = row.Target;
                
                if (departmentLevel.has(source)) {
                    return departmentLevel.has(target);
                }
                return true;
            });
        }

        function updateChart() {
            if (!state.currentYear || !state.files[state.currentYear]) return;

            var data = parseCSV(state.files[state.currentYear]);
            
            var cleanData = data.filter(function(row) {
                var value = parseFloat(row['Value(KLOE)']);
                return row.Source && row.Target && !isNaN(value) && value > 0;
            });

            if (state.showDepartmentOnly) {
                cleanData = filterToDepartmentLevel(cleanData);
            }

            var nodes = new Set();
            var links = [];

            cleanData.forEach(function(row) {
                nodes.add(row.Source);
                nodes.add(row.Target);
                var value = parseFloat(row['Value(KLOE)']) / 1000;
                links.push({
                    source: row.Source,
                    target: row.Target,
                    value: value
                });
            });

            var totalEnergy = cleanData.reduce(function(sum, row) {
                return sum + parseFloat(row['Value(KLOE)']);
            }, 0);
            
            var sortedData = cleanData.sort(function(a, b) {
                return parseFloat(b['Value(KLOE)']) - parseFloat(a['Value(KLOE)']);
            });
            var topFlow = sortedData[0];

            document.getElementById('totalEnergy').textContent = (totalEnergy / 1000).toFixed(0);
            
            var sourceSet = new Set();
            var targetSet = new Set();
            cleanData.forEach(function(r) {
                sourceSet.add(r.Source);
                targetSet.add(r.Target);
            });
            document.getElementById('sourceCount').textContent = sourceSet.size;
            document.getElementById('targetCount').textContent = targetSet.size;
            document.getElementById('topFlow').textContent = topFlow.Source;
            document.getElementById('topFlowTarget').textContent = '→ ' + topFlow.Target;

            var option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    formatter: function(params) {
                        if (params.dataType === 'edge') {
                            return params.data.source + ' → ' + params.data.target + '<br/>流量: ' + params.value.toFixed(1) + ' kKLOE';
                        }
                        return params.name;
                    }
                },
                series: [{
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: Array.from(nodes).map(function(name) {
                        return { name: name };
                    }),
                    links: links,
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5,
                        opacity: 0.4
                    },
                    itemStyle: {
                        borderWidth: 0
                    },
                    label: {
                        color: '#fff',
                        fontSize: 12
                    }
                }]
            };

            state.chart.setOption(option, true);
        }

        var playInterval;
        playBtn.addEventListener('click', function() {
            state.isPlaying = !state.isPlaying;
            
            if (state.isPlaying) {
                playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>暫停';
                
                playInterval = setInterval(function() {
                    var currentIndex = state.years.indexOf(state.currentYear);
                    var nextIndex = (currentIndex + 1) % state.years.length;
                    state.currentYear = state.years[nextIndex];
                    updateUI();
                    updateChart();
                }, 2000);
            } else {
                playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>播放';
                clearInterval(playInterval);
            }
        });

        timelineSlider.addEventListener('input', function(e) {
            state.currentYear = state.years[parseInt(e.target.value)];
            updateUI();
            updateChart();
        });

        departmentOnly.addEventListener('change', function(e) {
            state.showDepartmentOnly = e.target.checked;
            updateChart();
        });

        window.addEventListener('resize', function() {
            state.chart.resize();
        });
    </script>
</body>
</html>