var listOfStates = [];
var listOfTransitions = [];
var stack = "A";
iscrtajStek("", "");
iscrtajUlaznuTraku("", "");

function dodajStanje() {
  var element = document.getElementById("state_in");
  var finalno = document.getElementById("state_final");
  listOfStates.push({state: element.value, finals: finalno.checked, x: 120 * listOfStates.length + 120, y: 240});
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
  var f = document.getElementById("new_state_final");
  var n = document.getElementById("s_num").innerHTML;
  for (var i = 0; i < listOfTransitions.length; i++) {
    if (listOfTransitions[i].origin == listOfStates[n].state) listOfTransitions[i].origin = s.value;
    if (listOfTransitions[i].dest == listOfStates[n].state) listOfTransitions[i].dest = s.value;
  }
  listOfStates[n].state = s.value;
  listOfStates[n].finals = f.checked;
  sakrijDijalogS();
  iscrtajGraf();
  s.value = "";
  f.checked = false;
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
      listOfStates.push({state: u.state, finals: u.finals, x: 120 * listOfStates.length + 120, y: 240});
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
    await writableStream.write(JSON.stringify({
      "stanja": listOfStates.map((e) => {return {state: e.state, finals: e.finals};}),
      "prijelazi": listOfTransitions.map((e) => {return {origin: e.origin, entry: e.entry, spop: e.spop, dest: e.dest, spush: e.spush};})
    }));
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
  for (var i = ((mod == "push" && polja == "") ? 1 : 0); i < 15 - stack.length; i++) punjenje += "<tr><td></td></tr>";
  if (mod == "pop") for (var i = 0; i < polja.length; i++) punjenje += "<tr><td class='popping'>" + polja[i] + "</td></tr>";
  if (mod == "push") {
    if (polja == "") polja = "ε";
    for (var i = 0; i < polja.length; i++) punjenje += "<tr><td class='pushing'>" + polja[i] + "</td></tr>";
    if (polja == "ε") polja = "";
  }
  for (var i = polja.length; i < stack.length; i++) punjenje += "<tr><td>" + stack[i] + "</td></tr>";
  stek.innerHTML = punjenje;
}

function iscrtajUlaznuTraku(str, mod) {
  var ulazna = document.getElementById("entry_tape");
  var punjenje = "<tr>";
  for (var i = ((mod == "pop" && str == "") ? 1 : 0); i < 15 - str.length; i++) punjenje += "<td></td>";
  var u0 = (str.length > 0) ? str[0] : 'ε';
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

function iscrtajTranziciju(i) {
  var draw = SVG('#shema');
  let st1 = listOfStates.findIndex((x) => x.state == listOfTransitions[i].origin);
  let st2 = listOfStates.findIndex((x) => x.state == listOfTransitions[i].dest);
  var d = listOfStates[st2].x - listOfStates[st1].x;
  var r = listOfTransitions[i].repeat;
  var cont1;
  var cont2;
  var str;
  var rt = Math.sqrt(200);
  if (d == 0) {
    cont1 = [listOfStates[st1].x - 30 - 30 * r, listOfStates[st1].y - 50 - 30 * r, listOfStates[st1].x, listOfStates[st1].y - 50 - 30 * r].join(' ');
    cont2 = [listOfStates[st2].x + 30 + 30 * r, listOfStates[st2].y - 50 - 30 * r, listOfStates[st2].x + rt, listOfStates[st2].y - rt].join(' ');
    str = 'M' + (listOfStates[st1].x - rt) + ' ' + (listOfStates[st1].y - rt) + ' Q' + cont1 + ' Q' + cont2;
  }
  else {
    rt = rt * Math.sign(d);
    r = r * Math.sign(d);
    var m = Math.max(Math.sign(d) * listOfStates[st1].y, Math.sign(d) * listOfStates[st2].y) * Math.sign(d);
    cont1 = [listOfStates[st1].x + d/6 + rt, m + d/3 + 40 * r, (listOfStates[st1].x + listOfStates[st2].x)/2, m + d/3 + 40 * r].join(' ');
    cont2 = [listOfStates[st2].x - d/6 - rt, m + d/3 + 40 * r, listOfStates[st2].x - rt, listOfStates[st2].y + rt].join(' ');
    str = 'M' + (listOfStates[st1].x + rt) + ' ' + (listOfStates[st1].y + rt) + ' Q' + cont1 + ' Q' + cont2;
  }
  let g = draw.group().addClass('t_group');
  var cur = g.path(str).stroke('#000000').fill('none').addClass('curve');
  cur.marker('mid', 100, 25, function(add) {
    let entry_mark = (listOfTransitions[i].entry.length > 0) ? listOfTransitions[i].entry : 'ε';
    let spop_mark = (listOfTransitions[i].spop.length > 0) ? listOfTransitions[i].spop : 'ε';
    let spush_mark = (listOfTransitions[i].spush.length > 0) ? listOfTransitions[i].spush : 'ε';
    add.text(entry_mark + ', ' + spop_mark + '/ ' + spush_mark).center(50,12).rotate((d < 0) ? 180 : 0).addClass('tr_text');
    this.ref(50, (d != 0) ? 3 : 22);
    g.add(this);
  });
  cur.marker('end', 20, 20, function(add) {
    add.path('M 0 5 L 10 10 L 0 15 z').addClass('arrow_point');
    this.fill('#000000');
    g.add(this);
  }).attr("orient", "auto-start-reverse");
  var clickable = g.path(str).stroke('#000000').fill('none').addClass('clickable').attr('stroke-opacity', 0);
  clickable.click(function() {
    document.getElementById("new_entry").value = listOfTransitions[i].entry;
    document.getElementById("new_spop").value = listOfTransitions[i].spop;
    document.getElementById("new_spush").value = listOfTransitions[i].spush;
    document.getElementById("trans_change").style.display = "block";
    document.getElementById("t_num").innerHTML = i;
  });
  return g;
}

function iscrtajGraf() {
  var draw = SVG('#shema');
  var h = 240;
  document.getElementById("shema").style.height = (2 * h) + 'px';
  draw.clear();
  for (let i = 0; i < listOfStates.length; i++) {
    let g = draw.group().addClass('s_group');
    var circ = g.circle(40).fill('#ffffff').stroke('#000000').center(listOfStates[i].x, listOfStates[i].y);
    if (listOfStates[i].finals) {
      var circ1 = g.circle(36).fill('#ffffff').stroke('#000000').center(listOfStates[i].x, listOfStates[i].y);
    }
    var txt = g.text(listOfStates[i].state).center(listOfStates[i].x, listOfStates[i].y);
    var clickable = g.circle(40).center(listOfStates[i].x, listOfStates[i].y).stroke('#000000').fill('none').addClass('clickable').attr('stroke-opacity', 0);
    clickable.click(function() {
      document.getElementById("new_state").value = listOfStates[i].state;
      document.getElementById("new_state_final").checked = listOfStates[i].finals;
      document.getElementById("state_change").style.display = "block";
      document.getElementById("s_num").innerHTML = i;
    });
    g.draggable();
    g.on('dragend', (e) => {
      listOfStates[i].x = g.cx();
      listOfStates[i].y = g.cy();
      for (let j = 0; j < listOfTransitions.length; j++) {
        if (listOfTransitions[j].origin == listOfStates[i].state || listOfTransitions[j].dest == listOfStates[i].state) {
          draw.find('.t_group')[j].replace(iscrtajTranziciju(j));
        }
      }
    });
  }
  for (let i = 0; i < listOfTransitions.length; i++) {
    iscrtajTranziciju(i);
  }
}

function dodajTest() {
  let dugme = document.getElementById("add_testcase");
  let broj = document.getElementsByClassName("testcase").length;
  let punjenje = "<div class=\"testcase\"><input class=\"entry_seq\">";
  punjenje += "<button class=\"run_button\" onclick=\"return pokreniE(" + broj + ")\">Pokreni</button>";
  punjenje += "<button class=\"step_button\" onclick=\"return korakE(" + broj + ")\">Korak</button>";
  punjenje += "<button class=\"abort_button\" onclick=\"return otkaziE()\">Otkaži</button>";
  punjenje += "<div class=\"prihvacanje\"></div></div>";
  dugme.insertAdjacentHTML("beforebegin", punjenje);
}

var testidx = -1;

var faza = 0;

var idx;
var stanje;
var circ;
var testcase;
var u0;
var simbol;
var prijelaz;
var lin;

function pokreniE(i) {
  for (let j of document.getElementsByTagName("input")) j.disabled = true;
  for (let j of document.getElementsByTagName("button")) j.disabled = true;
  document.getElementsByClassName("abort_button")[i].disabled = false;
  testidx = i;
  pokreni();
}

function otkaziE() {
  for (let j of document.getElementsByTagName("input")) j.disabled = false;
  for (let j of document.getElementsByTagName("button")) j.disabled = false;
  otkazi(true);
}

function korakE(i) {
  for (let j of document.getElementsByTagName("input")) j.disabled = true;
  for (let j of document.getElementsByTagName("button")) j.disabled = true;
  document.getElementsByClassName("abort_button")[i].disabled = false;
  document.getElementsByClassName("step_button")[i].disabled = false;
  testidx = i;
  korak(true);
  if (faza == 0) document.getElementsByClassName("step_button")[testidx].disabled = true;
}

function otkazi(iscrtaj) {
  if (iscrtaj) {
    circ.find('circle').each(function(i, children) {
      this.attr('stroke', '#000000');
    });
    lin.find('.curve').attr('stroke', '#000000');
    lin.find('.arrow_point').attr('stroke', '#000000').attr('fill', '#000000');
    lin.find('.tr_text').attr('fill', '#000000');
    iscrtajGraf();
    iscrtajStek("", "");
    iscrtajUlaznuTraku("", "");
  }
  faza = 0;
  idx = -1;
  stanje = undefined;
  testcase = "";
  u0 = '';
  simbol = '';
  stack = "A";
  prijelaz = -1;
}

function korak(iscrtaj) {
  if (faza == 0) {
    document.getElementsByClassName("prihvacanje")[testidx].innerHTML = "";
    document.getElementsByClassName("prihvacanje")[testidx].style.backgroundColor = "#ffffff";
    stack = "A";
    idx = 0;
    stanje = listOfStates[idx];
    testcase = document.getElementsByClassName("entry_seq")[testidx].value;
    if (iscrtaj) {
      circ = SVG('#shema').find('.s_group')[idx];
      circ.find('circle').each(function(i, children) {
        this.attr('stroke', 'orange');
      });
      iscrtajUlaznuTraku(testcase, "");
    }
    faza = 1;
  }
  else if (faza == 1) {
    u0 = (testcase.length > 0) ? testcase[0] : '';
    simbol = (stack.length > 0) ? stack[0] : '';
    if (iscrtaj) {
      iscrtajUlaznuTraku(testcase, "pop");
      iscrtajStek(simbol, "pop");
    }
    faza = 2;
  }
  else if (faza == 2) {
    prijelaz = listOfTransitions.findIndex((x) => x.origin == stanje.state && (x.entry == u0 || x.entry == '') && x.spop == simbol);
    if (prijelaz == -1) {
      let stateAccept = document.getElementById("state_accept").checked;
      let stackAccept = document.getElementById("stack_accept").checked;
      if (stateAccept) {
        if (stanje.finals && testcase == "") {
        document.getElementsByClassName("prihvacanje")[testidx].innerHTML = "PRIHVAĆENO";
        document.getElementsByClassName("prihvacanje")[testidx].style.backgroundColor = "lightgreen";
        }
        else {
          document.getElementsByClassName("prihvacanje")[testidx].innerHTML = "NIJE PRIHVAĆENO";
          document.getElementsByClassName("prihvacanje")[testidx].style.backgroundColor = "lightcoral";
        }
      }
      if (stackAccept) {
        if (stack == "" && testcase == "") {
        document.getElementsByClassName("prihvacanje")[testidx].innerHTML = "PRIHVAĆENO";
        document.getElementsByClassName("prihvacanje")[testidx].style.backgroundColor = "lightgreen";
        }
        else {
          document.getElementsByClassName("prihvacanje")[testidx].innerHTML = "NIJE PRIHVAĆENO";
          document.getElementsByClassName("prihvacanje")[testidx].style.backgroundColor = "lightcoral";
        }
      }
      if (iscrtaj) {
        iscrtajUlaznuTraku(testcase, "");
        iscrtajStek("", "");
        circ.find('circle').each(function(i, children) {
          this.attr('stroke', '#000000');
        });
      }
      faza = 0;
      return;
    }
    if (iscrtaj) {
      if (listOfTransitions[prijelaz].entry == '') iscrtajUlaznuTraku("ε" + testcase, "pop");
      lin = SVG('#shema').find('.t_group')[prijelaz];
      lin.find('.curve').attr('stroke', 'red');
      lin.find('.arrow_point').attr('stroke', 'red').attr('fill', 'red');
      lin.find('.tr_text').attr('fill', 'red');
      circ.find('circle').each(function(i, children) {
        this.attr('stroke', '#000000');
      });
    }
    faza = 3;
  }
  else if (faza == 3) {
    stack = stack.slice(1, stack.length);
    if (listOfTransitions[prijelaz].entry != '') testcase = testcase.slice(1, testcase.length);
    stack = listOfTransitions[prijelaz].spush + stack;
    idx = listOfStates.findIndex((x) => x.state == listOfTransitions[prijelaz].dest);
    stanje = listOfStates[idx];
    if (iscrtaj) {
      lin.find('.curve').attr('stroke', '#000000');
      lin.find('.arrow_point').attr('stroke', '#000000').attr('fill', '#000000');
      lin.find('.tr_text').attr('fill', '#000000');
      circ = SVG('#shema').find('.s_group')[idx];
      circ.find('circle').each(function(i, children) {
        this.attr('stroke', 'orange');
      });
      iscrtajUlaznuTraku(testcase, "");
      iscrtajStek(listOfTransitions[prijelaz].spush, "push");
    }
    faza = 1;
  }
}

function pokreni() {
  faza = 0;
  prijelaz = undefined;
  var timer = setInterval(function() {
    if (faza == 0 && prijelaz == -1) {
      clearInterval(timer);
      return;
    }
    korak(true);
  }, 1000);
}

function pokreniSve() {
  for (testidx = 0; testidx < document.getElementsByClassName("testcase").length; testidx++) {
    faza = 0;
    prijelaz = undefined;
    while (faza != 0 || prijelaz != -1) korak(false);
    otkazi(false);
  }
  for (let j of document.getElementsByTagName("input")) j.disabled = false;
  for (let j of document.getElementsByTagName("button")) j.disabled = false;
}