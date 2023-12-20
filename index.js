const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
const container = document.getElementById("center-cont");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var searchedWord = searchBox.value;

    fetch(`https://api.mangadex.org/manga?limit=50&title=${searchedWord}&includes%5B%5D=cover_art`)
    .then((res)=> res.json())
    .then(data => {
        
        var response = data.data[0];
        var title = response.attributes.title.en || 'Title is not Available';
        var mangaId = response.id;
        var description = response.attributes.description.en || 'Description is not Available';
        var fileName = response.relationships[2].attributes.fileName;
    
        var mangaCont = document.createElement('div'); 
        mangaCont.innerHTML = `
                    <h1>${title}</h1>
                    <div class="ctn-con">
                        <div class="img-ctn">
                            <img src="https://uploads.mangadex.org/covers/${mangaId}/${fileName}">
                        </div>
                        <div class="text-ctn">     
                             <p>${description}</p>
                        </div>
                    </div>
        `;
        
        container.innerHTML = ''; 
        container.appendChild(mangaCont);
        container.scrollIntoView();
        container.style.display = 'block';
    });
});

function toggleVisibility(container, isVisible) {
    container.style.display = isVisible ? 'block' : 'none';
}