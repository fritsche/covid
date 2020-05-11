
function addToDataset(data, dataset) {
    if (!dataset.newCases) {
        dataset.newCases = {}
    } 
    data.results.forEach(element => {
        if (!dataset.newCases[element.date]) {
            dataset.newCases[element.date] = 0
        }
        dataset.newCases[element.date] += element.new_confirmed
    })
}

function plotData(canvasId, dataset, label, loadingId) {
    const ctx = document.getElementById(canvasId).getContext('2d')
    
    const labels = Object.keys(dataset.newCases).reverse()
    const data = Object.values(dataset.newCases).reverse()
    // remove the last record (usually the last record is not updated)
    labels.pop()
    data.pop()
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                backgroundColor: 'firebrick',
                borderColor: 'firebrick',
                data: data,
                fill: false,
            }]
        },
        options: {}
    })

    document.getElementById(loadingId).style.display = "none"
}

function getNextData(url, callbackAddToDataset, callbackPlotData, label) {
    if (url) { // while has next
        fetch(url).then(response =>
            response.json().then(data => {
                callbackAddToDataset(data)
                getNextData(data.next, callbackAddToDataset, callbackPlotData, label)
            })
        ).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    } else { // finished loading data
        callbackPlotData(label)
    }
}
