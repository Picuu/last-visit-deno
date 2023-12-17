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
const $last = document.getElementById("last")
const $next = document.getElementById("next")
let ready = true

source.addEventListener('update', (event) => {
    if (!ready) return

    const { city, country, flag } = JSON.parse(event.data)
    const message = `Last visit from ${city}, ${country} ${flag}`
    const isLastEmpty = $last.textContent == ""

    if (isLastEmpty) {
        $last.textContent = message
        return
    }

    $next.textContent = message
    $next.style.animation = "fadeInUp 1s ease-in-out forwards"
    $last.style.animation = "fadeOutUp 1s ease-in-out forwards"
    ready = false

    $next.onanimationend = () => {
        $next.style.animation = ""
        $last.style.animation = ""

        $last.textContent = message
        $next.textContent = ""
        ready = true
    }
})

window.addEventListener('unload', (_event) => {
    source.close()
})
