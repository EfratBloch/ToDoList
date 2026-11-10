-- SQL Server script that creates the ToDoDB database and the Items table
CREATE DATABASE ToDoDB;
GO

USE ToDoDB;
GO

CREATE TABLE Items (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100),
    IsComplete BIT
);
