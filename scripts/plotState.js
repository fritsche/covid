let datasetState = {}
let chartStateNewCases
let chartStateNewDeaths

function addToStateDataset(data) {
    addToDataset(data, datasetState)
}

function plotStateData() {
    chartStateNewCases = plotData('new-cases-state', datasetState, "Novos casos por dia", 'new-cases-loading-state', 'newCases', "#f6c23e", chartStateNewCases)
    chartStateNewDeaths = plotData('new-deaths-state', datasetState, "Novos óbitos por dia", 'new-deaths-loading-state', 'newDeaths', "#e74a3b", chartStateNewDeaths)
}

function fetchAndPlotState(state) {
    datasetState = {}
    let urlState = 'https://brasil.io/api/dataset/covid19/caso_full/data/?'
    urlState += 'format=json&place_type=state&state=' + state
    getNextData(urlState, addToStateDataset, plotStateData)
}

document.getElementById("state-input").addEventListener("focusout", (e) => fetchAndPlotState(e.target.value))
fetchAndPlotState("PR")