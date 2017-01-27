open Point;;

type curve = {
  a : point;
  b : point;
  control : point
};;

let create a b control = {a; b; control};;

let getStart curve =
  curve.a;;

let getEnd curve =
  curve.b;;

let getControl curve =
  curve.control;;
