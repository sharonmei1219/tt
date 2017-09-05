function NumberAxis(start, end, canvasCtx){
	var lineLength = canvasCtx.canvas.width - 0 - 30

	var offsetLeft = 10
	var totalPoints = end - start
	var gap = lineLength / totalPoints

	var offset = {
		left: 0,
		top: 50
	}
	var length = canvasCtx.canvas.width

	var smallMark = {u : -3, d : 0}
	var midumMark = {u : -6, d : 0}
	var largeMark = {u : -6, d : 6}
	var targetMark = {u : -8, d : -25}

	function pos(x){
		return offsetLeft + gap * (x - start)
	}

	function putMark(x, mark){
		var xp = pos(x)
		canvasCtx.moveTo(xp, offset.top + mark.u);
		canvasCtx.lineTo(xp, offset.top + mark.d);
		canvasCtx.stroke()
	}
	this.putMark = putMark

	function putText(x, text, textOff){
		var xp = pos(x)
		canvasCtx.fillText(text , xp + textOff.left, offset.top + textOff.top);
	}
	this.putText = putText

	this.drawAxis = function(){
		canvasCtx.moveTo(offset.left, offset.top);
		canvasCtx.lineTo(length, offset.top);
		canvasCtx.stroke();
	}

	this.drawSection = function(x0, x1, cu){
		var x0Pos = pos(x0)
		var x1Pos = pos(x1)

		canvasCtx.beginPath()
		canvasCtx.moveTo(x0Pos, offset.top)
		canvasCtx.quadraticCurveTo(x0Pos, offset.top + cu.h, x0Pos + Math.abs(cu.h), offset.top + cu.h)
		canvasCtx.lineTo(x1Pos - Math.abs(cu.h), offset.top + cu.h)
		canvasCtx.quadraticCurveTo(x1Pos, offset.top + cu.h, x1Pos, offset.top)

		canvasCtx.stroke();
	}

	this.drawSectionWithText = function(x0, x1, cu, text){
		this.drawSection(x0, x1, cu)
		midPos = (x0+x1)/2
		putText(midPos, text, {left:-6, top: cu.t})
	}

	this.drawNumberMark = function(){
		for(var x = start; x <= end; x++){
			if ((x % 10) == 0){
				putMark(x, largeMark)
				putText(x, x.toString(), {left: -6, top: 20})
				continue
			}

			if ((x % 5) == 0){
				putMark(x, midumMark)
				continue
			}

			putMark(x, smallMark)
		}
	}

	this.putTarget = function(target, tag){
		putMark(target, targetMark)
		putText(target, tag, {left: -4, top: -30})
	}

	this.putCurve = function(start, end){
		var p0 = pos(start)
		var p1 = pos(end)
		var h = (p0 + p1)/5
		var h0 = p0 + h
		var h1 = p1 - h

		canvasCtx.beginPath()
		canvasCtx.moveTo(p0, offset.top)
		canvasCtx.bezierCurveTo(h0, offset.top - h, h1, offset.top - h, p1, offset.top)
		canvasCtx.stroke()
	}
}


NumberAxis.U1 = {h: -30, t: -35}
NumberAxis.U2 = {h: -14, t: -18}
NumberAxis.U3 = {h: -8, t: -12}
NumberAxis.D1 = {h: 24, t: 36}
NumberAxis.D2 = {h: 8, t: 20}

NumberAxis.largeMark = {u : -6, d : 6}

function Section(b, e, t){
	this.x0 = b;
	this.x1 = e;
	this.type = t;
	this.mark = (e - b).toString();
}

function DistanceMode00(){
	var dim = 3
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[2]
	this.min = p[0]
	this.sections = [new Section(p[0], p[2], NumberAxis.U1),
					new Section(p[0], p[1], NumberAxis.U2),
					new Section(p[1], p[2], NumberAxis.U2)]
	var questionMarkIndex = getRandomInt(0, dim - 1)
	this.sections[questionMarkIndex].mark = "?"
}

function DistanceType11(){
	var dim = 4
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[dim - 1]
	this.min = p[0]

	var meanP = getRandomInt(1, 2)
	var interP0 = 3 - meanP
	var list = [0, 1, 2, 3]
	list.splice(interP0, 1)
	var interP1 = pickRamdomItemInList(list)
	var i0 = Math.min(interP0, interP1)
	var i1 = Math.max(interP0, interP1)

	this.sections = [new Section(p[0], p[3], NumberAxis.U1),
					 new Section(p[0], p[meanP], NumberAxis.U2),
					 new Section(p[meanP], p[3], NumberAxis.U2),
					 new Section(p[i0], p[i1], NumberAxis.D1)]

	var questionMarkIndex = getRandomInt(0, dim - 2)
	this.sections[questionMarkIndex].mark = "?"
}

function DistanceType12(){
	var dim = 4
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[dim - 1]
	this.min = p[0]

	var totalStart = getRandomInt(0, 1)
	var interP0 = 3 * (1 - totalStart)
	var list = [0, 1, 2, 3]
	list.splice(interP0, 1)
	var interP1 = pickRamdomItemInList(list)
	var i0 = Math.min(interP0, interP1)
	var i1 = Math.max(interP0, interP1)

	this.sections = [new Section(p[totalStart], p[totalStart + 2], NumberAxis.U1),
					 new Section(p[totalStart], p[totalStart + 1], NumberAxis.U2),
					 new Section(p[totalStart + 1], p[totalStart + 2], NumberAxis.U2),
					 new Section(p[i0], p[i1], NumberAxis.D1)]

	var questionMarkIndex = getRandomInt(0, dim - 2)
	this.sections[questionMarkIndex].mark = "?"
}

function DistanceType21(){
	var dim = 4
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[dim - 1]
	this.min = p[0]


	this.sections = [new Section(p[0], p[3], NumberAxis.U1),
					 new Section(p[0], p[1], NumberAxis.U2),
					 new Section(p[1], p[2], NumberAxis.U2),
					 new Section(p[2], p[3], NumberAxis.U2)]

	var questionMarkIndex = getRandomInt(0, dim - 1)
	this.sections[questionMarkIndex].mark = "?"
}

function DistanceType22(){
	var dim = 4
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[dim - 1]
	this.min = p[0]


	this.sections = [new Section(p[0], p[2], NumberAxis.U2),
					 new Section(p[2], p[3], NumberAxis.U2),
					 new Section(p[0], p[1], NumberAxis.D1),
					 new Section(p[1], p[3], NumberAxis.D1)]

	var questionMarkIndex = getRandomInt(0, dim - 1)
	this.sections[questionMarkIndex].mark = "?"
}

function DistanceType23(){
	var dim = 4
	this.dim = dim
	var p = getRandomNumbersWithMinGap(0, 100, dim, 10)
	this.p = p
	this.max = p[dim - 1]
	this.min = p[0]


	this.sections = [new Section(p[0], p[3], NumberAxis.U1),
					 new Section(p[0], p[2], NumberAxis.U2),
					 new Section(p[1], p[3], NumberAxis.D1),
					 new Section(p[1], p[2], NumberAxis.D2)]

	var questionMarkIndex = getRandomInt(0, dim - 1)
	this.sections[questionMarkIndex].mark = "?"
}


function formatDistanceProblem(problem){
	var pz = $("<div>");
	var cavas = $('<div/>').html('<canvas width="300" height="100"></canvas>').contents()
	pz.append(cavas)

	var context = cavas.get(0).getContext("2d")
	context.font = "12px Arial";

	var numberAxis = new NumberAxis(problem.min - 5, problem.max + 5, context)
	numberAxis.drawAxis()

	var sections = problem.sections
	for(var i = 0; i < problem.dim; i++){
		numberAxis.drawSectionWithText(sections[i].x0, sections[i].x1, sections[i].type, sections[i].mark)
	}

	return pz
}

function Axis(startInput, endInput){
	pz = $("<div>");
	cavas = $('<div/>').html('<canvas width="650" height="70"></canvas>').contents()
	pz.append(cavas)

	context = cavas.get(0).getContext("2d")
	context.font = "12px Arial";
	var numberAxis = new NumberAxis(startInput, endInput, context)
	numberAxis.drawAxis()
	numberAxis.drawNumberMark()


	function getTags(count){
		tag = "a".charCodeAt(0)
		tags = []
		for(i = 0; i < count; i++){
			tags.push(String.fromCharCode(tag + i))
		}
		return tags
	}

	this.withTellProblem = function(count){
		tags = getTags(count)


		aTof = getRandomNumbersWithMinGap(startInput, endInput, count, 4)
		for(i = 0; i < count; i++){
			numberAxis.putTarget(aTof[i], tags[i])
		}

		problemReadDetails = $('<div class = "row"></div')
		for(i = 0; i < count; i++){
			pdetail = $('<div class = "col-xs-4"></div>')
			pdetail.append($('<p>' + tags[i] + ' = (_____)</p>'))
			problemReadDetails.append(pdetail)
		}

		pz.append($('<p>' + tags.join(', ')+ '分别是多少</P>'))
		pz.append(problemReadDetails)
		return this
	};

	this.withMarkProblem = function(count){
		markNumber = getRandomNumbersWithMinGap(startInput, endInput, count, 4)
		pz.append($('<p>' + "请在数射线上标出" + markNumber.join(', ') + '</p>'))
		return this
	}

	this.build = function(){
		return pz
	}
}

function loadAxisProblem(count, problemZone){
	pv = new ProblemView(problemZone, '数射线', 'LG-NARROW')
	pv.putProblemHtmlElement((new Axis(0, 100)).withTellProblem(4).withMarkProblem(3).build())
	pv.putProblemHtmlElement((new Axis(0, 100)).withTellProblem(6).withMarkProblem(4).build())
	pv.putProblemHtmlElement((new Axis(36, 84)).withTellProblem(5).withMarkProblem(2).build())
	pv.putProblemHtmlElement((new Axis(22, 87)).withTellProblem(3).withMarkProblem(4).build())
}


function readDistanceConfiguration(){
	var result = []
	if($("#oneStepEasy").is(':checked')){
		result.push(DistanceMode00)
	}
	if($("#oneStepWithInterferer").is(':checked')){
		result.push(DistanceType11)
		result.push(DistanceType12)
	}

	if($("#multiStep").is(':checked')){
		result.push(DistanceType21)
		result.push(DistanceType22)
		result.push(DistanceType23)
	}

	return result
}

function loadSectionProblem(count, problemZone){
	pv = new ProblemView(problemZone, '距离', 'MD-SMALL-GAP')
	var cl = readDistanceConfiguration()
	for(var i = 0; i < count; i++){
		var c = pickRamdomItemInList(cl)
		pv.putProblemHtmlElement(formatDistanceProblem(new c()))
	}
}


function PointSectionProblem(){
	var problem = {min:20, max:80, initPoint:30}
	var pz = $("<div>");
	var cavas = $('<div/>').html('<canvas width="300" height="100"></canvas>').contents()
	pz.append(cavas)

	var context = cavas.get(0).getContext("2d")
	context.font = "12px Arial";

	var numberAxis = new NumberAxis(problem.min - 5, problem.max + 5, context)
	numberAxis.drawAxis()

	numberAxis.putMark(problem.initPoint, NumberAxis.largeMark)
	numberAxis.putText(problem.initPoint, problem.initPoint.toString(), {left: -6, top: 20})
	numberAxis.putCurve(30, 60)
	// numberAxis.putCurve(60, 40)

	return pz
}

function loadPointSectionProblem(count, problemZone){
	pv = new ProblemView(problemZone, '还啥都没有，再等等', 'MD-SMALL-GAP')
	pv.putProblemHtmlElement(PointSectionProblem())
}