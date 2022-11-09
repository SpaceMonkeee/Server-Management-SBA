package com.VSSB.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.VSSB.server.enumeration.Status;
import com.VSSB.server.model.Server;
import com.VSSB.server.repo.ServerRepo;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo) {
		return args -> {
			serverRepo.save(new Server(null, "142.250.189.4", "Google.com", "500 TB", "Website", 
					"http://localhost:8080/server/image/server1.png", Status.SERVER_UP));
			serverRepo.save(new Server(null, "74.6.231.21", "Yahoo.com", "300 TB", "Website", 
					"http://localhost:8080/server/image/server2.png", Status.SERVER_UP));
		};
	}

}
