## Pozicovna Aut 


Aplikacia s rootami, s prihlasenim uzivatela, registraciou, admin rozhranim. 


Pred spustenim servra je treba najskor nastavit databazu. Backend bezi len na locale. 
Nastavenie databazy je v subore ` database/source/config/config.json. `

Backend ma 5 npm scriptov: build-app, eslint, start-dev-server, syncModel, syncModelData 
build-app - building aplikacie, priecinok build
eslint - lint kontrola pre aplikaciu
start-dev-server - naštartovanie development servera
syncModel - sluzi na synchronizaciu modelu s databazou
syncModelData - rovnaka funkcionalita ako syncModel, len s predvyplnenymi datami pre development 

Po starte aplikacia bezi na: localhost, porte ``` 3000 ``` , url ` /graphql `

Nice to use 
