package com.VSSB.server.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.VSSB.server.model.Server;

public interface ServerRepo extends JpaRepository<Server, Long> { //<what class to manage , id type>
    Server findByIpAddress(String ipAddress); // select from Server by ipAddress
}
