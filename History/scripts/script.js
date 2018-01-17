
function st_build() {
  var elms = document.getElementsByClassName('foreign');

  for (var i = 0; i < elms.length; i++) {
    elms[i].style.top = 50 - Math.cos(2 * Math.PI / elms.length * i) * 40 + "%";
    elms[i].style.left = 50 - Math.sin(2 * Math.PI / elms.length * i) * 40 + "%";
  }
}

function fillDescription(state) {
  var elms = document.getElementsByClassName('foreign');
  var info = [
    [
      "Dänemark",
      "Dänemark ist muy bien."
    ],
    [
      "Großbritannien",
      "Dänemark ist muy bien."
    ],
    [
      "Belgien",
      "Dänemark ist muy bien."
    ],
    [
      "Frankreich",
      "Dänemark ist muy bien."
    ],
    [
      "USA",
      "Dänemark ist muy bien."
    ],
    [
      "Spanien",
      "Dänemark ist muy bien."
    ],
    [
      "Italien",
      "Dänemark ist muy bien."
    ],
    [
      "Österreich-Ungarn",
      "Dänemark ist muy bien."
    ],
    [
      "Japan",
      "Dänemark ist muy bien."
    ],
    [
      "Russland",
      "Dänemark ist muy bien."
    ]
  ];

  console.log(info[state][0]);
  console.log(info[state][1]);

  document.getElementById("st_name").innerHTML = info[state][0];
  document.getElementById("st_description").innerHTML = info[state][1];

  for (var i = 0; i < elms.length; i++) {
    elms[i].style.borderColor = "#f1f1f1";
  }
  document.getElementsByClassName('foreign')[state].style.borderColor = "#f00";
}

$(st_build);