let INDEX = 0;
let DATA = [];
let TOGGLE = false;
async function getData() {
    let resp = await fetch("https://my-json-server.typicode.com/IlyaLytvynov/ads-box-server/ads").then(response => response.json());
    console.log(resp);
    DATA = resp;
    buttonsEvent();
    renderAdv(resp, INDEX);

}

class Advert{
    constructor(imageURL, title, desc){
        this.title = title;
        this.image = imageURL
        this.description = desc;
    }
    shortTextDesc(){
        return this.description.slice(0,51)+"...";
    }
    allTextDesc(){
        return this.description;
    }
    getTitle(){
        return this.title;
    }
    getImgURL(){
        return this.image;
    }
}

async function renderAdv(resp, indexAdv) {

    const respInd = resp[indexAdv]; 
   const advert = new Advert(respInd["img"],respInd["title"],respInd["description"]);
    const divAdv = document.getElementById("advert");
    const image = document.createElement("img");
    const title = document.createElement("h1");
    const description = document.createElement("p");

    divAdv.innerHTML = "";
    console.log(advert.getImgURL());
    // let titleText = document.createTextNode(advert.getTitle());
    title.appendChild(document.createTextNode(advert.getTitle()));
    description.appendChild(document.createTextNode(advert.shortTextDesc()));
    image.src = advert.getImgURL();
    image.alt = "image";

    // descriptionText = document.createTextNode(advert.shortTextDesc());
    // description.style.position = "absolute";
    
    
    divAdv.append(image);
    divAdv.append(title);
    divAdv.appendChild(description);
    // description.innerHTML = await cutString(respInd["description"]);
    // console.log(respInd["description"].slice(0,51)+"...");

    // divAdv.innerHTML =  `
    //     <img src="${respInd["img"]} alt="image">
    //     <h1>${respInd["title"]}</h1>
    //     <p>${respInd["description"]}</p>            
    // `;

}
function buttonsEvent() {

    document.getElementById("next").addEventListener("click", () => {

        if (INDEX === DATA.length - 1)
            INDEX = 0;
        else {
            INDEX++;
        }      
        renderAdv(DATA, INDEX);
    });
    document.getElementById("prev").addEventListener("click", () => {
        if (INDEX === 0)
            INDEX = DATA.length-1;
        else {
            INDEX--;
        }      
        renderAdv(DATA, INDEX);
    })
    document.getElementById("last").addEventListener("click", () => {
        INDEX=DATA.length-1;  
        renderAdv(DATA, INDEX);  
    })
    document.getElementById("first").addEventListener("click", () => {
        INDEX=0;  
        renderAdv(DATA, INDEX);  
    })
    document.getElementById("toggle").addEventListener("click", () => {
        console.log("click toggle");
        showDescription(DATA, INDEX);  
    })

    
}
function showDescription(resp, indexAdv) {
    const respInd = resp[indexAdv]; 
    let desc = document.querySelector("p");
    if(TOGGLE===false){
        desc.innerHTML = respInd["description"];
        TOGGLE=true;
    }
    else{       
        desc.innerHTML= respInd["description"].slice(0,51)+"...";
        TOGGLE=false;
    }

}


