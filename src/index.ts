import app from './app';


const PORT = 3000;
app.on('error', (e) => {
    console.log("Got Error :", e);
});
app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
});

process.on('uncaughtException', (err) => {
    console.log("uncaughtException", err)
})

process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection", err)
})
