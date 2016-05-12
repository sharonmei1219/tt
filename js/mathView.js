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

	$('#maxCountButton').click(function(){
		value = $('#maxCountInput').val()
		if(value){
			loadMaxProblemOfCount(value, problemZone)
		}
	})

	$('#minCountButton').click(function(){
		value = $('#minCountInput').val()
		if(value){
			loadMinProblemOfCount(value, problemZone)
		}
	})

	$('#multiplyCountButton').click(function(){
		value = $('#multiplyCountInput').val()
		if(value){
			loadMultiplyProblemsOfCount(value, problemZone)
		}
	})

	$('#applicationCountButton').click(function(){
		value = $('#applicationCountInput').val()
		if(value){
			loadApplicationProblem(value, problemZone)
		}
	})

	$('#linerEquationButton').click(function(){
		value = $('#linerEquationInput').val()
		if(value){
			loadLinearEquationWithOneUnknown(value, problemZone)
		}
	})
})