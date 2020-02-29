const cluster = require("cluster");
const os = require("os");

let cpus = os.cpus();

console.log("Executando thread");

if(cluster.isMaster) {
    console.log("thread master");
    cpus.forEach(() => {
        cluster.fork();
    });

    cluster.on("listening", (worker) => {
        console.log("info", "cluster conectado: " + worker.process.pid);
    });
    cluster.on("disconnect", (worker) => {
        console.log("cluster %d desconectado", worker.process.pid);
    });
    cluster.on("exit", (worker) => {
        console.log("cluster %d perdido", worker.process.pid);
        cluster.fork();
    });
}
else {
    console.log("thread slave");
    require("./index");
}
