function clockTime(hour, min){
	var canvas = $('<canvas>', {width:"300 px", height:"300 px"})
	var ctx = canvas[0].getContext("2d")
	var radius = canvas[0].height / 2;
	ctx.translate(radius, radius);
    var angHour = (hour*Math.PI/6)+(min*Math.PI/(6*60))
    var angMin = (min*Math.PI/30)

    drawFace()
    drawDot()

    drawHand(angMin, 2, radius * 0.7)
    drawHand(angHour, 4, radius * 0.5)

    this.view = function(){
	    return canvas
	}

	function drawFace(){
		radius = radius * 0.90
	    ctx.arc(0, 0, radius, 0 , 2*Math.PI);
	    ctx.fillStyle = "white";
	    ctx.stroke();
	}

	function drawHand(ang, width, length){
	    ctx.beginPath();
	    ctx.lineWidth = width;
	    ctx.lineCap = "round";
	    ctx.moveTo(0,0);
	    ctx.rotate(ang);
	    ctx.lineTo(0, -length);
	    ctx.stroke();
	    ctx.rotate(-ang);
	}

	function drawDot(){
	    ctx.font = "12px arial";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = "black";
	    ctx.textAlign="center";

	    for(i = 1; i < 13; i++){
	        ang = i * Math.PI / 6;
	        ctx.rotate(ang);
	        ctx.translate(0, -radius*0.85);
	        ctx.rotate(-ang);
	        if(i % 3 == 0){
		        ctx.fillText(i.toString(), 0, 0);
		    }else{
		    	ctx.beginPath()
		    	ctx.arc(0, 0, 1, 0, 2*Math.PI)
		    	ctx.fill()
		    }
	        ctx.rotate(ang);
	        ctx.translate(0, radius*0.85);
	        ctx.rotate(-ang);
	    }
	}
}


function intervalToString(hrGap, minGap){
	result = ""
	if(hrGap != 0){
		result = result + hrGap.toString() + "小时"
	}
	if(minGap != 0){
		result = result + minGap.toString() + "分钟"
	}
	return result
}

function time(hour, min){
	this.hour = hour,
	this.min = min
	this.plus = function(gap){
		m = (min + gap.min)%60
		c = Math.floor((min + gap.min)/60)
		h = hour + gap.hour + c
		return new time(h, m)
	}

	this.toString = function(){
		if(min >= 10){
			minStr = min.toString()
		}if(min < 10){
			minStr = "0" + min.toString()
		}
		return hour.toString() + ":" + minStr
	}

}

function clockProblem(in_min, in_max, in_gap){
	this.min = in_min
	this.max = in_max
	this.gap = in_gap
}

function newProb(hGap, mGap){
	var min = randomNow()
	var gap = new time(hGap(min.hour), mGap(min.min))
	var max = min.plus(gap)
	return new clockProblem(min, max, gap)
}

function formatGreaterProb(prob){
	var result = $('<div>')
	var startDiv = $('<div>', {class:"col-xs-5"})
	var endDiv = $('<div>', {class:"col-xs-5"})
	result.append((new clockTime(prob.min.hour, prob.min.min)).view())
	result.append('<p>现在时间是:_____________</p>')
	result.append('<p>'+ intervalToString(prob.gap.hour, prob.gap.min) + '之后时间是:_____________</p>')
	return result
}

function formatLessProb(prob){
	var result = $('<div>')
	result.append((new clockTime(prob.max.hour, prob.max.min)).view())
	result.append('<p>现在时间是:_____________</p>')
	result.append('<p>'+ intervalToString(prob.gap.hour, prob.gap.min) + '之前时间是:_____________</p>')
	return result
}

function formatGapProb(prob){
	var result = $('<div>')
	result.append('<p>从' + prob.min.toString() + '到' + prob.max.toString() + '经过了多长时间？</p>')
	result.append('<p>___________________</p>')
	return result
}

function problemGen(hGap, mGap, formator){
	this.getProblem = function(){
		prob = newProb(hGap, mGap)
		console.log(prob)
		elem = formator(prob)
		console.log(elem)
		return elem
	}
}

function randomNow(){
	hour = getRandomInt(1, 10)
	min = getRandomInt(1, 10) * 5

	return new time(hour, min) 
}

function zeroMinGap(min){
	return 0
}

function zeroHourGap(hour){
	return 0
}

function carryOverMinGap(min){
	return 60 + getRandomInt(1, min/5-1)* 5 - min
}

function noCarryOverMinGap(min){
	return getRandomInt(min/5 + 1, 11) * 5 - min
}

function toHourMinGap(min){
	return 60 - min
}

function noCarryOverHourGap(hour){
	return getRandomInt(hour, 11) - hour
}

function readConfiguration(){
	var result = []
	var minGapList = []
	if($("#confMinZero").is(':checked')){
		minGapList.push(zeroMinGap)
	}
	if($("#confMinNoCarryOver").is(':checked')){
		minGapList.push(noCarryOverMinGap)
	}
	if($("#confMinOnClock").is(':checked')){
		minGapList.push(toHourMinGap)
	}
	if($("#confMinCarryOver").is(':checked')){
		minGapList.push(carryOverMinGap)
	}

	var hourGapList = []
	if($("#confHourZero").is(':checked')){
		hourGapList.push(zeroHourGap)
	}
	if($("#confHourNoCarryOver").is(':checked')){
		hourGapList.push(noCarryOverHourGap)
	}

	var formattorList = []
	if($("#confTimeFormatAdd").is(':checked')){
		formattorList.push(formatGreaterProb)
	}
	if($("#confTimeFormatSub").is(':checked')){
		formattorList.push(formatLessProb)
	}
	if($("#confTimeFormatGap").is(':checked')){
		formattorList.push(formatGapProb)
	}

	for(var iMin = 0; iMin < minGapList.length; iMin ++){
		for(var iHour = 0; iHour < hourGapList.length; iHour ++){
			for(var iFor = 0; iFor < formattorList.length; iFor ++){
				result.push(new problemGen(hourGapList[iHour], minGapList[iMin], formattorList[iFor]))
			}
		}
	}

	return result
}

function loadClockProblems(count, problemZone){
	pv = new ProblemView(problemZone, '填写时间', 'MD-SMALL-GAP')
	for(var i = 0; i < count; i++){
		var config =  pickRamdomItemInList(readConfiguration())
		pv.putProblemHtmlElement(config.getProblem())
	}
}