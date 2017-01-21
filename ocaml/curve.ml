open Point;;

type curve = {
  a : point;
  b : point;
  control : point
};;

let create a b control = {a; b; control};;
