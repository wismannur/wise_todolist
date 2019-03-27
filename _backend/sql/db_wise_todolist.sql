/*
SQLyog Professional v10.42 
MySQL - 5.5.5-10.1.16-MariaDB : Database - db_wise_todolist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_wise_todolist` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_wise_todolist`;

/*Table structure for table `todo_item` */

DROP TABLE IF EXISTS `todo_item`;

CREATE TABLE `todo_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_todo_master` int(11) DEFAULT NULL,
  `status` enum('done','not done') NOT NULL DEFAULT 'not done',
  `category` enum('easy','difficult') NOT NULL DEFAULT 'easy',
  `time` time DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name_todo_item` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_todo_master` (`id_todo_master`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `todo_item` */

insert  into `todo_item`(`id`,`id_todo_master`,`status`,`category`,`time`,`description`,`name_todo_item`) values (1,5,'not done','easy','07:00:00','pray dhuha','pray'),(2,5,'not done','easy','07:30:00','check perlengkapan','check and recheck'),(3,5,'not done','easy','08:00:00','berangkat kerja','otw kantor');

/*Table structure for table `todo_master` */

DROP TABLE IF EXISTS `todo_master`;

CREATE TABLE `todo_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_todo` varchar(100) DEFAULT NULL,
  `for_date` date NOT NULL DEFAULT '0000-00-00',
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `todo_master` */

insert  into `todo_master`(`id`,`name_todo`,`for_date`,`created_at`,`updated_at`,`description`) values (5,'For Work','2019-03-28','2019-03-27 09:53:41','2019-03-27 09:53:41','For Work Tomorrow');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
