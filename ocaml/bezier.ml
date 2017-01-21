open Curve;;
open Point;;

let evaluate curve t =
  let tMinus1 = t -. 1.0 in
  let tSquared = t**2.0 in
  let x =
    tMinus1**2.0 *. curve.a.x +.
    2.0 *. tMinus1 *. t *. curve.control.x +.
    tSquared *. curve.b.x in
  let y =
    tMinus1**2.0 *. curve.a.y +.
    2.0 *. tMinus1 *. t *. curve.control.y +.
    tSquared *. curve.b.y in
  Point.create x y;;

let sample curve stepSize =
  let points = ref [||] in
  let i = ref stepSize in
  while !i < 1.0 do
    let p = evaluate curve !i in
    points := Array.append !points [|p; p|];
    i := !i +. stepSize
  done;
  points := Array.append [|curve.a|] !points;
  points := Array.append !points [|curve.b|];
  !points;;