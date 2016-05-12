function getMultiplyProblem(){
	a = getRandomInt(2, 9)
	b = getRandomInt(2, 9)
	return a.toString() + ' \u00D7 ' + b.toString() + ' = ____'
}

function loadMultiplyProblemsOfCount(count, problemZone){
	pv = new ProblemView(problemZone, '计算')
	for(var i = 0; i < count; i++){
		pv.putProblem(getMultiplyProblem())
	}
}
