const vjezbe = [
    {
        "stanja": [
            {"state": "q0", "finals": true},
            {"state": "q1", "finals": false},
            {"state": "q2", "finals": false},
            {"state": "q3", "finals": true}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "a", "spop": "A", "dest": "q1", "spush": "aaA"},
            {"origin": "q1", "entry": "a", "spop": "a", "dest": "q1", "spush": "aaa"},
            {"origin": "q1", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "", "spop": "A", "dest": "q3", "spush": "A"}
        ],
        "ulaz": "aabbbb",
        "accept": "state"
    },
    {
        "stanja": [
            {"state": "q0", "finals": false},
            {"state": "q1", "finals": true}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "a", "spop": "A", "dest": "q0", "spush": "aA"},
            {"origin": "q0", "entry": "b", "spop": "A", "dest": "q0", "spush": "bA"},
            {"origin": "q0", "entry": "a", "spop": "a", "dest": "q0", "spush": "aa"},
            {"origin": "q0", "entry": "b", "spop": "b", "dest": "q0", "spush": "bb"},
            {"origin": "q0", "entry": "a", "spop": "b", "dest": "q0", "spush": ""},
            {"origin": "q0", "entry": "b", "spop": "a", "dest": "q0", "spush": ""},
            {"origin": "q0", "entry": "", "spop": "A", "dest": "q1", "spush": "A"}
        ],
        "ulaz": "baabba",
        "accept": "state"
    },
    {
        "stanja": [
            {"state": "q0", "finals": false},
            {"state": "q1", "finals": false},
            {"state": "q2", "finals": false},
            {"state": "q3", "finals": false},
            {"state": "q4", "finals": true}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "0", "spop": "A", "dest": "q0", "spush": "aA"},
            {"origin": "q0", "entry": "0", "spop": "a", "dest": "q0", "spush": "aa"},
            {"origin": "q0", "entry": "1", "spop": "A", "dest": "q1", "spush": "aA"},
            {"origin": "q0", "entry": "1", "spop": "a", "dest": "q1", "spush": "aa"},
            {"origin": "q0", "entry": "2", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q1", "entry": "1", "spop": "a", "dest": "q1", "spush": "aa"},
            {"origin": "q1", "entry": "2", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "2", "spop": "a", "dest": "q3", "spush": ""},
            {"origin": "q3", "entry": "2", "spop": "a", "dest": "q3", "spush": ""},
            {"origin": "q3", "entry": "", "spop": "A", "dest": "q4", "spush": "A"}
        ],
        "ulaz": "0122",
        "accept": "state"
    },
    {
        "stanja": [
            {"state": "q0", "finals": false},
            {"state": "q1", "finals": false},
            {"state": "q2", "finals": false},
            {"state": "q3", "finals": false}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "a", "spop": "A", "dest": "q0", "spush": "aA"},
            {"origin": "q0", "entry": "a", "spop": "a", "dest": "q0", "spush": "aa"},
            {"origin": "q0", "entry": "b", "spop": "a", "dest": "q1", "spush": ""},
            {"origin": "q1", "entry": "", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "b", "spop": "a", "dest": "q1", "spush": ""},
            {"origin": "q2", "entry": "", "spop": "A", "dest": "q3", "spush": ""}
        ],
        "ulaz": "aaaabb",
        "accept": "stack"
    },
    {
        "stanja": [
            {"state": "q0", "finals": true},
            {"state": "q1", "finals": false},
            {"state": "q2", "finals": false},
            {"state": "q3", "finals": true}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "a", "spop": "A", "dest": "q1", "spush": "aaaA"},
            {"origin": "q1", "entry": "a", "spop": "a", "dest": "q1", "spush": "aaaa"},
            {"origin": "q1", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "", "spop": "A", "dest": "q3", "spush": "A"}
        ],
        "ulaz": "aabbbbbb",
        "accept": "state"
    },
    {
        "stanja": [
            {"state": "q0", "finals": true},
            {"state": "q1", "finals": false},
            {"state": "q2", "finals": false},
            {"state": "q3", "finals": false},
            {"state": "q4", "finals": false},
            {"state": "q5", "finals": true}
        ],
        "prijelazi": [
            {"origin": "q0", "entry": "a", "spop": "A", "dest": "q1", "spush": "aaA"},
            {"origin": "q1", "entry": "a", "spop": "a", "dest": "q1", "spush": "aaa"},
            {"origin": "q1", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q2", "entry": "", "spop": "a", "dest": "q3", "spush": ""},
            {"origin": "q3", "entry": "", "spop": "a", "dest": "q4", "spush": ""},
            {"origin": "q4", "entry": "b", "spop": "a", "dest": "q2", "spush": ""},
            {"origin": "q4", "entry": "", "spop": "A", "dest": "q5", "spush": ""}
        ],
        "ulaz": "aaabb",
        "accept": "state"
    }
];

let vjezba_idx = -1;

const listing = document.getElementsByTagName("li");
for (let i = 0; i < listing.length; i++) {
    listing[i].addEventListener("click", (e) => {
        if (vjezba_idx > -1) listing[vjezba_idx].classList.remove("chosen");
        listing[i].classList.add("chosen");
        vjezba_idx = i;
        listOfStates = [];
        listOfTransitions = [];
        for (var v of vjezbe[i].stanja) {
            listOfStates.push({state: v.state, finals: v.finals, x: 120 * listOfStates.length + 120, y: 240});
        }
        for (var v of vjezbe[i].prijelazi) {
            var rpt = listOfTransitions.filter((x) => x.origin == v.origin && x.dest == v.dest).length;
            listOfTransitions.push({origin: v.origin, entry: v.entry, spop: v.spop, dest: v.dest, spush: v.spush, repeat: rpt});
        }
        iscrtajGraf();
        if (vjezbe[i].accept == "state") document.getElementById("state_accept").checked = true;
        if (vjezbe[i].accept == "stack") document.getElementById("stack_accept").checked = true;
        for (let i of document.getElementsByName("acceptance")) i.disabled = true;
        let punjenje = "<button id=\"run_all\" onclick=\"return testiraj()\">Testiraj</button>";
        punjenje += "<div class=\"ocjena\"></div>";
        punjenje += "<div class=\"testcase\">";
        punjenje += "<input class=\"entry_seq\" value=" + vjezbe[i].ulaz + ">";
        punjenje += "<div class=\"prihvacanje\"></div>";
        punjenje += "</div>";
        document.getElementById("testing_field").innerHTML = punjenje;
        document.getElementById("pocetna").innerHTML = "Početna: " + vjezbe[i].stanja[0].state + "," + vjezbe[i].ulaz + ",A";
        document.getElementById("descript").innerHTML = "Prikazati slijed konfiguracija za ulazni niz " + vjezbe[i].ulaz;
    });
}

function testiraj() {
    let konfiguracije = document.getElementsByTagName("textarea")[0].value.split('\n');
    let passed = 0;
    let total = 0;
    faza = 0;
    prijelaz = undefined;
    testidx = 0;
    korak(false);
    korak(false);
    korak(false);
    while (faza != 0 || prijelaz != -1) {
        korak(false);
        korak(false);
        korak(false);
        total++;
        if (passed >= konfiguracije.length) break;
        let trenutna = konfiguracije[passed].split(',');
        if (trenutna.length != 3 || trenutna[0] != stanje.state || trenutna[1] != testcase || trenutna[2] != stack) break;
        passed++;
    }
    while (faza != 0 || prijelaz != -1) {
        korak(false);
        korak(false);
        korak(false);
        total++;
    }
    otkazi(false);
    document.getElementsByClassName("ocjena")[0].innerHTML = "Broj tačnih konfiguracija: " + passed + "/" + total;
    for (let j of document.getElementsByTagName("input")) j.disabled = false;
    for (let j of document.getElementsByTagName("button")) j.disabled = false;
}