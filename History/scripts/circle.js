var elms = document.getElementsByClassName("foreign");
var st_info = [ // [0]: name, [1]: content, [2]: image-url
    [
      "Außenpolitik des Deutschen Reiches",
      "Bitte wählen Sie ein Land aus um mehr über es zu erfahren."
    ],
    [
      "Dänemark",
      "Falls das Deutsche Reich Dänemark im Zuge der Eroberung der <b class='hashtag'>Küsten</b> besetzen sollte, würde Dänemark dem Deutschen Reich den Krieg erklären. 1866 hat Dänemark im Deutsch-Dänischen Krieg mit Schleswig und Holstein genug Land verloren, eine weitere Schmach wollte Dänemark nicht erneut zulassen.",
      "https://i.imgur.com/tM1qHOF.png",
      "https://de.wikipedia.org/wiki/D%C3%A4nisch-deutsche_Beziehungen<br>https://www.welt.de/politik/ausland/article9115012/Vor-146-Jahren-waere-Daenemark-fast-deutsch-geworden.html<br>https://www.planet-wissen.de/kultur/metropolen/kopenhagen/pwiediedeutschenunddiedaenen100.html"
    ],
    [
      "Großbritannien",
      "Zuerst die Krüger-Depesche 1896, dann die Daily-Telegraph-Affäre 1908 oder der Wettlauf um Afrika 1898 - kurzum, die Stimmung zwischen Großbritannien und Deutschland war so angespannt, dass sie bis 1914 nicht gelöst werden konnte. Doch der letzte Schliff, der letzte Stich ins englische Herz waren 1898/1900 die Flottengesetzte. Zwar stand vorher schon fest, dass Deutschland die Briten nicht würde einholen können, doch zumindest eine Flotte entstehen zu lassen, die berücksichtigt werden müsste, eine „Risikoflotte“, war das Ziel. Wilhelm II. hatte durch seine teils nahe, mütterliche Verwandtschaft in England immer das Gefühl sich beweisen zu müssen und dies versuchte er auch. Zusammenfassend kann gesagt werden, dass je mehr Flottenrüstung sich in Deutschland entwickelte, desto schlechter wurde das Verhältnis zwischen Deutschland und Großbritannien. <b class='hashtag'>StopItWithTheShipsAlready</b>",
      "https://i.imgur.com/MlYmMbt.png",
      "https://stephanherold.com/Recht_PDF/WilhelmII.pdf<br>https://de.m.wikipedia.org/wiki/Britisch-deutsche_Beziehungen"
    ],
    [
      "Frankreich",
      "Der deutsche Sieg über Frankreich von 1871 prägte die Beziehung der beiden Länder über Dekaden. Die Franzosen waren nicht bloß aufgrund der militärischen Niederlage, Annexion von Elsass-Lothringen oder Reparationen in Höhe von 5 Mrd. Francs, sondern der Proklamation des deutschen Kaisers inmitten Frankreichs - in Versailles - wegen erbost.<br>Ein neuer Meilenstein in der deutsch-französischen Erbfeindschaft wurde erreicht.<br><b class='hashtag'>bringBackElsassLothringen</b>",
      "https://i.imgur.com/bGlIKFr.png",
      "Wanderausstellung „Erbfeinde-Erbfreunde“, Deutsch-Französisches Institut"
    ],
    [
      "USA",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/GvPjJXO.png"
    ],
    [
      "Spanien",
      "Kaiser Friedrich Wilhelm II. forderte für die Deutschen einen <b class='hashtag'>PlatzAnDerSonne</b>. Durch seine Politik geriet er mit Spanien in Konflikt. Der Deutsch-Spanische Vertrag aus dem Jahr 1899 zwang Spanien die Karolinen, die nördlichen Marianen und Palau an Deutschland abzutreten. Die im Pazifik liegenden Südsee-Gebiete bildeten danach einen Teil Deutsch-Neuguineas.",
      "https://i.imgur.com/FJxMxav.png",
      "https://de.wikipedia.org/wiki/Deutsch-spanische_Beziehungen"
    ],
    [
      "Italien",
      "Durch den Rücktritt von Bismark 1890 ist der italienische Ministerpräsident <b class='hashtag'>Crispi</b> geschwächt. Nach dem Sturtz Crispis möchte Italien die fortschreitende Entfremdung zwischen Großbritannien und dem Deutschen Reich nicht mittragen. Nur noch die Konservativen hielten noch zum Dreibund. Jm Jahr 1913 stieg die Auswanderungen, in die Nachbarstaaten wie zum Beispiel das Deutsche Reich, Schweiz und Österreich-Ungarn, auf bis zu 872.000 Menschen an.",
      "https://i.imgur.com/Q7H7GFv.png",
      "Gernert et al.(2016)"
    ],
    [
      "Osmanisches Reich",
      "Bereits kurz nach der Gründung des Deutschen Reiches wandte sich Sultan Abdülhamid II an Bismarck. Er sah sein Reich durch die Kolonialbestrebungen Frankreichs, Englands, Russlands und Italiens im Orient bedroht.<br>Erste Kooperationen entstanden in militärischen Bereichen. Der Sultan beauftragte deutsche Firmen, seine desolate Armee durch deutsche Waffentechnologie auf Vordermann zu bringen.<br>Der wirtschaftliche Einfluss breitete sich so stark aus, dass deutsche Unternehmen auf dem türkischen Markt Monopolstellungen erreichen konnten. Außerdem realisierten diese Unternehmen die bedeutendsten türkischen Projekte dieser Zeit, wie den Bau der Bagdadbahn oder den der Anatolischen Bahn.<br><b class='hashtag'>Wirtschaftsmonopol</b>",
      "https://i.imgur.com/DiobqqK.png",
      "Peter Philipp Werner, Vorgeschichte I: Osmanisch-deutsche Verflechtungen vor 1915"
    ],
    [
      "Österreich-Ungarn",
      "Österreich-Ungarn ist seit dem 1879 geschlossenen <b class='hashtag'>Zweibund</b> der engste Verbündete des Deutschen Reichs. Im Laufe der Zeit verlor Österreich-Ungarn militärische und wirtschaftliche Unabhängigkeit und wurde außenpolitisch vom Deutschen Reich abhängig. Schon nach dem Deutschen Krieg 1866 war klar, dass Preussen die Vorherrschaft übernehmen würde.",
      "https://i.imgur.com/GreMppX.png",
      "https://www.dhm.de/lemo/kapitel/kaiserreich/aussenpolitik.html<br>http://ww1.habsburger.net/de/entwicklungen/oesterreich-ungarn-und-deutschland-komplizierte-wechselwirkungen"
    ],
    [
      "Japan",
      "Japans Beziehung mit dem Deutschen Reich wurde seit der Reichsgründung gut gepflegt. Nach dem ersten Chinesisch-Japanischen Krieg kühlten die Beziehungen jedoch ab. Kohlelieferungen nach Russland während des Russisch-Japanischen Krieges, sowie der in Europa und Amerika populären Rassismus gegenüber fernöstlichen Ethnien in Form der <b class='hashtag'>gelbenGefahr</b> belasteten die Verbindung weiter.",
      "https://i.imgur.com/XSmYsVT.png",
      "Deutschland - Japan : historische Kontakte / hrsg. von Josef Kreiner",
    ],
    [
      "Russland",
      "Bismarcks Bündisse mit Russland durch den <b class='hashtag'>Dreikaiserbund</b> und Rückversicherzungsvertrag wurden durch Wilhelm II. nicht mehr erneuert. Auf der Suche nach einem neuen Bündnispartner näherte sich das Zarenreich schließlich Frankreich und Großbritannien an. Der frühere Bündnispartner war ab 1892 nun mit Frankreich verbündet.",
      "https://i.imgur.com/WoarLFR.png",
      "https://de.wikipedia.org/wiki/Deutsch-russische_Beziehungen<br>http://www.geschichtsforum.de/thema/verhaeltnis-deutsches-kaiserreich-und-russland.14260/"
    ]
  ];

function st_build() {
  var container = document.getElementById("st_content");
    
  $("<div id='domestic'></div>").appendTo(container); // creates center element
  for (var i = 1; i < st_info.length; i++) {
    $("<div class='foreign' onclick='fillDescription(" + i + ");'></div>").appendTo(container); // creates childs
  }

  for (var i = 0; i < elms.length; i++) {
    elms[i].style.top = 50 - Math.cos(2 * Math.PI / elms.length * i) * 40 + "%"; // calculate y-position
    elms[i].style.left = 50 - Math.sin(2 * Math.PI / elms.length * i) * 40 + "%"; // calculate x-position
    elms[i].style.backgroundImage = "url('" + st_info[i + 1][2] + "')"; // assigns bg-images
  }
}

function fillDescription(state) {
  $( "#st_name" ).html(st_info[state][0]); // changes <h3>
  $( "#st_description" ).html(st_info[state][1]); // fill <p> content
  document.getElementById("st_source").setAttribute("data-source", st_info[state][3]); // set source
    
  state--;
  for (var i = 0; i < elms.length; i++) {
    elms[i].style.borderColor = "#0a8cc9";
  }
  elms[state].style.borderColor = "#44a4e4"; // marks current selection
}
