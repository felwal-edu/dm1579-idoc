// display instruction paragraphs in chosen language

var storage = window['localStorage'];
var emissionLimit = 0.5;
var vocab = {
  SE: {
    Title: "Instruktioner",
    Body: "Du kommer att presenteras med olika ingredienser. Välj vad du vill ha till din middag – och försök att handla så miljövänligt som möjligt! <br><br>" +
    "<i> För att bli godkänd måste du släppa ut mindre än " + emissionLimit + " kg koldioxid (CO2). </i><br><br>" +
    "Lycka till!"
  },
  EN: {
    Title: "Instructions",
    Body: "You will be presented with different foods. Chose which one you want for your dinner – and try to make it as earth friendly as possible! <br><br>" +
    "<i> To pass the test, you will have to release less than " + emissionLimit + " kg carbon dioxide (CO2). </i><br><br>" +
    "Good luck!"
  }
}

// get element
function el(id) {
  return document.querySelector(id);
}

// get language
var lang = storage.getItem("choice0");
if (lang != "SE") { lang = "EN"; }

// set receipt paragraphs
el("#title").innerHTML = vocab[lang]["Title"];
el("#body").innerHTML = vocab[lang]["Body"];
