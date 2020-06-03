function addToDataset(data, dataset) {
    if (!dataset.newCases) {
        dataset.newCases = {}
    }
    if (!dataset.newDeaths) {
        dataset.newDeaths = {}
    }
    data.results.forEach(element => {
        if (!dataset.newCases[element.date]) {
            dataset.newCases[element.date] = 0
        }
        dataset.newCases[element.date] += element.new_confirmed

        if (!dataset.newDeaths[element.date]) {
            dataset.newDeaths[element.date] = 0
        }
        dataset.newDeaths[element.date] += element.new_deaths
    })
}

function sum(numbers) {
    return _.reduce(numbers, (a, b) => a + b, 0);
}

function average(numbers) {
    return sum(numbers) / (numbers.length || 1);
}

function make_window(before, after) {
    return function(_number, index, array) {
        const start = Math.max(0, index - before);
        const end = Math.min(array.length, index + after + 1);
        return _.slice(array, start, end);
    }
}

// https://purelyfunctional.tv/article/moving-average/
function moving_average(before, after, numbers) {
    return _.chain(numbers)
        .map(make_window(before, after))
        .map(average)
        .value();
}

function sevenDaysMovingAverage(data) {
    return moving_average(6, 0, data);
}

function plotData(canvasId, dataset, label, loadingId, field, color) {
    const ctx = document.getElementById(canvasId).getContext('2d')

    const labels = Object.keys(dataset[field]).reverse()
    const data = Object.values(dataset[field]).reverse()
    const average = sevenDaysMovingAverage(data)

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Média móvel para " + label,
                backgroundColor: 'transparent',
                borderColor: color,
                data: average,
                fill: false,
            }, {
                label: label,
                backgroundColor: 'rgba(127,127,127,0.3)',
                borderColor: 'transparent',
                data: data,
                fill: false,
            }]
        },
        options: {
            maintainAspectRatio: false,
        }
    })

    document.getElementById(loadingId).style.display = "none"
}

function getNextData(url, callbackAddToDataset, callbackPlotData) {
    if (url) { // while has next
        fetch(url).then(response =>
            response.json().then(data => {
                callbackAddToDataset(data)
                getNextData(data.next, callbackAddToDataset, callbackPlotData)
            })
        ).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    } else { // finished loading data
        callbackPlotData()
    }
}