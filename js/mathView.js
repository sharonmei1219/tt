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

	if(viewClass == "MD" || viewClass == "MD-NARROW"){
		columnCount = 2
	}else if(viewClass == "LG" || viewClass == "LG-NARROW"){
		console.log(viewClass)
		columnCount = 1
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
		console.log(viewClass)
		problem = $("<div>", {class: "problem" + viewClass}).append(elem)
		columnId = "#" + getColumnId(columnIndex)
		_section.find(columnId).append(problem)
		columnIndex = (columnIndex + 1)%columnCount;
	}
}

function ctr(placeholder, loadingFunction, configureCtrlID){
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

	if(configureCtrlID){
		console.log(configureCtrlID)
		var configureSpan = $('<span>', {class: 'input-group-btn'})
		var configureExpandButton = $('<button>', {class: "btn btn-secondary btn-info",
									 type: "button",
									 "data-toggle":"collapse",
									 "data-target": "#" + configureCtrlID})
		configureExpandButton.text("...")
		configureSpan.append(configureExpandButton)
		addingProblem.append(configureSpan)
	}

	return addingProblem
}

function clockConfig(){
	var configCtrl = $('<div>', {class: "collapse", id: "configClock"})
	var gapControl = $('<div>', {class: "checkbox"})
	configCtrl.append(gapControl)

	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confMinZero" value="">分钟不变</label>'))
	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confMinNoCarryOver" value="" checked="checked">分钟不进位</label>'))
	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confMinOnClock" value="">分钟到整点</label>'))
	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confMinCarryOver" value="">分钟进位整点</label>'))

	gapControl = $('<div>', {class: "checkbox"})
	configCtrl.append(gapControl)

	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confHourZero" value="">时钟不变</label>'))
	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confHourNoCarryOver" value="" checked="checked">时钟不进位</label>'))

	gapControl = $('<div>', {class: "checkbox"})
	configCtrl.append(gapControl)

	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confTimeFormatAdd" value="" checked="checked">之后</label>'))
	gapControl.append($('<label class="checkbox"><input type="checkbox" id="confTimeFormatSub" value="" checked="checked">之前</label>'))


	return configCtrl
}

$(function(){
	problemZone = $('#customized-problem-zone')
	buttonZone = $('#button-zone')

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
	buttonZone.append(ctr('求最大值', loadMaxProblemOfCount))
	buttonZone.append(ctr('求最小值', loadMinProblemOfCount))
	buttonZone.append(ctr('数射线', loadAxisProblem))
	buttonZone.append(ctr('时间', loadClockProblems, "configClock"))
	buttonZone.append(clockConfig())
	buttonZone.append(ctr('乘法题', loadMultiplyProblemsOfCount))
	buttonZone.append(ctr('一元一次方程', loadLinearEquationWithOneUnknown))
	buttonZone.append(ctr('应用题', loadApplicationProblem))
})