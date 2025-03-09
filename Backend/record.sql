/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - record_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`record_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `record_db`;

/*Table structure for table `medical_record` */

DROP TABLE IF EXISTS `medical_record`;

CREATE TABLE `medical_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `diagnosis` varchar(255) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `medications` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `record_date` datetime(6) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `medical_record` */

insert  into `medical_record`(`id`,`diagnosis`,`doctor_id`,`medications`,`patient_id`,`record_date`,`treatment`) values 
(1,'death',77,'grave',71,'2025-03-02 19:49:57.000000','none'),
(2,'death',77,'grave',107,'2025-03-02 19:51:52.000000','none'),
(3,'Healthy',77,'all',76,'2025-03-02 20:27:59.000000','none'),
(4,'Healthy again',77,'none',76,'2025-03-02 19:52:46.000000','none'),
(5,'crazy',77,'none',76,'2025-03-02 19:53:08.000000','none'),
(6,'crazy',78,'none',76,'2025-03-02 19:53:39.000000','none'),
(8,'normal',78,'none',71,'2025-03-02 19:54:15.000000','none'),
(9,'fever',78,'brufen',75,'2025-03-02 19:54:57.000000','stay at home');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
