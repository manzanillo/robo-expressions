A Pen created at CodePen.io. You can find this one at https://codepen.io/ooohpaco/pen/pbeYjL.
A PEN BY sebastien

 After watching Anki's new robot Cozmo : 
https://anki.com/en-us/cozmo

Sebastien tried to reproduce some of his faces expressions.



The landing page is inspired by this codepen: https://codepen.io/hammercait/pen/QWNmEeY

To start the secure server please

1. create the config file settings.json as follows:
{
    "liveServer.settings.https": {
        "enable": true,
        "cert": "path/to/cert.pem",
        "key": "path/to/key.key",
        "passphrase": "12345"
    }
}
2. put the config file to the ./.vscode/settings.json
3. start secure server with the comand node .\secureSever.js