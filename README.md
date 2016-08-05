## Pozicovna Aut 


Jednoducha starter aplikacia s rootami, s prihlasenim uzivatela a s admin rozhranim. 


Pred spustenim servra je treba najskor nastavit databazu. Zatial backend bezi len na locale. 
Nastavenie databazy je v subore ` database/source/config/config.json. `

Backend ma 2 npm scipty: start app a syncModel
syncModel - sluzi na synchronizaciu s databazou
start app - nastartuje aplikaciu

Po starte aplikacia bezi na localhoste na porte ``` 2020 ``` , url ` /graphql `

Nice to use ;) 