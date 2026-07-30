/*
 * films.js — podaci za filmoteku (odvojeni od logike)
 *
 * Svaki film: id, naslov, godina, žanr i kratak opis (jedna rečenica).
 * Ocene NE stoje ovde — njih korisnik dodaje i čuvaju se u localStorage.
 *
 * Učitava se kao globalna promenljiva FILMS (vidi index.html),
 * pa aplikacija radi i lokalno (dupli klik na index.html) bez servera.
 */

window.FILMS = [
  { id: "f01", title: "Inception", year: 2010, genre: "Sci-Fi", blurb: "Pljačka izvedena unutar tuđih snova, kroz slojeve realnosti." },
  { id: "f02", title: "The Grand Budapest Hotel", year: 2014, genre: "Komedija", blurb: "Raskošna, simetrična avantura legendarnog concierge-a." },
  { id: "f03", title: "Parasite", year: 2019, genre: "Triler", blurb: "Dve porodice, jedna kuća i sve tanja granica među klasama." },
  { id: "f04", title: "Spirited Away", year: 2001, genre: "Animacija", blurb: "Devojčica zalutala u svet duhova i kupatila bogova." },
  { id: "f05", title: "Whiplash", year: 2014, genre: "Drama", blurb: "Mladi bubnjar i mentor koji ne priznaje granice." },
  { id: "f06", title: "Blade Runner 2049", year: 2017, genre: "Sci-Fi", blurb: "Usamljeni tragač otkriva tajnu koja može promeniti svet." },
  { id: "f07", title: "The Truman Show", year: 1998, genre: "Drama", blurb: "Čovek polako shvata da mu je ceo život televizijska emisija." },
  { id: "f08", title: "Coco", year: 2017, genre: "Animacija", blurb: "Dečak putuje u svet mrtvih tragajući za muzikom i porodicom." },
  { id: "f09", title: "Knives Out", year: 2019, genre: "Triler", blurb: "Duhovita zagonetka ubistva sa neočekivanim detektivom." },
  { id: "f10", title: "Interstellar", year: 2014, genre: "Sci-Fi", blurb: "Potraga za novim domom čovečanstva kroz svemir i vreme." },
  { id: "f11", title: "Jojo Rabbit", year: 2019, genre: "Komedija", blurb: "Dečak, zamišljeni prijatelj i odrastanje u teškom vremenu." },
  { id: "f12", title: "Arrival", year: 2016, genre: "Sci-Fi", blurb: "Lingvistkinja pokušava da razume vanzemaljski jezik." }
];
