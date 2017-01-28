let rec duplicate_inner l shouldFlipp =
  match l with
  | [] -> []
  | h::t ->
    if shouldFlipp then
      -.h :: h :: (duplicate_inner t shouldFlipp)
    else
      h :: h :: (duplicate_inner t shouldFlipp);;

let duplicate arr shouldFlipp =
  let duplicated = duplicate_inner (Array.to_list arr) shouldFlipp in
  Array.of_list duplicated;;

let normalize_color rgb =
  [|
    Array.get rgb 0 /. 255.0;
    Array.get rgb 1 /. 255.0;
    Array.get rgb 2 /. 255.0;
    Array.get rgb 3 ;
  |];

