// register food choices and open the appropriate next sequence
// description paragraph for what is expected of the viewer
// instructions button

var storage = window['localStorage'];
var sequenceKey;
var nextSeq = {
  SE: {
    choice0: "anim_titleScreen_se",
    choice1: "bag_protein_se",
    choice2: "bag_carbs_se",
    choice3: "bag_veggies_se"
  },
  EN: {
    choice0: "anim_titleScreen_en",
    choice1: "bag_protein_en",
    choice2: "bag_carbs_en",
    choice3: "bag_veggies_en"
  }
};
var vocab = {
  SE: {
    choice1: "Välj protein: nötkött, kyckling eller baljväxter?",
    choice2: "Välj kolhydrater: pasta eller potatis?",
    choice3: "Välj grönsaker: svenska eller importerade?"
  },
  EN: {
    choice1: "Choose protein: cattle, chicken or legumes?",
    choice2: "Choose carbohydrates: pasta or potatoes?",
    choice3: "Chose vegetables: swedish or imported?"
  }
}

// get element
function el(id) {
  return document.querySelector(id);
}
function getElementByClass(className) {
  var list = document.getElementsByClassName(className);
  return list[0];
}

// use on click; save choice to storage and open next sequence
function makeChoice(button) {

  // save choice to storage
  var value = button.id;
  storage.setItem(sequenceKey, value);

  // update language if updated
  if (sequenceKey == "choice0") { lang = storage.getItem("choice0"); }

  // open next sequence depending on language and current sequence
  KlyntAPI.commands.openSequence(nextSeq[lang][sequenceKey]);
}

// get language
var lang = storage.getItem("choice0");
if (lang != "SE") { lang = "EN"; }

// get which sequence, in order to store choice made
sequenceKey = getElementByClass("choice").id;
if (sequenceKey == null) { sequenceKey = "choice1"; }

// set description paragraphs
var desc = el("#desc");
if (desc != null) { desc.innerHTML = vocab[lang][sequenceKey]; }

// set instructions listener
var helpBtn = el("#instructions");
if (helpBtn != null) {
  helpBtn.onclick = function() { KlyntAPI.commands.openOverlay("instructions_overlay"); };
}

// set choice listeners
getElementByClass("choice").childNodes.forEach(child => {
  child.onclick = function() { makeChoice(child); };
});
