var decode = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
}

var encode = {
     'a':'.-',
     'b':'-...',
     'c':'-.-.',
     'd':'-..',
     'e':'.',
     'f':'..-.',
     'g':'--.',
     'h':'....',
     'i':'..',
     'j':'.---',
     'k':'-.-',
     'l':'.-..',
     'm':'--',
     'n':'-.',
     'o':'---',
     'p':'.--.',
     'q':'--.-',
     'r':'.-.',
     's':'...',
     't':'-',
     'u':'..-',
     'v':'...-',
     'w':'.--',
     'x':'-..-',
     'y':'-.--',
     'z':'--..',
     '1':'.----',
     '2':'..---',
     '3':'...--',
     '4':'....-',
     '5':'.....',
     '6':'-....',
     '7':'--...',
     '8':'---..',
    '9':'----.',
    '0':'-----',
    '(':'---...',
    '{':'---...',
    '[':'---...',
    '<':'---...',
    ')':'...---',
    '}':'...---',
    ']':'...---',
    '>':'...---',
    '#':'------',
    ';':'.-.-.-',
    '=':'.--.--',
    '!':'......',
    '%':'-.-.-.',
    '+':'--..--',
    '-':'..--..',
}

var lastConv = "";

function convert(code){
    let lines = code.split("\n");
    output = "";

    for (let i = 0; i < lines.length;i++){
        let line = lines[i];
        words = line.split(" ");
        for (let j = 0; j < words.length; j++){
            word = words[j];
            if (word.length > 0) {
                for (let k = 0; k < word.length; k++) {
                    let char = word.charAt(k).toLowerCase();

                    if (char in encode) {
                        output += encode[char];
                    } else {
                        output += char;
                    }
                    //At the end of each letter
                    output += ' ';
                }
                // At the end of each word
                output += '/';
            }
        }
        //At the end of each line
        output += '\n';
    }

    return output;
}

let textArea = document.getElementById("codeInput");
function convertInput(){
    let text = textArea.value
    console.log("converted text successfully!");

    console.log(convert(text));

    let morseCode = lastConv;

    if (text != lastConv) {
        morseCode = convert(text);
    }

    textArea.value = morseCode;
    lastConv = morseCode;
}

document.getElementById('upload').addEventListener('change', readFileAsString)
function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        console.log('File content:', convert(event.target.result));
        textArea.value = event.target.result;
    };

    reader.readAsText(files[0]);

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function clickDownload(){
    let text = textArea.value;
    download("Morse.txt", text);
}
