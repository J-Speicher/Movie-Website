const input = document.getElementById("input");
const output = document.getElementById("output");

document.getElementById("get-btn").addEventListener("click", async () => {
    const url = 'https://streaming-availability.p.rapidapi.com/countries';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61c6513d3amshfdf20c4cdb8fe85p153ca6jsn516e44bd6001',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        console.log('result', response);
        const resultOG = await response.json();
        console.log('result', resultOG);
        let result = resultOG.result
        let count = 0;
        console.log(input.value);
        output.textContent = "";
        for (let country in result) {
            if (country == input.value) {
                let h2 = document.createElement("h2");
                h2.textContent += result[country].name;
                document.querySelector("main").appendChild(h2);
                for (let service in result[country].services) {
                    let div1 = document.createElement("div");
                    div1.className = "div1";
                    div1.id = "user-list";
                    div1.textContent += result[country].services[service].name + ": ";
                    document.querySelector("main").appendChild(div1);
                    if (result[country].services[service]["supportedStreamingTypes"].addon === true) {
                        for (let thing in result[country].services[service].addons) {
                            let a1 = document.createElement("a");
                            a1.textContent += result[country].services[service].addons[thing].displayName + ", ";
                            a1.href = result[country].services[service].addons[thing].homePage;
                            document.querySelector("main").appendChild(a1);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
});