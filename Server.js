let http = require("http")
let fs = require("fs")

let hostname = '127.0.0.1'
let port = 8080

function sendFile(path, response) {
  fs.access(path, fs.F_OK, (err) => {
  if (err) {
    response.statusCode = 404
    response.end("404 File not Found")
    console.error(err)
    return
  }
  fs.readFile(path,"utf8", function(error, data) {
    if(error) {
      console.log(error);
      response.statusCode = 500;
      response.end(error);
    } else {
      response.statusCode = 200
      console.log("Sent File Successfully")
      response.end(data);
    }
  });
  })
}

let server = http.createServer(function(req,res){
  console.log("Request Received at " + Date.now() + ":\n" + req.url)
  let url = req.url.split("/")
  console.log("Perfoming as type: " + url[1])
  switch(url[1]) {
    case 'file':
      console.log("Accessing File" + url[3])
      res.setHeader('Content-Type', 'text/' + url[2]);
      sendFile("./files/" + url[3], res)
      break;
    default:
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end("Bad Request")
  }
})

server.listen(port, hostname, function() {
  console.log("server Running at http://" + hostname + ":" + port)
})
