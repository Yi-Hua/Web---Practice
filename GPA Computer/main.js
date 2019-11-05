function calculatorGPA(event) {
    // 防止瀏覽器表單預設會在送出時重整的行為
    event.preventDefault();
    // 取得國英數成績
    // let chineseScore = parseInt(document.getElementById('chineseScoreInput').value);
    // let englishScore = parseInt(document.getElementById('englishScoreInput').value);
    // let mathScore = parseInt(document.getElementById('mathScoreInput').value);
    let chineseScore = getScore('chineseScoreInput'),
        englishScore = getScore('englishScoreInput'),
        mathScore = getScore('mathScoreInput');
    console.log(chineseScore, englishScore, mathScore);
    // 計算出平均成績，四捨五入至個位數
    let avgScore = Math.round((chineseScore + englishScore + mathScore) / 3);
    console.log('avgScore:', avgScore);
    // 完成GPA計算機邏輯
    let gpa;
    // 預設alert是灰色
    let alertColor = 'alert-secondary';
    if (avgScore >= 90) {
        // 如果平均分數大於等於90
        gpa = 'A+';
        alertColor = 'alert-success';
    } else if (avgScore >= 80) {
        // 如果平均分>=80
        gpa = 'A';
    } else if (avgScore >= 70) {
        // 如果平均分>=70
        gpa = 'B';
    } else if (avgScore >= 60) {
        // 如果平均分>=60
        gpa = 'C';
    } else {
        // 如果上述的if跟else if都不符合的話
        gpa = 'F';
        alertColor = 'alert-danger';
    }
    // 顯示成績報告於畫面上
    //       使用Bootstrap .alert.alert-secondary樣式顯示成績表
    // 選到需要呈現結果的容器
    const result = document.getElementById('result');
    result.innerHTML = `<div class="alert ${alertColor}">
        國文成績: ${chineseScore}<br>
        英文成績: ${englishScore}<br>
        數學成績: ${mathScore}<br>
        平均分數: ${avgScore}<br>
        GPA: ${gpa}
    </div>
    <canvas id="scoreChart"></canvas>
    `;
    // TODO: 使用Chart.js套件顯示圖表
    let ctx = document.getElementById('scoreChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['國文', '英文', '數學', '平均'],
            datasets: [{
                label: '分數',
                data: [chineseScore, englishScore, mathScore, avgScore],
                backgroundColor: [
                    `rgba(${getScoreColor(chineseScore)}, 0.2)`,
                    `rgba(${getScoreColor(englishScore)}, 0.2)`,
                    `rgba(${getScoreColor(mathScore)}, 0.2)`,
                    `rgba(${getScoreColor(avgScore)}, 0.2)`
                ],
                borderColor: [
                    `rgba(${getScoreColor(chineseScore)}, 1)`,
                    `rgba(${getScoreColor(englishScore)}, 1)`,
                    `rgba(${getScoreColor(mathScore)}, 1)`,
                    `rgba(${getScoreColor(avgScore)}, 1)`
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// 設計一個透過inputId取得分數的函數
function getScore(id) {
    // console.log('id:', id);
    // 取得input
    const input = document.getElementById(id);
    // console.log('input:', input);
    // 取得值並轉整數
    const score = parseInt(input.value);
    // console.log('score:', score);
    // 回傳值 把score輸出
    return score;
}

// 設計透過分數回傳色碼的函數
function getScoreColor(score) {
    if (score >= 60) {
        // 回傳藍色
        return '54, 162, 235';
    } else {
        // 回傳紅色
        return '255, 99, 132';
    }
}