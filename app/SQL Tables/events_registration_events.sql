-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: events_registration
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `client_surname` varchar(255) NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (4,'Vilius','Viliunas','vilius@gmail.com','+370 33 111111','Kaunas Book Fair',3,'2023-02-06 14:59:28'),(5,'Jonas','Ozkinis','jonas@gmail.com','+370 33 222222','Klaipeda Book Fair',4,'2023-02-06 15:00:55'),(6,'Jurgis','Jurgelevicius','jurgis@gmail.com','+370 33 444444','Ryga Book Fair',4,'2023-02-06 15:01:53'),(7,'Martynas','Martinaitis','martynas@gmail.com','+370 44 444444','Koncertas Pjese',25,'2023-02-16 21:16:00'),(8,'Saule','Saulaite','saule@gmail.com','+370 55 555555','Maratonas',4,'2023-02-10 07:15:00'),(10,'Bolislavas','Skuras','bolislavas@yahoo.com','+.370 5 246875','Maratonas',30,'2023-04-15 05:05:00'),(11,'Jonas','Biliunas','jonas@yahoo.com','+370 45 1111111','Maratonas Kaune',3,'2023-02-25 05:19:00'),(12,'Balys','Balaitis','balys@gmail.com','+370 56 555555','Maratonas Kaune',3,'2023-02-25 05:00:00'),(13,'Saulius','Saulaitis','saulius@gmail.com','+370 37  555555','MaratonasKaune',25,'2023-02-25 07:42:00'),(14,'Risardas','Liutasirdis','risardas@yahoo.com','+370 37 33555','London Grill Fiesta',36,'2023-02-25 08:43:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-08 20:56:58
