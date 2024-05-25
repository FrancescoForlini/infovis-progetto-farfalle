console.log("Hello world!")
console.log("Butterflies project")


function creaBordoSVG(svg, height, width){
	var linea_orizz_1 = svg
		.append("path")
		.attr("d", `m0 0 L ${width} 0`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");

var punto_vert_1 = svg
		.append("path")
		.attr("d", `m0 0 L 0 ${height}`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");

var linea_diag_1 = svg
		.append("path")
		.attr("d", `m0 0 L ${width} ${height}`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");

var linea_diag_2 = svg
		.append("path")
		.attr("d", `m 0 ${height} L ${width} 0`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");

var linea_orizz_2 = svg
		.append("path")
		.attr("d", `m 0 ${height} L ${width} ${height}`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");

var linea_vert_2 = svg
		.append("path")
		.attr("d", `m${width} ${height} L ${width} 0`)
		.selection().style("stroke", "red")
		.selection().style("stroke-width", "5")
		.selection().style("opacity", "0.2");
}


function changeTraslation(gh, x, y){
	gh.attr("transform", `translate(${x}, ${y})`).attr("fill", "grey");
}


function moveInCoordinates(data, i){ /* non servirebbe fare tutta una funzione */

	let scaleX = xScaleCoordinates(data.variables.x_coordinate);
	let scaleY = yScaleCoordinates(data.variables.y_coordinate);

	if(i){
	return `translate(${scaleX}, ${scaleY})`;
	}
	else{
		return `translate(${scaleX}, ${scaleY}) rotate(${Math.floor(Math.random() * 361)})`;
	}
}


function makeButterfly(g_butterflies){ //potevo anche fare senza creare i primi g che per ogni dato con il for creavo roba
	
	var butterflyData = g_butterflies.data() 

	var butterflyBodyScale = d3.scaleLinear().domain(butterflyBodyRange).range([20, 100]).clamp(true);  // body [20, 100]
	var butterflyHeadScale = d3.scaleLinear().domain(butterflyHeadRange).range([10, 40]).clamp(true);  // wing  [20, 150]
	var butterflyWingsScale = d3.scaleLinear().domain(butterflyWingsRange).range([20, 150]).clamp(true);  // head  [10, 40]

	
	var wings = g_butterflies.append("path")
				.attr("d", function(d){
							let s_b = butterflyBodyScale(d.variables.size_body);
							let s_w = butterflyWingsScale(d.variables.size_wings);

							let body_wings_scale1 = d3.scaleLinear().domain([0, 100]).range([0, 10]).clamp(true) //su g_b

						   return `M${s_b*0.167 + body_wings_scale1(s_b - s_w)} 0 C ${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*0.33} ${s_w*1.5}, ${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w} 10, ${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*0.4} 5
														       C ${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*1.2} 5, ${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*0.7} -${s_w*1.8}, ${s_b*0.167 + body_wings_scale1(s_b - s_w)} 0` + //r w
					   			  `M-${s_b*0.167 + body_wings_scale1(s_b - s_w)} 0 C -${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*0.7} -${s_w*1.8}, -${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*1.2} 5, -${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w*0.4} 5
					   										   C -${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w} 10, -${s_b*0.167 + body_wings_scale1(s_b - s_w) + s_w/2} ${s_w*1.5}, -${s_b*0.167 + body_wings_scale1(s_b - s_w)} 0`; // l w
					   										})
				.style("fill", function(d) { return d.variables.color})
				.style("stroke", "black"); 


	var body = g_butterflies.append("ellipse")
					.attr("cx", 0)
					.attr("cy", 0)
					.attr("rx", function(d) { return butterflyBodyScale(d.variables.size_body)*0.33;} )
					.attr("ry", function(d) { return butterflyBodyScale(d.variables.size_body);} )
					.style("fill", function(d) { return d.variables.color})
					.style("stroke", "black");


	var head = g_butterflies.append("ellipse")
				.attr("cx", "0")
				.attr("cy", function(d){ 
					return - butterflyBodyScale(d.variables.size_body) - butterflyHeadScale(d.variables.size_head)*0.3}) //-s_b - s_h*0.3
				.attr("rx", function(d) { return butterflyHeadScale(d.variables.size_head)} )
				.attr("ry", function(d) { return butterflyHeadScale(d.variables.size_head)*0.9} )
				.style("fill", function(d) { return d.variables.color})
				.style("stroke", "black");



	var centro_butterfly = g_butterflies
			.append("circle")
			.attr("cx", "0")
			.attr("cy", "0")
			.attr("r", 1)
			.style("fill", "black");

	g_butterflies.attr("transform", function(d){ return moveInCoordinates(d, true)} );
	console.log("adios makeButterfly")

}


function makeButterfly2(g_butterf){

	var butterfly = g_butterf
			.append("path")
			.attr("d", function(d){

				let body_scale = d3.scaleLinear().domain(butterflyBodyRange).range([50, 200]).clamp(true)
				let wings_scale = d3.scaleLinear().domain(butterflyWingsRange).range([50, 200]).clamp(true)
				let head_scale = d3.scaleLinear().domain(butterflyHeadRange).range([25, 100]).clamp(true)

				let g_b = body_scale(d.variables.size_body);  // [50, 200]
				let g_w = wings_scale(d.variables.size_wings);   // [50, 200]
				let g_h = head_scale(d.variables.size_head);   // [25, 100]


				let body_head_scale= d3.scaleLinear().domain([0, 400]).range([0, 100]).clamp(true)  // g_b - g_h (serve per adeguare la testa al corpo)

				let body_wings_scale = d3.scaleLinear().domain([0, 200]).range([0, 20]).clamp(true)  // g_b - g_w (serve per adeguare le ali al corpo)			

				return `M0 -${g_b*0.25 + body_head_scale(g_b - g_h)} C ${g_h/2} -${g_b*0.25 + body_head_scale(g_b - g_h)}, ${g_h/2} -${g_b*0.25 + g_h + body_head_scale(g_b - g_h)}, 0 -${g_b*0.25 + g_h + body_head_scale(g_b - g_h)}
													  			  C -${g_h/2} -${g_b*0.25 + g_h + body_head_scale(g_b - g_h)}, -${g_h/2} -${g_b*0.25 + body_head_scale(g_b - g_h)} , 0 -${g_b*0.25 + body_head_scale(g_b - g_h)}` + // head
						
						`M0 -${g_b/2} C -${g_b*0.25} -${g_b/2}, -${g_b*0.25} ${g_b/2}, 0 ${g_b/2}
								 	  C ${g_b*0.25} ${g_b/2}, ${g_b*0.25} -${g_b/2}, 0 -${g_b/2}`+  // body
						
						`M${g_b*0.0625 + body_wings_scale(g_b - g_w)} 0 C ${g_b*0.0625 + g_w*0.5 + body_wings_scale(g_b - g_w)} ${g_w*1.2}, ${g_b*0.0625 + g_w + body_wings_scale(g_b - g_w)} ${10}, ${g_b*0.0625 + g_w/2 + body_wings_scale(g_b - g_w)} 5 
									      				 			C ${g_b*0.0625 + g_w + body_wings_scale(g_b - g_w)} 0, ${g_b*0.0625 + g_w*0.8 + body_wings_scale(g_b - g_w)} -${g_b*0.0625 + g_w*1.5}, ${g_b*0.0625 + body_wings_scale(g_b - g_w)} 0` + //r w
						
						`M-${g_b*0.0625 + body_wings_scale(g_b - g_w)} 0 C -${g_b*0.0625 + g_w*0.8 + body_wings_scale(g_b - g_w)} -${g_b*0.0625 + g_w*1.5}, -${g_b*0.0625 + g_w + body_wings_scale(g_b - g_w)} 0, -${g_b*0.0625 + g_w/2 + body_wings_scale(g_b - g_w)} ${5}
							   			  							 C -${g_b*0.0625 + g_w + body_wings_scale(g_b - g_w)} ${10}, -${g_b*0.0625 + g_w*0.5 + body_wings_scale(g_b - g_w)} ${g_w*1.2}, -${g_b*0.0625 + body_wings_scale(g_b - g_w)} 0`; //lw
								   } )
			.style("fill", function(d) { return d.variables.color})
			.style("stroke", "black");	



	var centro_butterfly = g_butterf
			.append("circle")
			.attr("cx", "0")
			.attr("cy", "0")
			.attr("r", 1)
			.style("fill", "black");



	g_butterf.attr("transform", function(d){ return moveInCoordinates(d, true)} );

}


function changePositionButterflies(dat, j){
		
		console.log("Cambio le posizioni delle farfalle");
		
		if(j){
			dat.push(dat.shift());
		}
		else{ //ordine inverso
			dat.unshift(dat.pop());
		}
		butterflies.data(dat).transition().duration(1000)
			.attr("transform", function(d){ return moveInCoordinates(d, false)} );

		return dat
}

/**
 * Created by Francesco Forlini on /05/2024.
 */
var div_container = d3.select("body").append("div").attr("class", "div-container");
 
var margin = {top: 25, right: 50, bottom: 25, left: 50};

/* height: 600px,  width : 1300px; */
var height = 700 - margin.top - margin.bottom; /*altezza svg 600*/
var width = 1500 - margin.right - margin.left; /*larghezza svg 1300*/

var svgg = d3.select(".div-container").append("svg")
 			.attr("width", width)
 			.attr("height", height)
 			.attr("id", "svg1"); /* centro l'SVG*/ 

creaBordoSVG(svgg, height, width)


/*Coordinates scale*/
var rangeXCoordinates = [0, 130];  // range di valori da inserire per la coordinata x, valore impostato di default se > o <
var rangeYCoordinates = [0, 60];  // range di valori da inserire per la coordinata y, valore impostato di default se > o <

var xScaleCoordinates = d3.scaleLinear().domain(rangeXCoordinates).range([50, width-50]).clamp(true); //posso cambairlo per mettere le farfalle in certi bordi
var yScaleCoordinates = d3.scaleLinear().domain(rangeYCoordinates).range([50, height-50]).clamp(true);


/*Butterfly scale*/
var butterflyBodyRange = [0, 100];  // range di valori da inserire per le dimensioni della farfalla,
								    // valore impostato di default se > o < 
/*Butterfly head scale*/
var butterflyHeadRange = [0, 100];

/*Butterfly head scale*/
var butterflyWingsRange = [0, 100]; 

var butterflies

d3.json("data/dataset.json").then( function(data){

	butterflies = svgg.selectAll('.ng')
					.data(data)
					.enter()
					.append("g")
					.attr("class", "ng");

	makeButterfly(butterflies);


	butterflies.on("mouseover", function() {
    	 this.style.opacity = 0.7;
	 	})
		.on("mouseout", function(){
			this.style.opacity = 1;
		});

	let i = true; 

	d3.selectAll(".ng").on("click", function() {
    	data = changePositionButterflies(data, i);
	});

	d3.select("body").on("keydown", function(event) { if (event.key === 'r') {i = false;} } ) 
					 .on("keyup", function(event){ if (event.key === 'r') {i = true;} })

	});