package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

func writeDb(text string) {
	f, err := os.OpenFile("db.txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		panic(err)
	}

	defer f.Close()

	if _, err = f.WriteString(text); err != nil {
		panic(err)
	}
}

func main() {
	myHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		queryParams := r.URL.Query()
		totalPokemon := []string{}
		if pokemon, ok := queryParams["pokemon"]; ok {
			pokemonSplit := strings.Split(pokemon[0], ",")
			fmt.Println(pokemonSplit)
			for _, poke := range pokemonSplit {
				fmt.Println(poke)
				date := time.Now().UTC()
				user := "test"
				entry := fmt.Sprintf("%s,%s,%s\n", user, date, poke)
				writeDb(entry)
				totalPokemon = append(totalPokemon, poke)
			}
		}

		if len(totalPokemon) > 0 {
			fmt.Fprintf(w, "You found %d Pokemon: %v\n", len(totalPokemon), totalPokemon)
		} else {

			fmt.Fprintf(w, "You didn't found any pokemon :(")
		}
	})

	http.ListenAndServe(":8081", myHandler)
}
