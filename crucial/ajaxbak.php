<?php
include_once 'conn.php';


$num=40;

if($_GET['act']=='c')
{
	$url='http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=c&pid='.$_GET['pid'];
	$data=curl($url);
	
	print_r($data);
}
else if (@$_GET['act']=='p')
{
	
	$url='http://commentwall.shopmodule.jaeapp.com/crucial/ajax.php?act=p&id='.$_GET['id'];
	$data=curl($url);
	
	print_r($data);
}
else if ($_GET['act']=='visitlog')
{
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
	$data=curl($url);
	print_r($data);
}
else if ($_GET['act']=='getlog')
{
	
	$total=floor($_GET['total']);
	$startid=floor($_GET['startid']);
	if (!$total)
	$total=200;
	
	if ($_GET['stime'])
	$where=' and v.addtime>='.floor($_GET['stime']);
	if ($_GET['etime'])
	$where.=' and v.addtime<='.floor($_GET['etime']);
	if ($startid)
	$where.=' and v.id>='.$startid;
	
	$sql='select v.*,c.name,c.pid from `visitlog` as v left JOIN `category` as c ON v.choose=c.id where 1=1 '.$where.' ORDER BY v.id DESC limit 0,'.$total;
	$data=mysql_query($sql);
	$data=getall($data);
	foreach ($data as $k=>$v){
		$result[$k]['id']=$v['id'];
		$result[$k]['ip']=$v['ip'];
		$result[$k]['addtime']=$v['addtime'];
		if ($v['pid'])
		{
			$sql="select * from `category` where id='".$v['pid']."'";
			$data1=mysql_query($sql);
			$data1 = getall($data1);
			$name2 = $data1[0]['name'];
			//$result[$k]['choice'][1]=$data1[0]['name'];
			if ($data1[0]['pid']){
				$sql="select * from category where id='".$data1[0]['pid']."'";
				$data2=mysql_query($sql);
				$data2 = getall($data2);
				//$result[$k]['choice'][0]=$data2[0]['name'];
				$name1 = $data2[0]['name'];
				$result[$k]['choice']=array($name1,$name2,$v['name']);
			}
			else
			{
				$result[$k]['choice']=array($name2,$v['name']);
			}
			
			
		}
		else
		{
			//$result[$k]['choice']=$v['name'];
			$result[$k]['choice']=array($v['name']);
		}
		
		if ($v['click'])
		$result[$k]['click']='http://detail.tmall.com/item.htm?id='.$v['click'];
	}
	print_r(json_encode($result));

	
}
function get_parts_m($parts,$pdo){
	
	$parts=trim($parts[0]['parts'],',');
	$parts=explode(',',$parts);
	
	
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

function curl($url){
	$output =iconv('GB2312', 'UTF-8', file_get_contents($url)) ;
	preg_match_all("(.*)", $output, $data, PREG_SET_ORDER);
	return $data[50][0];

}

?>