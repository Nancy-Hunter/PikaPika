//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector("html").addEventListener("keypress", function (press) {
	if (press.key === "Enter") {
		getFetch();
	}
}); 

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice
  document.querySelector('h2').innerText = `${choice}`
  document.querySelector('h3').innerText ="Gotta catch 'em all!!!"
  
  if (choice && UrlExists(url)) {
      fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
                    document.querySelector('img').src = data.sprites.other['official-artwork'].front_default //adds official artwork
                })
          
          .catch(err => {
              console.log(`error ${err}`) //catch errors?
          })
          
        } else {
          console.log( "that's not a poke!")
          document.querySelector('img').src = "img/monster.png" //adds error pic
        }
        document.querySelector('main').classList.remove('off') //shows bottom of page
      }

document.querySelector("button[name='button2']").addEventListener('click', morePokes) //event listener for more


function morePokes () {
  const choice = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  if (choice && UrlExists(url)) {
      fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            let poketypes = Object.keys(data.sprites)
          
            let counter = Math.floor(Math.random() * 6)
            while (data.sprites[poketypes[counter]]==null){
              counter = Math.floor(Math.random() * 6)
            }
            console.log(counter)
            let li = document.createElement('img')

            li.setAttribute('src', data.sprites[poketypes[counter]] )                        //.other['official-artwork'].front_default);
            li.setAttribute('width', '100px');
            

                document.querySelector('.more').prepend(li)
          })
          .catch(err => {
              console.log(`error ${err}`)
          })
          document.querySelector('h3').innerText ="When will you be satisfied?"
  } else {
    document.querySelector('h3').innerText ="you don't deserve more pokes!!"
  }
}

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  if (http.status != 404)
      return true;
  else
      return false;
}

