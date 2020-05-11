
let datasetState = {}

function addToStateDataset(data) {
    addToDataset(data, datasetState)
}

function plotStateData() {
    plotData('new-cases-state', datasetState, "Novos casos por dia no Paraná", 'new-cases-loading-state', 'newCases', "#f6c23e")
    plotData('new-deaths-state', datasetState, "Novos óbitos por dia no Paraná", 'new-deaths-loading-state', 'newDeaths', "#e74a3b")
}

const urlState = 'https://brasil.io/api/dataset/covid19/caso_full/data/?format=json&place_type=state&state=PR'
getNextData(urlState, addToStateDataset, plotStateData)
