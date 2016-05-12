function formatMaxTypeAddFirstOprand(less, greater){
	return '____ + ' + less.toString() + ' < ' + greater.toString() 
}

function formatMaxTypeAddSecondOprand(less, greater){
	return less.toString() + ' + ____ < ' + greater.toString() 
}

function formatMaxTypeSubFirstOprand(less, greater){
	return '____ - ' + less.toString() + ' < ' + (greater - less).toString()
}

function formatMaxTypeSubSecondOprand(less, greater){
	return greater.toString() + ' - ____ > ' + less.toString()
}

function formatMinTypeAddFirstOprand(less, greater){
	return '____ + ' + less.toString() + ' > ' + greater.toString() 
}

function formatMinTypeAddSecondOprand(less, greater){
	return less.toString() + ' + ____ > ' + greater.toString() 
}

function formatMinTypeSubFirstOprand(less, greater){
	return '____ - ' + less.toString() + ' > ' + (greater - less).toString()
}

function formatMinTypeSubSecondOprand(less, greater){
	return greater.toString() + ' - ____ < ' + less.toString()
}

maxFormators = [formatMaxTypeAddFirstOprand, 
		     formatMaxTypeAddSecondOprand,
		     formatMaxTypeSubFirstOprand,
		     formatMaxTypeSubSecondOprand]

minFormators = [formatMinTypeAddFirstOprand, 
			    formatMinTypeAddSecondOprand,
			    formatMinTypeSubFirstOprand,
			    formatMinTypeSubSecondOprand]

function genMaxProblem(){
	greater = getRandomInt(10, 100)
	less = getRandomInt(1, greater - 1)
	formator = pickRamdomItemInList(maxFormators)
	return formator(less, greater)
}

function genMinProblem(){
	greater = getRandomInt(10, 100)
	less = getRandomInt(1, greater - 1)
	formator = pickRamdomItemInList(minFormators)
	return formator(less, greater)
}

function loadMaxProblemOfCount(count, problemZone){
	pv = new ProblemView(problemZone, '最大能填几')
	for(var i = 0; i < count; i++){
		pv.putProblem(genMaxProblem())
	}
}

function loadMinProblemOfCount(count, problemZone){
	pv = new ProblemView(problemZone, '最小能填几')
	for(var i = 0; i < count; i++){
		pv.putProblem(genMinProblem())
	}
}
