-- Create database
CREATE DATABASE IF NOT EXISTS prakriti_aircon;
USE prakriti_aircon;

-- Create contacts table
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service ENUM('ducting-materials', 'ducting-work', 'evaporative-coolers', 'maintenance', 'consultation') NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);