Per tal de poder fer el desplegament local de l’aplicació és necessari tenir instal·lat Node.js i PostgreSQL en l’ordinador que es vaja a utilitzar. 

Després d’assegurar això, simplement cal seguir els següents passos: 

Clonar el repositori públic que conté el projecte i que es troba en la següent URL: https://github.com/algrro/Projecte_Koppelia/tree/recuperar_canvis. Per tal de fer-ho cal utilitzar l’ordre: git clone  

Una vegada clonat el repositori caldrà situar-se en la carpeta que el conté (Projecte_Koppelia). 

Des de pgAdmin caldrà utilitzar l’opció “Restore” per tal de generar i traslladar la base de dades que s’adjunta en la carpeta DB_Koppelia del repositori anteriorment esmentat. 

Instal·lar dependències del servidor. Per tal de fer-ho cal situar-se en la carpeta “Server” del projecte i executar l’ordre npm install. 

Alçar el servidor. Per tal de fer-ho cal executar l’ordre npm start des de la carpeta “Server”. 

Instal·lar dependències del client. Per tal de fer-ho cal situar-se en la carpeta “Client” del projecte i executar l’ordre npm install. 

Alçar el client. Per tal de fer-ho cal executar l’ordre npm start des de la carpeta “Client” del projecte. 

Per tal d’executar l’aplicació només caldrà obrir el navegador i accedir a localhost/3000 si no s’han canviat els ports per defecte 