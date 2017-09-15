var fontSizeSetting = '40px'
var zone = $("#gameZone")

function Annimator(fallingSpeed, roundCount, level){
	var startHint = $("<div><h3>Round: " + roundCount + "    Level: " + level + "</h3><h1> press any key to start </h1></div>")

    this.add = function(element, doneFunction){
      zone.append(element)
      element.animate({ "top": "+=580px" }, fallingSpeed, "linear", doneFunction);
    }

    this.gameDone = function(hitCount, missedCount, score, afterGameDone){

        var fireWorks = $("<div class='pyro'></div>")
        fireWorks.append($("<div class='before'></div>"))
        fireWorks.append($("<div class='after'></div>"))
        zone.append(fireWorks)

    	var scoreDisplay = $("<div></div>")
    	scoreDisplay.css({top:0, width:zone.width(), position:'absolute', background: '#DCDCDC', 'text-align': 'center'})
    	scoreDisplay.append($('<h3>' + hitCount + ' hitted; '+ missedCount + ' missed</h3>'))
    	scoreDisplay.append($('<h2>SCRORE: ' + score + '</h2>'))
    	zone.append(scoreDisplay)
    	scoreDisplay.animate({top: zone.height()/2 - scoreDisplay.height()/2})
    	scoreDisplay.delay(3000)
    	scoreDisplay.animate({top: zone.height() - scoreDisplay.height()}, function(){this.remove(), fireWorks.remove(), afterGameDone()})
    }

    this.showGameStartHint = function(){
    	startHint.css({top:0, width:zone.width(), position:'absolute', background: '#DCDCDC', 'text-align': 'center'})
    	zone.append(startHint)
    	startHint.animate({top: zone.height()/2 - startHint.height()/2})
    }

    this.dismissGameStartHint = function(){
      	startHint.animate({top: zone.height() - startHint.height()}, function(){this.remove()})
    }
}

function updateMissedCount(count){
	$("#missed-count").html("<p>" + count + " missed</p>")
}

function charactorElementInScreen(charactor){
    var element = $('<div></div>')
    var charactor = $('<p class="object">' + charactor + '</p>')
    charactor.css({'font-size': fontSizeSetting})
    element.append(charactor)
    element.css({top:0, left: getRandomInt(0, zone.width() - element.width()), position: 'absolute', 'font-size': fontSizeSetting, overflow:'visible'})
	return element
}

function elementHit(element, functionAfterAnnimation){
	element.stop()
    $(element).append($('<div class="tt-explode"></div>'))
    element.find(".object").effect("explode", {pieces: 4}, "slow")
    window.setTimeout(functionAfterAnnimation, 500);
}

function viewLevelUp(level){
	$("#level-" + level).addClass("level-complete")
}