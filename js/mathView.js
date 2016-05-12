function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInRange(range){//range is a tupple
	return getRandomInt(range[0], range[1])
}

function pickRamdomItemInList(list){
	index = getRandomInt(0, list.length - 1)
	return list[index]
}

function getRandomNumbersWithMinGap(start, end, count, gap){
	var result = []
	randEnd = end - (count-1) * gap
	//random numbers
	for(i = 0; i < count; i++){
		result.push(getRandomInt(start, randEnd))
	}

	//sort random numbers
	result.sort(function(a, b){return a - b})

	//make gap
	for(i = 1; i < count; i++){
		result[i] = result[i] + gap * i
	}

	return result
}

function ProblemView(zone, title, viewClass){

	if(viewClass == "MD"){
		columnCount = 2
	}else if(viewClass == "LG"){
		columnCount = 1
		viewClass = "LG"
	}else{
		columnCount = 4
		viewClass = "SM"
	}

	function getColumnId(columnIndex){
		return 'column-' + (columnIndex+1).toString()
	}

	function problemSection(){
		section = $('<div/>').html('<div class="row"></div>').contents()
		columnWidth = (12/columnCount).toString();
		for(var i = 0; i < columnCount; i++){
			section.append('<div class="col-xs-' + columnWidth +'" id="' + getColumnId(i) +'">')
		}
		return section
	}

	var framediv = $("<div>", {class: "problemSectionFrame"});
	var columnIndex = 0
	var _section = problemSection()
	if (title){
		framediv.append("<p>" + title + "</p>")
	}
	framediv.append(_section)
	zone.append(framediv)

	this.putProblem = function(problem){
		columnId = "#" + getColumnId(columnIndex)
		_section.find(columnId).first().append('<p class="problem' + viewClass + '">'+problem+'</p>')
		columnIndex = (columnIndex + 1)%columnCount;
	}

	this.putProblemHtmlElement = function(elem){
		problem = $("<div>", {class: "problem" + viewClass}).append(elem)
		columnId = "#" + getColumnId(columnIndex)
		_section.find(columnId).append(problem)
		columnIndex = (columnIndex + 1)%columnCount;
	}
}


$(function(){
	problemZone = $('#customized-problem-zone')

	$('.print-button').click(function(){
		window.print()
	})

	$('#clearCustomizedZoneButton').click(function(){
		$('#customized-problem-zone').find('.problemSectionFrame').remove()
	})

	$('#plusMinusCountButton').click(function(){
		value = $('#plusMinusCountInput').val()
		if(value){
			loadNormalProblemsOfCount(value, problemZone)
		}
	})

	// $('#maxCountButton').click(function(){
	// 	value = $('#maxCountInput').val()
	// 	if(value){
	// 		loadMaxProblemOfCount(value, problemZone)
	// 	}
	// })


	function createControl(placeholder, loadingFunction){
		var addingProblem = $('<div>', {class: "input-group"})
		var number = $('<input>').attr({type:'number',
	                                 class: 'form-control',
	                                 placeholder: placeholder})
		var addingButtonSpan = $('<span>', {class: 'input-group-btn'})
		var button = $('<button>', {class: "btn btn-secondary",
										 type: "button",
										 id: "sharon"})
		button.text("Add")
		addingButtonSpan.append(button)

		addingProblem.append(number)
		addingProblem.append(addingButtonSpan)
		button.click(function(){
			loadingFunction(number.val(), problemZone)
		})
		return addingProblem
	}


	$('#button-zone').append(createControl('求最大值', loadMaxProblemOfCount))
	$('#button-zone').append(createControl('求最小值', loadMinProblemOfCount))
	$('#button-zone').append(createControl('乘法题', loadMultiplyProblemsOfCount))
	$('#button-zone').append(createControl('一元一次方程', loadLinearEquationWithOneUnknown))
	$('#button-zone').append(createControl('应用题', loadApplicationProblem))




	$('#linerEquationButton').click(function(){
		value = $('#linerEquationInput').val()
		if(value){
			loadLinearEquationWithOneUnknown(value, problemZone)
		}
	})
})