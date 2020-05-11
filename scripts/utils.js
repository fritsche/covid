
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

function plotData(canvasId, dataset, label, loadingId, field, color) {
    const ctx = document.getElementById(canvasId).getContext('2d')
    
    const labels = Object.keys(dataset[field]).reverse()
    const data = Object.values(dataset[field]).reverse()
    // remove the last record (usually the last record is not updated)
    labels.pop()
    data.pop()
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                backgroundColor: color,
                borderColor: color,
                data: data,
                fill: false,
            }]
        },
        options: {}
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
        ).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    } else { // finished loading data
        callbackPlotData()
    }
}
