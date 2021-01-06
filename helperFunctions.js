
export const shouldLevelUp = (userPoints, userLevel, pointsToAdd) => {
let total = userPoints + pointsToAdd;
let levelNow = userLevel;

if(levelNow === 1 && total >= 10){
  return true;
}else if(levelNow === 2 && total >= 20){
  return true;
}else if(levelNow === 3 && total >= 30){
  return true;
}else if(levelNow === 4 && total >= 40){
  return true;
}else{
  return false;
}
}