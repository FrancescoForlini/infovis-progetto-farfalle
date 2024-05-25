# infovis-progetto-farfalle
Progetto in d3.js "butterfly" visualizzazione delle informazioni 2023/2024

Il progetto prevede l'illustrazione di 6 farfalle composte ciascuna da un addome, una testa e delle ali. La proporzione di queste proprietà fisiche viene determinata da un file json che specifica, 
per ognuna delle creature, la grandezza dell'addome, la grandezza della testa e quella delle ali (ho riportato due file .js che si differenziano per il diverso disegno della farfalla). Inoltre, 
qualora si prema con il mouse su una di queste, si avvia una transizione che dispone le farfalle in modo tale che la prima prende il posto della seconda, la seconda della terza e così via fino all'ultima 
che prende invece il posto della prima. Altresì, nel momento in cui si clicca su una farfalla tenendo contemporaneamente premuto il tasto 'r', il movimento di queste sarà opposto, per cui l'ultima prenderà 
il posto della penultima e così via fino all prima che raggiungerà il posto dell'ultima.
