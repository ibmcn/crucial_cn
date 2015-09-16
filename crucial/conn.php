<?php
date_default_timezone_set('PRC'); 

include_once 'waf.php';
//$mysql_server_name='192.155.82.70';
$mysql_server_name='localhost';
$mysql_username='crucialcnadmin';
$mysql_password='Bf1g$uf';
$mysql_database1='crucial_memsel_sept15';

$conn = mysql_connect($mysql_server_name,$mysql_username,$mysql_password);


$mysql_database2='crucial_analyticss';

if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }



mysql_select_db($mysql_database1, $conn);
mysql_query("set names utf8");
function getall($rec)
    {
        
        if ($rec !== false)
        {
            $arr = array();
            while ($row = mysql_fetch_assoc($rec))
            {
                $arr[] = $row;
            }

            return $arr;
        }
        else
        {
            return false;
        }
    }

header("Content-type: text/html; charset=utf-8");

?>
