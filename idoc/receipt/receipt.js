// display choices made, their CO2-cost and the total
// feedback paragraph discerning pass/fail of test
// play again button & quit button

var storage = window['localStorage'];
var emissionLimit = 0.5;
var emissions = {
  cattle: 2.32,
  chicken: 0.24,
  legumes: 0.08,
  pasta: 0.25,
  potatoes: 0.175,
  swedish: 0.168,
  imported: 0.2
};
var unit = " kg CO2";
var vocab = {
  SE: {
    Title: "Kvitto",
    Total: "Total",
    Feedback: {
      Pos: "Grattis, du klarade det! <br> - du handlade för under " + emissionLimit + unit + " -",
      Neg: "Ånej, det där är ingen miljövänlig middag! <br> - du översteg " + emissionLimit + unit + " -"
    },
    1: { cattle: "Nötkött", chicken: "Kyckling", legumes: "Baljväxter" },
    2: { pasta: "Pasta", potatoes: "Potatis" },
    3: { swedish: "Svenska Grönsaker", imported: "Importerade Grönsaker" }
  },
  EN: {
    Title: "Receipt",
    Total: "Total",
    Feedback: {
      Pos: "Congratulations, you made it! <br> - you shopped for under " + emissionLimit + unit + " -",
      Neg: "Oh no, that's not an Earth Friendly Dinner! <br> - you exceeded " + emissionLimit + unit + " -"
    },
    1: { cattle: "Cattle", chicken: "Chicken", legumes: "Legumes" },
    2: { pasta: "Pasta", potatoes: "Potatoes" },
    3: { swedish: "Swedish Greens", imported: "Imported Greens" }
  }
}

// get element
function el(id) {
  return document.querySelector(id);
}

// get language
var lang = storage.getItem("choice0");
if (lang != "SE") { lang = "EN"; }

// get choices
var choice1 = storage.getItem("choice1");
var choice2 = storage.getItem("choice2");
var choice3 = storage.getItem("choice3");

var total = (emissions[choice1] + emissions[choice2] + emissions[choice3]).toFixed(3);

// set receipt paragraphs
el("#title").innerHTML = vocab[lang]["Title"];
el("#feedback").innerHTML = vocab[lang]["Feedback"][total <= emissionLimit ? "Pos" : "Neg"];
el("#purchase1").innerHTML = vocab[lang][1][choice1];
el("#purchase2").innerHTML = vocab[lang][2][choice2];
el("#purchase3").innerHTML = vocab[lang][3][choice3];
el("#total").innerHTML = vocab[lang]["Total"];
el("#cost1").innerHTML = emissions[choice1] + unit;
el("#cost2").innerHTML = emissions[choice2] + unit;
el("#cost3").innerHTML = emissions[choice3] + unit;
el("#costTotal").innerHTML = total + unit;

// set button listeners
el("#restart").onclick = function() { KlyntAPI.commands.openSequence('anim_protein'); };
el("#conclude").onclick = function() { KlyntAPI.commands.openSequence(lang == "SE" ? 'vid_conclusion_se' : 'vid_conclusion_en'); };
