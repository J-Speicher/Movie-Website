const output1 = document.getElementById('output');

document.getElementById('get-btn').addEventListener('click', async () => {
    // Make a request to your first API here. Put the response's data in output-1.
    // If your response has no body, put the status code in output-1.
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9a2b43863bmsh5822c79ee96ae9fp1838b4jsn5ff6f448c240',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        output1.textContent = "";
        for (let rank in result) {
            // let r2 = result[rank];
            // console.log(r2);
            // output1.textContent += "Rank: " + r2.rank + ", Title: " + r2.title +
            //     ", Description: " + r2.description + "\n";
            let r2 = result[rank];
            console.log(r2);
            let div1 = document.createElement("div");
            div1.textContent += "Rank: " + r2.rank + ", Title: " + r2.title +
                ", Description: " + r2.description + "\n";
            // TODO Append child to main not body
            document.querySelector("main").appendChild(div1);
            let img1 = document.createElement("img");
            img1.src = r2.image;
            // TODO Append child to main not body
            document.querySelector("main").appendChild(img1);
        }
    } catch (error) {
        console.error(error);
    }

    // try {
    //     const us = "us";
    //     const response = await fetch(url, options);
    //     const resultOG = await response.json();
    //     let result = resultOG.result
    //     console.log('result', result);
    //     let count = 0;
    //     output1.textContent = "";
    //     for (let country in result) {
    //         let card = document.createElement("div");
    //         card.className = "card";
    //         card.id = "user-list";
    //         let cH2 = document.createElement("h2");
    //         if (country == us) {
    //             console.log("Testing");
    //             card.textContent += country + ": ";
    //             card.textContent += result[country].name + "\n";
    //             cH2.textContent += result[country].name;
    //             for (let service in result[country].services) {
    //                 card.textContent += service + ": ";
    //                 card.textContent += result[country].services[service].name + "\n";
    //                 if (result[country].services[service]["supportedStreamingTypes"].addon === true) {
    //                     for (let thing in result[country].services[service].addons) {
    //                         card.textContent += result[country].services[service].addons[thing].displayName + ": ";
    //                         card.textContent += result[country].services[service].addons[thing].homePage + "\n";
    //                     }
    //                 }
    //             }
    //             document.body.main.appendChild(card);
    //             card.appendChild(cH2);
    //         }
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
});