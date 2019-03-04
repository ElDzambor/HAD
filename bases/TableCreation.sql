#  SOURCE bases/TableCreation.sql;

DROP DATABASE App;


CREATE DATABASE App;

USE App;

CREATE TABLE Users
(
    UserNo      CHAR(8)         NOT NULL,
    UserName    VARCHAR(128)    NOT NULL,        
    UserPass    VARCHAR(64)     NOT NULL,               
    UserGend    CHAR(6)         NOT NULL,
    UserTitle   VARCHAR(8)      NOT NULL,
    PRIMARY KEY (UserNo,UserName)
);
DESCRIBE Users;

CREATE TABLE LongList
(
    ListNo          INTEGER(6)      AUTO_INCREMENT,
    UserName        VARCHAR(128)    NOT NULL,        
    Task            VARCHAR(32)     NOT NULL,                       
    PRIMARY KEY (ListNo)  
);

DESCRIBE LongList;

INSERT INTO Users VALUES ('USR00001','Smok','Wawelski','Male','Mr');
INSERT INTO Users VALUES ('USR00002','Baltazar','Gabka','Male','Mr');
INSERT INTO Users VALUES ('USR00003','Bartolini','Bartlomiej','Male','Mr');
INSERT INTO Users VALUES ('USR00004','Sierotka','Marysia','Female','Ms');
INSERT INTO Users VALUES ('USR00005','Sven','Sven','Other','SF');
INSERT INTO Users VALUES ('USR00006','PePe','TheMountain','Male','CEO');

INSERT INTO LongList VALUES (1,'Smok','Eat some sheep');
INSERT INTO LongList VALUES (2,'Smok','Eat more sheep');
INSERT INTO LongList VALUES (3,'Smok','Eat even more sheep');
INSERT INTO LongList VALUES (4,'Smok','Pass out');
INSERT INTO LongList VALUES (5,'Smok','Explode');

INSERT INTO LongList VALUES (6,'Baltazar','Comb');
INSERT INTO LongList VALUES (7,'Baltazar','Comb some more');
INSERT INTO LongList VALUES (8,'Baltazar','Snore');
INSERT INTO LongList VALUES (9,'Baltazar','Snore soome more');
INSERT INTO LongList VALUES (10,'Baltazar','Act');

INSERT INTO LongList VALUES (11,'Bartolini','Pizza 1');
INSERT INTO LongList VALUES (12,'Bartolini','Pizza 2');
INSERT INTO LongList VALUES (13,'Bartolini','Pizza 3');
INSERT INTO LongList VALUES (14,'Bartolini','Pizza 4');
INSERT INTO LongList VALUES (15,'Bartolini','Pizza 5');

INSERT INTO LongList VALUES (16,'Sierotka','Makeup');
INSERT INTO LongList VALUES (17,'Sierotka','More makeup');
INSERT INTO LongList VALUES (18,'Sierotka','Even more makeup');
INSERT INTO LongList VALUES (19,'Sierotka','Even moreeee makeup');
INSERT INTO LongList VALUES (20,'Sierotka','Even moreeeeee makeup!');

INSERT INTO LongList VALUES (21,'Sven','He is boring');

INSERT INTO LongList VALUES (22,'PePe','Rule');
INSERT INTO LongList VALUES (23,'PePe','The');
INSERT INTO LongList VALUES (24,'PePe','World');
INSERT INTO LongList VALUES (25,'PePe','I say!');



