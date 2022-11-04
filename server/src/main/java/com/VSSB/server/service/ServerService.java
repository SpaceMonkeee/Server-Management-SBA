package com.VSSB.server.service;

import java.io.IOException;
import java.util.Collection;

import com.VSSB.server.model.Server;

public interface ServerService {
    Server create(Server server);
    Server ping(String ipAddress) throws IOException;
    Collection<Server> list(int limit);
    Server get(Long id);
    Server update(Server server);
    Boolean delete(Long id);
}
