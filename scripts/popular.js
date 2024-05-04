const output1 = document.getElementById('output');
let array1 = [];
let key = '';
let key2 = '095be35148msh82f8d38c131e642p1155ffjsn63e626b449ae';
let key3 = '9a2b43863bmsh5822c79ee96ae9fp1838b4jsn5ff6f448c240';
let key4 = '9233b4169bmsh45751af6511ba83p1a72bfjsnc2ac12c0a0fb';
let key5 = '17c8dc11f0mshd77c91d7440d5d7p12ea9djsn53cdc55ece7e';
let key6 = '61c6513d3amshfdf20c4cdb8fe85p153ca6jsn516e44bd6001';
key = key6;
let count = 0

async function getMbyT(title, div1) {
    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title=' + title + '&country=' + 'US' + '&show_type=all&output_language=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Testing');
        console.log(result.result);
        div1.textContent += "Places to Stream: ";
        if (result && result.result && result.result[0] && result.result[0].streamingInfo && result.result[0].streamingInfo.us) {
            console.log(result.result[0].streamingInfo.us);
            for (let i = 0; i < result.result[0].streamingInfo.us.length; i++) {
                let a1 = document.createElement("a");
                a1.textContent += result.result[0].streamingInfo.us[i].service + ": ";
                a1.textContent += result.result[0].streamingInfo.us[i].streamingType + ", ";
                if (result.result[0].streamingInfo.us[i].quality) {
                    a1.textContent += result.result[0].streamingInfo.us[i].quality + ", ";
                }
                if (result.result[0].streamingInfo.us[i].streamingType == "buy") {
                }
                a1.href = result.result[0].streamingInfo.us[i].link;
                div1.appendChild(a1);
            }
            console.log("Testing")
        } else {
            div1.textContent += "None";
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('get-btn').addEventListener('click', async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        count = 0
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        output1.textContent = "";
        for (let i = 0; i < result.length; i++) {
            if (count < 5) {
                let random = Math.floor(Math.random() * result.length);
                let used = [];
                while (used.includes(random)) {
                    random = Math.floor(Math.random() * result.length);
                }
                i = random;
                let r2 = result[i];
                console.log(r2);
                let div1 = document.createElement("div");
                div1.id = "div-" + count;
                div1.textContent += "Rank: " + r2.rank + ", Title: " + r2.title +
                    ", Genre(s): ";
                for (let i2 = 0; i2 < r2.genre.length; i2++) {
                    div1.textContent += r2.genre[i2] + ", ";
                }
                div1.textContent += "Description: " + r2.description + "\n";
                await getMbyT(r2.title, div1);
                document.querySelector("main").appendChild(div1);
                let img1 = document.createElement("img");
                img1.src = r2.image;
                img1.alt = "a picture of " + r2.title;
                document.querySelector("main").appendChild(img1);
                count++;
            } else {
                break;
            }
        }
    } catch (error) {
        console.error(error);
    }
});