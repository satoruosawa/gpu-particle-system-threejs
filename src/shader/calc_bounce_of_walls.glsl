vec4 calcBounceOfWalls(vec2 position, vec2 velocity, float cor) {
  float xmin = -1.0;
  float xmax = 1.0;
  float ymin = -1.0;
  float ymax = 1.0;

  float posX = position.x;
  float posY = position.y;
  float velX = velocity.x;
  float velY = velocity.y;

  if (posX < xmin) {
    posX = xmin + (xmin - posX);
    velX *= -cor;
    velY *= cor;
  } else if (posX > xmax) {
    posX = xmax - (posX - xmax);
    velX *= -cor;
    velY *= cor;
  }
  if (posY < ymin) {
    posY = ymin + (ymin - posY);
    velX *= cor;
    velY *= -cor;
  } else if (posY > ymax) {
    posY = ymax - (posY - ymax);
    velX *= cor;
    velY *= -cor;
  }
  return vec4(posX, posY, velX, velY);
}

#pragma glslify: export(calcBounceOfWalls)
