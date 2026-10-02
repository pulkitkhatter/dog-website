const API = "https://dog.ceo/api";

const breeds = [
  { name: "Golden Retriever", path: "retriever/golden", desc: "Friendly, intelligent and great with families." },
  { name: "German Shepherd", path: "germanshepherd", desc: "Loyal, brave and highly trainable." },
  { name: "Labrador", path: "labrador", desc: "Outgoing, playful and always eager to please." },
  { name: "Husky", path: "husky", desc: "Energetic, striking and loves the cold." },
  { name: "Pug", path: "pug", desc: "Small, charming and full of personality." },
  { name: "Beagle", path: "beagle", desc: "Curious, merry and has an amazing nose." },
];

const facts = [
  "A dog's sense of smell is up to 100,000 times stronger than ours.",
  "Dogs can understand about 150 words or more.",
  "A dog's nose print is unique, just like a human fingerprint.",
  "Dogs dream, just like people do.",
  "Puppies are born deaf and blind.",
  "Dogs have three eyelids.",
  "Greyhounds can run up to 45 mph (72 km/h).",
];

async function getImage(path) {
  try {
    const res = await fetch(`${API}/breed/${path}/images/random`);
    return (await res.json()).message;
  } catch { return ""; }
}

async function loadBreeds() {
  const box = document.getElementById("breedCards");
  for (const b of breeds) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img alt="${b.name}"><div><h3>${b.name}</h3><p>${b.desc}</p></div>`;
    box.appendChild(card);
    getImage(b.path).then(url => { if (url) card.querySelector("img").src = url; });
  }
}

async function loadGallery() {
  const btn = document.getElementById("loadDogs");
  btn.disabled = true;
  try {
    const res = await fetch(`${API}/breeds/image/random/8`);
    const urls = (await res.json()).message;
    document.getElementById("gallery").innerHTML =
      urls.map(u => `<img src="${u}" alt="Cute dog" loading="lazy">`).join("");
    document.getElementById("heroImg").src = urls[0];
  } catch {
    document.getElementById("gallery").textContent = "Couldn't load dogs. Check your internet and try again.";
  }
  btn.disabled = false;
}

function showFact() {
  document.getElementById("fact").textContent = "🐕 " + facts[Math.floor(Math.random() * facts.length)];
}

document.getElementById("loadDogs").addEventListener("click", loadGallery);
document.getElementById("newFact").addEventListener("click", showFact);
document.getElementById("year").textContent = new Date().getFullYear();

loadBreeds();
loadGallery();
showFact();
