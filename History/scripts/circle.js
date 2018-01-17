var elms = document.getElementsByClassName('foreign');
var st_info = [
    [
      "Dänemark",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/tM1qHOF.png"
    ],
    [
      "Großbritannien",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/MlYmMbt.png"
    ],
    [
      "Belgien",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/PN5Nx87.png"
    ],
    [
      "Frankreich",
      "Der deutsche Sieg über Frankreich von 1871 prägte die Beziehung der beiden Länder über Dekaden. Die Franzosen waren nicht bloß aufgrund der militärischen Niederlage, Annexion von Elsass-Lothringen oder Reparationen in Höhe von 5 Mrd. Francs, sondern der Proklamation des deutschen Kaisers inmitten Frankreichs - in Versailles - wegen erbost.<br>Ein neuer Meilenstein in der deutsch-französischen Erbfeindschaft wurde erreicht.<br><b class='hashtag'>bringBackElsassLothringen</b>",
      "https://i.imgur.com/bGlIKFr.png"
    ],
    [
      "USA",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/GvPjJXO.png"
    ],
    [
      "Spanien",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/FJxMxav.png"
    ],
    [
      "Italien",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/Q7H7GFv.png"
    ],
    [
      "Osmanisches Reich",
      "Bereits kurz nach der Gründung des Deutschen Reiches wandte sich Sultan Abdülhamid II an Bismarck. Er sah sein Reich durch die Kolonialbestrebungen Frankreichs, Englands, Russlands und Italiens im Orient bedroht.<br>Erste Kooperationen entstanden in militärischen Bereichen. Der Sultan beauftragte deutsche Firmen, seine desolate Armee durch deutsche Waffentechnologie auf Vordermann zu bringen.<br>Der wirtschaftliche Einfluss breitete sich so stark aus, dass deutsche Unternehmen auf dem türkischen Markt Monopolstellungen erreichen konnten. Außerdem realisierten diese Unternehmen die bedeutendsten türkischen Projekte dieser Zeit, wie den Bau der Bagdadbahn oder den der Anatolischen Bahn.<br><b class='hashtag'>Wirtschaftsmonopol</b>",
      "https://i.imgur.com/dZjeHop.png"
    ],
    [
      "Österreich-Ungarn",
      "Dänemark ist muy bien.",
      "https://i.imgur.com/GreMppX.png"
    ],
    [
      "Japan",
      "Japans Beziehung mit dem Deutschen Reich wurde seit der Reichsgründung gut gepflegt. Nach dem ersten Chinesisch-Japanischen Krieg kühlten die Beziehungen jedoch ab. Kohlelieferungen nach Russland während des Russisch-Japanischen Krieges, sowie der in Europa und Amerika populären Rassismus gegenüber fernöstlichen Ethnien in Form der <b class='hashtag'>gelben Gefahr</b> belasteten die Verbindung weiter.",
      "https://i.imgur.com/XSmYsVT.png"
    ],
    [
      "Russland",
      "Bismarcks Bündisse mit Russland durch den Dreikaiserbund und Rückversicherzungsvertrag wurden durch Wilhelm II. nicht mehr erneuert. Auf der Suche nach einem neuen Bündnispartner näherte sich das Zarenreich schließlich Frankreich und Großbritannien an. Der frühere Bündnispartner war ab 1892 nun mit Frankreich verbündet.",
      "https://i.imgur.com/hFb3vxA.png"
    ]
  ];

function st_build() {
  var container = document.getElementById('st_content');
    
  $("<div id='domestic' style='background-image: url('https://i.imgur.com/xtwAATx.png' onclick='fillDescription(0);'></div>").appendTo(container);
  for (var i = 0; i < st_info.length; i++) {
    $("<div class='foreign' onclick='fillDescription(" + i + 1 + ");'></div>").appendTo(container);
  }

  for (var i = 0; i < st_info.length; i++) {
    elms[i].style.top = 50 - Math.cos(2 * Math.PI / elms.length * i) * 40 + "%";
    elms[i].style.left = 50 - Math.sin(2 * Math.PI / elms.length * i) * 40 + "%";
    elms[i].style.backgroundImage = "url('" + st_info[i][2] + "')";
  }
}

function fillDescription(state) {
  state++;
  
  document.getElementById("st_name").innerHTML = st_info[state][0];
  document.getElementById("st_description").innerHTML = st_info[state][1];

  for (var i = 0; i < elms.length; i++) {
    elms[i].style.borderColor = "#f1f1f1";
  }
  elms[state].style.borderColor = "#f00";
}
