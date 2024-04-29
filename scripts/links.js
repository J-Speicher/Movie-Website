const input = document.getElementById("input");
const output = document.getElementById("output");

document.getElementById("get-btn").addEventListener("click", async () => {
    const url = 'https://streaming-availability.p.rapidapi.com/countries';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9a2b43863bmsh5822c79ee96ae9fp1838b4jsn5ff6f448c240',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        // const us = "us";
        const response = await fetch(url, options);
        const resultOG = await response.json();
        let result = resultOG.result
        console.log('result', result);
        let count = 0;
        console.log(input.value);
        output.textContent = "";
        for (let country in result) {
            let div1 = document.createElement("div");
            div1.className = "div1";
            div1.id = "user-list";
            let h2 = document.createElement("h2");
            if (country == input.value) {
                div1.textContent += country + ": ";
                div1.textContent += result[country].name + "\n";
                h2.textContent += result[country].name;
                for (let service in result[country].services) {
                    div1.textContent += service + ": ";
                    div1.textContent += result[country].services[service].name + "\n";
                    if (result[country].services[service]["supportedStreamingTypes"].addon === true) {
                        for (let thing in result[country].services[service].addons) {
                            div1.textContent += result[country].services[service].addons[thing].displayName + ": ";
                            div1.textContent += result[country].services[service].addons[thing].homePage + "\n";
                        }
                    }
                    let img1 = document.createElement("img");
                    img1.src = result[country].services[service].images.darkThemeImage;
                    document.querySelector("main").appendChild(img1);
                }
                // TODO Append child to main not body
                document.querySelector("main").appendChild(h2);
                document.querySelector("main").appendChild(div1);
            }
        }
    } catch (error) {
        console.error(error);
    }
});


// Code for streaming services api. Not sure what to do with but it works and might be useful
// const output = document.getElementById("output");

// document.getElementById("get-btn").addEventListener("click", async () => {
//     const url = 'https://streaming-availability.p.rapidapi.com/countries';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '9a2b43863bmsh5822c79ee96ae9fp1838b4jsn5ff6f448c240',
//             'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//         }
//     };

//     try {
//         const us = "us";
//         const response = await fetch(url, options);
//         const resultOG = await response.json();
//         let result = resultOG.result
//         console.log('result', result);
//         let count = 0;
//         output.textContent = "";
//         for (let country in result) {
//             let card = document.createElement("div");
//             card.className = "card";
//             card.id = "user-list";
//             let cH2 = document.createElement("h2");
//             if (country == us) {
//                 console.log("Testing");
//                 output.textContent += country + ": ";
//                 output.textContent += result[country].name + "\n";
//                 cH2.textContent += result[country].name;
//                 for (let service in result[country].services) {
//                     output.textContent += service + ": ";
//                     output.textContent += result[country].services[service].name + "\n";
//                     if (result[country].services[service]["supportedStreamingTypes"].addon === true) {
//                         for (let thing in result[country].services[service].addons) {
//                             output.textContent += result[country].services[service].addons[thing].displayName + ": ";
//                             output.textContent += result[country].services[service].addons[thing].homePage + "\n";
//                         }
//                     }
//                 }
//                 document.body.main.appendChild(card);
//                 card.appendChild(cH2);
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// });