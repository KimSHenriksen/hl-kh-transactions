DROP TABLE IF EXISTS `payment_note`;
CREATE TABLE `payment_note` (
  `payment_note_uuid` varchar(255) NOT NULL,
  `payment_note_period_from_datetime` datetime DEFAULT NULL,
  `payment_note_period_to_datetime` datetime DEFAULT NULL,
  `payment_note_created_datetime` datetime NOT NULL,
  `payment_note_transactions_count` int(11) DEFAULT '0',
  `payment_note_value` float DEFAULT '0',
  `payment_note_status_code` enum('CREATING','COMPLETED') DEFAULT 'CREATING',
  PRIMARY KEY (`payment_note_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
