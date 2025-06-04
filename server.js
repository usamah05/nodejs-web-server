const http = require('http');

const requestListener = (request, respone) => {
    respone.setHeader('Content-Type', 'application/json');
    respone.setHeader('Powered-By', 'Node.js')
    
    const { method, url } = request;

    if(url === '/') {
        if(method === 'GET') {
            respone.statusCode = 200;
            respone.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }))
        } else {
            respone.statusCode = 400;
            respone.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }))
        }

    }

    else if(url === '/about'){
        if(method === 'GET'){
            respone.statusCode = 200;
            respone.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }))
        }
        if (method === 'POST'){
            const body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body.push(Buffer.concat(body).toString());
                const { name } = JSON.parse(body);
                respone.statusCode = 200;
                respone.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }))
            })
        } else {
            respone.statusCode = 400;
            respone.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method}, request`
            }))
        }
    } 
    
    else {
        respone.statusCode = 404;
        respone.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }))
    }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})