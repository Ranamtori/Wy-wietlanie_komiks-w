Program napisany w Node.js, który pobiera numery komiksów z pliku `nr.txt`, następnie korzystając z API XKCD (https://xkcd.com/json.html), pobiera dane komiksów i generuje stronę HTML z wykorzystaniem Bootstrapa.

Przed uruchomieniem programu nalezy upewnić sie, że masz zainstalowane zależności (Node.js i npm):
node -v
npm -v

Jeżeli nie, to należy wpisać następujące komendy aby je pobrać:
sudo apt install nodejs
sudo apt install npm

Upewnij się też, że posiadasz plik nr.txt w postaci np.:
1
11
111

Aby uruchomić program należy wpisać komendę:
node index.js

Następnie program wygeneruje plik index.html

Julia Grzankowska
