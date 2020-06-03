let datasetCity = {}
let chartCityNewCases
let chartCityNewDeaths

function addToCityDataset(data) {
    addToDataset(data, datasetCity)
}

function plotCityData() {
    chartCityNewCases = plotData('new-cases-city', datasetCity, "Novos casos por dia", 'new-cases-loading-city', 'newCases', "#f6c23e", chartCityNewCases)
    chartCityNewDeaths = plotData('new-deaths-city', datasetCity, "Novos óbitos por dia", 'new-deaths-loading-city', 'newDeaths', "#e74a3b", chartCityNewDeaths)
}

function fetchAndPlotCity(city) {
    datasetCity = {}
    let urlCity = 'https://brasil.io/api/dataset/covid19/caso_full/data/?'
    urlCity += 'format=json&place_type=city&city=' + city
    getNextData(urlCity, addToCityDataset, plotCityData)
}

document.getElementById("city-input").addEventListener("focusout", (e) => fetchAndPlotCity(e.target.value))
fetchAndPlotCity("Curitiba")