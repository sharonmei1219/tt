function NumberAxis(start, end, canvasCtx){
	var lineLength = 650 - 0 - 30
	var offsetLeft = 10
	var totalPoints = end - start
	var gap = lineLength / totalPoints

	this.drawAxis = function(){
		console.log("drawAxis " + start.toString() + ' ' + end.toString())
		canvasCtx.moveTo(0,50);
		canvasCtx.lineTo(650,50);
		canvasCtx.stroke();
		
		for(var x = start; x <= end; x++){
			xp = offsetLeft + gap * (x - start)
			canvasCtx.moveTo(xp, 50);
			canvasCtx.lineTo(xp, 47);
			canvasCtx.stroke()
			if ((x % 5) == 0){
				canvasCtx.moveTo(xp, 50);
				canvasCtx.lineTo(xp, 44);
				canvasCtx.stroke()
			}
			if ((x % 10) == 0){
				canvasCtx.moveTo(xp, 56);
				canvasCtx.lineTo(xp, 44);
				canvasCtx.stroke()
				canvasCtx.fillText(x.toString(),xp - 6,70);
			}
		}
	}

	this.putTarget = function(target, tag){
		var targetOffSet = (target - start) * gap + offsetLeft
		canvasCtx.moveTo(targetOffSet + 0.5, 42)
		canvasCtx.lineTo(targetOffSet + 0.5, 25)
		canvasCtx.stroke()
		canvasCtx.fillText(tag,targetOffSet - 4,20);
	}
}


function Axis(startInput, endInput){
	pz = $("<div>");
	cavas = $('<div/>').html('<canvas width="650" height="70"></canvas>').contents()
	pz.append(cavas)

	context = cavas.get(0).getContext("2d")
	context.font = "12px Arial";
	var numberAxis = new NumberAxis(startInput, endInput, context)
	numberAxis.drawAxis()

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