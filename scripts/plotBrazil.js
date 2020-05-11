
let datasetBrazil = {}

function addToBrazilDataset(data) {
    addToDataset(data, datasetBrazil)
}

function plotBrazilData() {
    plotData('new-cases-brazil', datasetBrazil, "Novos casos por dia no Brasil", 'new-cases-loading-brazil', 'newCases', "#f6c23e")
    plotData('new-deaths-brazil', datasetBrazil, "Novos óbitos por dia no Brasil", 'new-deaths-loading-brazil', 'newDeaths', "#e74a3b")
}

const urlBrazil = 'https://brasil.io/api/dataset/covid19/caso_full/data/?format=json&place_type=state'
getNextData(urlBrazil, addToBrazilDataset, plotBrazilData)
