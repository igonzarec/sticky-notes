// pocketbase.js
import PocketBase from 'pocketbase';

let pb : PocketBase;

async function authenticate() {
    pb = new PocketBase('http://127.0.0.1:8090');
    await pb.admins.authWithPassword('igonzarec@gmail.com', 'Avrilpark7');
}

async function getPocketBaseInstance() {
    if (!pb) {
        await authenticate();
    }
    return pb;
}

export { getPocketBaseInstance };