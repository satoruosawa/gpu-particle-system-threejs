mat3 calcBounceOfWalls3d(vec3 position, vec3 velocity, float cor) {
  float xmin = -1.0;
  float xmax = 1.0;
  float ymin = -1.0;
  float ymax = 1.0;
  float zmin = -1.0;
  float zmax = 1.0;

  float posX = position.x;
  float posY = position.y;
  float posZ = position.z;
  float velX = velocity.x;
  float velY = velocity.y;
  float velZ = velocity.z;

  if (posX < xmin) {
    posX = xmin + (xmin - posX);
    velX *= -cor;
    velY *= cor;
    velZ *= cor;
  } else if (posX > xmax) {
    posX = xmax - (posX - xmax);
    velX *= -cor;
    velY *= cor;
    velZ *= cor;
  }
  if (posY < ymin) {
    posY = ymin + (ymin - posY);
    velX *= cor;
    velY *= -cor;
    velZ *= cor;
  } else if (posY > ymax) {
    posY = ymax - (posY - ymax);
    velX *= cor;
    velY *= -cor;
    velZ *= cor;
  }
  if (posZ < zmin) {
    posZ = zmin + (zmin - posZ);
    velX *= cor;
    velY *= cor;
    velZ *= -cor;
  } else if (posZ > zmax) {
    posZ = zmax - (posZ - zmax);
    velX *= cor;
    velY *= cor;
    velZ *= -cor;
  }
  return mat3(posX, posY, posZ, velX, velY, velZ, vec3(0.0));
}

#pragma glslify: export(calcBounceOfWalls3d)
