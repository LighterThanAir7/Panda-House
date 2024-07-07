-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2024 at 08:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `panda-house`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategorije`
--

CREATE TABLE `kategorije` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategorije`
--

INSERT INTO `kategorije` (`id`, `naziv`) VALUES
(1, 'Piće'),
(2, 'Predjela'),
(3, 'Juhe'),
(4, 'Glavna Jela'),
(5, 'Deserti'),
(6, 'Specijalni Menu');

-- --------------------------------------------------------

--
-- Table structure for table `podkategorije`
--

CREATE TABLE `podkategorije` (
  `id` int(11) NOT NULL,
  `id_kategorija` int(11) DEFAULT NULL,
  `naziv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `podkategorije`
--

INSERT INTO `podkategorije` (`id`, `id_kategorija`, `naziv`) VALUES
(1, 1, 'Kineski sokovi'),
(2, 1, 'Sokovi'),
(3, 1, 'Kava i čaj'),
(4, 1, 'Pivo'),
(5, 1, 'Kućna vina'),
(6, 1, 'Bijela Vina'),
(7, 1, 'Crna Vina'),
(8, 1, 'Rose'),
(9, 1, 'Desertno vino'),
(10, 1, 'Pjenušci'),
(11, 1, 'Kineska rakija'),
(12, 1, 'Aperitivi'),
(13, 1, 'Uvozna žestoka pića'),
(14, 2, 'Hladna predjela'),
(15, 2, 'Topla predjela'),
(16, 4, 'Domaća tjestenina'),
(17, 4, 'Riža'),
(18, 4, 'Piletina'),
(19, 4, 'Svinjetina'),
(20, 4, 'Junetina'),
(21, 4, 'Janjetina'),
(22, 4, 'Patka'),
(23, 4, 'Kineski specijaliteti'),
(24, 4, 'Morski specijaliteti'),
(25, 4, 'Tofu i povrće'),
(26, 6, 'Za 2 osobe'),
(27, 6, 'Za 3 osobe'),
(28, 6, 'Za 4 osobe');

-- --------------------------------------------------------

--
-- Table structure for table `proizvodi`
--

CREATE TABLE `proizvodi` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `litraza` varchar(10) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `cijena` decimal(10,2) DEFAULT NULL,
  `slika` varchar(255) DEFAULT NULL,
  `aktivan` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proizvodi`
--

INSERT INTO `proizvodi` (`id`, `naziv`, `litraza`, `opis`, `cijena`, `slika`, `aktivan`) VALUES
(1, 'Guava', '0,25l', NULL, 3.20, NULL, 1),
(2, 'Litchi', '0,25l', NULL, 3.20, NULL, 1),
(3, 'Mango', '0,25l', NULL, 3.20, NULL, 1),
(4, 'Coca-cola', '0,25l', NULL, 3.00, NULL, 1),
(5, 'Coca-cola zero', '0,25l', NULL, 3.00, NULL, 1),
(6, 'Fanta', '0,25l', NULL, 3.00, NULL, 1),
(7, 'Sprite', '0,25l', NULL, 3.00, NULL, 1),
(8, 'Tonic', '0,25l', NULL, 3.00, NULL, 1),
(9, 'Bitter Lemon', '0,25l', NULL, 3.00, NULL, 1),
(10, 'Voćni Juicy', '0,20l', NULL, 3.00, NULL, 1),
(11, 'Ledeni čaj', '0,33l', NULL, 3.00, NULL, 1),
(12, 'Orangina', '0,25l', NULL, 3.00, NULL, 1),
(13, 'Mineralna voda', '0,75l', NULL, 3.50, NULL, 1),
(14, 'Mineralna voda', '0,50l', NULL, 3.00, NULL, 1),
(15, 'Mineralna voda', '0,25l', NULL, 2.00, NULL, 1),
(16, 'Negazirana voda', '0,75l', NULL, 3.50, NULL, 1),
(17, 'Negazirana voda', '0,33l', NULL, 2.00, NULL, 1),
(18, 'Cedevita', '0,20l', NULL, 3.00, NULL, 1),
(19, 'Tangerina', '0,25l', NULL, 3.00, NULL, 1),
(20, 'Min. voda Sensation', '0,25l', NULL, 2.50, NULL, 1),
(21, 'Espresso', 'šalica', NULL, 1.80, NULL, 1),
(22, 'Kava s mlijekom', 'šalica', NULL, 2.00, NULL, 1),
(23, 'Cappuccino', 'šalica', NULL, 2.30, NULL, 1),
(24, 'Čaj zeleni, Jasmin', 'šalica', NULL, 3.50, NULL, 1),
(25, 'Pivo s okusom', '0,50l', NULL, 3.00, NULL, 1),
(26, 'Karlovačko', '0,50l', NULL, 3.00, NULL, 1),
(27, 'Kinesko pivo', '0,33l', NULL, 3.50, NULL, 1),
(28, 'Heineken', '0,33l', NULL, 3.20, NULL, 1),
(29, 'Pan', '0,50l', NULL, 3.00, NULL, 1),
(30, 'Tomislav', '0,50l', NULL, 3.00, NULL, 1),
(31, 'Stella Artois', '0,33l', NULL, 3.00, NULL, 1),
(32, 'Ožujsko', '0,50l', NULL, 3.00, NULL, 1),
(33, 'Šember - Graševina bijelo', '1,00 l', NULL, 25.00, NULL, 1),
(34, 'Šember - Graševina bijelo', '0,10 l', NULL, 2.50, NULL, 1),
(35, 'Crno vino - Jakob', '1,00 l', NULL, 28.00, NULL, 1),
(36, 'Crno vino - Jakob', '0,10 l', NULL, 2.80, NULL, 1),
(37, 'Jarec - Bijeli Pinot', '0,75 l', NULL, 25.00, NULL, 1),
(38, 'Šember - Chardonnay', '0,75 l', NULL, 26.00, NULL, 1),
(39, 'Korak - Chardonnay Sur. Lie', '0,75 l', NULL, 45.00, NULL, 1),
(40, 'Galić - Sauvignon', '0,75 l', NULL, 30.00, NULL, 1),
(41, 'Krauthaker - Graševina Mitrovac', '0,75 l', NULL, 26.00, NULL, 1),
(42, 'Coronica - Malvazija', '0,75 l', NULL, 30.00, NULL, 1),
(43, 'Kozlović - Malvazija', '0,75 l', NULL, 32.00, NULL, 1),
(44, 'Krajančić - Pošip Sur. Lie', '0,75 l', NULL, 38.00, NULL, 1),
(45, 'Krauthaker - Merlot', '0,75 l', NULL, 28.00, NULL, 1),
(46, 'Roxanich - Cabernet Sauvignon', '0,75 l', NULL, 45.00, NULL, 1),
(47, 'Coronica - Gran Teran', '0,75 l', NULL, 46.00, NULL, 1),
(48, 'Korlat - Syrah', '0,75 l', NULL, 32.00, NULL, 1),
(49, 'Plenković - Zlatan Plavac', '0,75 l', NULL, 35.00, NULL, 1),
(50, 'Vicelić - Dingač', '0,75 l', NULL, 45.00, NULL, 1),
(51, 'Miloš - Plavac', '0,75 l', NULL, 28.00, NULL, 1),
(52, 'Buhač - Merlot', '0,75 l', NULL, 25.00, NULL, 1),
(53, 'Krauthaker - Rose Cuvee', '0,75 l', NULL, 26.00, NULL, 1),
(54, 'Cmrečnjak - Muškat', '0,75 l', NULL, 30.00, NULL, 1),
(55, 'Tomac - Millenium', '0,75 l', NULL, 32.00, NULL, 1),
(56, 'Kineska rakija od riže', '0,02 l', NULL, 3.20, NULL, 1),
(57, 'Kineska rakija od ruže', '0,02 l', NULL, 3.20, NULL, 1),
(58, 'Kineska rakija od bambusa', '0,02 l', NULL, 3.20, NULL, 1),
(59, 'Vino od šljive', '0,04 l', NULL, 3.20, NULL, 1),
(60, 'Sake', '0,04 l', NULL, 3.20, NULL, 1),
(61, 'Amaro', '0,03 l', NULL, 2.20, NULL, 1),
(62, 'Travarica', '0,03 l', NULL, 2.00, NULL, 1),
(63, 'Pelinkovac', '0,03 l', NULL, 2.00, NULL, 1),
(64, 'Viljamovka', '0,03 l', NULL, 3.80, NULL, 1),
(65, 'Jägermeister', '0,03 l', NULL, 3.00, NULL, 1),
(66, 'Lozovača', '0,03 l', NULL, 2.00, NULL, 1),
(67, 'Domaći Gin', '0,03 l', NULL, 2.00, NULL, 1),
(68, 'Ballantines', '0,03 l', NULL, 3.50, NULL, 1),
(69, 'Jack Daniel´s', '0,03 l', NULL, 4.20, NULL, 1),
(70, 'Martini Bianco', '0,10 l', NULL, 3.40, NULL, 1),
(71, 'Baileys', '0,03 l', NULL, 3.50, NULL, 1),
(72, 'Campari', '0,03 l', NULL, 3.00, NULL, 1),
(73, 'Miješana salata', NULL, NULL, 2.20, NULL, 1),
(74, 'Salata od kupusa (ljuto)', NULL, NULL, 2.50, NULL, 1),
(75, 'Salata od sojinih klica', NULL, NULL, 3.00, NULL, 1),
(76, 'Salata od sojinih klica sa kozicama', NULL, NULL, 5.80, NULL, 1),
(77, 'Sezonska salata s pilećim mesom (ljuto)', NULL, NULL, 4.20, NULL, 1),
(78, 'Salata s junetinom (ljuto)', NULL, NULL, 4.20, NULL, 1),
(79, 'Hrskavo pržena proljetna rolada sa mesom - 2 kom.', NULL, NULL, 3.30, NULL, 1),
(80, 'Pohano povrće', NULL, NULL, 3.50, NULL, 1),
(81, 'Čips od jastoga', NULL, NULL, 3.30, NULL, 1),
(82, '\"Jiao-Zi\" pirjani mesni domaći ravioli - 4 kom.', NULL, NULL, 4.60, NULL, 1),
(83, '\"Shao-Mai\" ravioli na pari sa škampima - 4 kom.', NULL, NULL, 6.80, NULL, 1),
(84, 'Prženi Wan-Tan - 10 kom.', NULL, NULL, 4.50, NULL, 1),
(85, 'Pržene lignje', NULL, NULL, 4.80, NULL, 1),
(86, 'Pržena pileća krila - 5 kom.', NULL, NULL, 4.50, NULL, 1),
(87, 'Prženi tofu', NULL, NULL, 4.50, NULL, 1),
(88, 'Pohani rakovi štapići', NULL, NULL, 4.50, NULL, 1),
(89, 'Prženi krumpirići (pomfrit)', NULL, NULL, 2.00, NULL, 1),
(90, 'Juha od plodova mora', NULL, NULL, 3.20, NULL, 1),
(91, 'Kiselo - ljuta juha sa piletinom', NULL, NULL, 3.20, NULL, 1),
(92, 'Juha od kukuruza i jaja', NULL, NULL, 3.00, NULL, 1),
(93, 'Wan-tan juha', NULL, NULL, 3.50, NULL, 1),
(94, 'Juha od povrća', NULL, NULL, 3.00, NULL, 1),
(95, 'Pileća juha s rezancima', NULL, NULL, 3.20, NULL, 1),
(96, 'Juha od rajčice', NULL, NULL, 3.00, NULL, 1),
(97, 'Juha sa bambusom, kineskim gljivama i piletinom', NULL, NULL, 3.20, NULL, 1),
(98, 'Juha sa staklenim rezancima i povrćem', NULL, NULL, 3.00, NULL, 1),
(99, 'Domaći rezanci s povrćem', NULL, NULL, 6.00, NULL, 1),
(100, 'Domaći rezanci s tri vrste mesa', NULL, NULL, 7.20, NULL, 1),
(101, 'Domaći rezanci s piletinom i curry-em', NULL, NULL, 7.50, NULL, 1),
(102, 'Domaći rezanci sa kozicama', NULL, NULL, 9.50, NULL, 1),
(103, 'Juha s rezancima i tri vrste mesa', NULL, NULL, 7.50, NULL, 1),
(104, 'Pirjana riža s jajima i povrćem', NULL, NULL, 6.00, NULL, 1),
(105, 'Pirjana riža s tri vrste mesa', NULL, NULL, 7.20, NULL, 1),
(106, 'Pirjana riža s piletinom i curry-em', NULL, NULL, 7.20, NULL, 1),
(107, 'Pirjana riža sa škampima', NULL, NULL, 9.20, NULL, 1),
(108, 'Kuhana riža', NULL, NULL, 2.00, NULL, 1),
(109, 'Kineski kruh na pari', NULL, NULL, 2.80, NULL, 1),
(110, 'Prženi kineski kruh', NULL, NULL, 2.80, NULL, 1),
(111, 'Piletina s cashew orasima', NULL, NULL, 9.80, NULL, 1),
(112, 'Piletina na Gongbao način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(113, 'Piletina s bambusom i kin. gljivama', NULL, NULL, 9.50, NULL, 1),
(114, 'Piletina u umaku od kamenica', NULL, NULL, 9.50, NULL, 1),
(115, 'Piletina sa šampinjonima', NULL, NULL, 9.50, NULL, 1),
(116, 'Piletina s curry-em', NULL, NULL, 9.80, NULL, 1),
(117, 'Piletina na Szechuan način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(118, 'Pohana piletina u slatko-kiselom umaku', NULL, NULL, 9.50, NULL, 1),
(119, 'Piletina s povrćem', NULL, NULL, 9.80, NULL, 1),
(120, 'Pohana pileća prsa sa sezamom', NULL, NULL, 10.00, NULL, 1),
(121, 'Hrskavo pohana piletina s umakom od naranče (ljuto)', NULL, NULL, 10.00, NULL, 1),
(122, 'Hrskavo pečena piletina sa slatko-kiselim umakom', NULL, NULL, 10.50, NULL, 1),
(123, 'Piletina na Gambian način (ljuto)', NULL, NULL, 10.50, NULL, 1),
(124, 'Hrskava pečena piletina sa bambusom i kineskim gljivama', NULL, NULL, 10.50, NULL, 1),
(125, 'Hrskava pečena piletina na Szechuan način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(126, 'Svinjetina na Gongbao način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(127, 'Svinjetina s povrćem', NULL, NULL, 9.50, NULL, 1),
(128, 'Svinjetina na Szechuan način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(129, 'Pohano svinjsko meso u slatko-kiselom umaku', NULL, NULL, 9.50, NULL, 1),
(130, 'Svinjetina s bambusom i kin. gljivama', NULL, NULL, 9.80, NULL, 1),
(131, 'Svinjetina na Gambian način (ljuto)', NULL, NULL, 9.80, NULL, 1),
(132, 'Babi-Pangang (pržena svinjetina u slatko-kiselo-ljutom umaku)', NULL, NULL, 9.80, NULL, 1),
(133, 'Hrskavo pohana svinjetina s umakom od naranče (ljuto)', NULL, NULL, 10.00, NULL, 1),
(134, 'Osam blaga - tri vrste mesa (ljuto)', NULL, NULL, 10.50, NULL, 1),
(135, 'Junetina na Gambian način (ljuto)', NULL, NULL, 10.50, NULL, 1),
(136, 'Junetina s povrćem', NULL, NULL, 10.00, NULL, 1),
(137, 'Junetina s curry-em', NULL, NULL, 10.00, NULL, 1),
(138, 'Junetina s lukom i paprikom', NULL, NULL, 10.00, NULL, 1),
(139, 'Junetina na Szechuan način (ljuto)', NULL, NULL, 10.50, NULL, 1),
(140, 'Sa-Tsa junetina s brokulama (ljuto)', NULL, NULL, 10.00, NULL, 1),
(141, 'Junetina s bambusom i kin. gljivama', NULL, NULL, 10.50, NULL, 1),
(142, 'Hrskavo pohana junetina na kineski način (u slatko-kiselo-ljutom umaku)', NULL, NULL, 10.50, NULL, 1),
(143, '“Tie Pan” janjetina s porilukom', NULL, NULL, 16.00, NULL, 1),
(144, '“Tie Pan” janjetina s bambusom i gljivama', NULL, NULL, 16.00, NULL, 1),
(145, '“Tie Pan” janjetina na “Szechuan” način (ljuto)', NULL, NULL, 16.00, NULL, 1),
(146, 'Hrskavo pržena patka s bambusom i kineskim gljivama', NULL, NULL, 15.50, NULL, 1),
(147, 'Hrskavo pržena patka sa slatko-kiselim umakom', NULL, NULL, 15.50, NULL, 1),
(148, 'Hrskavo pržena patka na Szechuan način (ljuto)', NULL, NULL, 15.50, NULL, 1),
(149, 'Hrskavo pržena patka s palačinkama', NULL, NULL, 18.00, NULL, 1),
(150, 'Pekinška patka (naručiti 2 dana unaprijed)', NULL, NULL, 80.00, NULL, 1),
(151, '\"Tie Pan\" tri vrste mesa s povrćem', NULL, NULL, 11.00, NULL, 1),
(152, '\"Tie Pan\" s plodovima mora', NULL, NULL, 15.00, NULL, 1),
(153, '\"Tie Pan\" junetina u umaku od kamenica', NULL, NULL, 11.50, NULL, 1),
(154, '\"Tie Pan\" škampi (ljuto)', NULL, NULL, 20.00, NULL, 1),
(155, '\"Tie Pan\" mongolsko meso junetina (ljuto)', NULL, NULL, 11.50, NULL, 1),
(156, '\"Tie Pan\" patka (ljuto)', NULL, NULL, 18.00, NULL, 1),
(157, '\"Tie Pan\" rezanci s plodovima mora', NULL, NULL, 11.50, NULL, 1),
(158, '\"Tie Pan\" piletini ražnjići s kikiriki umakom', NULL, NULL, 11.50, NULL, 1),
(159, '\"Tie Pan\" osam blaga', NULL, NULL, 12.50, NULL, 1),
(160, '\"Tie Pan\" junetina sa staklenim rezancima', NULL, NULL, 10.50, NULL, 1),
(161, '\"Tie Pan\" junetina sa škampima (ljuto)', NULL, NULL, 15.00, NULL, 1),
(162, '\"Tie Pan\" mongolsko meso piletina (ljuto)', NULL, NULL, 11.00, NULL, 1),
(163, 'Fileti oslića s povrćem', NULL, NULL, 8.00, NULL, 1),
(164, 'Fileti oslića s bambusom i kineskim gljivama', NULL, NULL, 8.50, NULL, 1),
(165, 'Oslić na Szechuan način (ljuto)', NULL, NULL, 8.00, NULL, 1),
(166, 'Oslić u slatko-kiselom umaku', NULL, NULL, 10.50, NULL, 1),
(167, 'Škarpina na Szechuan način (ljuto)', NULL, NULL, 10.50, NULL, 1),
(168, 'Hrskava škarpina u slatko-kiselom umaku', NULL, NULL, 18.00, NULL, 1),
(169, 'Škampi s cashew orasima', NULL, NULL, 19.00, NULL, 1),
(170, 'Škampi s bambusom i kineskim gljivama', NULL, NULL, 18.00, NULL, 1),
(171, 'Prženi škampi u slatko-kiselom umaku', NULL, NULL, 19.00, NULL, 1),
(172, 'Škampi na Szechuan način (ljuto)', NULL, NULL, 9.50, NULL, 1),
(173, 'Lignje s povrćem', NULL, NULL, 9.50, NULL, 1),
(174, 'Lignje na Szechuan način (ljuto)', NULL, NULL, 9.50, NULL, 1),
(175, 'Lignje sa bambusom i kineskim gljivama', NULL, NULL, 9.50, NULL, 1),
(176, 'Pirjani bambus s kineskim gljivama', NULL, NULL, 7.50, NULL, 1),
(177, 'Miješano povrće', NULL, NULL, 7.00, NULL, 1),
(178, 'Stakleni rezanci sa tri vrste mesa', NULL, NULL, 8.50, NULL, 1),
(179, 'Pirjani stakleni rezanci s povrćem', NULL, NULL, 7.00, NULL, 1),
(180, '\"Mapo\" tofu s mesom (ljuto)', NULL, NULL, 9.00, NULL, 1),
(181, 'Tofu s bambusom i kineskim gljivama', NULL, NULL, 9.00, NULL, 1),
(182, 'Tofu s tri vrste mesa i povrćem', NULL, NULL, 9.00, NULL, 1),
(183, 'Tofu s povrćem', NULL, NULL, 8.80, NULL, 1),
(184, 'Stakleni rezanci sa kozicama', NULL, NULL, 9.80, NULL, 1),
(185, 'Pohani sladoled', NULL, NULL, 3.90, NULL, 1),
(186, 'Pohane banane', NULL, NULL, 3.00, NULL, 1),
(187, 'Pohane jabuke', NULL, NULL, 3.00, NULL, 1),
(188, 'Pohani ananas', NULL, NULL, 3.00, NULL, 1),
(189, 'Pohano voće sa sladoledom', NULL, NULL, 4.00, NULL, 1),
(190, 'Miješano voće sa sladoledom', NULL, NULL, 3.50, NULL, 1),
(191, 'Sladoled - 2 kuglice', NULL, NULL, 3.50, NULL, 1),
(192, 'Specijalni menu (1)', NULL, 'Kiselkasto ljuta juha (2x)\nHrskavo pržena proljetna rolada (2x)\nKockasto narezano pileće meso na “gongbao” način (ljuto) (1x)\nHrskavo pržena patka sa slatko-kiselim umakom (1x)\nKuhana riža (2x)\nPohani sladoled (2x)', 44.00, NULL, 1),
(193, 'Specijalni menu (2)', NULL, 'Kiselkasto ljuta juha (2x)\nSalata sa pilećim mesom (ljuto) (2x)\nHrskavo pržena proljetna rolada (2x)\nSvinjetina na Szechuan način (ljuto) (1x)\nHrskavo pržena piletina (1x)\nKuhana riža (2x)\nPohani sladoled (2x)', 48.00, NULL, 1),
(194, 'Specijalni menu (3)', NULL, 'Kiselkasto ljuta juha (3x)\nHrskavo pržena proljetna rolada (3x)\nHrskava piletina (1x)\nSvinjsko meso na “Szechuan” način (ljuto) (1x)\nJunetina s lukom (1x)\nKuhana riža (3x)\nPohani sladoled (3x)', 62.00, NULL, 1),
(195, 'Specijalni menu (4)', NULL, 'Kiselkasto-ljuta juha (3x)\nSalata sa pilećim mesom (ljuto) (2x)\nSalata od junetine (1x)\nHrskavo pržena proljetna rolada (3x)\nPanirani oslić u slatko-kiselom umaku (1x)\nPile na “gongbao” način (1x)\nHrskava patka (1x)\nKuhana riža (3x)\nPohani sladoled (3x)', 70.00, NULL, 1),
(196, 'Specijalni menu (5)', NULL, 'Kiselkasto ljuta juha (4x)\nHrskavo pržena proljetna rolada (4x)\nPile s bambusom i gljivama (1x)\nHrskavo pržena patka sa slatko-kiselim umakom (1x)\nSvinjsko meso u slatko-kiselom umaku (1x)\nJunetina “Szechuan” način (ljuto) (1x)\nKuhana riža (4x)\nPohani sladoled (4x)', 88.00, NULL, 1),
(197, 'Specijalni menu (6)', NULL, 'Kiselkasto ljuta juha (4x)\nSalata s pilećim mesom (ljuto) (2x)\nSalata s junetinom (ljuto) (1x)\nSalata od kozica (1x)\nHrskavo pržena proljetna rolada (4x)\nKockasto narezano pileće meso na “gongbao” način (ljuto) (1x)\nHrskavo pržena patka sa slatko-kiselim umakom (1x)\nSvinjsko meso sa povrćem (1x)\nPržena riba s bambusom i gljivama (1x)\nKuhana riža (4x)\nPohani sladoled (4x)', 99.00, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `proizvodi_kategorije`
--

CREATE TABLE `proizvodi_kategorije` (
  `id_proizvod` int(11) DEFAULT NULL,
  `id_kategorija` int(11) DEFAULT NULL,
  `id_podkategorija` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proizvodi_kategorije`
--

INSERT INTO `proizvodi_kategorije` (`id_proizvod`, `id_kategorija`, `id_podkategorija`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 2),
(5, 1, 2),
(6, 1, 2),
(7, 1, 2),
(8, 1, 2),
(9, 1, 2),
(10, 1, 2),
(11, 1, 2),
(12, 1, 2),
(13, 1, 2),
(14, 1, 2),
(15, 1, 2),
(16, 1, 2),
(17, 1, 2),
(18, 1, 2),
(19, 1, 2),
(20, 1, 2),
(21, 1, 3),
(22, 1, 3),
(23, 1, 3),
(24, 1, 3),
(25, 1, 4),
(26, 1, 4),
(27, 1, 4),
(28, 1, 4),
(29, 1, 4),
(30, 1, 4),
(31, 1, 4),
(32, 1, 4),
(33, 1, 5),
(34, 1, 5),
(35, 1, 5),
(36, 1, 5),
(37, 1, 6),
(38, 1, 6),
(39, 1, 6),
(40, 1, 6),
(41, 1, 6),
(42, 1, 6),
(43, 1, 6),
(44, 1, 6),
(45, 1, 7),
(46, 1, 7),
(47, 1, 7),
(48, 1, 7),
(49, 1, 7),
(50, 1, 7),
(51, 1, 7),
(52, 1, 7),
(53, 1, 8),
(54, 1, 9),
(55, 1, 10),
(56, 1, 11),
(57, 1, 11),
(58, 1, 11),
(59, 1, 11),
(60, 1, 11),
(61, 1, 12),
(62, 1, 12),
(63, 1, 12),
(64, 1, 12),
(65, 1, 12),
(66, 1, 12),
(67, 1, 12),
(68, 1, 13),
(69, 1, 13),
(70, 1, 13),
(71, 1, 13),
(72, 1, 13),
(73, 2, 14),
(74, 2, 14),
(75, 2, 14),
(76, 2, 14),
(77, 2, 14),
(78, 2, 14),
(79, 2, 15),
(80, 2, 15),
(81, 2, 15),
(82, 2, 15),
(83, 2, 15),
(84, 2, 15),
(85, 2, 15),
(86, 2, 15),
(87, 2, 15),
(88, 2, 15),
(89, 2, 15),
(90, 3, NULL),
(91, 3, NULL),
(92, 3, NULL),
(93, 3, NULL),
(94, 3, NULL),
(95, 3, NULL),
(96, 3, NULL),
(97, 3, NULL),
(98, 3, NULL),
(99, 4, 16),
(100, 4, 16),
(101, 4, 16),
(102, 4, 16),
(103, 4, 16),
(104, 4, 17),
(105, 4, 17),
(106, 4, 17),
(107, 4, 17),
(108, 4, 17),
(109, 4, 17),
(110, 4, 17),
(111, 4, 18),
(112, 4, 18),
(113, 4, 18),
(114, 4, 18),
(115, 4, 18),
(116, 4, 18),
(117, 4, 18),
(118, 4, 18),
(119, 4, 18),
(120, 4, 18),
(121, 4, 18),
(122, 4, 18),
(123, 4, 18),
(124, 4, 18),
(125, 4, 18),
(126, 4, 19),
(127, 4, 19),
(128, 4, 19),
(129, 4, 19),
(130, 4, 19),
(131, 4, 19),
(132, 4, 19),
(133, 4, 19),
(134, 4, 19),
(135, 4, 20),
(136, 4, 20),
(137, 4, 20),
(138, 4, 20),
(139, 4, 20),
(140, 4, 20),
(141, 4, 20),
(142, 4, 20),
(143, 4, 21),
(144, 4, 21),
(145, 4, 21),
(146, 4, 22),
(147, 4, 22),
(148, 4, 22),
(149, 4, 22),
(150, 4, 22),
(151, 4, 23),
(152, 4, 23),
(153, 4, 23),
(154, 4, 23),
(155, 4, 23),
(156, 4, 23),
(157, 4, 23),
(158, 4, 23),
(159, 4, 23),
(160, 4, 23),
(161, 4, 23),
(162, 4, 23),
(163, 4, 24),
(164, 4, 24),
(165, 4, 24),
(166, 4, 24),
(167, 4, 24),
(168, 4, 24),
(169, 4, 24),
(170, 4, 24),
(171, 4, 24),
(172, 4, 24),
(173, 4, 24),
(174, 4, 24),
(175, 4, 24),
(176, 4, 25),
(177, 4, 25),
(178, 4, 25),
(179, 4, 25),
(180, 4, 25),
(181, 4, 25),
(182, 4, 25),
(183, 4, 25),
(184, 4, 25),
(185, 5, NULL),
(186, 5, NULL),
(187, 5, NULL),
(188, 5, NULL),
(189, 5, NULL),
(190, 5, NULL),
(191, 5, NULL),
(192, 6, 26),
(193, 6, 26),
(194, 6, 27),
(195, 6, 27),
(196, 6, 28),
(197, 6, 28);

-- --------------------------------------------------------

--
-- Table structure for table `racun`
--

CREATE TABLE `racun` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `total_amount_with_discount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_street` varchar(255) DEFAULT NULL,
  `delivery_house_number` varchar(10) DEFAULT NULL,
  `delivery_city` varchar(100) DEFAULT NULL,
  `delivery_postal_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `racun`
--

INSERT INTO `racun` (`id`, `user_id`, `total_amount`, `discount_amount`, `total_amount_with_discount`, `created_at`, `delivery_street`, `delivery_house_number`, `delivery_city`, `delivery_postal_code`) VALUES
(1, 11, 50.30, 0.00, 50.30, '2024-06-22 22:37:09', 'Breg', '95', 'Zagreb', '10000');

-- --------------------------------------------------------

--
-- Table structure for table `racun_stavke`
--

CREATE TABLE `racun_stavke` (
  `id` int(11) NOT NULL,
  `racun_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `racun_stavke`
--

INSERT INTO `racun_stavke` (`id`, `racun_id`, `product_id`, `quantity`, `unit_price`, `total_price`) VALUES
(1, 1, 1, 1, 3.20, 3.20),
(2, 1, 2, 1, 3.20, 3.20),
(3, 1, 3, 1, 3.20, 3.20),
(4, 1, 80, 1, 3.50, 3.50),
(5, 1, 81, 1, 3.30, 3.30),
(6, 1, 92, 1, 3.00, 3.00),
(7, 1, 93, 1, 3.50, 3.50),
(8, 1, 112, 1, 9.80, 9.80),
(9, 1, 116, 1, 9.80, 9.80),
(10, 1, 185, 2, 3.90, 7.80);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `stars_number` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_featured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `user_id`, `description`, `stars_number`, `created_on`, `is_featured`) VALUES
(41, 9, 'Definitivno favorit u gradu Zagrebu. Prije svega krenuo bih od osoblja koje je uvijek nasmijano i izuzetno ljubazno...', 5, '2024-06-23 10:19:00', 1),
(42, 9, 'Super hrana, super usluga. Bili smo prvi put, svakako ćemo se vratiti i isprobati još jela koja imaju u ponudi...', 4, '2024-06-23 10:19:00', 1),
(43, 9, 'Hrana je iznimno finog okusa i velike su porcije. Hrana zaslužuje i ocjenu 6 koja nije ponuđena...', 5, '2024-06-23 10:19:00', 1),
(44, 9, 'Odlična usluga, još ukusnija hrana. Velike porcije. Ugodan ambijent i jako pristupačne cijene...', 5, '2024-06-23 10:19:00', 1),
(45, 9, 'Hrana je bila savršena, a usluga nevjerojatna. Definitivno ću opet doći.', 4, '2024-06-23 10:19:00', 1),
(46, 9, 'Vrhunska kvaliteta i fantastična atmosfera. Cijene su također vrlo prihvatljive.', 5, '2024-06-23 10:19:00', 1),
(47, 9, 'Izvrsna hrana, ali čekali smo malo duže nego što smo očekivali.', 3, '2024-06-23 10:19:00', 0),
(48, 9, 'Preporučujem svima! Izvrsno iskustvo.', 5, '2024-06-23 10:19:00', 0),
(49, 9, 'Sve je bilo odlično, osim što je desert bio previše sladak za moj ukus.', 4, '2024-06-23 10:19:00', 0),
(50, 9, 'Hrana je bila u redu, ali atmosfera nije bila po mom ukusu.', 3, '2024-06-23 10:19:00', 0),
(51, 9, 'Vrhunski restoran! Hrana i usluga su za svaku pohvalu.', 5, '2024-06-23 10:19:00', 0),
(52, 9, 'Ugodno iskustvo, svakako ćemo se vratiti.', 4, '2024-06-23 10:19:00', 0),
(53, 9, 'Hrana je bila fantastična, ali cijene su malo visoke.', 4, '2024-06-23 10:19:00', 0),
(54, 11, 'Test recenzija', 5, '2024-06-23 15:40:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `house_number` int(10) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `card_first_name` varchar(255) DEFAULT NULL,
  `card_last_name` varchar(255) DEFAULT NULL,
  `card_number` varchar(20) DEFAULT NULL,
  `card_cvv` varchar(4) DEFAULT NULL,
  `card_exp_month` varchar(2) DEFAULT NULL,
  `card_exp_year` varchar(4) DEFAULT NULL,
  `orders_completed` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `street`, `house_number`, `city`, `postal_code`, `username`, `email`, `password`, `card_first_name`, `card_last_name`, `card_number`, `card_cvv`, `card_exp_month`, `card_exp_year`, `orders_completed`) VALUES
(9, 'Beni', 'Babic', 'Ilica', 252, 'Zagreb', '10000', 'bbabic2', 'bbabic2@algebra.hr', '$2a$10$QUv/IaKsD3EjUctyTl2IgOOItyHImGbKGR.VIEAvKJj0zk.uLt9eC', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(10, 'Benjamin', 'Babić', 'Breg', 95, 'Zagreb', '10000', 'bbabic3', 'benibabic@gmail.com', '$2a$10$eanDzpcxmCtJ.YCbTCjDtuJ5yDKPpDUFQLmQOaVy9l6wfveBcrvzO', 'Benjamin', 'Babić', '7777888899991111', '124', '07', '27', 1),
(11, 'Benjamin v4', 'Babić', 'Breg', 95, 'Zagreb', '10000', 'bbabic4', 'administartor@gmail.com', '$2a$10$Zo5mmU50Avpef.wuMGhv9ucfN1OSWt/8QSomXXzD10rIkpFvnxq3i', 'Benjamin', 'Babić', '1234123412341234', '123', '07', '25', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategorije`
--
ALTER TABLE `kategorije`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `podkategorije`
--
ALTER TABLE `podkategorije`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kategorija` (`id_kategorija`);

--
-- Indexes for table `proizvodi`
--
ALTER TABLE `proizvodi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proizvodi_kategorije`
--
ALTER TABLE `proizvodi_kategorije`
  ADD KEY `id_proizvod` (`id_proizvod`),
  ADD KEY `id_kategorija` (`id_kategorija`),
  ADD KEY `id_podkategorija` (`id_podkategorija`);

--
-- Indexes for table `racun`
--
ALTER TABLE `racun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `racun_stavke`
--
ALTER TABLE `racun_stavke`
  ADD PRIMARY KEY (`id`),
  ADD KEY `racun_id` (`racun_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategorije`
--
ALTER TABLE `kategorije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `podkategorije`
--
ALTER TABLE `podkategorije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `proizvodi`
--
ALTER TABLE `proizvodi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT for table `racun`
--
ALTER TABLE `racun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `racun_stavke`
--
ALTER TABLE `racun_stavke`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `podkategorije`
--
ALTER TABLE `podkategorije`
  ADD CONSTRAINT `podkategorije_ibfk_1` FOREIGN KEY (`id_kategorija`) REFERENCES `kategorije` (`id`);

--
-- Constraints for table `proizvodi_kategorije`
--
ALTER TABLE `proizvodi_kategorije`
  ADD CONSTRAINT `proizvodi_kategorije_ibfk_1` FOREIGN KEY (`id_proizvod`) REFERENCES `proizvodi` (`id`),
  ADD CONSTRAINT `proizvodi_kategorije_ibfk_2` FOREIGN KEY (`id_kategorija`) REFERENCES `kategorije` (`id`),
  ADD CONSTRAINT `proizvodi_kategorije_ibfk_3` FOREIGN KEY (`id_podkategorija`) REFERENCES `podkategorije` (`id`);

--
-- Constraints for table `racun`
--
ALTER TABLE `racun`
  ADD CONSTRAINT `racun_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `racun_stavke`
--
ALTER TABLE `racun_stavke`
  ADD CONSTRAINT `racun_stavke_ibfk_1` FOREIGN KEY (`racun_id`) REFERENCES `racun` (`id`),
  ADD CONSTRAINT `racun_stavke_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `proizvodi` (`id`);

--
-- Constraints for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
