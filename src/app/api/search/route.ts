import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import Fuse from "fuse.js";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const searchName = searchParams.get("name") || "";

    const stmt = db.prepare(`SELECT * FROM pokemons`);
    const pokemonsData = stmt.all();
    const fuse = new Fuse(pokemonsData, {
      includeScore: true,
      keys: ["name"],
    });

    const results = fuse.search(searchName);
    const searchedPokemons = results.map((result) => result.item);

    return NextResponse.json(searchedPokemons);
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return NextResponse.json(
      { error: "Error fetching pokemons" },
      { status: 500 }
    );
  }
}
