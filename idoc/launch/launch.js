// launch intro video, depending on language.

var storage = window['localStorage'];
var nextSeq = {
  EN: "vid_intro_en",
  SE: "vid_intro_se"
};

// get language
var lang = storage.getItem("choice0");
if (lang != "SE") { lang = "EN"; }

// launch sequence
setInterval(() => { 
  KlyntAPI.commands.openSequence(nextSeq[lang]);
}, 2700);
