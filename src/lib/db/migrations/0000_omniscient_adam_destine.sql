CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role` varchar(255) NOT NULL,
	`parts` text NOT NULL,
	`room_public_id` varchar(255),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`public_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`),
	CONSTRAINT `public_id` UNIQUE(`public_id`)
);
--> statement-breakpoint
CREATE INDEX `room_public_id` ON `messages` (`room_public_id`);--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_room_public_id_rooms_public_id_fk` FOREIGN KEY (`room_public_id`) REFERENCES `rooms`(`public_id`) ON DELETE no action ON UPDATE no action;