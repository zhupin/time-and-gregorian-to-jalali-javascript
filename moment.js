/*
 * time and date converter
 * by arash tavanaei
 * Email : arash.tavanaei69@gmail.com
 * Website : http://www.zhupin.ir
 * mobile & telegram : +989130246374
 * 
 * 
 * 
 * 
 */
/* time to jalali */
function t2j(date,f){
   
   
   var g = t2g(date,false);
   

 return ginj(g.y,g.m,g.d,f);
  
}

/* gregorian to jalali */
function ginj(year,month,day,f){
    
    var $g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
  var $j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);     
 
   $gy = year-1600; 
   $gm = month-1; 
   $gd = day-1; 

   $g_day_no = 365*$gy+div($gy+3,4)-div($gy+99,100)+div($gy+399,400); 

   for ($i=0; $i < $gm; ++$i) 
      $g_day_no += $g_days_in_month[$i]; 
   if ($gm>1 && (($gy%4==0 && $gy%100!=0) || ($gy%400==0))) 
      /* leap and after Feb */ 
      $g_day_no++; 
   $g_day_no += $gd; 

   $j_day_no = $g_day_no-79; 

   $j_np = div($j_day_no, 12053); /* 12053 = 365*33 + 32/4 */ 
   $j_day_no = $j_day_no % 12053; 

   $jy = 979+33*$j_np+4*div($j_day_no,1461); /* 1461 = 365*4 + 4/4 */ 

   $j_day_no %= 1461; 

   if ($j_day_no >= 366) { 
      $jy += div($j_day_no-1, 365); 
      $j_day_no = ($j_day_no-1)%365; 
   } 

   for ($i = 0; $i < 11 && $j_day_no >= $j_days_in_month[$i]; ++$i) 
      $j_day_no -= $j_days_in_month[$i]; 
   $jm = $i+1; 
   $jd = $j_day_no+1; 

 function div(x,y){
    return Math.floor(x/y);
    
    
}
if(!f || f==undefined)
  return {y:$jy,m:$jm,d:$jd} 
  else
      return $jy+'/'+$jm+'/'+$jd;
    
    
    
    
    
}




/* jalali to gregorian  */
function jing(year, month, day,f) 
{ 
    function div(x,y){
    return Math.floor(x/y);
    
    
}
    $g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
    $j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
    
   

   $jy = year-979; 
   $jm = month-1; 
   $jd = day-1; 

   $j_day_no = 365*$jy + div($jy, 33)*8 + div($jy%33+3, 4); 
   for ($i=0; $i < $jm; ++$i) 
      $j_day_no += $j_days_in_month[$i]; 

   $j_day_no += $jd; 

   $g_day_no = $j_day_no+79; 

   $gy = 1600 + 400*div($g_day_no, 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */ 
   $g_day_no = $g_day_no % 146097; 

   $leap = true; 
   if ($g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ 
   { 
      $g_day_no--; 
      $gy += 100*div($g_day_no,  36524); /* 36524 = 365*100 + 100/4 - 100/100 */ 
      $g_day_no = $g_day_no % 36524; 

      if ($g_day_no >= 365) 
         $g_day_no++; 
      else 
         $leap = false; 
   } 

   $gy += 4*div($g_day_no, 1461); /* 1461 = 365*4 + 4/4 */ 
   $g_day_no %= 1461; 

   if ($g_day_no >= 366) { 
      $leap = false; 

      $g_day_no--; 
      $gy += div($g_day_no, 365); 
      $g_day_no = $g_day_no % 365; 
   } 

   for ($i = 0; $g_day_no >= $g_days_in_month[$i] + ($i == 1 && $leap); $i++) 
      $g_day_no -= $g_days_in_month[$i] + ($i == 1 && $leap); 
   $gm = $i+1; 
   $gd = $g_day_no+1; 

if(!f || f==undefined)
  return {y:$gy,m:$gm,d:$gd} 
  else
      return $gy+'/'+$gm+'/'+$gd;
}






/* time to gregorian  */
function t2g(date,f){
    
    
  date = date * 1000;
   var d = new Date(date); 
   var day = d.getDate();
   var month = d.getMonth() +1;
   var year = d.getFullYear(); 
      
  if(!f || f==undefined)
  return {y:year,m:month,d:day} 
  else
      return year+'/'+month+'/'+day;  
    
    
}