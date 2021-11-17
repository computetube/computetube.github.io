<?php
session_start();

$db = new mysqli("whats-dad.de.mysql","whats_dad_dewhatsdad","wawefwef2f2fwefwef2ef2e","whats_dad_dewhatsdad");

$data = $db->query("select * from config where name='ow_hits'");
$row = $data->fetch_object();
$hits = $row->value;
$hits += 1;
$db->query("update config set value=$hits where name='ow_hits'");

$data = $db->query("select * from config where name='ow_visitors'");
$row = $data->fetch_object();
$visitors = $row->value;
if(!isset($_SESSION["visit"])) {
	$visitors += 1;
	$db->query("update config set value=$visitors where name='ow_visitors'");
}

$_SESSION["visit"] = true;
?>







