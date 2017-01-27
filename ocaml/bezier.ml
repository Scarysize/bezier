open Curve;;
open Point;;

(**
 * Evaluate the cubic bezier curve at a given point.
 *)
let evaluate curve t =
  let tMinus1 = 1.0 -. t in
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

(**
 * Recursivly evaluate the cubic bezier curve with a given step size.
 *)
let rec sample_inner start stepSize curve =
  if stepSize > 1.0 then []
  else
    begin
      let point = evaluate curve stepSize in
      let nextStep = stepSize +. start in
      point :: (sample_inner start nextStep curve)
    end

let sample curve stepSize =
  let inner = (sample_inner stepSize stepSize curve) in
  let withStart = curve.a :: inner in
  let complete = List.append withStart [curve.b] in
  Array.of_list complete
