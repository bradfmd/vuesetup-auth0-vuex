var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var cors = require('cors')
var jwt = require('express-jwt')

var jwtCheck = jwt({
  secret: 'YOUR_CLIENT_SECRET',
  audience: 'YOUR_CLIENT_ID'
})

app.use(bodyParser.json());
app.use(cors())

// check security for anything under the secured route
app.use('/secured', jwtCheck)

// open call
app.get('/ping', function(req, res) {
  res.send("All good. You don't need to be authenticated to call this")
})

// secured call
app.get('/secured/ping', function(req, res) {
  res.status(200).send("All good. You only get this message if you're authenticated")
})

let data = [
 {"id":1, "name":"Project 1", "assignedTo":"Matt B", "priority": "High", "completed": false},
 {"id":2,"name":"Project 2", "assignedTo":"Matt B", "priority": "Medium", "completed": true},
 {"id":3,"name":"Project 3", "assignedTo":"Matt B", "priority": "Low", "completed": false}
]
app.get('/secured/projects', function(req, res) {
  res.status(200).json(data)
})

app.post('/secured/projects', function (req, res) {
  const lastProject = data.reduce((prev, current) => (prev.id > current.id) ? prev : current)
  let newId = lastProject.id + 1
  let project = {
    "id": newId,
    "name": "Project " + newId,
    "assignedTo": "Someone Else",
    "priority": "Medium",
    "completed": false
  }
  data.push(project)
  res.status(200).json(project)
})

app.put('/secured/projects/:id', function (req, res) {
  let project = data.filter(function (p) { return p.id == req.params.id })
  if (project.length > 0) {
    project[0].completed = !project[0].completed
    res.status(201).json(project[0])
  } else {
    res.sendStatus(404)
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
