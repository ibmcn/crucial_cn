<?php
include_once 'conn.php';


$num=40;

if($_GET['act']=='c')
{
	$url='http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=c&pid='.$_GET['pid'];
	$data=curl($url,'[{"');

	$data=$data;
	if (!$data)
	{
		if (isset($_GET['pid']))
		{
		$where=' and pid="'.$_GET['pid'].'"';
		}
		else
		{
		$where=' and pid=""';
		}
		mysql_select_db($mysql_database1, $conn);
		$sql='select * from category where 1=1 '.$where.' ORDER BY name ASC';
		$data=mysql_query($sql);
		$data=getall($data);
		//print_r(json_encode($data));
		$data=json_encode($data);
	}

	print_r($data);

}
else if (@$_GET['act']=='p')
{
	
	$url='http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=p&id='.$_GET['id'];
	$data=curl($url,'[{"');
	$result=$data;
	
	if (!$data)
	{
		mysql_select_db($mysql_database1, $conn);
		$sql='select * from category where 1=1 and id="'.$_GET['id'].'"';
		$data=mysql_query($sql);
		$data=getall($data);
		
		require_once('cache.class.php');
		$fzz_cache=new fzz_cache();
		$parts_m=get_parts_m($data,$pdo);
		$products=$fzz_cache->products;
	
	   


	   if ($parts_m){
		   $i=0;
           print_r($parts_m);
	   foreach ($parts_m as $k=>$v){
		  foreach ($products as $k1=>$v1){
			$tmp=explode(':',$v);
			if ($v1['items'][$tmp[0]])
			{
				$result[$i]=$v1['items'][$tmp[0]];
				$result[$i]['family']=$tmp[1];
				$result[$i]['title']=urlencode(iconv("GB2312", "UTF-8//IGNORE", urldecode($v1['items'][$tmp[0]]['title'])));
				$result[$i]['bianhao']=$k;
				
				$i+=1;
			}
			
		  }
	   }
	
	   }
	   $result=json_encode($result);
	}
	print_r($result);
}
else if ($_GET['act']=='visitlog')
{
	mysql_select_db($mysql_database2, $conn);
	$sql="INSERT INTO `visitlog` (`ip` ,`addtime`,`choose`,`click`)VALUES ('".$_SERVER["REMOTE_ADDR"]."', '".time()."','".$_GET['choose']."','".$_GET['iid']."')";
	$data=mysql_query($sql);
	if ($data)
	echo 1;
	else
	echo 0;
}
else if ($_GET['act']=='getlog_tmall')
{
	$url='http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=getlog&total='.$_GET['total'].'&startid='.$_GET['startid'].'&stime='.$_GET['stime'].'&etime='.$_GET['etime'];
	$data=curl($url,'[{"');
	print_r($data);
}
else if ($_GET['act']=='get_product')
{
	$ids=$_GET['id'];
	$url="http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=get_product&id=".$ids;
	$data=curl($url,'{"');
	$data=str_replace('<pre>','',$data);
	$data=str_replace('</pre>','',$data);
	print_r($data);
	
}
else if ($_GET['act']=='getlog')
{
	$total=floor($_GET['total']);
	$startid=floor($_GET['startid']);
	if (!$total)
	$total=200;
	
	$date=array();
	if ($_GET['date']){
	$date=explode('-',$_GET['date']);
	$date[0]=str_split($date[0],2);
	$date[1]=str_split($date[1],2);
	if ($date[0][0] && $date[0][1] && $date[0][2])
	$date[0]=strtotime('20'.$date[0][2].'-'.$date[0][1].'-'.$date[0][0]);
	else
	$date[0]=0;
	if ($date[1][0] && $date[1][1] && $date[1][2])
	$date[1]=strtotime('20'.$date[1][2].'-'.$date[1][1].'-'.$date[1][0]);
	else
	$date[1]=0;
	}
	
	if ($date[0] && $date[1])
	{
	$where=' and addtime>='.$date[0];
	$where.=' and addtime<='.$date[1];
	}
	else if ($date[0] && !$date[1])
	{
	$where=' and addtime >= '.$date[0];
	$where.=' and addtime <= '.($date[0]+86400);
	}

	
	if ($startid)
	$where.=' and v.id>='.$startid;
	mysql_select_db($mysql_database2, $conn);
	$sql='select * from `visitlog` where 1=1 '.$where.' ORDER BY id DESC limit 0,'.$total;

	$data=mysql_query($sql);
	$data=getall($data);
	mysql_select_db($mysql_database1, $conn);
	
	foreach ($data as $k=>$v){
		$result[$k]['id']=$v['id'];
		$result[$k]['ip']=$v['ip'];
		$result[$k]['addtime']=$v['addtime'];
		
		if ($v['choose'])
		{
			$sql="select * from category where id='".$v['choose']."'";
			$data1=mysql_query($sql);
			$data1 = getall($data1);
			$name3 = $data1[0]['name'];
			
			if ($data1[0]['pid'])
			{
				$sql="select * from category where id='".$data1[0]['pid']."'";
				$data2=mysql_query($sql);
				$data2 = getall($data2);
				
				$name2 = $data2[0]['name'];
				if ($data2[0]['pid'])
				{
					$sql="select * from category where id='".$data2[0]['pid']."'";
					$data3=mysql_query($sql);
					$data3 = getall($data3);
					$name1 = $data3[0]['name'];
					$result[$k]['choice']=array($name1,$name2,$name3);
				}
				else
				{
					$result[$k]['choice']=array($name2,$name3);
				}
				
			}
			else
			{
				$result[$k]['choice']=array($name3);
			}
		}
		

		
		if ($v['click'])
		$result[$k]['click']='http://detail.tmall.com/item.htm?id='.$v['click'];
	}

	print_r(json_encode($result));

	
}

function get_parts_m($parts,$pdo){
	
	$parts=trim($parts[0]['parts'],',');
	$parts=explode(',',$parts);
	
	mysql_select_db($mysql_database2, $conn2);
	$sql="select * from parts";
	$parts_m=mysql_query($sql);
	$parts_m=getall($parts_m);

	

	foreach ($parts_m as $k=>$v){
		$tmp=explode(',',$v['parts']);
		$parts_mm[$tmp[1]]=$tmp[0];
	}
	
	foreach ($parts as $k=>$v){
		
		$tmp=explode(':',$v);
		if (isset($parts_mm[$tmp[0]]))
		{
		$parts_mmm[$tmp[0]]=$parts_mm[$tmp[0]].':'.$tmp[1];
		}
		
	}
	
	
	return @$parts_mmm;
}

function curl($url,$rep){
	$output =iconv('GB2312', 'UTF-8', file_get_contents($url));
	preg_match_all("(.*)", $output, $data, PREG_SET_ORDER);
	foreach ($data as $k=>$v)
	{
		if (strstr($v[0],$rep))
		$result=$v[0];
	}
	return $result;

}

?>