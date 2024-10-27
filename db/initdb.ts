import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "my-database.db");
const db = new Database(dbPath);

const pokemonData = [
  { name: "bulbasaur", id: 1 },
  { name: "charmander", id: 4 },
  { name: "squirtle", id: 7 },
  { name: "pikachu", id: 25 },
  { name: "phione", id: 489 },
  { name: "manaphy", id: 490 },
  { name: "darkrai", id: 491 },
  { name: "arceus", id: 493 },
  { name: "victini", id: 494 },
  { name: "snivy", id: 495 },
  { name: "servine", id: 496 },
  { name: "serperior", id: 497 },
  { name: "tepig", id: 498 },
  { name: "pignite", id: 499 },
  { name: "emboar", id: 500 },
  { name: "oshawott", id: 501 },
  { name: "dewott", id: 502 },
  { name: "samurott", id: 503 },
  { name: "patrat", id: 504 },
  { name: "watchog", id: 505 },
  { name: "lillipup", id: 506 },
  { name: "herdier", id: 507 },
  { name: "stoutland", id: 508 },
  { name: "purrloin", id: 509 },
  { name: "liepard", id: 510 },
  { name: "pansage", id: 511 },
  { name: "simisage", id: 512 },
  { name: "pansear", id: 513 },
  { name: "simisear", id: 514 },
  { name: "panpour", id: 515 },
  { name: "simipour", id: 516 },
  { name: "munna", id: 517 },
  { name: "musharna", id: 518 },
  { name: "pidove", id: 519 },
  { name: "tranquill", id: 520 },
  { name: "unfezant", id: 521 },
  { name: "blitzle", id: 522 },
  { name: "zebstrika", id: 523 },
  { name: "roggenrola", id: 524 },
  { name: "boldore", id: 525 },
  { name: "gigalith", id: 526 },
  { name: "woobat", id: 527 },
  { name: "swoobat", id: 528 },
  { name: "drilbur", id: 529 },
  { name: "excadrill", id: 530 },
  { name: "audino", id: 531 },
  { name: "timburr", id: 532 },
  { name: "gurdurr", id: 533 },
  { name: "conkeldurr", id: 534 },
  { name: "tympole", id: 535 },
  { name: "palpitoad", id: 536 },
  { name: "seismitoad", id: 537 },
  { name: "throh", id: 538 },
  { name: "sawk", id: 539 },
  { name: "sewaddle", id: 540 },
  { name: "swadloon", id: 541 },
  { name: "leavanny", id: 542 },
  { name: "venipede", id: 543 },
  { name: "whirlipede", id: 544 },
  { name: "scolipede", id: 545 },
  { name: "cottonee", id: 546 },
  { name: "whimsicott", id: 547 },
  { name: "petilil", id: 548 },
  { name: "lilligant", id: 549 },
  { name: "sandile", id: 551 },
  { name: "krokorok", id: 552 },
  { name: "krookodile", id: 553 },
  { name: "darumaka", id: 554 },
  { name: "maractus", id: 556 },
  { name: "dwebble", id: 557 },
  { name: "crustle", id: 558 },
  { name: "scraggy", id: 559 },
  { name: "scrafty", id: 560 },
  { name: "sigilyph", id: 561 },
  { name: "yamask", id: 562 },
  { name: "cofagrigus", id: 563 },
  { name: "tirtouga", id: 564 },
  { name: "carracosta", id: 565 },
  { name: "archen", id: 566 },
  { name: "archeops", id: 567 },
  { name: "trubbish", id: 568 },
  { name: "garbodor", id: 569 },
  { name: "zorua", id: 570 },
  { name: "zoroark", id: 571 },
  { name: "minccino", id: 572 },
  { name: "cinccino", id: 573 },
  { name: "gothita", id: 574 },
  { name: "gothorita", id: 575 },
  { name: "gothitelle", id: 576 },
  { name: "solosis", id: 577 },
  { name: "duosion", id: 578 },
  { name: "reuniclus", id: 579 },
  { name: "ducklett", id: 580 },
  { name: "swanna", id: 581 },
  { name: "vanillite", id: 582 },
  { name: "vanillish", id: 583 },
  { name: "vanilluxe", id: 584 },
  { name: "deerling", id: 585 },
  { name: "sawsbuck", id: 586 },
  { name: "emolga", id: 587 },
];

function createTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pokemons (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
}

function insertPokemon(id: number, name: string) {
  const stmt = db.prepare("INSERT INTO pokemons (id, name) VALUES (?, ?)");
}

function getPokemons() {
  const stmt = db.prepare("SELECT * FROM pokemons");
}

function main() {
  createTable();
  for (const pokemon of pokemonData) {
    insertPokemon(pokemon.id, pokemon.name);
  }
  getPokemons();
}

main();
