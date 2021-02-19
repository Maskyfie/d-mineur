var canvas = {
  nbrBombes: 10,
  nbrCasesAuCarré: 10,
};
var w = 1000 / canvas.nbrCasesAuCarré;
var h = 1000 / canvas.nbrCasesAuCarré;

let tiles = [];

$(document).ready(function () {
  canvas.element = document.getElementById("myCanvas");

  canvas.ctx = canvas.element.getContext("2d");
  //creer la grille
  grille();
  //On place les Bombes
  creerBomb();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function grille() {
  for (let px = 0; px <= canvas.nbrCasesAuCarré; px++) {
    tiles[px] = [];
    for (let py = 0; py <= canvas.nbrCasesAuCarré; py++) {
      let x = px * w;
      let y = py * h;
      tiles[px][py] = new Tile(x, y, px, py, false, false);
      tiles[px][py].draw();
    }
  }
}

function creerBomb() {
  for (let j = 0; j < canvas.nbrBombes; j++) {
    newBomb();
  }
}

// RECURSIVIT2
function newBomb() {
  coordX = getRandomInt(canvas.nbrCasesAuCarré);
  coordY = getRandomInt(canvas.nbrCasesAuCarré);
  if (tiles[coordX][coordY].bomb) newBomb();
  tiles[coordX][coordY] = new Tile(
    coordX * w,
    coordY * h,
    coordX,
    coordY,
    true,
    false
  );
  return coordX, coordY;
}

function tileClicked(pMapX, pMapY) {
  let tile = tiles[pMapX][pMapY];
  tile.clicked = true;
  if (tile.bomb) {
    console.log("BOOOM");
  }
  if (!tile.bomb) {
    tile.bombAround = detectionBombAutour(pMapX, pMapY, tile);
    if (tile.bombAround == 0) {
      recursivitéBomb0(pMapX, pMapY);
    }
  }
  tile.draw();
}

function recursivitéBomb0(pMapX, pMapY) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      tile = tiles[pMapX + i][pMapY + j];
      tile.bombAround = detectionBombAutour(pMapX + i, pMapY + j, tile);
    }
  }
}

function detectionBombAutour(pMapX, pMapY, tile) {
  tile.bombAround = 0;
  for (let x = pMapX - 1; x <= pMapX + 1; x++) {
    for (let y = pMapY - 1; y <= pMapY + 1; y++) {
      if (
        x >= 0 &&
        x <= canvas.nbrCasesAuCarré &&
        y >= 0 &&
        y <= canvas.nbrCasesAuCarré
      ) {
        if (tiles[x][y].bomb) tile.bombAround++;
      }
    }
  }

  console.log(tile.bombAround);
  return tile.bombAround;
}
