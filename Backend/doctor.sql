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
(132,'2025-03-07','Blagoje Novakovic','543224321',15000,'cardiology','https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg'),
(133,'2025-03-07','Stanislav Binicki','5432',20000,'neurosurgeon','https://t4.ftcdn.net/jpg/03/05/41/27/360_F_305412791_XRNiWaFCREjLLpSQfj0e736foBoYXXYv.jpg'),
(134,'2025-03-07','Nemanja Ciric','3461036',10000,'neurosurgeon','https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-260nw-2380152965.jpg'),
(135,'2025-03-07','Lidija Pesic','3461036',10000,'Dermatologist','https://media.istockphoto.com/id/1372002650/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.jpg?s=612x612&w=0&k=20&c=o1QtStNsowOU0HSof6xQ_jZMglU8ZK565gHd655U6S4='),
(136,'2025-03-07','Nestor Nestorovic','0656',9000,'pulmonologist','https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg'),
(138,'2025-03-07','Jovana Jovanovic','0656242',10000,'Oncologist','https://media.cnn.com/api/v1/images/stellar/prod/230217092727-02-us-black-doctors-shortage.jpg?c=original'),
(139,'2025-03-07','Bojana Bojanic','06562423634635634265',5000,'Pediatrician','https://img.freepik.com/premium-vector/female-doctor-cartoon-character-with-stethoscope-vector-illustration-female-doctor-uniform_1142-72453.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
