
const datasetBrazil = {}

function addToBrasilDataset(data) {
    addToDataset(data, datasetBrazil)
}

function plotBrazilData(label) {
    plotData('canvas-brazil', datasetBrazil, label, 'loading-brazil')
}

const urlBrazil = 'https://brasil.io/api/dataset/covid19/caso_full/data/?format=json&place_type=state'
getNextData(urlBrazil, addToBrasilDataset, plotBrazilData, "Novos casos por dia no Brasil")
