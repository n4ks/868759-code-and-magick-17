var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP_MULTIPLIER = 2;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

changeBarColor = function (playerName) {
  var min = 0.10;
  var max = 1;
  var barColor = PLAYER_COLOR;
  if (playerName !== 'Вы') {
    barColor = `rgba(0, 0, 255, ${(Math.random() *(max - min) + min).toFixed(2)})`;
  }
  // return playerName === 'Вы' ? 'rgba(255, 0, 0, 1)' : `rgba(0, 0, 255, ${(Math.random() *(max - min) + min).toFixed(2)})`;

  return barColor;
}

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  var barFinalHeight;
  var barFreeSpace;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * GAP_MULTIPLIER, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * GAP_MULTIPLIER, CLOUD_Y + GAP + FONT_GAP * GAP_MULTIPLIER);

  for (var i = 0; i < players.length; i++) {
    barFinalHeight = (BAR_HEIGHT * times[i]) / maxTime;
    barFreeSpace = BAR_HEIGHT - barFinalHeight;

    ctx.fillText(Math.ceil(times[i]), CLOUD_X + (FONT_GAP * GAP_MULTIPLIER) + ((BAR_WIDTH + GAP) * i), CLOUD_Y + ((FONT_GAP * GAP_MULTIPLIER) * GAP_MULTIPLIER) + barFreeSpace);
    ctx.fillStyle = changeBarColor(players[i]);
    ctx.fillRect(CLOUD_X + (FONT_GAP * GAP_MULTIPLIER) + ((BAR_WIDTH + GAP) * i), CLOUD_Y + ((FONT_GAP * GAP_MULTIPLIER) * GAP_MULTIPLIER + GAP) + barFreeSpace, BAR_WIDTH, barFinalHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + (FONT_GAP * GAP_MULTIPLIER) + (BAR_WIDTH + GAP) * i, CLOUD_Y + ((FONT_GAP * GAP_MULTIPLIER) * GAP_MULTIPLIER + GAP + FONT_GAP) + BAR_HEIGHT);
  }
};
