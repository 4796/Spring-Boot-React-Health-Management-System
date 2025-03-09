/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - appoint_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`appoint_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `appoint_db`;

/*Table structure for table `appointment` */

DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `appointment_time` datetime(6) DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `appointment` */

insert  into `appointment`(`id`,`appointment_time`,`doctor_id`,`patient_id`,`type`) values 
(8,'2025-03-05 13:30:00.000000',134,71,'another vacine'),
(9,'2025-03-05 13:00:00.000000',134,74,'another vacine'),
(10,'2025-03-05 11:30:00.000000',134,71,'another vacine'),
(11,'2025-03-05 12:30:00.000000',134,71,'another vacine'),
(12,'2025-03-05 10:30:00.000000',134,71,'covid test'),
(13,'2025-03-10 10:30:00.000000',135,71,'dermatology'),
(14,'2025-03-10 11:30:00.000000',135,71,'someDoctorThings'),
(15,'2025-03-10 13:30:00.000000',135,75,'something'),
(16,'2025-03-30 13:00:00.000000',135,74,'something'),
(17,'2025-08-30 12:00:00.000000',135,73,'something'),
(18,'2025-09-30 13:00:00.000000',135,73,'something again'),
(19,'2025-09-30 11:30:00.000000',135,72,'something again'),
(20,'2025-09-30 12:00:00.000000',135,72,'something again'),
(21,'2025-12-30 12:30:00.000000',135,72,'something again'),
(22,'2025-12-30 11:30:00.000000',135,71,'something again'),
(23,'2025-12-14 11:30:00.000000',77,76,'something again'),
(25,'2026-01-01 10:00:00.000000',135,71,'regular medical examination'),
(26,'2032-12-12 12:30:00.000000',135,71,'regular appointment'),
(27,'2032-12-12 12:00:00.000000',135,71,'regular appointment'),
(28,'2025-03-09 08:00:00.000000',132,76,'cough'),
(29,'2025-03-15 08:00:00.000000',132,76,'allergy'),
(30,'2025-03-15 08:00:00.000000',133,76,'eye infection'),
(31,'2025-03-16 08:00:00.000000',133,76,'eye infection'),
(32,'2025-03-17 08:00:00.000000',133,76,'eye infection'),
(33,'2025-03-17 08:00:00.000000',136,71,'broken knee'),
(34,'2025-03-18 08:00:00.000000',136,71,'broken knee'),
(35,'2025-03-19 08:00:00.000000',136,71,'broken knee'),
(36,'2025-03-17 08:30:00.000000',136,72,'headache'),
(37,'2025-03-18 08:30:00.000000',136,72,'headache');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
