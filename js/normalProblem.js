function numberOf(tens, units){
	return tens * 10 + units;
}

var bounds = {
	r10:{
		sum_tens: [0, 0],
		sum_units: [4, 10],
		op_tens: function(sumTen, sumUnit){return [0, 0]},
		op_unit: function(sumTen, sumUnit){return [1, sumUnit-1]}
	},

	r20:{
		sum_tens: [1, 1],
		sum_units: [4, 9],
		op_tens: function(sumTen, sumUnit){return [0, 1]},
		op_unit: function(sumTen, sumUnit){return [0, sumUnit]}
	},

	r20p:{
		sum_tens: [1, 1],
		sum_units: [0, 8],
		op_tens: function(sumTen, sumUnit){return [0, 0]},
		op_unit: function(sumTen, sumUnit){return [sumUnit + 1, 9]}
	},
	r100:{
		sum_tens: [1, 9],
		sum_units: [3, 9],
		op_tens: function(sumTen, sumUnit){return [1, sumTen - 1]},
		op_unit: function(sumTen, sumUnit){return [0, sumUnit]}
	},
	r100p:{
		sum_tens: [1, 9],
		sum_units: [0, 8],
		op_tens: function(sumTen, sumUnit){return [0, sumTen - 1]},
		op_unit: function(sumTen, sumUnit){return [sumUnit + 1, 9]}
	}
}

function getAddProblem(bound){
	rT = getRandomInRange(bound.sum_tens)
	rU = getRandomInRange(bound.sum_units)

	oT = getRandomInRange(bound.op_tens(rT, rU))
	oU = getRandomInRange(bound.op_unit(rT, rU))

	result = numberOf(rT, rU)
	operator_1 = numberOf(oT,oU)
	operator_2 = result - operator_1
	return {operator_1: operator_1,
	        operator_2: operator_2,
	        result: result,
	    	operand: ' + '}
}

function getSubProblem(bound){
	rT = getRandomInRange(bound.sum_tens)
	rU = getRandomInRange(bound.sum_units)
	oT = getRandomInRange(bound.op_tens(rT, rU))
	oU = getRandomInRange(bound.op_unit(rT, rU))
	operator_1 = numberOf(rT, rU)
	operator_2 = numberOf(oT,oU)
	result = operator_1 - operator_2;
	return {operator_1: operator_1,
	        operator_2: operator_2,
	        result: result,
	    	operand: ' - '}
}

function getRandomlyProblem(opList, boundList){
	op = pickRamdomItemInList(opList)
	bound = pickRamdomItemInList(boundList)
	return op(bound)
}

function formatBlankAtResult(problem){
	return problem.operator_1.toString() + problem.operand + problem.operator_2.toString() + ' = ___'
}

function formatBlankAtOp1(problem){
	return '___' + problem.operand + problem.operator_2.toString() + ' = ' + problem.result.toString()
}

function formatBlankAtOp2(problem){
	return problem.operator_1 + problem.operand + '___' + ' = ' + problem.result.toString()
}

function formatBlankAtOperand(problem){
	return problem.operator_1 + ' __ ' + problem.operator_2.toString() + ' = ' + problem.result.toString()
}

function randomFormat(problem){
	blank = getRandomInt(0, 2)
	if(blank == 0) return formatBlankAtOp1(problem)
	if(blank == 1) return formatBlankAtOp2(problem)
	return formatBlankAtResult(problem)
}



function operatorSetting(){
	opList = []

	if($('#opAdd').is(':checked')){
		opList.push(getAddProblem)
	}

	if($('#opMinus').is(':checked')){
		opList.push(getSubProblem)
	}

	return opList
}

function operantsSetting(){
	boundsList = []
	if($('#lessThan10').is(':checked')){
		boundsList.push(bounds.r10)
	}

	if($('#lessThan20').is(':checked')){
		if($('#simple').is(':checked')){
			boundsList.push(bounds.r20)
		}

		if($('#carry-over').is(':checked')){
			boundsList.push(bounds.r20p)
		}
	}

	if($('#lessThan100').is(':checked')){
		if($('#simple').is(':checked')){
			boundsList.push(bounds.r100)
		}

		if($('#carry-over').is(':checked')){
			boundsList.push(bounds.r100p)
		}
	}

	return boundsList
}

function problemFormatSetting(){
	if($('#random-q-position').is(':checked')){
		formator = randomFormat;
	}else{
		formator = formatBlankAtResult;
	}

	return formator
}

function loadNormalProblemsOfCount(count, problemZone){
	pv = new ProblemView(problemZone, '计算')

	opList = operatorSetting()
	boundList = operantsSetting()
	formator = problemFormatSetting()

	for(var i = 0; i < count; i++){
		pv.putProblem(formator(getRandomlyProblem(opList, boundList)))
	}
}

function formatUnknownAtOp1(problem){
	return '<i>x</i>' + problem.operand + problem.operator_2.toString() + ' = ' + problem.result.toString()
}

function formatUnknownAtOp2(problem){
	return problem.operator_1 + problem.operand + '<i>x</i>' + ' = ' + problem.result.toString()
}

function loadLinearEquationWithOneUnknown(count, problemZone){
	pv = new ProblemView(problemZone, '求解一元一次方程', 'MD')
	opList = [getAddProblem, getSubProblem]
	boundList = [bounds.r100, bounds.r100p]
	formatorList = [formatUnknownAtOp1, formatUnknownAtOp2]
	for(var i = 0; i < count; i++){
		formator = pickRamdomItemInList(formatorList)
		pv.putProblem(formator(getRandomlyProblem(opList, boundList)))
	}
}