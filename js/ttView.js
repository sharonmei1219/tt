var fontSizeSetting = '40px'
var zone = $("#gameZone")

function Annimator(fallingSpeed){
    this.add = function(element, doneFunction){
      zone.append(element)
      element.animate({ "top": "+=580px" }, fallingSpeed, "linear", doneFunction);
    }
}

function updateMissedCount(count){
	$("#missed-count").html("<p>" + count + " missed</p>")
}

function charactorElementInScreen(charactor){
	var element = $('<p class="object">' + charactor + '</p>')
	element.css({top:0, left: getRandomInt(0, zone.width()), position: 'absolute', 'font-size': fontSizeSetting})
	return element
}

function elementHit(element){
	element.stop()
	element.effect("explode", {pieces: 4}, "slow")
}