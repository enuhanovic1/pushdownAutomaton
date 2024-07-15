const vjezbe = [
    {
        "description": "Konstruisati potisni automat koji prihvata jezik L = {a<sup>n</sup>b<sup>2n</sup>, n ≥ 0}",
        "testcases": [
            {"input": "", "accept": true},
            {"input": "a", "accept": false},
            {"input": "bb", "accept": false},
            {"input": "abb", "accept": true},
            {"input": "abbb", "accept": false},
            {"input": "abba", "accept": false},
            {"input": "aabbbb", "accept": true},
            {"input": "aabbb", "accept": false},
            {"input": "aabbbbc", "accept": false}
        ],
    },
    {
        "description": "Konstruisati potisni automat koji prihvata jezik L = {w, w sadrži isti broj simbola a i b}",
        "testcases": [
            {"input": "abba", "accept": true},
            {"input": "baba", "accept": true},
            {"input": "abbb", "accept": false},
            {"input": "aabbba", "accept": true},
            {"input": "aabbaa", "accept": false},
            {"input": "aabbbaa", "accept": false},
            {"input": "aabbbaba", "accept": true},
            {"input": "baaaabbb", "accept": true},
            {"input": "babaaaabb", "accept": false}
        ],
    },
    {
        "description": "Konstruisati potisni automat koji prihvata jezik L = {0<sup>i</sup>1<sup>j</sup>2<sup>i + j</sup>, i ≥ 0, j ≥ 0, i + j > 1}",
        "testcases": [
            {"input": "0122", "accept": true},
            {"input": "1122", "accept": true},
            {"input": "012", "accept": false},
            {"input": "0112", "accept": false},
            {"input": "000222", "accept": true},
            {"input": "001222", "accept": true},
            {"input": "0012222", "accept": false},
            {"input": "110222", "accept": false},
            {"input": "000122", "accept": false}
        ],
    },
    {
        "description": "Konstruisati potisni automat koji prihvata jezik L = {a<sup>n</sup>b<sup>3n</sup>, n ≥ 0}",
        "testcases": [
            {"input": "", "accept": true},
            {"input": "abb", "accept": false},
            {"input": "bbb", "accept": false},
            {"input": "abbb", "accept": true},
            {"input": "abbbb", "accept": false},
            {"input": "abbba", "accept": false},
            {"input": "aabbbbbb", "accept": true},
            {"input": "aabbbbb", "accept": false},
            {"input": "aaabbbbbb", "accept": false}
        ],
    },
    {
        "description": "Konstruisati potisni automat koji prihvata jezik L = {a<sup>3n</sup>b<sup>2n</sup>, n ≥ 0}",
        "testcases": [
            {"input": "", "accept": true},
            {"input": "aaa", "accept": false},
            {"input": "bb", "accept": false},
            {"input": "aaabb", "accept": true},
            {"input": "aabb", "accept": false},
            {"input": "aaabbb", "accept": false},
            {"input": "aaaaaabbbb", "accept": true},
            {"input": "aaaaaabbb", "accept": false},
            {"input": "aaaaabbbb", "accept": false}
        ],
    }
];

let vjezba_idx = -1;

const listing = document.getElementsByTagName("li");
for (let i = 0; i < listing.length; i++) {
    listing[i].addEventListener("click", (e) => {
        if (vjezba_idx > -1) listing[vjezba_idx].classList.remove("chosen");
        listing[i].classList.add("chosen");
        vjezba_idx = i;
        let punjenje = "<button id=\"run_all\" onclick=\"return testiraj()\">Pokreni sve</button>";
        punjenje += "<div class=\"ocjena\"></div>";
        for (let j = 0; j < vjezbe[i].testcases.length; j++) {
            punjenje += "<div class=\"testcase\">";
            punjenje += "<input class=\"entry_seq\" value=" + vjezbe[i].testcases[j].input + ">";
            if (vjezbe[i].testcases[j].accept) punjenje += "<div class=\"expected\">PRIHVAĆA SE</div>";
            else punjenje += "<div class=\"expected\">NE PRIHVAĆA SE</div>";
            punjenje += "<div class=\"prihvacanje\"></div>";
            punjenje += "</div>";
        }
        document.getElementById("testing_field").innerHTML = punjenje;
        document.getElementById("descript").innerHTML = vjezbe[i].description;
    });
}

function testiraj() {
    let passed = 0;
    for (testidx = 0; testidx < document.getElementsByClassName("testcase").length; testidx++) {
        faza = 0;
        prijelaz = undefined;
        while (faza != 0 || prijelaz != -1) korak(false);
        if (vjezbe[vjezba_idx].testcases[testidx].accept == (document.getElementsByClassName("prihvacanje")[testidx].innerHTML == "PRIHVAĆENO")) passed++;
        otkazi(false);
    }
    document.getElementsByClassName("ocjena")[0].innerHTML = "Testova prošlo: " + passed + "/" + vjezbe[vjezba_idx].testcases.length;
    for (let j of document.getElementsByTagName("input")) j.disabled = false;
    for (let j of document.getElementsByTagName("button")) j.disabled = false;
}