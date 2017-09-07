var row2Keys = ['a', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 's',';']
var row1Keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o','p']
var row3Keys = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.','/']
var allKeys = row2Keys + row3Keys + row1Keys

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CandidateList(candidateList){
  this.get = function(self){
    rand = getRandomInt(0, candidateList.length - 1)
    candidate = candidateList[rand]
    candidateList.splice(rand, 1)
    return candidate
  }

  this.restore = function(charactor){
    candidateList.push(charactor)
  }
}




