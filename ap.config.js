
let b = "bgcastle"
let a = b+"-Guard"
module.exports = {
  apps: [
    {
      name: a+"-MAIN",
      namespace: "Guard-Panel",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Ana",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: a+"-GUARDI",
      namespace: "Guard-I",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_I",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: a+"-GUARDII",
      namespace: "Guard-II",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_II",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: a+"-GUARDIII",
      namespace: "Guard-III",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_III",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    }
  ]
};
