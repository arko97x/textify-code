const execSync = require('child_process').execSync;
var command;

var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
var fileloc;

document.getElementById('addImageButton').onclick = () => {
    dialog.showOpenDialog((filenames) => {
        if(filenames === undefined) {
            alert('No file selected');
        } else {
            readFile(filenames[0]);
        }
    });
};

function readFile(filepath) {
    fs.readFile(filepath, (err, data) => {
        if(err) {
            alert('Some error has occured');
            return;
        }
        document.getElementById('addedImages').innerHTML += ('<li><input type="image" src="' + filepath + '"></li>');
        fileloc = filepath;
    });
}

document.getElementById('addedImages').onclick = () => {
    command = 'python text_recognition.py --east frozen_east_text_detection.pb --image ' + fileloc;
    execSync(command);
    fs.readFile('testFile.txt', 'utf-8', (err, data) => {
        document.getElementById('extractedText').innerHTML = data;
    });
};

document.getElementById('copyToClipboardButton').onclick = () => {
    var copyText = document.getElementById('extractedText');
    copyText.select();
    document.execCommand("copy");
};



