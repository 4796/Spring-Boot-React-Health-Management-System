/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - auth_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`auth_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `auth_db`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`password`,`role`,`username`) values 
(71,'$2a$10$zX211W.KtqnseG7/Go2RFO37c5VORYPZpbBBuxLcHsFXUt8Y3o.D6','ROLE_PATIENT','lazar'),
(72,'$2a$10$vw1I6b6SPKuXFghvnMAEIOJQepWETC1D6M7MRpa4/g1c7poXMrAF2','ROLE_PATIENT','lazar2'),
(74,'$2a$10$c7EsjoF.mSWQsvNf1xl8Xez6cZMbZoHlPze9MMyxPEi1DPU1aDGr.','ROLE_PATIENT','korisnik'),
(75,'$2a$10$VC0joWDOn.IP87UFSbw4SusrvbU4nzOAPXHzk6gCijwWRIqiSEAWC','ROLE_PATIENT','someone'),
(76,'$2a$10$vz.8fDgVHmZcNkiKTpsS..Cy4uqLVAMiGQs7wdlxsEO0Iy8OWz86e','ROLE_PATIENT','aaaa'),
(81,'$2a$10$2zCJsdRBmXkZwaQEYDg3E.rl3SrHV6UVF6fopigzNTM8ohhh9BYo.','ROLE_ADMIN','admin'),
(107,'$2a$10$fcYS1NxjH0.xH7Ubh6TBu.d55KN7l0SIG4y3QA/cxBOdL/LFbUngy','ROLE_PATIENT','stanko123'),
(110,'$2a$10$iu87KSLPPW66aIekRr7P/ei8HUrqwGyGg2/7hI0dWCwT/SxSC8c/y','ROLE_PATIENT','radasin'),
(132,'$2a$10$JPD.kRVaKgzYt9qi2SqEIuH/U/7U5W5Epmyq.N1/RoEoo5DYTQy8G','ROLE_DOCTOR','blagoje'),
(133,'$2a$10$c76XdBLGh0EwvjTjLsR9COXdg2bJ8qRJfhtINb9XN/hgSEYPfaGI2','ROLE_DOCTOR','qqqq'),
(134,'$2a$10$nEMlnG3W2169KlsTGSliU.DABd9vTSOJszweXg2p9XhCm/u5Qy2cO','ROLE_DOCTOR','nemanja'),
(135,'$2a$10$k3kxKBnhvKxPQmZLne31uehgzm6bDID/JmonKdHyWvdhZlQ2nHdO2','ROLE_DOCTOR','lidija'),
(136,'$2a$10$kWWCfTZo5fSS6okpx0MYjuIUXJMZpy93Kcv5WavmaQbi53lHJqz1u','ROLE_DOCTOR','nestor'),
(138,'$2a$10$IO1QdJ0dS9CsXij8Rqap3ubsIvUb1Nab6w9ATGwDnOLLhEVPaPtse','ROLE_DOCTOR','todor'),
(139,'$2a$10$HZAiVRqhA/cD2XRMrf0ULuNb25.6af82ILHTouuWHmam7oTelAKa2','ROLE_DOCTOR','Vucicevic');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
