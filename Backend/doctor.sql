/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - doctor_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`doctor_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `doctor_db`;

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `id` bigint(20) NOT NULL,
  `hire_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `doctor` */

insert  into `doctor`(`id`,`hire_date`,`name`,`phone_number`,`salary`,`specialization`,`image_url`) values 
(132,'2025-03-07','Blagoje','543224321',15000,'cardiology','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/m1.jpeg'),
(133,'2025-03-07','Stanislav Binicki','5432',20000,'neurosurgeon','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/m2.jpeg'),
(134,'2025-03-07','Nemanja Ciric','3461036',10000,'neurosurgeon','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/m3.jpeg'),
(135,'2025-03-07','Lidija Pesic','3461036',10000,'Dermatologist','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/f1.jpeg'),
(136,'2025-03-07','Nestorovic','0656',9000,'pulmonologist','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/m4.jpeg'),
(138,'2025-03-07','Jovana Jovanovic','0656242',10000,'Oncologist','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/f3.jpeg'),
(139,'2025-03-07','Bojana','06562423634635634265',5000,'Pediatrician','https://health-management-system-torage.s3.eu-north-1.amazonaws.com/doctorPhotos/f2.jpeg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
