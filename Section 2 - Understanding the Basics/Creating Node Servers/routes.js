const fs = require('fs');

const requestHandler = (req, res) => { 
    const url = req.url;
    const method = req.method; 

    if(url === '/') { 
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('<html>')
        return res.end(); 
    }
    
    if (url === '/message' && method === 'POST') { 
        const body = [];
        
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk); 
        }); // listen to certain events
    
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            fs.writeFile('message.txt', message, () => { 
                res.statusCode = 302; 
                res.setHeader('Location', '/');
                return res.end();  
            }); // sync = blocking the exrcjtion of the next code until it is executed.  So delete the sync, and give callback function as a third parameter.  
            //callback functino is to be executed afte rthe fs.writerFile is executed. 
        }
    ); 
    
    }
}

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}
