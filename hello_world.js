
looker.plugins.visualizations.add({
  create: function(element, config) {
    const css = element.innerHTML = `
      <style>
        .hello-world-vis {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
      </style>
    `

    const container = element.appendChild(document.createElement('div'))
    container.className = 'hello-world-vis'

    this._textElement = container.appendChild(document.createElement('div'))
  },
  updateAsync: function(data, element, config, queryResponse, details, done) {
    const firstRow = data[0]
    const firstCell = firstRow[queryResponse.fields.dimensions[0].name]

    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell)
    done()
  },
})
