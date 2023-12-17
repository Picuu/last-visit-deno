const res = await fetch('https://geolocation.microlink.io/')
const json = await res.json()

const { // Obtenemos city y country del json. Luego obtenemos algunas de sus propiedades y a su vez les cambiamos el nombre
    city: { name: city }, // Obtenemos name de city y le cambiamos el nombre a city
    country: { name: country, flag } // Obtenemos name y flag de country y le cambiamos el nombre de name a country
} = json

await fetch('/visit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ city, country, flag })
})

const source = new EventSource('/visit')
const $content = document.getElementById('content')

source.addEventListener('update', (event) => {
    const { city, country, flag } = JSON.parse(event.data)
    $content.textContent = `Last visit from ${city}, ${country} ${flag}`
})

