console.log("Ready");

var arrAmount = 1300;
var serverAmount = 4;
var tableAmount = 50;
var foodTypesAmount = 2;

const arrivals = [];
const servers = [];
const tables = [];
const foodTypes = [];

for (let i = 1; i <= arrAmount; i++) {
  arrivals.push(i);
}

for (let i = 0; i <= foodTypesAmount; i++) {
  foodTypes.push({
    type: i + 1,
    distribution: i + 1 == 1 ? 85 : 15,
  });
}

for (let i = 1; i <= serverAmount; i++) {
  servers.push({
    name: `server${i}`,
    portion: null,
    type: null,
    max: 25,
    line: [],
    arrivalServed: [],
    id: i,
  });
}

servers[0].portion = 60;
servers[0].type = 1;
servers[0].distribution = 28.33333;
servers[1].portion = 60;
servers[1].type = 1;
servers[1].distribution = 28.33333;
servers[2].portion = 60;
servers[2].type = 1;
servers[2].distribution = 28.33333;
servers[3].portion = 30;
servers[3].type = 2;
servers[3].distribution = 15;

var distributions = [];
for (let i = 0; i < foodTypesAmount; i++) {
  distributions.push(foodTypes[i].distribution);
}

for (let i = 1; i <= tableAmount; i++) {
  if (i < 31) {
    tables.push({
      name: `table${i}`,
      max: 4,
      full: false,
    });
  } else {
    tables.push({
      name: `table${i}`,
      max: 6,
      full: false,
    });
  }
}

choiceDist = [];
randomChoices = [];
for (var i = 0; i < foodTypesAmount; i++) {
  for (let n = 0; n < Math.floor(foodTypes[i].distribution); n++) {
    choiceDist.push(i);
  }
}

const randomChoice = (choiceDist) => {
  var val = Math.floor(Math.random() * choiceDist.length);
  return choiceDist[val];
};

var a = 0,
  b = 0;

var choice = randomChoice(choiceDist);
var count = 0;

var interval = setInterval(() => {
  var choice = randomChoice(choiceDist);
  count++;
  if (choice == 0) {
    var type1 = [];
    servers.forEach((server) => {
      if (server.type == 1) {
        type1.push(server.id);
      }
    });

    var serverChoice = type1[Math.floor(Math.random() * type1.length)];
    arrivals.pop();
    servers[serverChoice - 1].arrivalServed.push(arrAmount - arrivals.length);
    a++;
  } else if (choice == 1) {
    var type2 = [];
    servers.forEach((server) => {
      if (server.type == 2) {
        type2.push(server.id);
      }
    });
    var serverChoice = type2[Math.floor(Math.random() * type2.length)];
    arrivals.pop();
    servers[serverChoice - 1].arrivalServed.push(arrAmount - arrivals.length);
    console.log();
    b++;
  }

  if (arrivals.length == 0) {
    clearInterval(interval);
    console.log(arrivals);
    console.log(servers);
    console.log("Total: " + a, " " + b);
  }
}, 10);
