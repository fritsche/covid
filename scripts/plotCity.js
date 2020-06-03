let datasetCity = {}

function addToCityDataset(data) {
    addToDataset(data, datasetCity)
}

function plotCityData() {
    plotData('new-cases-city', datasetCity, "Novos casos por dia no Paraná", 'new-cases-loading-city', 'newCases', "#f6c23e")
    plotData('new-deaths-city', datasetCity, "Novos óbitos por dia no Paraná", 'new-deaths-loading-city', 'newDeaths', "#e74a3b")
}

function fetchAndPlot(city) {
    datasetCity = {}
    let urlCity = 'https://brasil.io/api/dataset/covid19/caso_full/data/?'
    urlCity += 'format=json&place_type=city&city=' + city
    getNextData(urlCity, addToCityDataset, plotCityData)
}

document.getElementById("city-input").addEventListener("focusout", (e) => fetchAndPlot(e.target.value))
fetchAndPlot("Curitiba")