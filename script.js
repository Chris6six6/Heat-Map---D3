// URL del archivo JSON que contiene los datos
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

// Cargar los datos JSON desde la URL y llamar a la función init cuando estén listos
d3.json(url).then(data => init(data)).catch(error => console.error('Error al cargar los datos:', error));

// Función init que se ejecuta cuando los datos se cargan correctamente
function init(data) {
    
    // Definir dimensiones y márgenes del gráfico
    const fontSize = 16; // Tamaño de la fuente base
    const width = 5 * Math.ceil(data.monthlyVariance.length / 12); // Ancho del gráfico
    const height = 33 * 12; // Alto del gráfico
    const padding = { // Márgenes del gráfico
        left: 9 * fontSize,
        right: 9 * fontSize,
        top: 1 * fontSize,
        bottom: 8 * fontSize
    };

    // Crear el elemento SVG y agregarlo al cuerpo del documento
    const svg = d3.select("body").append("svg")
        .attr("width", width + padding.left + padding.right)
        .attr("height", height + padding.top + padding.bottom);

    // Crear el grupo principal donde se dibujarán los elementos del gráfico
    const mainGroup = svg.append("g")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    // Escala para los años en el eje x
    const xScale = d3.scaleBand()
        .domain(data.monthlyVariance.map(val => val.year)) // Dominio para los años
        .rangeRound([0, width]) // Rango de la escala (ancho del gráfico)

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    // Escala para los meses en el eje y
    const yScale = d3.scaleBand()
        .domain(months) // Dominio para los meses (0-11)
        .range([0, height]) // Rango de la escala (alto del gráfico)

    // Definir la escala de colores
    const colors = ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#FF7733", "#FF6633", "#a50026"];
    const colorScale = d3.scaleQuantize()
        .domain(d3.extent(data.monthlyVariance, d => d.variance))
        .range(colors)

    // Definir los ejes
    const xAxis = d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter(year => year % 10 === 0)) // Mostrar solo años que son múltiplos de 10
        .tickSize(10, 1); // Tamaño de las marcas del eje x

    const yAxis = d3.axisLeft(yScale)

    // Agregar los ejes al grupo principal
    mainGroup.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .append('text')
        .text('Years')
        .style('font-size', '15px')
        .attr('transform', 'translate(' + width / 2 + ',' + 4 * fontSize + ')')
        .attr('fill', 'white');

    mainGroup.append("g")
        .attr("id", "y-axis")
        .call(yAxis)
        .append('text')
        .text('Months')
        .style('font-size', '15px')
        .attr('transform','translate(' + -6 * fontSize + ',' + height / 2 + ')' + 'rotate(-90)')
        .attr('fill', 'white');

    // Crear y agregar los rectángulos para el gráfico de barras de calor
    mainGroup.selectAll("rect")
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr('data-year', d => d.year)
    .attr('data-month', d => d.month - 1)
    .attr('data-temp', d => 8.66 + d.variance)
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(months[d.month - 1]))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(d.variance))
    .on('mouseover', function (event, d) {
        // Cuando se activa el evento mouseover, se muestra el tooltip
        tooltip.transition()
            .duration(200) // Duración de la transición
            .style('opacity', 0.9) // Hace visible el tooltip
            .attr('data-year', d.year);
        // Establece el contenido del tooltip
        tooltip.html(`${d.year} - ${months[d.month - 1]}<br/> 
            Temperature: ${(8.66 + d.variance).toFixed(2)} °C<br/>
            Variance: ${d.variance}`)
        .style('left', (event.pageX + 10) + 'px') // Posiciona el tooltip horizontalmente
        .style('top', (event.pageY + 10) + 'px') // Posiciona el tooltip verticalmente
        .style("background-color", "black")
        })
    .on('mouseout', function (d) {
        // Cuando se activa el evento mouseout, se oculta el tooltip
        tooltip.transition()
            .duration(100) // Duración de la transición
            .style('opacity', 0); // Oculta el tooltip
        });

    // Crea el tooltip
    const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0) // Establece la opacidad inicial del tooltip
    .style("position", "absolute")
    .style("background-color", "steelblue") // Color de fondo del tooltip
    .style("color", "#fff") // Color del texto del tooltip
    .style("padding", "10px") // Añade un relleno al tooltip
    .style("font-size", "15px") // Establece el tamaño de fuente del tooltip
    .style("text-align", "left"); // Alinea el texto a la izquierda

    // Crear un grupo para el legend
    const legendGroup = mainGroup.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${width - 220}, ${height - 150})`);

    // Crear rectángulos coloreados en el legend
    legendGroup.selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (d, i) => 20 * i)
    .attr("y", 240)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => d);

    // Agregar texto que describa los valores de los colores
    legendGroup.selectAll("text")
    .data(colors)
    .enter()
    .append("text")
    .text((d, i) => {
            if (i === 0) return "Cold";
            else if (i === colors.length - 1) return "Hot";
            else return "";
        })
    .attr("x", (d, i) => 15 * i + 20)
    .attr("y", 255)
    .style("font-size", "12px")
    .attr("fill", "white");
}