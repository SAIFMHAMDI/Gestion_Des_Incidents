-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 16 juin 2023 à 15:21
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_des_incidents`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `prénom` varchar(40) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `date_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prénom`, `email`, `password`, `tel`, `date_login`, `role`) VALUES
(57, 'admin', 'admin', 'admin@gmail.com', 'saifsaif', '27236337', '2023-06-16 14:41:20', 1);

-- --------------------------------------------------------

--
-- Structure de la table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
CREATE TABLE IF NOT EXISTS `discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) NOT NULL DEFAULT '0',
  `id_admin` int(11) NOT NULL DEFAULT '0',
  `date_discussion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `discussion`
--

INSERT INTO `discussion` (`id`, `id_technicien`, `id_admin`, `date_discussion`) VALUES
(1, 30, 4, '2023-06-14 18:39:46');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_technicien` (`id_technicien`,`id_incident`),
  KEY `fav_inc` (`id_incident`)
) ENGINE=InnoDB AUTO_INCREMENT=78981 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `favoris`
--

INSERT INTO `favoris` (`id`, `id_technicien`, `id_incident`, `date_ajout`) VALUES
(78978, 30, 51, '2023-06-14 10:59:27'),
(78980, 30, 50, '2023-06-16 12:27:46');

-- --------------------------------------------------------

--
-- Structure de la table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) DEFAULT NULL,
  `id_incident` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `signature` varchar(255) NOT NULL,
  `reclamation` text,
  `date_feedback` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `feed_tech` (`id_technicien`),
  KEY `feedback_incident` (`id_incident`)
) ENGINE=InnoDB AUTO_INCREMENT=9588 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `feedback`
--

INSERT INTO `feedback` (`id`, `id_technicien`, `id_incident`, `description`, `image`, `signature`, `reclamation`, `date_feedback`) VALUES
(9587, 30, 51, 'this is descriptioin', 'dc4d93e3938e7e55a55d-1686920744733.jpg', '51_signature.png', NULL, '2023-06-16 13:05:44');

-- --------------------------------------------------------

--
-- Structure de la table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
CREATE TABLE IF NOT EXISTS `incidents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_operateur` int(11) NOT NULL,
  `id_technicien` int(11) DEFAULT NULL,
  `accepted_by` tinyint(1) NOT NULL DEFAULT '0',
  `date_insertion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nom` varchar(30) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `code_postal` varchar(15) NOT NULL,
  `fiche_technique` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `details` text NOT NULL,
  `titre` varchar(255) NOT NULL,
  `etat` varchar(255) NOT NULL DEFAULT 'ON HOLD',
  `date_acceptation` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incident_operateur` (`id_operateur`),
  KEY `accepted_technicien` (`id_technicien`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `incidents`
--

INSERT INTO `incidents` (`id`, `id_operateur`, `id_technicien`, `accepted_by`, `date_insertion`, `nom`, `adresse`, `code_postal`, `fiche_technique`, `telephone`, `details`, `titre`, `etat`, `date_acceptation`) VALUES
(50, 48, 30, 0, '2023-04-09 15:15:42', 'Telecom', 'cité 25 juillet', '2094', 'saif.png', '27236337', 'panne', 'Cablage', 'DONE', '2023-04-08'),
(51, 48, NULL, 30, '2023-06-16 13:05:44', 'Telecom', 'cité 25 juillet', '2094', 'saif.png', '27236337', 'panne', 'Cablage', 'DONE', NULL),
(56, 48, NULL, 0, '2023-06-16 14:17:40', 'hhh', 'hhh', '2094', 'dbaed907327b97074554-1686925060783.jpg', '654654654654', 'hellooo', 'aaa', 'ON HOLD', NULL),
(57, 48, NULL, 0, '2023-06-16 14:18:10', 'hhh', 'hhh', '2094', 'e21ca2fe0877d4f62585-1686925090541.jpg', '654654654654', 'hellooo', 'aaa', 'ON HOLD', NULL),
(58, 48, NULL, 0, '2023-06-16 14:19:55', 'hhh', 'hhh', '2094', '91db398d9082f33da1d3-1686925195610.jpg', '654654654654', 'hellooo', 'aaa', 'ON HOLD', NULL),
(59, 48, NULL, 0, '2023-06-16 14:20:27', 'hhh', 'hhh', '2094', 'c2bd13cbdb60f5d5bddf-1686925227265.jpg', '654654654654', 'hellooo', 'aaa', 'ON HOLD', NULL),
(60, 48, NULL, 0, '2023-06-16 14:21:45', 'hhh', 'hhh', '2094', '8254b44bbcb34dd395dd-1686925305431.zip', '654654654654', 'hellooo', 'aaa', 'ON HOLD', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) NOT NULL DEFAULT '0',
  `id_admin` int(11) NOT NULL DEFAULT '0',
  `id_discussion` int(11) NOT NULL DEFAULT '0',
  `content` text,
  `date_envoie` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `id_technicien`, `id_admin`, `id_discussion`, `content`, `date_envoie`) VALUES
(1, 30, 0, 1, 'Hellooooo', '2023-06-14 18:40:06'),
(2, 30, 0, 1, 'Hellooooo 2', '2023-06-14 18:40:06'),
(3, 0, 4, 1, 'Hellooooo 2', '2023-06-14 18:40:06'),
(4, 0, 4, 1, 'Hellooooo 2', '2023-06-14 18:40:06'),
(11, 30, 4, 1, 'How are you', '2023-06-15 15:06:01'),
(10, 30, 4, 1, 'Hellooo', '2023-06-15 15:05:55'),
(12, 30, 4, 1, 'kkkkkk', '2023-06-15 15:06:04'),
(13, 30, 4, 1, 'whyyy', '2023-06-15 15:06:07'),
(14, 30, 4, 1, 'yesss', '2023-06-15 15:06:13'),
(15, 30, 4, 1, 'yesss', '2023-06-15 15:06:13'),
(16, 30, 4, 1, 'yesss ok', '2023-06-15 15:06:13'),
(17, 30, 4, 1, 'yesss ok 2', '2023-06-15 15:06:13'),
(18, 30, 4, 1, 'Hiii', '2023-06-16 12:27:28');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) NOT NULL,
  `date_notification` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `titre` varchar(30) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notif_tech` (`id_technicien`)
) ENGINE=InnoDB AUTO_INCREMENT=2913 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `id_technicien`, `date_notification`, `titre`, `message`) VALUES
(2876, 30, '2023-06-15 15:54:58', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'),
(2877, 30, '2023-06-15 15:55:06', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'),
(2898, 30, '2023-06-16 14:19:56', 'aaa', 'hellooo'),
(2899, 35, '2023-06-16 14:19:56', 'aaa', 'hellooo'),
(2900, 36, '2023-06-16 14:19:56', 'aaa', 'hellooo'),
(2901, 37, '2023-06-16 14:19:56', 'aaa', 'hellooo'),
(2902, 39, '2023-06-16 14:19:56', 'aaa', 'hellooo'),
(2903, 30, '2023-06-16 14:20:27', 'aaa', 'hellooo'),
(2904, 35, '2023-06-16 14:20:27', 'aaa', 'hellooo'),
(2905, 36, '2023-06-16 14:20:27', 'aaa', 'hellooo'),
(2906, 37, '2023-06-16 14:20:27', 'aaa', 'hellooo'),
(2907, 39, '2023-06-16 14:20:27', 'aaa', 'hellooo'),
(2908, 30, '2023-06-16 14:21:45', 'aaa', 'hellooo'),
(2909, 35, '2023-06-16 14:21:45', 'aaa', 'hellooo'),
(2910, 36, '2023-06-16 14:21:45', 'aaa', 'hellooo'),
(2911, 37, '2023-06-16 14:21:45', 'aaa', 'hellooo'),
(2912, 39, '2023-06-16 14:21:45', 'aaa', 'hellooo');

-- --------------------------------------------------------

--
-- Structure de la table `operateur`
--

DROP TABLE IF EXISTS `operateur`;
CREATE TABLE IF NOT EXISTS `operateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  `disabled` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `operateur`
--

INSERT INTO `operateur` (`id`, `Name`, `email`, `telephone`, `password`, `role`, `disabled`) VALUES
(48, 'Telecom', 'omranih11@gmail.com', '98989898', 'telcomtelecom', 0, 0),
(49, 'orange', 'orange@gmail.com', '54454545', 'rangerange', 0, 0),
(50, 'ooredoo', 'ooredoo@gmail.com', '24153698', 'ooredooooredoo', 0, 0),
(51, 'Taraji Mobile', 'tarajiMobile@gmail.com', '98541237', 'tarajoitaaraji', 0, 0),
(52, '3ellissa', '3ellissa@gmail.com', '54123698', '3ellisa3ellisa', 0, 0),
(53, 'cssmobile', 'cssmobile@gmail.com', 'tt@gmail.com', 'cssmobile', 0, 0),
(54, 'topnet', 'topnet@gmail.com', '96852147', 'topnettopnet', 0, 0),
(55, 'globalNet', 'globalnet@gmail.com', '98745632', 'changeme', 0, 0),
(56, 'saif', 'mhamdisaif035@gmail.com', '52789623', 'saifsaif', 0, 0),
(57, 'ADMIN', 'superadmin@gmail.com', '52789623', 'ADMIn', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `push_token`
--

DROP TABLE IF EXISTS `push_token`;
CREATE TABLE IF NOT EXISTS `push_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_type` varchar(100) DEFAULT NULL,
  `token` text,
  `id_technicien` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163569 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `push_token`
--

INSERT INTO `push_token` (`id`, `device_type`, `token`, `id_technicien`) VALUES
(163568, 'android', 'aaaaa', 30);

-- --------------------------------------------------------

--
-- Structure de la table `techniciens`
--

DROP TABLE IF EXISTS `techniciens`;
CREATE TABLE IF NOT EXISTS `techniciens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `code_postal` varchar(20) NOT NULL,
  `disponibilité` tinyint(1) NOT NULL DEFAULT '0',
  `telephone` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `acceptation` tinyint(1) NOT NULL DEFAULT '0',
  `date_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `techniciens`
--

INSERT INTO `techniciens` (`id`, `nom`, `prenom`, `code_postal`, `disponibilité`, `telephone`, `password`, `email`, `acceptation`, `date_login`, `file`) VALUES
(30, 'Hamza', 'omrani ', '2094', 1, '26680401', '20003056', 'omranih11@gmail.com', 1, '2023-06-16 13:37:49', NULL),
(34, 'oussema', 'omrani', '3030', 0, '54473936', 'azertyuiop123', 'oussemaomrani2018@gmail.com', 0, '2023-04-08 11:46:09', NULL),
(35, 'saif', 'mhamdi', '2094', 0, '27236337', 'azertyuiop478', 'mhamdisaif035@gmail.com', 0, '2023-04-08 11:47:43', NULL),
(36, 'omar', 'mhamdi', '2094', 0, '27748522', 'azertyuiop158', 'mhamdiomar@gmail.com', 0, '2023-04-08 11:48:20', NULL),
(37, 'Amine', 'mhamdi', '2094', 0, '27236337', 'azertyuiop1235', 'mhamdiamine@gmail.com', 0, '2023-04-08 11:49:07', NULL),
(38, 'Marwen', 'Omrani', '3032', 0, '23458794', 'asderfvce', 'mhamdisaif035@gmail.com', 0, '2023-04-08 11:49:39', NULL),
(39, 'Ali', 'Omrani', '2094', 0, '26620159', 'azertyuiopqsd', 'OmraniAli@gmail.com', 0, '2023-04-08 11:50:19', NULL),
(40, 'Moez', 'Kthiri', '3030', 0, '50214789', 'azertyyuio', 'MoezKthiri@gmail.com', 0, '2023-04-08 11:51:12', NULL),
(42, 'Mouhamed Ali', 'Chaouachhi ', '3035', 0, '52478952', 'azertyuio78945', 'MouhamedAli@gmail.com', 0, '2023-04-08 11:53:16', NULL),
(47, 'aaa', 'bbb', '54654', 0, '89654785', '20003056', 'technicien@email.com', 0, '2023-06-16 15:03:56', '79abfb6346a1c9a605a6-1686927836911.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `technicien_incident`
--

DROP TABLE IF EXISTS `technicien_incident`;
CREATE TABLE IF NOT EXISTS `technicien_incident` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_technicien` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `date_assignation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `technicien_fk` (`id_technicien`),
  KEY `tech_incidents` (`id_incident`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `verification`
--

DROP TABLE IF EXISTS `verification`;
CREATE TABLE IF NOT EXISTS `verification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `fav_inc` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoris_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);

--
-- Contraintes pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feed_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`),
  ADD CONSTRAINT `feedback_incident` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `accepted_technicien` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incident_operateur` FOREIGN KEY (`id_operateur`) REFERENCES `operateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notif_tech` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);

--
-- Contraintes pour la table `technicien_incident`
--
ALTER TABLE `technicien_incident`
  ADD CONSTRAINT `tech_incidents` FOREIGN KEY (`id_incident`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `technicien_fk` FOREIGN KEY (`id_technicien`) REFERENCES `techniciens` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
