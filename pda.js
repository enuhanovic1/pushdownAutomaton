//import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

var listOfStates = [];
var listOfTransitions = [];
var stack = "A";
iscrtajStek("", "");
iscrtajUlaznuTraku("", "");

//window.onload() = iscrtajStek();

//document.getElementById("state_in_button").onclick() = dodajStanje()

function dodajStanje() {
  var element = document.getElementById("state_in");
  var finalno = document.getElementById("state_final");
  listOfStates.push({state: element.value, finals: finalno.checked});
  iscrtajGraf();
  element.value = "";
  finalno.checked = false;
}

function dodajTranziciju() {
  var o = document.getElementById("origin");
  var e = document.getElementById("entry");
  var s1 = document.getElementById("spop");
  var d = document.getElementById("dest");
  var s2 = document.getElementById("spush");
  var rpt = listOfTransitions.filter((x) => x.origin == o.value && x.dest == d.value).length;
  listOfTransitions.push({origin: o.value, entry: e.value, spop: s1.value, dest: d.value, spush: s2.value, repeat: rpt});
  iscrtajGraf();
  o.value = "";
  e.value = "";
  s1.value = "";
  d.value = "";
  s2.value = "";
}

function promijeniStanje() {
  var s = document.getElementById("new_state");
  var n = document.getElementById("s_num").innerHTML;
  for (var i = 0; i < listOfTransitions.length; i++) {
    if (listOfTransitions[i].origin == listOfStates[n].state) listOfTransitions[i].origin = s.value;
    if (listOfTransitions[i].dest == listOfStates[n].state) listOfTransitions[i].dest = s.value;
  }
  listOfStates[n].state = s.value;
  sakrijDijalogS();
  iscrtajGraf();
  s.value = "";
}

function promijeniTranziciju() {
  var e = document.getElementById("new_entry");
  var s1 = document.getElementById("new_spop");
  var s2 = document.getElementById("new_spush");
  var n = document.getElementById("t_num").innerHTML;
  listOfTransitions[n].entry = e.value;
  listOfTransitions[n].spop = s1.value;
  listOfTransitions[n].spush = s2.value;
  sakrijDijalogT();
  iscrtajGraf();
  e.value = "";
  s1.value = "";
  s2.value = "";
}

function obrisiStanje() {
  var n = document.getElementById("s_num").innerHTML;
  var sn = listOfStates[n];
  var newlist = [];
  for (var i = 0; i < listOfStates.length; i++) {
    if (i != n) newlist.push(listOfStates[i]);
  }
  listOfStates = newlist;
  newlist = [];
  for (var i = 0; i < listOfTransitions.length; i++) {
    if (listOfTransitions[i].origin != sn.state && listOfTransitions[i].dest != sn.state) newlist.push(listOfTransitions[i]);
  }
  listOfTransitions = newlist;
  sakrijDijalogS();
  iscrtajGraf();
}

function obrisiTranziciju() {
  var n = document.getElementById("t_num").innerHTML;
  var tn = listOfTransitions[n];
  var newlist = [];
  for (var i = 0; i < listOfTransitions.length; i++) {
    if (i != n) {
      if (listOfTransitions[i].origin == tn.origin && listOfTransitions[i].dest == tn.dest && listOfTransitions[i].repeat >= tn.repeat) {
        listOfTransitions[i].repeat -= 1;
      }
      newlist.push(listOfTransitions[i]);
    }
  }
  listOfTransitions = newlist;
  sakrijDijalogT();
  iscrtajGraf();
}

const fileInput = document.getElementById("file_in");
fileInput.addEventListener("change", async () => {
  const [file] = fileInput.files;

  if (file) {
    var ucitano = JSON.parse(await file.text());
    listOfStates = [];
    listOfTransitions = [];
    for (var u of ucitano.stanja) {
      listOfStates.push({state: u.state, finals: u.finals});
    }
    for (var u of ucitano.prijelazi) {
      var rpt = listOfTransitions.filter((x) => x.origin == u.origin && x.dest == u.dest).length;
      listOfTransitions.push({origin: u.origin, entry: u.entry, spop: u.spop, dest: u.dest, spush: u.spush, repeat: rpt});
    }
    iscrtajGraf();
  }
});

async function spasi() {
  try {
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    await writableStream.write(JSON.stringify({"stanja": listOfStates, "prijelazi": listOfTransitions.map((e) => {
      return {origin: e.origin, entry: e.entry, spop: e.spop, dest: e.dest, spush: e.spush};
    })}));
    await writableStream.close();
  }
  catch (err) {
    console.error(err.name, err.message);
  }
}

const inputs = document.getElementsByTagName("input");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", (e) => {
    if (e.key == 'ArrowRight') inputs[i+1].focus();
  });
  inputs[i].addEventListener("keydown", (e) => {
    if (e.key == 'ArrowLeft') inputs[i-1].focus();
  });
}

function iscrtajStek(polja, mod) {
  var stek = document.getElementById("stack");
  var punjenje = "";
  for (var i = 0; i < 15 - stack.length; i++) punjenje += "<tr><td></td></tr>";
  if (mod == "pop") for (var i = 0; i < polja.length; i++) punjenje += "<tr><td class='popping'>" + polja[i] + "</td></tr>";
  if (mod == "push") for (var i = 0; i < polja.length; i++) punjenje += "<tr><td class='pushing'>" + polja[i] + "</td></tr>";
  for (var i = polja.length; i < stack.length; i++) punjenje += "<tr><td>" + stack[i] + "</td></tr>";
  stek.innerHTML = punjenje;
}

function iscrtajUlaznuTraku(str, mod) {
  var ulazna = document.getElementById("entry_tape");
  var punjenje = "<tr>";
  for (var i = ((mod == "pop" && str == "") ? 1 : 0); i < 15 - str.length; i++) punjenje += "<td></td>";
  var u0 = (str.length > 0) ? str[0] : '';
  if (mod == "pop") punjenje += "<td class='popping'>" + u0 + "</td>";
  for (var i = ((mod == "pop") ? 1 : 0); i < str.length; i++) punjenje += "<td>" + str[i] + "</td>";
  punjenje += "</tr>";
  ulazna.innerHTML = punjenje;
}

function sakrijDijalogT() {
  document.getElementById("trans_change").style.display = "none";
}

function sakrijDijalogS() {
  document.getElementById("state_change").style.display = "none";
}

function iscrtajGraf() {
  var draw = SVG('#shema');
  var h = 240;
  //SVG('.shema').attr('height', 2 * h);
  document.getElementById("shema").style.height = (2 * h) + 'px';
  //document.getElementById("prihvacanje").innerHTML = h + ' nesto';
  //h = 200;
  draw.clear();
  for (let i = 0; i < listOfStates.length; i++) {
    var g = draw.group();
    var circ = g.circle(40).fill('#ffffff').stroke('#000000').center(120 * i + 120, h);
    if (listOfStates[i].finals) {
      var circ1 = g.circle(36).fill('#ffffff').stroke('#000000').center(120 * i + 120, h);
    }
    var txt = draw.text(listOfStates[i].state).move(120 * i + 120 - 5*listOfStates[i].state.length, h - 10);
    var clickable = g.circle(40).center(120 * i + 120, h).stroke('#000000').fill('none').addClass('clickable').attr('stroke-opacity', 0);
    clickable.click(function() {
      document.getElementById("state_change").style.display = "block";
      document.getElementById("s_num").innerHTML = i;
    });
  }
  for (let i = 0; i < listOfTransitions.length; i++) {
    let st1 = listOfStates.findIndex((x) => x.state == listOfTransitions[i].origin);
    let st2 = listOfStates.findIndex((x) => x.state == listOfTransitions[i].dest);
    var d = st2 - st1;
    var r = listOfTransitions[i].repeat;
    var cont1;
    var cont2;
    var str;
    if (d == 0) {
      var rt = Math.sqrt(200);
      cont1 = [120 * st1 + 90 - 30 * r, h - 50 - 30 * r, 120 * st1 + 120, h - 50 - 30 * r].join(' ');
      cont2 = [120 * st2 + 150 + 30 * r, h - 50 - 30 * r, 120 * st2 + 120 + rt, h - rt].join(' ');
      str = 'M' + (120 * st1 + 120 - rt) + ' ' + (h - rt) + ' Q' + cont1 + ' Q' + cont2;
    }
    else {
      var dy = 2*d;
      var dx = Math.sqrt(400 - 4 * d * d) * Math.sign(d);
      r = r * Math.sign(d);
      cont1 = [120 * st1 + 20 * d + 120 + dx, h + 40 * d + 40 * r, 60 * st1 + 60 * st2 + 120, h + 40 * d + 40 * r].join(' ');
      cont2 = [120 * st2 + 120 - 20 * d - dx, h + 40 * d + 40 * r, 120 * st2 + 120 - dx, h + dy].join(' ');
      str = 'M' + (120 * st1 + 120 + dx) + ' ' + (h + dy) + ' Q' + cont1 + ' Q' + cont2;
    }
    var cur = draw.path(str).stroke('#000000').fill('none').addClass('curve');
    cur.marker('mid', 100, 25, function(add) {
      add.text(listOfTransitions[i].entry + ', ' + listOfTransitions[i].spop + '/ ' + listOfTransitions[i].spush).center(50,12).rotate((d < 0) ? 180 : 0).addClass('tr_text');
      this.ref(50, (d != 0) ? 3 : 22);
    });
    cur.marker('end', 20, 20, function(add) {
      add.path('M 0 5 L 10 10 L 0 15 z').addClass('arrow_point');
      this.fill('#000000');
    }).attr("orient", "auto-start-reverse");
    var clickable = draw.path(str).stroke('#000000').fill('none').addClass('clickable').attr('stroke-opacity', 0);
    clickable.click(function() {
      document.getElementById("trans_change").style.display = "block";
      document.getElementById("t_num").innerHTML = i;
    });
  }
}

var faza = 0;

var idx;
var stanje;
var circ;
var ulaz;
var sadrzaj;
var u0;
var simbol;
var prijelaz;
var txt;
var cur;
var arr;

function korak() {
  if (faza == 0) {
    document.getElementById("prihvacanje").innerHTML = "";
    stack = "A";
    idx = 0;
    stanje = listOfStates[idx];
    circ = SVG('#shema').find('g')[idx];
    circ.each(function(i, children) {
      this.attr('stroke', 'orange');
    });
    ulaz = document.getElementById("entry_seq");
    iscrtajUlaznuTraku(ulaz.value, "");
    faza = 1;
  }
  else if (faza == 1) {
    sadrzaj = ulaz.value;
    u0 = (sadrzaj.length > 0) ? sadrzaj[0] : '';
    simbol = stack[0];
    iscrtajUlaznuTraku(sadrzaj, "pop");
    iscrtajStek(simbol, "pop");
    faza = 2;
  }
  else if (faza == 2) {
    prijelaz = listOfTransitions.findIndex((x) => x.origin == stanje.state && x.entry == u0 && x.spop == simbol);
    if (prijelaz == -1) {
      if (stanje.finals && sadrzaj == "") document.getElementById("prihvacanje").innerHTML = "PRIHVACENO";
      else document.getElementById("prihvacanje").innerHTML = "NIJE PRIHVACENO";
      iscrtajUlaznuTraku(sadrzaj, "");
      iscrtajStek("", "");
      circ.each(function(i, children) {
        this.attr('stroke', '#000000');
      });
      faza = 0;
      return;
    }
    txt = SVG('#shema').find('.tr_text')[prijelaz];
    cur = SVG('#shema').find('.curve')[prijelaz];
    arr = SVG('#shema').find('.arrow_point')[prijelaz];
    txt.attr('fill', 'red');
    cur.attr('stroke', 'red');
    arr.attr('stroke', 'red');
    arr.attr('fill', 'red');
    circ.each(function(i, children) {
      this.attr('stroke', '#000000');
    });
    faza = 3;
  }
  else if (faza == 3) {
    stack = stack.slice(1, stack.length);
    sadrzaj = sadrzaj.slice(1, sadrzaj.length);
    ulaz.value = sadrzaj;
    stack = listOfTransitions[prijelaz].spush + stack;
    idx = listOfStates.findIndex((x) => x.state == listOfTransitions[prijelaz].dest);
    stanje = listOfStates[idx];
    txt.attr('fill', '#000000');
    cur.attr('stroke', '#000000');
    arr.attr('stroke', '#000000');
    arr.attr('fill', '#000000');
    circ = SVG('#shema').find('g')[idx];
    circ.each(function(i, children) {
      this.attr('stroke', 'orange');
    });
    iscrtajUlaznuTraku(ulaz.value, "");
    iscrtajStek(listOfTransitions[prijelaz].spush, "push");
    faza = 1;
  }
}

function pokreni() {
  faza = 0;
  korak();
  var timer = setInterval(function() {
    var pauza1 = setTimeout(function() {
      korak();
      var pauza2 = setTimeout(function() {
        korak();
        if (prijelaz == -1) {
          clearInterval(timer);
          return;
        }
        var pauza3 = setTimeout(function() {
          korak();
        }, 1000);
      }, 1000);
    }, 1000);
  }, 5000);
}
