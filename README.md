## Go
This is a bot trained on extent go games. 
This is a go tutorial

## Training Data
The training data is from https://homepages.cwi.nl/~aeb/go/games/games/Dosaku/ 

## Tech
React for the front end. 
Python/flask for the back end. 
SQLite for the DB layer

## DB Schema
CREATE TABLE "games" (
	"dt"	TEXT,
	"name"	TEXT,
	"result" TEXT,
	"moves"	TEXT
);
