"use strict";

const fs = require("fs");
const path = require("path");
const ts2gas = require("ts2gas");

function buildDir(dir) {
  if (fs.existsSync(path.join(dir, "src"))) {
    fs.mkdirSync(path.join(dir, "build"));
    let files = fs.readdirSync(path.join(dir, "src"));
    for (let file of files) {
      console.log(file);
      dealWithFile(dir, file);
    }
  } else {
    console.log("No src/ directory, passing.");
  }
}

function dealWithFile(dir, filename) {
  if (path.extname(filename) === ".ts") {
    console.log("--> typescript! converting & copying...");
    convert(dir, filename);
  } else {
    console.log("--> not typescript! copying...");
    fs.copyFileSync(
      path.join(dir, "src", filename),
      path.join(dir, "build", filename)
    );
  }
}

function convert(dir, filename) {
  fs.readFile(`${dir}/src/${filename}`, function(err, data) {
    if (err) throw err;
    if (data) {
      let body = data.toString("utf8");
      let transpiled = ts2gas(body);
      let newFilename = filename.replace(".ts", ".js");
      fs.writeFile(`${dir}/build/${newFilename}`, transpiled, function(err) {
        if (err) throw err;
      });
    }
  });
}

let input = process.argv[2];
buildDir(path.join("snippets", input));
