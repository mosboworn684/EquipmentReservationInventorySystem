-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 07:46 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `borrow`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `id` int(11) NOT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`id`, `equipment_id`, `user_id`, `status`, `amount`, `borrow_date`, `return_date`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, 10, '2023-08-14', '2023-08-14', '2023-08-14 16:44:17', '2023-08-14 16:52:33'),
(2, 3, 1, 2, 5, '2023-08-14', '2023-08-14', '2023-08-14 16:50:43', '2023-08-14 16:52:42');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `amount`, `createdAt`, `updatedAt`) VALUES
(1, 'ปากกา', 120, '2023-08-14 16:42:18', '2023-08-14 16:52:33'),
(2, 'เมาส์', 200, '2023-08-14 16:43:27', '2023-08-14 16:43:27'),
(3, 'โน๊ตบุ๊ค', 20, '2023-08-14 16:43:48', '2023-08-14 16:52:42');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `createdAt`, `updatedAt`) VALUES
(1, 'mosboworn', '$2b$10$WVAcudDOj273N4AAOHk91OWtw1kvcgAV3MkO4s6fkew7hIp0/UuHO', 'Baworn', 'Ngamanurakwong', '2023-08-14 16:27:51', '2023-08-14 16:27:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
