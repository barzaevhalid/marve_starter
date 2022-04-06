 
 class MarvelService {
     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
     _apiKey = 'apikey=05d942e0a4a7ed5a0cc17f95c3bbf234';
     
     getResource = async (url) => {
         let res = await fetch(url)
         if(!res.ok){
             throw new Error(`Cloud not fetch ${url}, statuse: ${res.status}`)
         }
         return await res.json()
     }

     getAllCharacters = async () => {
         const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
         return res.data.results.map(this._tranformCharacter)
     }

     getCharacter = async(id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0]);
     }

     _tranformCharacter = (char) => {
         return {
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}...` : 'This character has no description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,  
         }
     }
 }


 export default MarvelService;