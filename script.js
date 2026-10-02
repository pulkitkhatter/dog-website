const API = "https://dog.ceo/api";

const breeds = [
  { name: "Golden Retriever", path: "retriever/golden", desc: "Friendly, intelligent and great with families.", tag: "Family" },
  { name: "German Shepherd", path: "germanshepherd", desc: "Loyal, brave and highly trainable.", tag: "Guardian" },
  { name: "Labrador", path: "labrador", desc: "Outgoing, playful and always eager to please.", tag: "Playful" },
  { name: "Husky", path: "husky", desc: "Energetic, striking and loves the cold.", tag: "Energetic" },
  { name: "Pug", path: "pug", desc: "Small, charming and full of personality.", tag: "Cuddly" },
  { name: "Beagle", path: "beagle", desc: "Curious, merry and has an amazing nose.", tag: "Curious" },
  { name: "French Bulldog", path: "bulldog/french", desc: "Easygoing city dog with bat-like ears.", tag: "Apartment" },
  { name: "Poodle", path: "poodle/standard", desc: "Smart, elegant and hypoallergenic coat.", tag: "Genius" },
  { name: "Rottweiler", path: "rottweiler", desc: "Powerful, confident and devoted protector.", tag: "Strong" },
  { name: "Dachshund", path: "dachshund", desc: "Long, bold and lovably stubborn.", tag: "Bold" },
  { name: "Corgi", path: "corgi/cardigan", desc: "Short legs, big heart, endless cheer.", tag: "Cheerful" },
  { name: "Chihuahua", path: "chihuahua", desc: "Tiny dog with a giant personality.", tag: "Tiny" },
  { name: "Shih Tzu", path: "shihtzu", desc: "Sweet, affectionate lap companion.", tag: "Lap dog" },
  { name: "Boxer", path: "boxer", desc: "Fun-loving, athletic and goofy.", tag: "Sporty" },
  { name: "Doberman", path: "doberman", desc: "Sleek, alert and fiercely loyal.", tag: "Alert" },
  { name: "Samoyed", path: "samoyed", desc: "Fluffy white cloud with a permanent smile.", tag: "Fluffy" },
  { name: "Pomeranian", path: "pomeranian", desc: "A fluffy little fox-faced ball of energy.", tag: "Fluffy" },
  { name: "Akita", path: "akita", desc: "Dignified, courageous and deeply loyal.", tag: "Noble" },
];
const colors = ["#ff6b6b", "#feca57", "#1dd1a1", "#54a0ff", "#5f27cd", "#ff9ff3", "#ff9f43", "#00d2d3"];

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
  breeds.forEach((b, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img alt="${b.name}"><div><span class="tag">${b.tag}</span><h3>${b.name}</h3><p>${b.desc}</p></div>`;
    box.appendChild(card);
    card.style.setProperty("--c", colors[i % colors.length]);
    getImage(b.path).then(url => { if (url) card.querySelector("img").src = url; });
  });
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
