
let datasetState = {}

function addToStateDataset(data) {
    addToDataset(data, datasetState)
}

function plotStateData(state) {
    plotData('canvas-state', datasetState, state, 'loading-state')
}

const urlState = 'https://brasil.io/api/dataset/covid19/caso_full/data/?format=json&place_type=state&state=PR'
getNextData(urlState, addToStateDataset, plotStateData, "Novos casos por dia no Paraná")
