const fs = require('fs'); //filesystem do czytania z nr.txt
const axios = require('axios'); //do api
 
// do pobierania api dla konkretnych komiksów co podałam w nr.txt
async function fetchComic(comicNumber) {
    try {
        const response = await axios.get(`https://xkcd.com/${comicNumber}/info.0.json`);
        return response.data; // JSON z danymi komiksu
    } catch (error) {
        console.error(`Error fetching comic number ${comicNumber}: ${error.message}`);
        return null;
    }
}


async function main() {
    const inputFilename = 'nr.txt'; 
    const outputHtmlFilename = 'index.html'; // Nazwa pliku HTML do wygenerowania

    try {
        //tu odczytywanie numerków i tablica na nie
        const comicNumbers = fs.readFileSync(inputFilename, 'utf-8').trim().split('\n');
        const comicsData = [];

        // dane dla każdego numeru komiksu
        for (const number of comicNumbers) {
            const comic = await fetchComic(number.trim());
            if (comic) {
                comicsData.push(comic); //i do tablicy
            }
        }

        // tu generuje htmlke
        let htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Komiksy XKCD</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container py-4">
                <h1 class="mb-4">Pobrane komiksy:</h1>
                <div class="row row-cols-1 row-cols-md-2 g-4">`;

        // każdy komiks pod szablon bootstrapa z tyutłem i opisem
        comicsData.forEach(comic => {
            htmlContent += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${comic.img}" class="card-img-top img-fluid" alt="${comic.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${comic.safe_title}</h5>
                        <p class="card-text">${comic.alt}</p>
                    </div>
                </div>
            </div>`;
        });

        htmlContent += `
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>`;

        // zapisuję wygenerowany plik HTML
        fs.writeFileSync(outputHtmlFilename, htmlContent);
        console.log(`Mamy stronkę!`);

    } catch (error) {
        console.error(`Wystąpił błąd podczas generowania pliku HTML: ${error.message}`);
    }
}

main();
